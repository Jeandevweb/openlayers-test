import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import LoginPage from './components/Login/LoginPage';





ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>} />   
      <Route path="/app" element={<App />} />         
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


