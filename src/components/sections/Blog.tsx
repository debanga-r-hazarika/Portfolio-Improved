import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useScrollAnimation } from '../../utils/animation';

type LinkedInPost = {
  html: string;
  title?: string;
  author_name?: string;
  provider_name?: string;
  thumbnail_url?: string;
};

export default function Blog() {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { linkedInPosts } = useAuth();

  useEffect(() => {
    try {
      const fetchedPosts = [...linkedInPosts].reverse().map(post => ({
        html: `<iframe 
          src="${post.url}?collapsed=1" 
          height="399" 
          width="100%" 
          frameborder="0" 
          allowfullscreen="" 
          title="Embedded LinkedIn post"
          sandbox="allow-scripts allow-same-origin allow-presentation"
          style="background-color: transparent; border: none; overflow: hidden;"
        ></iframe>`,
        title: post.title
      }));

      setPosts(fetchedPosts);
    } catch (err) {
      setError('Failed to load LinkedIn posts. Please try again later.');
      console.error('LinkedIn posts error:', err);
    } finally {
      setLoading(false);
    }
  }, [linkedInPosts]);

  return (
    <section id="blog" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white" ref={useScrollAnimation({ animation: 'fade-up' })}>
          Latest Updates
        </h2>

        {loading && (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 dark:text-red-400 mb-8">
            {error}
          </div>
        )}

        <div 
          className="flex overflow-x-auto gap-8 pb-4 snap-x snap-mandatory hide-scrollbar" 
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
          ref={useScrollAnimation({ animation: 'fade-up', delay: 200 })}>
          <style jsx>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {posts.map((post, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 overflow-hidden flex-none w-[calc(100vw-3rem)] md:w-[calc(50vw-3rem)] snap-center"
            >
              <div 
                className="linkedin-post relative w-full"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}