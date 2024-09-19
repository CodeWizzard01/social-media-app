package com.codewiz.socialmedia.model;

public record LoginResponse(String token, String name, String email, String profilePhoto) {
}
