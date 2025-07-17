import React from 'react';

function PageNotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ color: 'block' }}>404 - Page Not Found</h1>
      <img
        src="/Image/download.png"   // ✅ Correct path
        alt="404 Not Found"
        height={500}
        width={900}
      />
      <p style={{ fontSize: '18px', color: '#555' }}>
        The page you are looking for does not exist.
      </p>
    </div>
  );
}

export default PageNotFound;
