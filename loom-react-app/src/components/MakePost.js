import React, { useState } from 'react';
import "./MakePost.css";
import { v4 as uuidv4 } from 'uuid';
import { uploadData } from 'aws-amplify/storage';

function MakePost( { newPost, posts, setPosts } ) {

    const [overlay, setOverlay] = useState(false);
    const [text, setText] = useState('');
    const [imageData, setImageData] = useState(null);

    const handleText = (event) => {
      setText(event.target.value);
    };

    const generateUniqueId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const handleSubmit = async () => {
      if (text !== '') {

        if (imageData !== null) {
          const { key } = await uploadData({
            key: `${uuidv4()}.png`, 
            data: imageData, 
            options: {
              contentType: 'image/png',
              accessLevel: 'public'
            }
          }).result;
          console.log(`Image stored in S3 at ${key}`)
          setImageData(null);
          const result = await newPost(text, key);
          setPosts((posts) => [...posts, { ...result.data.createPosts, id: generateUniqueId() }]);
        } else {
          const result = await newPost(text, null);
          setPosts((posts) => [...posts, { ...result.data.createPosts, id: generateUniqueId() }]);
        }

        console.log('Post stored in DynamoDB')
        setOverlay(false);
        
      } else {
        console.error('Post text cannot be empty');
      }
    };
  
    return (
      <div>
        <button className="newPostButton" onClick={() => {setOverlay(!overlay);}}>
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
                  <label htmlFor="uploadInput" className="uploadFile">
                    Upload
                    <input
                      id="uploadInput"
                      type="file"
                      accept="image/png"
                      onChange={(e) => setImageData(e.target.files[0])}
                    />
                  </label>
                    <button className='interactable' onClick={handleSubmit}>Submit</button>
                    <button className='interactable' onClick={() => {setOverlay(false)}}>Cancel</button>
                </div>
          </div>
        )}
      </div>
    );
}

export default MakePost;