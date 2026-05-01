import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Profile() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('farmer');
  const [location, setLocation] = useState('');
  const [saved, setSaved] = useState(false);

  const saveProfile = async () => {
    if (!name || !phone) return;
    await addDoc(collection(db, 'profiles'), {
      name, phone, type, location,
      date: new Date().toISOString()
    });
    setSaved(true);
  };

  return (
    <div style={{ padding: '20px',
      maxWidth: '600px', margin: '0 auto' }}>
      <h1>👤 My Profile</h1>

      {saved && (
        <div style={{ background: '#d4edda',
          padding: '10px', borderRadius: '8px',
          marginBottom: '15px', color: '#155724' }}>
          ✅ Profile Saved Successfully!
        </div>
      )}

      <div style={{ background: '#f0f9f0',
        padding: '20px', borderRadius: '10px' }}>

        <h2>Profile Setup</h2>

        {/* Name */}
        <input value={name}
          onChange={e => setName(e.target.value)}
          placeholder="உங்கள் பெயர்"
          style={{ width: '100%', padding: '10px',
            marginBottom: '10px', borderRadius: '5px',
            border: '1px solid #ddd' }}
        />

        {/* Phone */}
        <input value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone number"
          style={{ width: '100%', padding: '10px',
            marginBottom: '10px', borderRadius: '5px',
            border: '1px solid #ddd' }}
        />

        {/* Location */}
        <input value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Location (e.g. Madurai)"
          style={{ width: '100%', padding: '10px',
            marginBottom: '10px', borderRadius: '5px',
            border: '1px solid #ddd' }}
        />

        {/* Type */}
        <select value={type}
          onChange={e => setType(e.target.value)}
          style={{ width: '100%', padding: '10px',
            marginBottom: '15px', borderRadius: '5px',
            border: '1px solid #ddd' }}>
          <option value="farmer">🌾 Farmer</option>
          <option value="worker">👷 Worker</option>
        </select>

        <button onClick={saveProfile}
          style={{ background: '#2d6a4f',
            color: 'white', padding: '10px 20px',
            border: 'none', borderRadius: '5px',
            cursor: 'pointer', width: '100%' }}>
          Save Profile 💾
        </button>
      </div>
    </div>
  );
}