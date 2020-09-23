import React from 'react'

const Loader = (props) => {
  const loaderStyle = {
    padding: 0,
    margin: 0,
    minHeight: '100vh',
    minWidth: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
  return (
    <div className="d-flex justify-content-center bg-dark" style={loaderStyle}>
      <div className="spinner-border text-primary" style={{ width: '9rem', height: '9rem' }} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;