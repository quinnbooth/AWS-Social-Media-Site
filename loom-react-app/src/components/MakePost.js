import React, { useState } from 'react';
import "./MakePost.css";

function MakePost( { newPost, posts, setPosts } ) {

    const [overlay, setOverlay] = useState(false);
    const [text, setText] = useState('');
    const [link, setLink] = useState(null);

    const handleText = (event) => {
      setText(event.target.value);
    };

    const generateUniqueId = () => {
        return Math.random().toString(36).substr(2, 9);
    };
  
    const handleSubmit = async () => {
      if (text !== '') {

        const result = await newPost(text, link);
        setOverlay(false);
        setPosts((posts) => [...posts, { ...result.data.createPosts, id: generateUniqueId() }]);

      } else {
        console.error('Post text cannot be empty.');
      }
    };
  
    return (
      <div>
        <button className="newPostButton" onClick={() => {setOverlay(!overlay)}}>
          New Post
        </button>
  
        {overlay && (
          <div className="overlay">
            <p>Write a post!</p>
            <textarea 
                type="text"
                value={text}
                onChange={handleText}
                placeholder="Post can't be blank."
            />
            <div className='buttonDiv'>
                <button onClick={() => {console.log("TO IMPLEMENT")}}>Upload</button>
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={() => {setOverlay(false)}}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    );
}

export default MakePost;