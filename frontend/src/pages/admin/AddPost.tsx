import { useState } from "react"
export default function AddPost() {
  const [title, setTitle] = useState("");
  const [contentMd, setContentMd] = useState("");
  const [msg, setMsg] = useState("");
  const token = localStorage.getItem("token");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`
        },
        body: JSON.stringify({title, contentMd}),
      });
      const data: {message: string} = await res.json();
      setMsg(data.message);
      if(!res.ok) {
        setMsg("")
      }
    } catch(err) {
      setMsg("Something went wrong");
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
          value={contentMd}
          rows={10}
          onChange={e => setContentMd(e.target.value)}
        /><br/>

        <button type="submit">Submit</button>
      </form>

    {msg && <p>{msg}</p>}
    </div>
  );
}
