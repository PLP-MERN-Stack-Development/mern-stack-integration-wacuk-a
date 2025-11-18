import React from 'react';

const About = () => {
  const teamMembers = [
    {
      name: 'Dr. Wanjiku Mwangi',
      role: 'Clinical Psychologist',
      bio: 'Specialized in trauma counseling for GBV survivors with 15 years experience.',
      focus: 'Mental Health Support'
    },
    {
      name: 'Advocate James Omondi',
      role: 'Legal Expert',
      bio: 'Provides pro-bono legal services to domestic violence survivors across Kenya.',
      focus: 'Legal Assistance'
    },
    {
      name: 'Sarah Akinyi',
      role: 'Survivor Advocate',
      bio: 'Uses her lived experience to support other survivors in their healing journey.',
      focus: 'Peer Support'
    },
    {
      name: 'Dr. Amina Hassan',
      role: 'Medical Director',
      bio: 'Leads medical services for GBV survivors at Nairobi Women\'s Hospital.',
      focus: 'Healthcare'
    }
  ];

  const statistics = [
    { number: '45%', label: 'of Kenyan women experience GBV' },
    { number: '1 in 4', label: 'girls experience sexual violence' },
    { number: '70%', label: 'of cases go unreported' },
    { number: '1195', label: 'National GBV Hotline' }
  ];

  return (
    <div className="container">
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        borderRadius: '10px',
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          🛡️ About SafeSpace Kenya
        </h1>
        <p style={{ fontSize: '1.3rem', opacity: 0.9 }}>
          Creating a safe digital platform for domestic violence survivors across Kenya
        </p>
      </section>

      {/* Mission Section */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="card">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <div>
              <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>Our Mission</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#5d6d7e' }}>
                SafeSpace Kenya is dedicated to breaking the silence around domestic violence 
                by providing a secure platform for survivors to share their stories, access 
                vital resources, and connect with support services across all 47 counties.
              </p>
            </div>
            <div>
              <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>Our Vision</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#5d6d7e' }}>
                A Kenya where every survivor of domestic violence has immediate access to 
                comprehensive support, legal protection, and a community that believes and 
                supports them in their journey to healing and justice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '3rem' }}>
          The Reality in Kenya
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          textAlign: 'center'
        }}>
          {statistics.map((stat, index) => (
            <div key={index} className="card">
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold', 
                color: '#e74c3c',
                marginBottom: '0.5rem'
              }}>
                {stat.number}
              </div>
              <div style={{ color: '#5d6d7e' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What We Offer */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '3rem' }}>
          What We Provide
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          <div className="card">
            <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>📖</div>
            <h3 style={{ textAlign: 'center', color: '#2c3e50' }}>Story Sharing</h3>
            <p style={{ textAlign: 'center', color: '#5d6d7e' }}>
              A safe, anonymous platform for survivors to share experiences and break the isolation.
            </p>
          </div>
          
          <div className="card">
            <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>🆘</div>
            <h3 style={{ textAlign: 'center', color: '#2c3e50' }}>Emergency Resources</h3>
            <p style={{ textAlign: 'center', color: '#5d6d7e' }}>
              Immediate access to helplines, shelters, legal aid, and medical services across Kenya.
            </p>
          </div>
          
          <div className="card">
            <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>💙</div>
            <h3 style={{ textAlign: 'center', color: '#2c3e50' }}>Community Support</h3>
            <p style={{ textAlign: 'center', color: '#5d6d7e' }}>
              Building a supportive community of survivors, advocates, and professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '3rem' }}>
          Our Team & Partners
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {teamMembers.map((member, index) => (
            <div key={index} className="card">
              <div style={{ 
                width: '80px', 
                height: '80px', 
                backgroundColor: '#e74c3c',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2rem',
                marginBottom: '1rem'
              }}>
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>{member.name}</h3>
              <div style={{ 
                backgroundColor: '#3498db',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                display: 'inline-block',
                marginBottom: '0.5rem'
              }}>
                {member.role}
              </div>
              <p style={{ color: '#5d6d7e', marginBottom: '1rem' }}>{member.bio}</p>
              <div style={{ 
                backgroundColor: '#ecf0f1',
                color: '#2c3e50',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                display: 'inline-block'
              }}>
                {member.focus}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '2rem' }}>
          Our Partners
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          textAlign: 'center'
        }}>
          <div className="card">
            <h4 style={{ color: '#2c3e50' }}>Ministry of Public Service, Gender and Affirmative Action</h4>
          </div>
          <div className="card">
            <h4 style={{ color: '#2c3e50' }}>Nairobi Women's Hospital</h4>
          </div>
          <div className="card">
            <h4 style={{ color: '#2c3e50' }}>FIDA Kenya</h4>
          </div>
          <div className="card">
            <h4 style={{ color: '#2c3e50' }}>Childline Kenya</h4>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ 
        backgroundColor: '#e8f4fd',
        border: '1px solid #b3d9ff',
        borderRadius: '10px',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#2980b9', marginBottom: '1rem' }}>
          Join Us in Making a Difference
        </h2>
        <p style={{ color: '#3498db', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Whether you're a survivor, advocate, healthcare professional, or concerned citizen, 
          there are many ways to support our mission.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn" style={{ backgroundColor: '#e74c3c', color: 'white' }}>
            Volunteer with Us
          </button>
          <button className="btn" style={{ backgroundColor: '#3498db', color: 'white' }}>
            Partner with Us
          </button>
          <button className="btn" style={{ backgroundColor: '#27ae60', color: 'white' }}>
            Donate to Support
          </button>
        </div>
      </section>

      {/* Confidentiality Notice */}
      <section style={{ 
        backgroundColor: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderRadius: '8px',
        padding: '2rem',
        marginTop: '3rem',
        textAlign: 'center'
      }}>
        <h4 style={{ color: '#856404', marginBottom: '1rem' }}>🔒 Confidentiality & Safety</h4>
        <p style={{ color: '#856404', margin: 0 }}>
          All stories shared on SafeSpace Kenya are treated with utmost confidentiality. 
          We employ strict data protection measures and never share personal information without explicit consent.
        </p>
      </section>
    </div>
  );
};

export default About;
