import React from 'react';

const Resources = () => {
  const emergencyContacts = [
    {
      name: 'National GBV Hotline',
      number: '1195',
      description: '24/7 support for gender-based violence',
      type: 'hotline'
    },
    {
      name: 'Police Emergency',
      number: '999',
      description: 'Immediate police response',
      type: 'police'
    },
    {
      name: 'Childline Kenya',
      number: '116',
      description: 'Free help for children in need',
      type: 'child'
    }
  ];

  return (
    <div className="container">
      <section style={{ 
        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
        color: 'white',
        padding: '3rem 2rem',
        borderRadius: '10px',
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          🚨 Emergency Resources
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
          Immediate help available 24/7 across Kenya
        </p>
      </section>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '3rem'
      }}>
        {emergencyContacts.map(contact => (
          <div key={contact.number} className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              {contact.type === 'hotline' && '📞'}
              {contact.type === 'police' && '🚓'}
              {contact.type === 'child' && '👶'}
            </div>
            <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>
              {contact.name}
            </h3>
            <div style={{ 
              fontSize: '1.8rem', 
              fontWeight: 'bold',
              color: '#e74c3c',
              marginBottom: '0.5rem'
            }}>
              {contact.number}
            </div>
            <p style={{ color: '#666' }}>
              {contact.description}
            </p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 style={{ color: '#2c3e50', marginBottom: '1rem', textAlign: 'center' }}>
          Support Organizations
        </h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
            <h4>Gender Violence Recovery Centre</h4>
            <p>Nairobi Women's Hospital - 0722 203 333</p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
            <h4>FIDA Kenya</h4>
            <p>Legal aid for women - 0722 200 001</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
