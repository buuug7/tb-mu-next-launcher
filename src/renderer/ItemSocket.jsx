import { useState, useEffect, useContext } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import ItemDisplay from './ItemDisplay';
import { UserContext } from './UserProvider';
import MySwal from './MySwal';
import {
  getMyData,
  getWarehouseInfo,
  getSomeJson,
  updateWarehouseFirstItem,
  itemCheckSocket,
} from './api';
import { getWareHouseItemByIndex, getItemSocketSlotCount } from '../util';
import useErrorHandler from './use-error-handle';
import { MuConfigContext } from './MuConfigProvider';

export default function ItemSocket({ muItems }) {
  const { muConfig } = useContext(MuConfigContext);
  const { user, notifyUserDataChange } = useContext(UserContext);
  const [warehouse, setWarehouse] = useState(null);
  const [item1, setItem1] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [socket1, setSocket1] = useState('FF');
  const [socket2, setSocket2] = useState('FF');
  const [socket3, setSocket3] = useState('FF');
  const [socket4, setSocket4] = useState('FF');
  const [socket5, setSocket5] = useState('FF');
  const [yg, setYg] = useState('F');
  const [socketItemProperties, setSocketItemProperties] = useState({
    puTongShuXing: [],
    yingGuangShuXing: [],
  });

  const errorHandler = useErrorHandler();

  const { puTongShuXing, yingGuangShuXing } = socketItemProperties;
  const JF = user['WCoinP'];

  useEffect(() => {
    getSomeJson('socket-item-properties-1').then(({ data }) =>
      setSocketItemProperties(data)
    );
  }, []);

  return (
    <div>
      <div className="w-100 bg-white p-3">
        <div>
          <Alert>
            <i>当前积分为 {user['WCoinP']}</i>,
            请将镶嵌物品放在仓库左上角第一格, 支持属性重复镶嵌, 最大镶嵌孔数 5
            个, 镶嵌的时候请确保物品有 5 个插槽, 可以用镶嵌宝石砸出 5
            个孔在镶嵌, 镶嵌费用为 {muConfig.socketNeedWcoin} 积分
          </Alert>
          {message && <Alert variant="danger">{message}</Alert>}
          <Button
            disabled={loading}
            variant="outline-primary"
            type="submit"
            onClick={() => {
              setLoading(true);
              setMessage('');
              getWarehouseInfo(user.id)
                .then(async ({ data: warehouseData }) => {
                  const Items = warehouseData.Items.toUpperCase();
                  const warehouseItem1 = getWareHouseItemByIndex(
                    Items,
                    0,
                    muItems
                  );
                  if (!warehouseItem1) {
                    setMessage(`当前仓库左上角没有物品`);
                    setLoading(false);
                    setWarehouse(null);
                    return;
                  }

                  const supported = await itemCheckSocket(
                    warehouseItem1.category,
                    warehouseItem1.index
                  );

                  if (!supported) {
                    setMessage(`不支持的物品!`);
                    setLoading(false);
                    setWarehouse(null);
                    return;
                  }

                  if (getItemSocketSlotCount(warehouseItem1.socketOption) < 5) {
                    setMessage(
                      `不满足镶嵌条件, 当前物品没有插槽或者插槽孔数小于 5 个!`
                    );
                    setLoading(false);
                    setWarehouse(null);
                    return;
                  }

                  setItem1(warehouseItem1);
                  setWarehouse(warehouseData);

                  // setYg(Items.charAt(21));
                  setSocket1(Items.substring(22, 24));
                  setSocket2(Items.substring(24, 26));
                  setSocket3(Items.substring(26, 28));
                  setSocket4(Items.substring(28, 30));
                  setSocket5(Items.substring(30, 32));

                  getMyData(user.id).then(notifyUserDataChange);
                })
                .catch(errorHandler)
                .finally(() => setLoading(false));
            }}
          >
            {loading ? 'loading...' : '检测物品'}
          </Button>

          {warehouse !== null && !loading && (
            <div className="socket">
              <div className="my-3">
                <ItemDisplay item={item1} />
              </div>
              <Form>
                <Form.Select
                  value={socket1}
                  onChange={(e) => {
                    setMessage('');
                    const value = e.target.value;
                    setSocket1(value);
                  }}
                >
                  {puTongShuXing.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.category} {item.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Select
                  value={socket2}
                  onChange={(e) => {
                    setMessage('');
                    const value = e.target.value;
                    setSocket2(value);
                  }}
                >
                  {puTongShuXing.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.category} {item.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Select
                  value={socket3}
                  onChange={(e) => {
                    setMessage('');
                    const value = e.target.value;
                    setSocket3(value);
                  }}
                >
                  {puTongShuXing.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.category} {item.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Select
                  value={socket4}
                  onChange={(e) => {
                    setMessage('');
                    const value = e.target.value;
                    setSocket4(value);
                  }}
                >
                  {puTongShuXing.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.category} {item.name}
                    </option>
                  ))}
                </Form.Select>

                <Form.Select
                  value={socket5}
                  onChange={(e) => {
                    setMessage('');
                    const value = e.target.value;
                    setSocket5(value);
                  }}
                >
                  {puTongShuXing.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.category} {item.name}
                    </option>
                  ))}
                </Form.Select>

                {/* <h6 className="my-2 text-center">荧光属性</h6>
                <Form.Select
                  value={yg}
                  onChange={(e) => {
                    setYg(e.target.value);
                  }}
                >
                  {yingGuangShuXing.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.category} {item.name}
                    </option>
                  ))}
                </Form.Select> */}

                <div className="mt-4">
                  <Button
                    disabled={loading}
                    variant="outline-primary"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();

                      if (!item1) {
                        setMessage(`未发现镶嵌的物品`);
                        return;
                      }

                      if (JF < muConfig.socketNeedWcoin) {
                        setMessage(
                          `镶嵌需要 ${muConfig.socketNeedWcoin} 积分,你当前的积分还不够.`
                        );
                        return;
                      }

                      MySwal.confirm(
                        `镶嵌要收取额外的 ${muConfig.socketNeedWcoin} 积分, 你同意吗?`
                      ).then((result) => {
                        if (!result.isConfirmed) {
                          return;
                        }

                        setLoading(true);
                        updateWarehouseFirstItem({
                          socket1,
                          socket2,
                          socket3,
                          socket4,
                          socket5,
                        })
                          .then(() => {
                            MySwal.message('成功镶嵌!');
                          })
                          .catch(errorHandler)
                          .finally(() => setLoading(false));
                      });
                    }}
                  >
                    {loading ? 'loading...' : '确认'}
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
