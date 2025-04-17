import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{ 
        backgroundColor: '#282c34',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
        color: 'white',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: '20px' }}>IMPGD - Indian Medicinal Plants Genome Database</h1>
        <p style={{ marginBottom: '20px' }}>Welcome to the Indian Medicinal Plants Genome Database</p>
        <div style={{ 
          backgroundColor: '#61dafb',
          padding: '20px',
          borderRadius: '8px',
          color: '#282c34'
        }}>
          <p>If you can see this message, React is working correctly!</p>
        </div>
      </header>
    </div>
  );
}

export default App; 