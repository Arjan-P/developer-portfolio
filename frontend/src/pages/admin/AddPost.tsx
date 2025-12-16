// import { useState } from "react"
// export default function AddPost() {
//   const [title, setTitle] = useState("");
//   const [contentMd, setContentMd] = useState("");
//   const [msg, setMsg] = useState("");
//   const token = localStorage.getItem("token");

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/posts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `${token}`
//         },
//         body: JSON.stringify({title, contentMd}),
//       });
//       const data: {message: string} = await res.json();
//       setMsg(data.message);
//       if(!res.ok) {
//         setMsg("")
//       }
//     } catch(err) {
//       setMsg("Something went wrong");
//     }
//   }
  
//   return (
//     <div>
//       <h1>Add Article</h1>
//       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//         /><br/>

//         <textarea
//           placeholder="Content"
//           value={contentMd}
//           rows={10}
//           onChange={e => setContentMd(e.target.value)}
//         /><br/>

//         <button type="submit">Submit</button>
//       </form>

//     {msg && <p>{msg}</p>}
//     </div>
//   );
// }
import { useState } from 'react';

export default function UploadPost() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a markdown file');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    try {
      setLoading(true);
      setError(null);

      const res = await fetch('/api/posts/upload', {
        headers: {
          Authorization: `${token}`
        },
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      // optional: reset form
      setTitle('');
      setFile(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title input */}
      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full"
      />

      {/* File input */}
      <input
        type="file"
        accept=".md,text/markdown"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="block"
      />

      {/* Error */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-gray-asparagus-500 text-white"
      >
        {loading ? 'Uploading...' : 'Submit'}
      </button>
    </form>
  );
}

