import { useState, useEffect } from "react";
import type { Post } from "../../types/Post";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const handleDelete = async (id: number) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`
      }
    });
    if (res.ok) {
      setPosts(prev => prev.filter(a => a.id !== id)); // update UI 
    }
  }
  return (
    <div>
      <h1>Posts</h1>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map(post => (
          <li key={post.id}>
            <div className="flex flex-row justify-between items-center">
              {post.title}
              <Link to={`/admin/edit/${post.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
