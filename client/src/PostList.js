import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get("http://posts.com/posts");
    console.log(res.data);
    setPosts(res.data);
  };

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
        </div>
        <CommentList comments={post.comments} />
        <CommentCreate postId={post.id} />
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between ">
      {renderedPosts}
    </div>
  );
};

export default PostList;
