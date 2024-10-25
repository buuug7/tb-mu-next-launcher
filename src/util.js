/* eslint-disable import/prefer-default-export */

import dayjs from 'dayjs';

import {
  SERVERS,
  DEFAULT_SERVER_KEY_NAME,
  DEFAULT_SERVER_KEY_VALUE,
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

  return defaultServer;
}

export function getVipItem(user, vips = []) {
  if (!user) return vips[0];
  return vips.find((it) => it.id === user.AccountLevel);
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
export function getUserVipRemainingJF(user, vips = []) {
  const { AccountLevel, AccountExpireDate } = user;
  const vipItem = vips.find((it) => it.id === AccountLevel);
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
    case 2:
      cName = 'dw';
      break;
    case 16:
    case 17:
    case 18:
      cName = 'dk';
      break;
    case 32:
    case 33:
    case 34:
      cName = 'elf';
      break;
    case 48:
    case 50:
      cName = 'mg';
      break;
    case 64:
    case 66:
      cName = 'dl';
      break;
    case 80:
    case 81:
    case 82:
      cName = 'sum';
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

export function getCatAndIndexFromIndexN(indexN) {
  let category = 0;
  let index = 0;
  let find = false;

  for (let i = 0; i <= 15; i++) {
    if (find) {
      break;
    }

    for (let j = 0; j < 300; j++) {
      if (512 * i + j === indexN) {
        category = i;
        index = j;
        find = true;
        break;
      }
    }
  }

  return {
    category,
    index,
  };
}

// from Muonline server c++ code

// eslint-disable-next-line @typescript-eslint/naming-convention
export function MAKE_NUMBER_W(x, y) {
  return (y & 0xff) | ((x & 0xff) << 8);
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function MAKE_NUMBER_DW(x, y) {
  return (y & 0xffff) | ((x & 0xffff) << 16);
}

export function getItemSocketSlotCount(socketOption) {
  let count = 0;

  (socketOption || []).forEach((it) => {
    if (it !== 255) {
      count++;
    }
  });

  return count;
}

/**
 * 解析物品 byte: 0A78FB019215863F00D000FFFFFFFFFF
 * @param rawHex
 * @returns {{setOption: number, isExpiredItem: number, jewelOfHarmonyOption: *, itemOptionEx: number, level: number, newOption: number, durability: *, index: number, isPeriodicItem: number, serial: *, indexN: number, option3: number, socketOption: *[], option1: number, option2: number, category: number}}
 */
export function parseItemByte(rawHex) {
  console.log(`rawHex`, rawHex);
  const rawArr = rawHex.match(/.{1,2}/g).map((it) => Number(`0x` + it));
  const indexN =
    rawArr[0] | ((rawArr[9] & 0xf0) * 32) | ((rawArr[7] & 0x80) * 2);
  const { category, index } = getCatAndIndexFromIndexN(indexN);

  const level = Math.floor(rawArr[1] / 8) & 15;
  const durability = rawArr[2];

  // 序列号
  const serial = MAKE_NUMBER_DW(
    MAKE_NUMBER_W(rawArr[3], rawArr[4]),
    MAKE_NUMBER_W(rawArr[5], rawArr[6])
  );

  // 幸运
  const option1 = Math.floor(rawArr[1] / 128) & 1;
  // 技能
  const option2 = Math.floor(rawArr[1] / 4) & 1;
  // 追加
  const option3 = (rawArr[1] & 3) + Math.floor((rawArr[7] & 64) / 16);
  // 卓越
  const newOption = rawArr[7] & 63;
  // 套装标记
  const setOption = rawArr[8] & 15;
  const itemOptionEx = (rawArr[9] & 8) * 16;
  const isPeriodicItem = ((rawArr[9] & 2) / 2) & 1;
  const isExpiredItem = ((rawArr[9] & 4) / 4) & 1;
  // 镶嵌属性
  const socketOption = [
    rawArr[11],
    rawArr[12],
    rawArr[13],
    rawArr[14],
    rawArr[15],
  ];
  // 强化属性
  const jewelOfHarmonyOption = rawArr[10];

  return {
    serial,
    indexN,
    index,
    category,
    level,
    durability,
    option1,
    option2,
    option3,
    newOption,
    setOption,
    itemOptionEx,
    isPeriodicItem,
    isExpiredItem,
    socketOption,
    jewelOfHarmonyOption,
  };
}

export function getWareHouseItemsArr(Items) {
  const arr = Items.match(/.{1,32}/g);
  return arr;
}

export function getWareHouseItems(Items, num = -1) {
  const arr = Items.match(/.{1,32}/g);
  const rs = arr.map((it, index) => ({
    index,
    value: it,
  }));
  // .filter((it) => !it.value.startsWith('FF'));

  if (num >= 0 && rs.length > num) {
    return rs.length > num ? rs[num] : null;
  }

  return null;
}

/**
 * get warehouse item by index
 * @param Items
 * @param index
 * @param muItems
 * @returns {{setOption: number, rawIndex, isExpiredItem: number, jewelOfHarmonyOption: *, itemOptionEx: number, level: number, newOption: number, durability: *, index: number, isPeriodicItem: number, serial: *, indexN: number, rawValue, option3: number, socketOption: *[], name: (*|string), option1: number, option2: number, category: number}|null}
 */
export function getWareHouseItemByIndex(Items, index = 0, muItems = []) {
  const item = getWareHouseItems(Items, index);

  if (!item) {
    return null;
  }
  const parsed = parseItemByte(item.value);
  const findIt = muItems.find(
    (it) => it.category === parsed.category && it.index === parsed.index
  );
  const info = {
    ...parsed,
    name: findIt ? findIt.name : `${parsed.category} - ${parsed.index}`,
    rawValue: item.value,
    rawIndex: item.index,
  };

  return info;
}

export function getSocketPropertyByValue(arr, value) {
  return arr.find((it) => parseInt('0x' + it.value, 16) === value);
}

export function isSecondEvolution(classCode) {
  return [1, 17, 33, 48, 64, 81, 96].includes(classCode);
}

export function isThirdEvolution(classCode) {
  return [2, 18, 34, 50, 66, 82, 98].includes(classCode);
}

export function isFirstEvolution(classCode) {
  return [0, 16, 32, 80].includes(classCode);
}

export function validateSinglePoints(num) {
  if (num > 65000) {
    return 65000;
  }

  if (num < 0) {
    return 0;
  }

  return num;
}
