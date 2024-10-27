import { useContext, useEffect, useState } from 'react';
import { Alert, Col, Row, Tab, Tabs } from 'react-bootstrap';
import { getSomeJson } from './api';
import Layout from './Layout';
import ItemSocket from './ItemSocket';
import AccessDenied from './AccessDenied';
import { UserContext } from './UserProvider';

export default function PageCustom() {
  const [key, setKey] = useState('高级镶嵌');
  const [muItems, setMuItems] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getSomeJson('mu-items').then(({ data }) => setMuItems(data));
  }, []);

  if (!user) {
    return <AccessDenied />;
  }
  return (
    <Layout>
      <Row className="mb-3">
        <Col lg={6}>
          <Tabs
            id="cube-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="高级镶嵌" title="高级镶嵌">
              <ItemSocket muItems={muItems} />
            </Tab>
            <Tab eventKey="物品进阶" title="物品进阶">
              <Alert>
                坐骑现在已经支持通过进阶宝石在游戏中进阶,不需要再网站进阶.
              </Alert>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Layout>
  );
}
