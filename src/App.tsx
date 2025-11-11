import { useEffect, useState } from 'react';
import './App.css';
import type { Post, User } from './types';
import PostCard from './PostCard';

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);

      const fetchPosts = async () => {
      try {
        const [postResponse, userResponse] = await Promise.all([
          fetch(import.meta.env.PUBLIC_BACKEND_URL + '/posts').then((data) =>
            data.json(),
          ),
          fetch(import.meta.env.PUBLIC_BACKEND_URL + '/users').then((data) =>
            data.json(),
          ),
        ]);

        const userMap = new Map(
          userResponse.map((user: User) => [user.id, user]),
        );
        const mergedPosts: Post[] = postResponse.map((post: Post) => {
          const userData: User = userMap.get(post.userId);
          const user = userData
            ? `${userData.name} - ${userData.username}`
            : 'Unknown User';
          return { ...post, user };
        });
        
        setPosts(mergedPosts);
      } catch (e) {
        console.error(e);
      }
    };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPosts();
    }
    fetchData();
  }, []);

  const content =
    posts.length > 0 ? (
      posts.map((post: Post) => (
        <>
          <PostCard key={post.id} {...post} />
        </>
      ))
    ) : (
      <div>Sorry, No Post right now!</div>
    );

  return (
    <>
      <h1 className='text-3xl font-bold mt-2 mb-4'>Posts ({posts.length | 0})</h1>
      <div className="post-container">{content}</div>
      <div className="post-container">{import.meta.env.PUBLIC_BACKEND_URL}</div>
    </>
  );
};

export default App;
