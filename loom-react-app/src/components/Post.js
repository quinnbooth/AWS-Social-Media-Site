import React from 'react';

const Post = ({ post }) => {
  return (
    <div key={post.id} className="postItem">
        <p>USER: {post.owner}</p>
        <p>{post.text}</p>
        <p>{new Date(post.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default Post;