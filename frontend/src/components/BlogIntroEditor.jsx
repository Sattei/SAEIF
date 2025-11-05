import React, { useEffect, useState } from 'react';

const API = process.env.REACT_APP_API || '';

const BlogIntroEditor = () => {
  const [intro, setIntro] = useState('');
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchIntro = async () => {
      setLoading(true);
      const res = await fetch(`${API}/api/blogpagecontent`);
      const data = await res.json();
      if (data) {
        setIntro(data.intro || '');
        setId(data._id);
      }
      setLoading(false);
    };
    fetchIntro();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let res;
      if (id) {
        res = await fetch(`${API}/api/blogpagecontent/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ intro })
        });
      } else {
        res = await fetch(`${API}/api/blogpagecontent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ intro })
        });
      }
      if (!res.ok) throw new Error('Failed to save intro');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Blog Page Intro</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={intro}
          onChange={e => setIntro(e.target.value)}
          className="border p-2 rounded w-full"
          rows={3}
          placeholder="Enter blog page intro/description..."
        />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded mt-2">Save Intro</button>
      </form>
      {error && <div className="text-red-500">{error}</div>}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default BlogIntroEditor;