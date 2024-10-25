/* eslint-disable @typescript-eslint/no-use-before-define */

import { useEffect, useState } from 'react';
import { getSocketPropertyByValue } from '../util';
import { getSomeJson } from './api';

import './ItemDisplay.scss';

function getExtendItemDisplay(extendInfo) {
  return `【${extendInfo.stars || 0}阶】`;
}

export default function ItemDisplay({
  item,
  width = '250px',
  extendInfo = {},
}) {
  const [socketPropertiesArr, setSocketPropertiesArr] = useState([]);

  useEffect(() => {
    getSomeJson('socket-item-properties-1').then(({ data }) => {
      setSocketPropertiesArr(data.puTongShuXing);
    });
  }, []);

  const socketOption = item.socketOption.map((it, index) => {
    return {
      name: getSocketPropertyByValue(socketPropertiesArr, it)?.name,
      index,
    };
  });

  return (
    <div className="ItemDisplay bg-light" style={{ width: width }}>
      <div className="item name">
        {item?.name}+{item.level} {getExtendItemDisplay(extendInfo)}
      </div>
      <div className="item">附加技能 {item.option2}</div>
      {item.option1 === 1 && (
        <>
          <div className="item">幸运(灵魂宝石之成功几率 +25%)</div>
          <div className="item">幸运(会心一击几率 +5%)</div>
        </>
      )}
      <div className="item">追加攻击力 +{item.option3 * 4}</div>
      {getNewOptionText(item.newOption).map((it) => (
        <div className="item" key={it}>
          {it}
        </div>
      ))}

      <div className="item socketTitle">镶宝 物品属性信息</div>
      {socketOption.map((it) => (
        <div className="item socketItem" key={it.index}>
          {it.name}
        </div>
      ))}
    </div>
  );
}

function getNewOptionText(newOption) {
  let rs = [];
  switch (newOption) {
    case 1:
      rs = ['杀死怪物获得魔法+/8'];
      break;
    case 2:
      rs = ['死怪物获得生命+/8'];
      break;
    case 3:
      rs = ['杀死怪物获得魔法+/8', '杀死怪物获得生命+/8'];
      break;
    case 4:
      rs = ['攻击（魔法）速度加+7'];
      break;
    case 5:
      rs = ['攻击（魔法）速度加+7', '杀死怪物获得魔法/8'];
      break;
    case 6:
      rs = ['攻击（魔法）速度加+7', '杀死怪物获得生命/8'];
      break;
    case 7:
      rs = ['攻击（魔法）速度加+7', '杀死怪物获得生命/8', '死怪物获得魔法/8'];
      break;
    case 8:
      rs = ['攻击力增加+2%'];
      break;
    case 9:
      rs = ['攻击力增加+2%', '杀死怪物获得魔法/8'];
      break;
    case 10:
      rs = ['攻击力增加+2%', '杀死怪物获得生命/8'];
      break;
    case 11:
      rs = ['攻击力增加+2%', '杀死怪物获得生命/8', '死怪物获得魔法/8'];
      break;
    case 12:
      rs = ['攻击力增加+2%', '攻击（魔法）速度加+7'];
      break;
    case 13:
      rs = ['攻击力增加+2%', '攻击（魔法）速度加+7', '杀死怪物获得魔法/8'];
      break;
    case 14:
      rs = ['攻击力增加+2%', '攻击（魔法）速度加+7', '杀死怪物获得生命/8'];
      break;
    case 15:
      rs = [
        '攻击力增加+2%',
        '攻击（魔法）速度加+7',
        '杀死怪物获得生命/8',
        '杀死怪物获得魔法/8',
      ];
      break;
    case 16:
      rs = ['攻击力增加等级/20'];
      break;
    case 17:
      rs = ['攻击力增加等级/20', '杀死怪物获得魔法/8'];
      break;
    case 18:
      rs = ['攻击力增加等级/20', '杀死怪物获得生命/8'];
      break;
    case 19:
      rs = ['攻击力增加等级/20', '杀死怪物获得生命/8', '杀死怪物获得魔法/8'];
      break;
    case 20:
      rs = ['攻击力增加等级/20', '攻击（魔法）速度加+7'];
      break;
    case 21:
      rs = ['攻击力增加等级/20', '攻击（魔法）速度加+7', '杀死怪物获得魔法/8'];
      break;
    case 22:
      rs = ['攻击力增加等级/20', '攻击（魔法）速度加+7', '杀死怪物获得生命/8'];
      break;
    case 23:
      rs = [
        '攻击力增加等级/20',
        '攻击（魔法）速度加+7',
        '杀死怪物获得生命/8',
        '杀死怪物获得魔法/8',
      ];
      break;
    case 24:
      rs = ['攻击力增加等级/20', '攻击力增加+2'];
      break;
    case 25:
      rs = ['攻击力增加等级/20', '攻击力增加+2', '杀死怪物获得魔法/8'];
      break;
    case 26:
      rs = ['攻击力增加等级/20', '攻击力增加+2', '杀死怪物获得生命/8'];
      break;
    case 27:
      rs = [
        '攻击力增加等级/20',
        '攻击力增加+2',
        '杀死怪物获得生命/8',
        '杀死怪物获得魔法/8',
      ];
      break;
    case 28:
      rs = ['攻击力增加等级/20', '攻击力增加+2', '攻击（魔法）速度加+7'];
      break;
    case 29:
      rs = [
        '攻击力增加等级/20',
        '攻击力增加+2',
        '攻击（魔法）速度加+7',
        '杀死怪物获得魔法/8',
      ];
      break;
    case 30:
      rs = [
        '攻击力增加等级/20',
        '攻击力增加+2',
        '攻击（魔法）速度加+7',
        '杀死怪物获得生命/8',
      ];
      break;
    case 31:
      rs = [
        '攻击力增加等级/20',
        '攻击力增加+2',
        '攻击（魔法）速度加+7',
        '杀死怪物获得生命/8',
        '杀死怪物获得魔法/8',
      ];
      break;
    case 32:
      rs = ['卓越攻击力增加10%'];
      break;
    case 33:
      rs = ['卓越攻击力增加10%', '杀死怪物获得魔法/8'];
      break;
    case 34:
      rs = ['卓越攻击力增加10%', '杀死怪物获得生命/8'];
      break;
    case 35:
      rs = ['卓越攻击力增加10%', '杀死怪物获得生命/8', '杀死怪物获得魔法/8'];
      break;
    case 36:
      rs = ['卓越攻击力增加10%', '攻击（魔法）速度加+7'];
      break;
    case 37:
      rs = ['卓越攻击力增加10%', '攻击（魔法）速度加+7', '杀死怪物获得魔法/8'];
      break;
    case 38:
      rs = ['卓越攻击力增加10%', '攻击（魔法）速度加+7', '杀死怪物获得生命/8'];
      break;
    case 39:
      rs = [
        '卓越攻击力增加10%',
        '攻击（魔法）速度加+7',
        '杀死怪物获得生命/8',
        '杀死怪物获得魔法/8',
      ];
      break;
    case 40:
      rs = ['卓越攻击力增加10%', '攻击力增加+2%'];
      break;
    case 41:
      rs = ['卓越攻击力增加10%', '攻击力增加+2%', '杀死怪物获得魔法/8'];
      break;
    case 42:
      rs = ['卓越攻击力增加10%', '攻击力增加+2%', '杀死怪物获得生命/8'];
      break;
    case 43:
      rs = [
        '卓越攻击力增加10%',
        '攻击力增加+2%',
        '杀死怪物获得魔法/8',
        '杀死怪物获得生命/8',
      ];
      break;
    case 44:
      rs = ['卓越攻击力增加10%', '攻击力增加+2%', '攻击（魔法）速度加+7'];
      break;
    case 45:
      rs = [
        '卓越攻击力增加10%',
        '攻击力增加+2%',
        '攻击（魔法）速度加+7',
        '杀死怪物获得魔法/8',
      ];
      break;
    case 46:
      rs = [
        '卓越攻击力增加10%',
        '攻击力增加+2%',
        '攻击（魔法）速度加+7',
        '杀死怪物获得生命/8',
      ];
      break;
    case 47:
      rs = [
        '卓越攻击力增加10%',
        '攻击力增加+2%',
        '攻击（魔法）速度加+7',
        '杀死怪物获得生命/8',
        '杀死怪物获得魔法/8',
      ];
      break;
    case 48:
      rs = ['卓越攻击力增加10%', '攻击力增加等级/20'];
      break;
    case 49:
      rs = ['卓越攻击力增加10%', '攻击力增加等级/20', '杀死怪物获得魔法/8'];
      break;
    case 50:
      rs = ['卓越攻击力增加10%', '攻击力增加等级/20', '杀死怪物获得生命/8'];
      break;
    case 51:
      rs = [
        '卓越攻击力增加10%',
        '攻击力增加等级/20',
        '杀死怪物获得魔法/8',
        '杀死怪物获得生命/8',
      ];
      break;
    case 52:
      rs = ['卓越攻击力增加10%', '攻击力增加等级/20', '攻击（魔法）速度加+7'];
      break;
    case 53:
      rs = [
        '卓越攻击力增加10%',
        '攻击力增加等级/20',
        '攻击（魔法）速度加+7',
        '杀死怪物获得魔法/8',
      ];
      break;
    case 54:
      rs = [
        '卓越攻击力增加10%',
        '攻击力增加等级/20',
        '攻击（魔法）速度加+7',
        '杀死怪物获得生命/8',
      ];
      break;
    case 55:
      rs = [
        '卓越攻击力增加10%',
        '攻击力增加等级/20',
        '攻击（魔法）速度加+7',
        '杀死怪物获得生命/8',
        '杀死怪物获得魔法/8',
      ];
      break;
    case 56:
      rs = ['卓越攻击力增加10%', '攻击力增加等级/20', '攻击力增加+2%'];
      break;
    case 57:
      rs = [
        '卓越攻击力增加10%',
        '攻击力增加等级/20',
        '攻击力增加+2%',
        '杀死怪物获得魔法/8',
      ];
      break;
    case 58:
      rs = [
        '卓越攻击力增加10%',
        '攻击力增加等级/20',
        '攻击力增加+2%',
        '杀死怪物获得生命/8',
      ];
      break;
    case 59:
      rs = [
        '卓越攻击力增加10%',
        '攻击力增加等级/20',
        '攻击力增加+2%',
        '杀死怪物获得生命/8',
        '杀死怪物获得魔法/8',
      ];
      break;
    case 60:
      rs = [
        '卓越攻击力增加10%',
        '攻击力增加等级/20',
        '攻击力增加+2%',
        '攻击（魔法）速度加+7',
      ];
      break;
    case 61:
      rs = [
        '卓越攻击力增加10%',
        '攻击力增加等级/20',
        '攻击力增加+2%',
        '攻击（魔法）速度加+7',
        '杀死怪物获得魔法/8',
      ];
      break;
    case 62:
      rs = [
        '卓越攻击力增加10%',
        '攻击力增加等级/20',
        '攻击力增加+2%',
        '攻击（魔法）速度加+7',
        '杀死怪物获得生命/8',
      ];
      break;
    case 63:
      rs = [
        '卓越攻击力增加10%',
        '攻击力增加等级/20',
        '攻击力增加+2%',
        '攻击（魔法）速度加+7',
        '杀死怪物获得生命/8',
        '杀死怪物获得魔法/8',
      ];
      break;
    default:
      rs = [];
  }

  return rs;
}
