import React from 'react';

const EmergencyBanner = () => {
  const emergencyNumbers = [
    { name: 'National GBV Hotline', number: '1195' },
    { name: 'Childline Kenya', number: '116' },
    { name: 'Police Emergency', number: '999' }
  ];

  return (
    <div style={{
      backgroundColor: '#dc3545',
      color: 'white',
      padding: '0.5rem 0',
      textAlign: 'center',
      fontSize: '0.9rem'
    }}>
      <div className="container">
        <strong>🚨 EMERGENCY CONTACTS: </strong>
        {emergencyNumbers.map((contact, index) => (
          <span key={contact.number} style={{ margin: '0 1rem' }}>
            {contact.name}: <strong>{contact.number}</strong>
            {index < emergencyNumbers.length - 1 && ' •'}
          </span>
        ))}
        <span style={{ marginLeft: '1rem' }}>
          📍 Available 24/7 across Kenya
        </span>
      </div>
    </div>
  );
};

export default EmergencyBanner;
