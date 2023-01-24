import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar'
import { Main } from './pages/main/Main';
import { Login } from './pages/Login';
import { CreatePost } from './pages/createPost/CreatePost';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<CreatePost />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
