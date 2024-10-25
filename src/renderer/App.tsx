import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import Setting from './Setting';
import WebSite from './WebSite';

import PageIndex from './PageIndex';
import PageRegister from './PageRegister';
import PageLogin from './PageLogin';
import PageAccount from './PageAccount';
import PageRank from './PageRank';
import PageVip from './PageVip';
import PageCharacters from './PageCharacters';
import Custom from './PageCustom';
import './App.scss';
import UserProvider from './UserProvider';
import MuConfigProvider from './MuConfigProvider';
import MessageProvider from './MessageProvider';

export default function App() {
  return (
    <MuConfigProvider>
      <MessageProvider>
        <UserProvider>
          <Router>
            <Routes>
              <Route path="/" element={<PageIndex />} />
              <Route path="/register" element={<PageRegister />} />
              <Route path="/login" element={<PageLogin />} />
              <Route path="/account" element={<PageAccount />} />
              <Route path="/rank" element={<PageRank />} />
              <Route path="/vip" element={<PageVip />} />
              <Route path="/characters" element={<PageCharacters />} />
              <Route path="/custom" element={<Custom />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/webpage" element={<WebSite />} />
            </Routes>
          </Router>
        </UserProvider>
      </MessageProvider>
    </MuConfigProvider>
  );
}
