import { Link } from 'react-router-dom';
import Layout from './Layout';

export default function AccessDenied() {
  return (
    <Layout>
      <h1>访问被拒绝</h1>
      <p>
        <Link to="/login">您必须登录才能查看此页面</Link>
      </p>
    </Layout>
  );
}
