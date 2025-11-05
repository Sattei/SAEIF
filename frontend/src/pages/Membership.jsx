import React, { useState } from "react";

const Membership = () => {
  const [form, setForm] = useState({ name: "", email: "", plan: "Basic" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch("http://localhost:5000/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("Membership request submitted!");
        setForm({ name: "", email: "", plan: "Basic" });
      } else {
        setStatus("Failed to submit membership.");
      }
    } catch {
      setStatus("Failed to submit membership.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Membership</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 w-full max-w-lg">
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Name</label>
          <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Plan</label>
          <select name="plan" value={form.plan} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
        <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded font-semibold" disabled={loading}>
          {loading ? "Submitting..." : "Join"}
        </button>
        {status && <div className="mt-4 text-center text-green-600">{status}</div>}
      </form>
    </div>
  );
};

export default Membership; 