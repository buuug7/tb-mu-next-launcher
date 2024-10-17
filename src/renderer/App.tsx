import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Setting from './Setting';
import RegisterPage from './RegisterPage';
import WebSite from './WebSite';

import './App.scss';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/webpage" element={<WebSite />} />
      </Routes>
    </Router>
  );
}
