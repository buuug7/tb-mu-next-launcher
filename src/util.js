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

export function randomPick(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

export function getInventoryItemByIndex(Inventory, index) {
  return Inventory.substring(32 * index, 32 * index + 32).toLowerCase();
}

export function replaceAt(str, index, replacement) {
  return (
    str.substr(0, index) + replacement + str.substr(index + replacement.length)
  );
}

export function replaceAt2(str, index, replacement) {
  return (
    str.substring(0, index) +
    replacement +
    str.substring(index + replacement.length)
  );
}

export function getCharacterAbbr(code) {
  let cName = '';
  switch (code) {
    case 0:
    case 1:
    case 3:
      cName = 'dw';
      break;
    case 16:
    case 17:
    case 19:
      cName = 'dk';
      break;
    case 32:
    case 33:
    case 35:
      cName = 'elf';
      break;
    case 80:
    case 81:
    case 83:
      cName = 'sum';
      break;
    case 48:
    case 50:
      cName = 'mg';
      break;
    case 64:
    case 66:
      cName = 'dl';
      break;
    default:
      cName = 'elf';
  }

  return cName;
}

export function isChinese(str) {
  const re = /[^\u4e00-\u9fa5]/;
  return !re.test(str);
}

export const invalidNameArr = [
  'net user',
  ';',
  'xp_cmdshell',
  'add',
  'exec%20master.dbo.xp_cmdshell',
  'net localgroup administrators',
  'select',
  'count',
  'Asc(',
  'char(',
  'mid(',
  "'",
  ':',
  '""',
  'insert',
  'delete from',
  'drop table',
  'update',
  'truncate',
  'from(',
  'long',
  '１',
];

export function checkName(name) {
  let isInvalidName = false;
  // eslint-disable-next-line no-restricted-syntax
  for (const str of invalidNameArr) {
    if (name.indexOf(str) !== -1) {
      isInvalidName = true;
      break;
    }
  }

  return !isInvalidName;
}

export function checkNameLength(name, len = 10) {
  let count = 0;

  name.split('').forEach((item) => {
    if (isChinese(item)) {
      count += 2;
    } else {
      count += 1;
    }
  });

  return count <= len;
}

export const groupBy = (x, f) => {
  // eslint-disable-next-line
  return x.reduce((a, b, i) => ((a[f(b, i, x)] ||= []).push(b), a), {});
};

/**
 * 获取 Ext1 字段中特定位置的数字
 * 其中 index = 0, 从最后开始, 获取第 1-2 位数字
 * 其中 index = 1, 从最后开始, 获取第 2-3 位数字
 * 依此类推
 * @param n 数字 n 总位数位 10 位, 最小位为 1000000000
 * @param index
 * @returns {number}
 */
export function getExt1ValueByIndex(n, index) {
  let num = n;
  let i = index;

  if (i === 0) {
    return num % 100;
  }

  while (i--) {
    num = Math.floor(num / 100);
  }

  return num % 100;
}
