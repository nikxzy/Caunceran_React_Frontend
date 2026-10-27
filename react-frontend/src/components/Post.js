import React, { useState, useEffect } from 'react';
import { getPosts, createPost } from '../api/auth/post';

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    getPosts().then(setPosts).catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      const newPost = await createPost(content);
      setPosts((prev) => [newPost, ...prev]);
      setContent('');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <div
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          marginBottom: '25px',
        }}
      >
        <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', fontWeight: 'bold' }}>
          Create Post
        </h3>

        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            rows={4}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              resize: 'none',
              boxSizing: 'border-box',
              outline: 'none',
              fontSize: '14px',
            }}
          />
          <div style={{ textAlign: 'right', marginTop: '10px' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#7c8ba1',
                color: '#fff',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Post
            </button>
          </div>
        </form>
      </div>

      <div>
        {posts.map((item, index) => (
          <div key={item.id || index} style={{ borderBottom: '1px solid #efefef', padding: '15px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Guest User</span>
              <span style={{ color: '#888', fontSize: '12px' }}>
                {new Date(item.created_at || Date.now()).toLocaleString()}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#444' }}>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}