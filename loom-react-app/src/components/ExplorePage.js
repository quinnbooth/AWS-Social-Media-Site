import React from 'react';
import Post from './Post';
import "./ExplorePage.css";

function ExplorePage({ posts }) {

    return (
      posts.map(post => (
        <Post key={post.id} post={post} />
      ))
    );
}

export default ExplorePage;