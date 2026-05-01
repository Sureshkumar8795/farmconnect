import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState('');
  const [wage, setWage] = useState('');
  const [location, setLocation] = useState('');
  const [search, setSearch] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

  useEffect(() => {
    const loadJobs = async () => {
      const snap = await getDocs(collection(db, 'jobs'));
      setJobs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    loadJobs();
  }, []);

  const postJob = async () => {
    if (!title || !wage) return;
    await addDoc(collection(db, 'jobs'), {
      title, wage, location,
      date: new Date().toISOString()
    });
    setTitle('');
    setWage('');
    setLocation('');
    alert('Job Posted! ✅');
  };

  // Search & Filter Logic
  const filtered = jobs.filter(j => {
    const matchSearch = j.title.toLowerCase()
      .includes(search.toLowerCase());
    const matchLocation = j.location.toLowerCase()
      .includes(filterLocation.toLowerCase());
    return matchSearch && matchLocation;
  });

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🌾 FarmConnect Jobs</h1>

      {/* Post Job Form */}
      <div style={{ background: '#f0f9f0', padding: '20px',
        borderRadius: '10px', marginBottom: '20px' }}>
        <h2>Post a Job</h2>
        <input value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Job title (e.g. Rice harvesting)"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input value={wage}
          onChange={e => setWage(e.target.value)}
          placeholder="Daily wage (e.g. ₹500)"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Location (e.g. Madurai)"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button onClick={postJob}
          style={{ background: '#2d6a4f', color: 'white',
            padding: '10px 20px', border: 'none',
            borderRadius: '5px', cursor: 'pointer' }}>
          Post Job 🌾
        </button>
      </div>

      {/* Search & Filter */}
      <div style={{ background: '#fff3e0', padding: '15px',
        borderRadius: '10px', marginBottom: '20px' }}>
        <h3>🔍 Search Jobs</h3>
        <input value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Job title search பண்ணு..."
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input value={filterLocation}
          onChange={e => setFilterLocation(e.target.value)}
          placeholder="Location filter பண்ணு..."
          style={{ width: '100%', padding: '10px' }}
        />
      </div>

      {/* Jobs List */}
      <h2>Available Jobs ({filtered.length})</h2>
      {filtered.length === 0 && <p>No jobs found! 🔍</p>}
      {filtered.map(j => (
        <div key={j.id} style={{ background: 'white',
          padding: '15px', borderRadius: '10px',
          marginBottom: '10px', border: '1px solid #ddd' }}>
          <h3>🌱 {j.title}</h3>
          <p>💰 Wage: {j.wage}</p>
          <p>📍 Location: {j.location}</p>
        </div>
      ))}
    </div>
  );
}