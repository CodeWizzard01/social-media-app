package com.codewiz.socialmedia.controller;

import com.codewiz.socialmedia.model.Post;
import com.codewiz.socialmedia.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/posts")
@AllArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public Post createPost(@RequestParam String title,
                           @RequestParam String text,
                           @RequestParam List<String> tags,
                           @RequestParam(value = "mediaFile", required = false) MultipartFile mediaFile) throws IOException {
        return postService.createPost(title, text, tags,mediaFile);
    }

    @GetMapping
    public Page<Post> getAllPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String searchCriteria
    ) {
        return postService.getAllPosts(page, size,searchCriteria);
    }

    @GetMapping("/{id}")
    public Post getPostById(@PathVariable String id) {
        return postService.getPostById(id);
    }

    @PutMapping("/{id}")
    public Post updatePost(@PathVariable String id,
                           @RequestParam String title,
                           @RequestParam String text,
                           @RequestParam List<String> tags,
                           @RequestParam(value = "mediaFile", required = false) MultipartFile mediaFile) throws IOException {
        return postService.updatePost(id, title, text, tags,mediaFile);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable String id) {
        postService.deletePost(id);
    }

    @PostMapping("/{id}/like")
    public void likePost(@PathVariable String id) {
        postService.likePost(id);
    }
}
