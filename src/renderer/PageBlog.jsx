import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { getPosts } from './api';
import Layout from './Layout';
import Post from './Post';

import './PageBlog.scss';
import './markdown.custom.scss';
import IconMenu from './icons/IconMenu';

export default function PageBlog() {
  const paddingRight = '225px';

  const [posts, setPosts] = useState([]);
  const [displayMenu, setDisplayMenu] = useState(true);
  const [blogPostLeft, setBlogPostLeft] = useState({
    paddingRight,
  });

  useEffect(() => {
    getPosts().then(({ data }) => {
      setPosts(data);
    });
  }, []);

  const { posts1 = [], posts2 = [] } = posts;

  const ToggleMenu = (
    <div
      title="显示或者隐藏右侧菜单"
      className="blogMenu"
      onClick={() => {
        setDisplayMenu((before) => {
          const after = !before;

          setBlogPostLeft({
            paddingRight: after ? paddingRight : '0px',
          });

          return after;
        });
      }}
    >
      <IconMenu />
    </div>
  );

  return (
    <Layout>
      <div className="blogPost">
        {ToggleMenu}
        <div className="blogPostLeft" style={blogPostLeft}>
          <Outlet context={posts1} />
        </div>
        {displayMenu && (
          <div className="blogPostRight">
            <h5>小猪相关</h5>
            <ul>
              {posts1.map((item) => (
                <li key={item}>
                  <Link to={`/blog/${item}`}>{item}</Link>
                </li>
              ))}
            </ul>
            <h5>其他资料</h5>
            <ul>
              {posts2.map((item) => (
                <li key={item}>
                  <Link to={`/blog/${item}`}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
}
