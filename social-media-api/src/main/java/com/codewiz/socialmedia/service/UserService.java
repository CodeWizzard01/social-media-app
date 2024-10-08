package com.codewiz.socialmedia.service;

import com.codewiz.socialmedia.config.AWSConfig;
import com.codewiz.socialmedia.model.LoginDto;
import com.codewiz.socialmedia.model.LoginResponse;
import com.codewiz.socialmedia.model.User;
import com.codewiz.socialmedia.model.UserDto;
import com.codewiz.socialmedia.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final S3Client s3Client;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final TokenService tokenService;

    private final S3PresignedUrlService s3PresignedUrlService;

    public User register(UserDto userDto) throws IOException {
        User user = new User();
        user.setName(userDto.name());
        user.setEmail(userDto.email());
        user.setPassword(passwordEncoder.encode(userDto.password()));
        var uuid =  UUID.randomUUID().toString();
        user.setId(uuid);
        user.setRoles(List.of("ROLE_USER"));
        var mediaFile = userDto.profilePhoto();
        if (mediaFile != null && !mediaFile.isEmpty()) {
            String fileName = uuid + "-profile";
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(AWSConfig.BUCKET_NAME)
                    .key(fileName)
                    .build();
            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(mediaFile.getBytes()));
            user.setProfilePhoto(fileName);
        }
        return userRepository.save(user);
    }

    public LoginResponse authenticate(LoginDto input) {
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(input.email(), input.password()));
        var user = (User) authentication.getPrincipal();
        String token= tokenService.generateToken(authentication);
        String profilePhotoUrl = user.getProfilePhoto() != null ? s3PresignedUrlService.generatePresignedUrl(user.getProfilePhoto()) : null;
        return new LoginResponse(token, user.getName(), user.getEmail(), profilePhotoUrl);
    }


}
