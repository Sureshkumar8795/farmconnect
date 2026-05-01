import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('time')
    );
    const unsub = onSnapshot(q, snap => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const sendMessage = async () => {
    if (!text || !name) return;
    await addDoc(collection(db, 'messages'), {
      text,
      name,
      time: Date.now()
    });
    setText('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>💬 FarmConnect Chat</h1>

      {/* Name Input */}
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="உங்கள் பெயர் போடுங்க"
        style={{ width: '100%', padding: '10px',
          marginBottom: '10px', borderRadius: '5px',
          border: '1px solid #ddd' }}
      />

      {/* Messages */}
      <div style={{ background: '#f9f9f9', padding: '15px',
        borderRadius: '10px', height: '350px',
        overflowY: 'auto', marginBottom: '10px' }}>
        {messages.length === 0 &&
          <p style={{ color: '#aaa' }}>No messages yet... Say Hi! 👋</p>}
        {messages.map(m => (
          <div key={m.id} style={{ background: 'white',
            padding: '10px', borderRadius: '8px',
            marginBottom: '8px', border: '1px solid #eee' }}>
            <strong style={{ color: '#2d6a4f' }}>👤 {m.name}</strong>
            <p style={{ margin: '4px 0' }}>{m.text}</p>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && sendMessage()}
          placeholder="Message type பண்ணுங்க..."
          style={{ flex: 1, padding: '10px',
            borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <button onClick={sendMessage}
          style={{ background: '#2d6a4f', color: 'white',
            padding: '10px 20px', border: 'none',
            borderRadius: '5px', cursor: 'pointer' }}>
          Send 📤
        </button>
      </div>
    </div>
  );
}