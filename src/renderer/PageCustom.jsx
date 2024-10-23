import { useContext, useEffect, useState } from 'react';
import { Alert, Col, Row, Tab, Tabs } from 'react-bootstrap';
import { getSomeJson, getWarehouseInfo } from './api';
import Layout from './Layout';
import ItemSocket from './ItemSocket';
import AccessDenied from './AccessDenied';
import { UserContext } from './user-provider';

export default function Custom() {
  const [key, setKey] = useState('高级镶嵌');
  const [muItems, setMuItems] = useState([]);
  const [warehouse, setWarehouse] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getSomeJson('mu-items').then(({ data }) => setMuItems(data));
    if (user) {
      getWarehouseInfo(user['memb___id']).then(({ data }) =>
        setWarehouse(data)
      );
    }
  }, [user]);

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
              <ItemSocket warehouse={warehouse} muItems={muItems} />
            </Tab>
            <Tab eventKey="物品进阶" title="物品进阶">
              <Alert>
                坐骑现在已经支持通过进阶宝石在游戏中进阶,不需要再网站进阶.
              </Alert>
              {/* <ItemStar warehouse={warehouse} muItems={muItems} /> */}
            </Tab>
          </Tabs>
        </Col>
      </Row>

      {/* <Tabs id="cube-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="socket" title="镶嵌">
          <Socket warehouse={warehouse} muItems={muItems} />
        </Tab>
        <Tab eventKey="enhance" title="强化">
          <Enhance warehouse={warehouse} muItems={muItems} />
        </Tab>
        <Tab eventKey="380" title="380">
          即将来临
        </Tab>
        <Tab eventKey="recycle" title="回收">
          <Recycle />
        </Tab>
        <Tab eventKey="wing" title="翅膀">
          <StoreWings warehouse={warehouse} muItems={muItems} />
        </Tab>
        <Tab eventKey="box" title="黄金宝箱">
          <StoreBox warehouse={warehouse} muItems={muItems} />
        </Tab>
      </Tabs> */}
      <hr />
    </Layout>
  );
}
