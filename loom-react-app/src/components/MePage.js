import React from 'react';
import Post from './Post';
import "./ExplorePage.css";

function MePage( { posts , user } ) {

  const userPosts = posts.filter(post => post.owner === user);

  return (
    userPosts.map(post => (
      <Post key={post.id} post={post} />
    ))
  );
}

export default MePage;