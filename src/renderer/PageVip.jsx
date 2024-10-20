import { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import Layout from './Layout';
import { UserContext } from './user-provider';

import VipBuyWCoinC from './VipBuyWCoinC';
import AccessDenied from './AccessDenied';
import './PageVip.scss';

export default function PageVip() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <AccessDenied />;
  }

  return (
    <Layout>
      <VipBuyWCoinC />
    </Layout>
  );
}
