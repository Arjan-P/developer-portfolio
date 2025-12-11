import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import type { Post } from "../../types/Post";

export default function EditPost() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`/api/posts/${id}`)
    .then(res => res.json() as Promise<Post>)
    .then(data => {
      setTitle(data.title);
      setContent(data.content);
    });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`
      },
      body: JSON.stringify({ title, content }),
    });
    if(res.ok){
      navigate('/admin');
    }
  }

  return (
    <div>
      <h1>Add Article</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        /><br/>

        <textarea
          placeholder="Content"
          value={content}
          rows={10}
          onChange={e => setContent(e.target.value)}
        /><br/>

        <button type="submit">Submit</button>
      </form>

    </div>
  );
}
