package com.codewiz.socialmedia.controller;

import com.codewiz.socialmedia.model.LoginDto;
import com.codewiz.socialmedia.model.LoginResponse;
import com.codewiz.socialmedia.model.User;
import com.codewiz.socialmedia.model.UserDto;
import com.codewiz.socialmedia.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<User> register(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam(required = false) MultipartFile profilePhoto) throws IOException {
        UserDto registerUserDto = new UserDto(name, email, password, profilePhoto);
        User registeredUser = userService.register(registerUserDto);
        return ResponseEntity.ok(registeredUser);
    }


    @PostMapping("/signin")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginDto loginUserDto) {
        var loginResponse = userService.authenticate(loginUserDto);
        return ResponseEntity.ok(loginResponse);
    }
}
