import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import Setting from './Setting';
import WebSite from './WebSite';

import PageIndex from './PageIndex';
import PageRegister from './PageRegister';
import PageLogin from './PageLogin';
import PageAccount from './PageAccount';
import PageRank from './PageRank';

import UserProvider from './user-provider';

import './App.scss';

export default function App() {
  return (
    <div>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<PageIndex />} />
            <Route path="/register" element={<PageRegister />} />
            <Route path="/login" element={<PageLogin />} />
            <Route path="/account" element={<PageAccount />} />
            <Route path="/rank" element={<PageRank />} />

            <Route path="/setting" element={<Setting />} />
            <Route path="/webpage" element={<WebSite />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}
