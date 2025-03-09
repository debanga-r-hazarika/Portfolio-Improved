import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function LinkedInPostsAdmin() {
  const { linkedInPosts, setLinkedInPosts } = useAuth();
  const [newPostUrl, setNewPostUrl] = useState('');
  const [error, setError] = useState('');

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Extract post ID from various LinkedIn URL formats
      let postId = '';
      const urlString = newPostUrl.trim();

      // Handle iframe embed URL format
      const iframeMatch = urlString.match(/linkedin\.com\/embed\/feed\/update\/(urn:li:[^?]+|\d+)/);
      if (iframeMatch) {
        postId = iframeMatch[1];
      } else {
        try {
          const url = new URL(urlString);
          
          if (urlString.includes('/feed/update/')) {
            postId = urlString.split('/feed/update/')[1].split('?')[0];
          } else if (urlString.includes('/posts/')) {
            postId = urlString.split('/posts/')[1].split('?')[0];
          } else if (url.pathname.split('/').length >= 4) {
            const pathParts = url.pathname.split('/');
            postId = pathParts[pathParts.length - 1];
          }
        } catch (urlError) {
          setError('Please enter a valid LinkedIn URL');
          return;
        }
      }

      if (!postId) {
        setError('Invalid LinkedIn post URL format');
        return;
      }

      // Construct embed URL
      const embedUrl = `https://www.linkedin.com/embed/feed/update/${postId}`;

      // Add new post
      setLinkedInPosts([
        ...linkedInPosts,
        {
          url: embedUrl,
          title: 'LinkedIn Post'
        }
      ]);

      // Clear input
      setNewPostUrl('');
    } catch (error) {
      setError('Please enter a valid LinkedIn post URL');
    }
  };

  const handleDeletePost = (postUrl: string) => {
    if (window.confirm('Are you sure you want to delete this LinkedIn post?')) {
      setLinkedInPosts(linkedInPosts.filter(post => post.url !== postUrl));
    }
  };

  return (
    <div className="mt-12 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage LinkedIn Posts</h2>
      </div>

      <form onSubmit={handleAddPost} className="mb-8">
        <div className="flex gap-4">
          <input
            type="url"
            value={newPostUrl}
            onChange={(e) => setNewPostUrl(e.target.value)}
            placeholder="Paste LinkedIn post embed URL here"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Post
          </button>
        </div>
        {error && (
          <p className="mt-2 text-red-600 dark:text-red-400 text-sm">{error}</p>
        )}
      </form>

      <div className="space-y-4">
        {linkedInPosts.map((post, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div className="flex-1 mr-4 break-all">
              <p className="text-gray-900 dark:text-white">{post.url}</p>
            </div>
            <button
              onClick={() => handleDeletePost(post.url)}
              className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
              aria-label="Delete post"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}