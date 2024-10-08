"use client";

import { Post } from "@/types/types";
import React, { useEffect, useState } from "react";
import { getPosts } from "./actions";
import PostElem from "./post";
import { useInView } from "react-intersection-observer";


function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollTrigger, isInView] = useInView();
    
    const fetchPosts = async (page: number) => {
        setIsLoading(true);
        try {
            const response = await getPosts(page);
            setHasMore(response.totalPages > page + 1);
            if(page === 0) {
                setPosts(response.content);
            }
            else {
                setPosts([...posts, ...response.content]);
            }
        } catch {
            setError("Failed to fetch posts");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(0);
    }, []);
  
    useEffect(() => {
        if(isLoading || !hasMore || !isInView) {
            return;
        }
        fetchPosts(page + 1);
        setPage((prevPage) => prevPage + 1);
    }, [isInView,isLoading]);


    return (
      <div className="flex flex-col items-center justify-center gap-4">
        {error && <p className="text-red-500">{error}</p>}
        {posts.map((post) => (
          <PostElem post={post} key={post.id} />
        ))}
        {(!error && hasMore && <div ref={scrollTrigger}>Loading...</div>) || (
          <p className="...">No more posts to load</p>
        )}
      </div>
    );
}

export default Posts;
