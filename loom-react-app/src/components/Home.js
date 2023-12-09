import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar.js';
import './Home.css'

import ExplorePage from "./ExplorePage.js";
import MePage from "./MePage.js";
import SettingsPage from "./SettingsPage.js";
import MakePost from './MakePost.js';

function Home({ user, signOut, login, logout, client }) {

    const postLimit = 30;

    const { listPosts } = require('../graphql/queries');
    const { createPosts } = require('../graphql/mutations.js');

    const [page, setPage] = useState("explore");
    const [posts, setPosts] = useState([]);
    const [sortedPosts, setSortedPosts] = useState([]);

    useEffect(() => {
        const load = async () => { login(); };
        load();
    }, [user]);

    useEffect(() => {
        const sorted = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setSortedPosts(sorted);
    }, [posts]);

    const handleLogout = () => {
        logout();
        signOut();
    };

    const getRecentPosts = async () => {

        try {
          const postData = await client.graphql({ query: listPosts, limit: postLimit });
          const postList = postData.data.listPosts.items;
          setPosts(postList);
          console.log("POSTS: ", postList);
        } catch (error) {
          console.error("Error fetching posts: ", error);
        }
    
    };

    useEffect(() => {
        getRecentPosts();
    }, []);

    const newPost = async (content, link) => {

        try {
  
          const inputs = {
            text: content,
            content_link: link,
            likes: 0
          }
  
          const result = await client.graphql({
            query: createPosts,
            variables: {
              input: inputs
            }
          });

          return result;
  
        } catch (error) {
          console.error("Error making post: ", error);
        }
  
    };

    return (
        <div className='home'>
            <NavigationBar logout={handleLogout} setPage={setPage} />
            <div className='contentBox'>
                { 
                    page === "explore" ? <ExplorePage posts={sortedPosts} /> :
                    page === "me" ? <MePage posts={sortedPosts} user={user} /> : <SettingsPage />
                }
            </div>
            {(page != 'settings') && (
              <MakePost newPost={newPost} posts={posts} setPosts={setPosts} />
            )}
        </div>
    );
}

export default Home;