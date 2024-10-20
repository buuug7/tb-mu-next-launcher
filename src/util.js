/* eslint-disable import/prefer-default-export */

import dayjs from 'dayjs';

import {
  SERVERS,
  DEFAULT_SERVER_KEY_NAME,
  DEFAULT_SERVER_KEY_VALUE,
  VIPS,
  defaultClassInfo,
  RESET_LIFE_PER_POINTS,
  MASTER_RESET_LIFE_PER_POINTS,
} from './config';

/**
 * 验证电子邮箱
 * @param email
 * @returns {RegExpMatchArray}
 */
export function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

export function getCookie(name, target) {
  console.log(`name`, name);
  const nameEQ = `${name}=`;
  const ca = (target || document?.cookie).split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function eraseCookie(name) {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export function getDefaultServer() {
  const defaultServer = SERVERS.find(
    (it) => String(it.key) === getCookie(DEFAULT_SERVER_KEY_NAME)
  );

  if (!defaultServer) {
    setCookie(DEFAULT_SERVER_KEY_NAME, DEFAULT_SERVER_KEY_VALUE);
    return SERVERS.find((it) => String(it.key) === DEFAULT_SERVER_KEY_VALUE);
  }

  console.log(`defaultSer`, defaultServer);
  return defaultServer;
}

export function getVipItem(user) {
  if (!user) {
    return VIPS[0];
  }
  return VIPS.find((it) => it.id === user.AccountLevel);
}

export const classToName = {
  0: '法师',
  1: '魔导士',
  2: '神导师',

  16: '剑士',
  17: '骑士',
  18: '神骑士',

  32: '弓箭手',
  33: '圣射手',
  34: '神射手',

  48: '魔剑士',
  50: '剑圣',

  64: '圣导师',
  66: '祭师',

  80: '召唤师',
  81: '圣巫师',
  82: '神巫师',

  96: '格斗家',
  98: '格斗大师',
};

export function class2Index(classNum) {
  const dic = {
    0: 0,
    1: 0,
    2: 0,
    16: 1,
    17: 1,
    18: 1,
    32: 2,
    33: 2,
    34: 2,
    48: 3,
    50: 3,
    64: 4,
    65: 4,
    80: 5,
    81: 5,
    82: 5,
    96: 6,
    98: 6,
  };

  return dic[classNum] || 0;
}

export function getPointsPerLevel(classNum) {
  // 不同角色每级几点属性点
  // DW DK ELF MG DL SUM FR
  const pointsPerLevelArr = [5, 5, 5, 5, 5, 5, 5];

  return pointsPerLevelArr[class2Index(classNum)];
}

export function getTotalPoints(character) {
  const cLevel = character['cLevel'];
  const resets = character['ResetCount'];
  const defaultInfo = defaultClassInfo[class2Index(character['Class'])];

  const Strength = defaultInfo['Strength'];
  const Dexterity = defaultInfo['Dexterity'];
  const Vitality = defaultInfo['Vitality'];
  const Energy = defaultInfo['Energy'];
  const Leadership = defaultInfo['Leadership'];
  const defaultPoints = Strength + Dexterity + Vitality + Energy + Leadership;
  const pointsPerLevel = getPointsPerLevel(character['Class']);
  const masterResetPoints =
    MASTER_RESET_LIFE_PER_POINTS * character['MasterResetCount'];

  return (
    cLevel * pointsPerLevel +
    resets * RESET_LIFE_PER_POINTS +
    defaultPoints +
    masterResetPoints
  );
}

export const rankOrderTypes = [
  {
    name: '默认',
    value: 'default',
  },
  {
    name: '杀怪',
    value: 'killMonster',
  },
  {
    name: '杀人',
    value: 'Kills',
  },
  {
    name: '死亡',
    value: 'Deads',
  },
  {
    name: '血色城堡',
    value: 'bloodScore',
  },
  {
    name: '恶魔广场',
    value: 'devilSquareScore',
  },
  {
    name: '赤色要塞',
    value: 'chaoCastleScore',
  },
];

export function humanNumber(n) {
  const formatter = Intl.NumberFormat('zh-CN', { notation: 'compact' });
  return formatter.format(n);
}

/**
 * 获取用户退订会员剩余积分或者元宝
 * @param user
 * @returns {number}
 */
export function getUserVipRemainingJF(user) {
  const { AccountLevel, AccountExpireDate } = user;
  const vipItem = VIPS.find((it) => it.id === AccountLevel);
  if (!vipItem) {
    return 0;
  }
  const days = dayjs(AccountExpireDate).diff(dayjs(), 'days');
  const backJF = (vipItem.pricePerDay * days) / 2;
  const returnValue = Math.floor(backJF);

  if (returnValue < 0) {
    return 0;
  }

  return returnValue;
}
