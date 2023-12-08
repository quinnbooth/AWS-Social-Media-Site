import React, { useEffect, useState } from 'react';
import { getUrl } from 'aws-amplify/storage';

const Post = ({ post }) => {

  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    loadImage();
  }, [post.content_link]);

  const loadImage = async () => {
    if (post.content_link != null) {
      try { 
        const url = await getUrl({ 
          key: post.content_link, 
          options: {
            accessLevel: 'public',
            expires: 60
          } 
        });
        console.log('Fetched S3 image:', url.url)
        setImageURL(url.url);
      } catch (error) {
        console.error('Error accessing image in S3:', error)
        setImageURL(null);
      }
    }
  }

  return (
    <div key={post.id} className="postItem">
        <p>USER: {post.owner}</p>
        <p>{post.text}</p>
        {imageURL && (
            <img src={imageURL} alt='image' style={{ maxWidth: '90%', height: 'auto'}}/>
          )
        }
        <p>{new Date(post.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default Post;