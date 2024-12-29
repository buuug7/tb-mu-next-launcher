import { useContext } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { MuConfigContext } from './MuConfigProvider';
import Layout from './Layout';
import MyCarouselBasic from './MyCarouselBasic';

import './PageCollections.scss';

export default function PageCollections() {
  const { muConfig } = useContext(MuConfigContext);
  const baseUrl = muConfig?.baseUrl;

  return (
    <Layout>
      <Tabs>
        <Tab eventKey="四代翅膀" title="四代翅膀">
          <h4 className="text-center mt-3">四代翅膀</h4>
          <p className="text-center text-secondary">
            四代翅膀支持成长属性, 进阶属性, 最大可以进阶 200 次
          </p>
          <div className="collectionContainer">
            {muConfig?.carousel?.wing4?.map((it) => (
              <MyCarouselBasic baseUrl={baseUrl} key={it.title} item={it} />
            ))}
          </div>
        </Tab>
        <Tab eventKey="坐骑" title="坐骑">
          <h4 className="text-center mt-3">坐骑</h4>
          <p className="text-center text-secondary">
            坐骑支持成长属性, 进阶属性, 最大可以进阶 100 次
          </p>
          <div className="collectionContainer">
            {muConfig?.carousel?.pet?.map((it) => (
              <MyCarouselBasic baseUrl={baseUrl} key={it.title} item={it} />
            ))}
          </div>
        </Tab>
        <Tab eventKey="VIP 翅膀" title="VIP 翅膀">
          <h4 className="text-center mt-3">VIP 翅膀</h4>
          <p className="text-center text-secondary">
            VIP 翅膀支持成长属性, 进阶属性, 最大可以进阶 250 次
          </p>
          <div className="collectionContainer">
            {muConfig?.carousel?.wing4Vip?.map((it) => (
              <MyCarouselBasic baseUrl={baseUrl} key={it.title} item={it} />
            ))}
          </div>
        </Tab>
        <Tab eventKey="VIP 坐骑" title="VIP 坐骑">
          <h4 className="text-center mt-3">VIP 坐骑</h4>
          <p className="text-center text-secondary">
            VIP 坐骑支持成长属性, 进阶属性, 最大可以进阶 200 次
          </p>
          <div className="collectionContainer">
            {muConfig?.carousel?.petVip?.map((it) => (
              <MyCarouselBasic baseUrl={baseUrl} key={it.title} item={it} />
            ))}
          </div>
        </Tab>
        <Tab eventKey="VIP 时装" title="VIP 时装">
          <h4 className="text-center mt-3">VIP 时装</h4>
          <p className="text-center text-secondary">
            VIP 时装支持成长属性，进阶属性， 最大可以进阶 50 次
          </p>
          <div className="collectionContainer">
            {muConfig?.carousel?.clothingVip?.map((it) => (
              <MyCarouselBasic baseUrl={baseUrl} key={it.title} item={it} />
            ))}
          </div>
        </Tab>
      </Tabs>
    </Layout>
  );
}
