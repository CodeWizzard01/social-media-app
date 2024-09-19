package com.codewiz.socialmedia.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PostCreator {
    private String id;
    private String name;
    private String profilePhoto;
}
