import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function Workers() {
  const [workers, setWorkers] = useState([]);
  const [name, setName] = useState('');
  const [skill, setSkill] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const loadWorkers = async () => {
      const snap = await getDocs(collection(db, 'workers'));
      setWorkers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    loadWorkers();
  }, []);

  const addWorker = async () => {
    if (!name || !skill) return;
    await addDoc(collection(db, 'workers'), {
      name, skill, phone,
      date: new Date().toISOString()
    });
    setName('');
    setSkill('');
    setPhone('');
    alert('Worker Added! ✅');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>👷 Workers</h1>

      <div style={{ background: '#f0f9f0', padding: '20px',
        borderRadius: '10px', marginBottom: '20px' }}>
        <h2>Add Worker Profile</h2>
        <input value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Worker name"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input value={skill}
          onChange={e => setSkill(e.target.value)}
          placeholder="Skill (e.g. Rice harvesting)"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone number"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button onClick={addWorker}
          style={{ background: '#2d6a4f', color: 'white',
            padding: '10px 20px', border: 'none',
            borderRadius: '5px', cursor: 'pointer' }}>
          Add Worker 👷
        </button>
      </div>

      <h2>Available Workers ({workers.length})</h2>
      {workers.length === 0 && <p>No workers yet!</p>}
      {workers.map(w => (
        <div key={w.id} style={{ background: 'white', padding: '15px',
          borderRadius: '10px', marginBottom: '10px',
          border: '1px solid #ddd' }}>
          <h3>👤 {w.name}</h3>
          <p>🛠️ Skill: {w.skill}</p>
          <p>📞 Phone: {w.phone}</p>
        </div>
      ))}
    </div>
  );
}