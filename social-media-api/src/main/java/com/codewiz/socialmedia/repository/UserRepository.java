package com.codewiz.socialmedia.repository;

import com.codewiz.socialmedia.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
      Optional<User> findByEmail(String email);
}
