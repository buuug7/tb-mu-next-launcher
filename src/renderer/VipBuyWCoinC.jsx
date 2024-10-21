/* eslint-disable no-restricted-globals */

import dayjs from 'dayjs';
import { useContext, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { VIP_BUY_TYPE, VIPS } from '../config';
import { getUserVipRemainingJF, getVipItem, humanNumber } from '../util';
import { UserContext } from './user-provider';
import { buyVip, cancelVip } from './api';

export default function VipBuyWCoinC() {
  const { updateMessage, user, notifyUserDataChange } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [vip, setVip] = useState(getVipItem(user));
  const [buyType, setBuyType] = useState(VIP_BUY_TYPE[1]);

  const JF = user['WCoinP'];
  const YB = user['WCoinC'];

  console.log(`users`, user);

  return (
    <div className="VipBuy p-3 bg-white">
      <Alert>
        你好 <i>{user['id']}</i>, 当前积分 <i>{JF}</i>, 当前元宝 <i>{YB}</i>,
        你的会员信息为 <b>{getVipItem(user)?.name}</b>, 到期时间{' '}
        <i>{dayjs(user['AccountExpireDate']).format('YYYY/MM/DD HH:mm')}</i>,
        VIP 购买后支持取消, 不过元宝只返还剩余时间一半价格的元宝.
      </Alert>

      <div className="mb-2 vipContainer">
        {VIPS.map((item) => (
          <div
            className={`vipCard bg-white shadow-sm ${
              item.id === vip.id ? 'checked' : ''
            }`}
            key={item.id}
            onClick={() => {
              setVip(item);
            }}
          >
            {item.id === vip.id && <div className="ribbon">{item.name}</div>}
            <div className="text-center">
              <img
                src={`my-res://asserts/vips/${item.id}.jpg`}
                width="100"
                height="100"
                alt={`vipsIcons-${item.id}`}
              />
            </div>
            <h5 className="text-center text-danger mb-3">{item.name}</h5>
            <div>
              <div className="vipItem">
                <span>生命值</span>
                <span className="vipItemValue text-primary">+{item.life}%</span>
              </div>
              <div className="vipItem">
                <span>攻击力</span>
                <span className="vipItemValue text-primary">
                  +{item.damage}%
                </span>
              </div>
              <div className="vipItem">
                <span>经验</span>
                <span className="vipItemValue text-primary">+{item.exp}%</span>
              </div>
              <div className="vipItem">
                <span>掉率</span>
                <span className="vipItemValue text-primary">+{item.drop}%</span>
              </div>
              <div className="vipItem">
                <span>玛雅合成</span>
                <span className="vipItemValue text-primary">
                  +{item.chaosMix}%
                </span>
              </div>
              <div className="vipItem">
                <span title="宝石成功率指的是祝福,灵魂,生命,再生,进化宝石,进阶宝石">
                  宝石成功率
                </span>
                <span className="vipItemValue text-primary">
                  +{item.jewelRate}%
                </span>
              </div>
              <div className="vipItem">
                <span>连击概率</span>
                <span className="vipItemValue text-primary">
                  +{item.comboRate}%
                </span>
              </div>
              <div className="vipItem">
                <span>仓库数量</span>
                <span className="vipItemValue text-primary">
                  +{item.warehouseNum}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 mb-1 d-flex">
        <div className="me-2">购买时长:</div>
        <div>
          {VIP_BUY_TYPE.map((item) => (
            <Form.Check
              inline
              name="buyType"
              type="radio"
              label={item.name}
              key={item.days}
              value={item.days}
              checked={buyType.days === item.days}
              onChange={() => {
                setBuyType(item);
              }}
            />
          ))}
        </div>
      </div>

      <div>
        <p>
          所需元宝 <i>{humanNumber(vip.pricePerDay * buyType.days)}</i>
        </p>
      </div>

      <div>
        <Button
          className="me-1"
          variant="outline-primary"
          disabled={loading}
          onClick={() => {
            const cost = vip.pricePerDay * buyType.days;
            const AccountLevel = user['AccountLevel'];
            const vipItem = VIPS.find((it) => it.id === AccountLevel);

            if (AccountLevel > 0) {
              alert(
                `您已经是 ${vipItem.name}, 不能重复购买, 如果要更换, 请先退订会员!`
              );
              return;
            }

            const confirmFn = confirm(
              `你正在购买 ${vip.name}, 购买方式为 ${buyType.name}, 需要 ${cost} 元宝, 你同意吗?`
            );

            if (!confirmFn) {
              return;
            }

            if (YB - cost < 0) {
              alert(`当前用户元宝不够`);
              return;
            }

            setLoading(true);

            buyVip(user.memb___id, {
              vipId: vip.id,
              name: buyType.name,
              days: buyType.days,
            })
              .then((r) => {
                alert('购买成功');
                notifyUserDataChange();
              })
              .catch((err) => {
                console.log(err);
                updateMessage(err.response.data.message);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          {loading ? 'Loading' : '购买会员'}
        </Button>

        <Button
          variant="link"
          disabled={loading}
          onClick={() => {
            const AccountLevel = user['AccountLevel'];
            const vipItem = VIPS.find((it) => it.id === AccountLevel);

            if (AccountLevel <= 0) {
              alert(`你貌似没有购买会员`);
              return;
            }

            const backJF = getUserVipRemainingJF(user);

            const confirmFn = confirm(
              `你当前的会员是 ${vipItem.name}, 退订会员将会返还剩余时间一半的元宝, 退还 ${backJF} 元宝, 你同意吗?`
            );

            if (!confirmFn) {
              return;
            }

            setLoading(true);

            cancelVip(user.memb___id)
              .then(({ data }) => {
                alert('退订会员成功');
                notifyUserDataChange();
              })
              .catch((err) => {
                console.log(err);
                updateMessage(err.response.data.message);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          {loading ? 'Loading' : '退订会员'}
        </Button>
      </div>
    </div>
  );
}
