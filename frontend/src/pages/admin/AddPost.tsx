import { useState } from 'react';

export default function UploadPost() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<FileList | null>(null);
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
    formData.append('markdown', file);
    if (images) {

      for (const image of images) {
        formData.append('images', image);
        console.log(image.name, "added");
      }
    }

    try {
      setLoading(true);
      setError(null);

      console.log(formData);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/upload`, {
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
      {/* Image input */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setImages(e.target.files ?? null)}
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

