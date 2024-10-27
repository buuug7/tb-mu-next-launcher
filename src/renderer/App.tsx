import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import WebSite from './WebSite';
import PageIndex from './PageIndex';
import PageRegister from './PageRegister';
import PageLogin from './PageLogin';
import PageAccount from './PageAccount';
import PageRank from './PageRank';
import PageVip from './PageVip';
import PageCharacters from './PageCharacters';
import PageCustom from './PageCustom';
import PageSetting from './PageSetting';
import PageBlog from './PageBlog';
import Post from './Post';
import UserProvider from './UserProvider';
import MuConfigProvider from './MuConfigProvider';
import MessageProvider from './MessageProvider';

import './App.scss';

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
              <Route path="/custom" element={<PageCustom />} />
              <Route path="/setting" element={<PageSetting />} />
              <Route path="/blog" element={<PageBlog />}>
                <Route index element={<Post />} />
                <Route path="/blog/:slug" element={<Post />} />
              </Route>
              <Route path="/webpage" element={<WebSite />} />
            </Routes>
          </Router>
        </UserProvider>
      </MessageProvider>
    </MuConfigProvider>
  );
}
