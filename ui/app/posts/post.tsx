import { Post } from "@/types/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { ThumbsUp } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { likePost } from "./actions";

function PostElem({ post }: { post: Post }) {
  const formattedDateTime = new Date(post.createdAt).toLocaleString("en-US");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    likePost(post.id);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };
  
  return (
    <Card>
      {" "}
      <CardHeader>
        <CardTitle>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={post.creator.profilePhoto}
                alt={post.creator.name}
                height="24px"
                width="24px"
              />
              <span style={{ marginLeft: "8px" }}>{post.creator.name}</span>
            </div>
            <span>{formattedDateTime}</span>
          </div>
          <div className="mt-5 mb-3">
            <span>{post.title}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {post.mediaType === "VIDEO" ? (
          <video
            controls
            src={post.presignedUrl}
            height="200px"
            width="1000px"
          />
        ) : (
          <img
            src={post.presignedUrl}
            alt={post.title}
            height="200px"
            width="1000px"
          />
        )}
        <Typography element="p" as="p">
          {post.text}
        </Typography>
      </CardContent>
      <CardFooter className="flex flex-row gap-2">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div>
            {post.tags?.map((tag, index) => (
              <Badge key={index} className="ml-2">
                {tag}
              </Badge>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ThumbsUp
              className="mr-2 h-6 w-6 cursor-pointer"
              onClick={handleLike}
              color={liked ? "blue" : "grey"} // Change color based on liked state
            />
            <span>{likeCount}</span> {/* Display the dynamic like count */}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default PostElem;
