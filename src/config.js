// default IP
export const defaultIp = '101.132.124.204';

// default port
export const defaultPort = '44405';

// 每次启动登录器都去更新客户端文件
export const updateEveryLaunch = true;

// 显示配置IP跟端口选项
export const showIpAndPortOption = false;

// 服务器,分区
export const servers = [
  {
    name: '一区',
    key: '1',
  },
  {
    name: '二区',
    key: '2',
  },
];

export const EVENT_RUN_MU = 'EVENT_RUN_MU';
export const EVENT_SELECT_FOLDER = 'EVENT_SELECT_FOLDER';
export const EVENT_KILL_MAIN = 'EVENT_KILL_MAIN';

export const EVENT_CHECK_CLIENT_UPDATE = 'EVENT_CHECK_CLIENT_UPDATE';
export const EVENT_UPDATE_PROGRESS = 'EVENT_UPDATE_PROGRESS';
export const EVENT_UPDATE_FINISHED = 'EVENT_UPDATE_FINISHED';

export const EVENT_GET_REGEDIT = 'EVENT_GET_REGEDIT';
export const EVENT_SET_REGEDIT = 'EVENT_SET_REGEDIT';

export const USER_DATA_KEY = 'userData';

// 网站 base URL
export function getBaseUrl() {
  // http://mu.yoursoups.com:39155
  const codePoints = [
    104, 116, 116, 112, 58, 47, 47, 109, 117, 46, 121, 111, 117, 114, 115, 111,
    117, 112, 115, 46, 99, 111, 109, 58, 51, 57, 49, 53, 53,
  ];

  // return String.fromCodePoint(...codePoints);
  return 'http://localhost:3003';
}

// 新闻
export const newsUrl = `${getBaseUrl()}/json/news.json`;

export const sitePrimaryTitle = '小猪奇迹';
export const siteSecondaryTitle = '小猪公益奇迹';
export const siteDescription =
  '小猪奇迹, 版本 s6 全扩展, 经典, 怀旧, 微变, 全职业平衡, 长久耐玩, 佛系养老, 自动连击, 开放 500 转满点 8 万点, 装备 +15, 物品进阶, 自动连击, 自定义称号头像, 积分元宝赠送, 多种事件活动, 多种副本地图, 2024年10月1号开服畅玩国庆。';
export const copyRight = 'Copyright © 2024';
export const keywords = '小猪奇迹,小猪奇迹私服,奇迹,奇迹sf,s6,1.03H,103H';

export const qqLink = `https://qm.qq.com/q/2Qy6PGxSY8`;

export const SERVERS = [
  {
    name: '小猪一区',
    key: '1',
    active: false,
  },
  // {
  //   name: '小猪二区',
  //   key: '2',
  //   active: false,
  // },
];

export const DEFAULT_SERVER_KEY_NAME = 'DEFAULT_SERVER_KEY';
export const DEFAULT_SERVER_KEY_VALUE = '1';

export const mySessionKey = 'MySessionKey';

// VIP 定义列表
export const VIPS = [
  {
    id: 0,
    name: '普通用户',
    pricePerDay: 0,
    life: 0,
    damage: 0,
    exp: 0,
    drop: 0,
    comboRate: 5,
    warehouseNum: 3,
    chaosMix: 0,
    jewelRate: 0,
  },
  {
    id: 1,
    name: 'VIP 1',
    pricePerDay: 10000,
    life: 100,
    damage: 10,
    exp: 50,
    drop: 10,
    comboRate: 7,
    warehouseNum: 5,
    chaosMix: 5,
    jewelRate: 10,
  },
  {
    id: 2,
    name: 'VIP 2',
    pricePerDay: 20000,
    life: 200,
    damage: 20,
    exp: 100,
    drop: 20,
    comboRate: 9,
    warehouseNum: 7,
    chaosMix: 10,
    jewelRate: 15,
  },
  {
    id: 3,
    name: 'VIP 3',
    pricePerDay: 40000,
    life: 300,
    damage: 30,
    exp: 150,
    drop: 30,
    comboRate: 11,
    warehouseNum: 9,
    chaosMix: 15,
    jewelRate: 20,
  },
];

export const VIP_BUY_TYPE = [
  {
    name: '30 天',
    days: 30,
  },
  {
    name: '60 天',
    days: 60,
  },
  {
    name: '90 天',
    days: 90,
  },
  {
    name: '180 天',
    days: 180,
  },
];

export const defaultClassInfo = [
  {
    Class: 0,
    Strength: 18,
    Dexterity: 18,
    Vitality: 15,
    Energy: 30,
    Leadership: 0,
    MaxLife: 60,
    MaxMana: 60,
    LevelLife: 1,
    LevelMana: 2,
    VitalityToLife: 2,
    EnergyToMana: 2,
  },
  {
    Class: 1,
    Strength: 28,
    Dexterity: 20,
    Vitality: 25,
    Energy: 10,
    Leadership: 0,
    MaxLife: 110,
    MaxMana: 20,
    LevelLife: 2,
    LevelMana: 0.5,
    VitalityToLife: 3,
    EnergyToMana: 1,
  },
  {
    Class: 2,
    Strength: 22,
    Dexterity: 25,
    Vitality: 20,
    Energy: 15,
    Leadership: 0,
    MaxLife: 80,
    MaxMana: 30,
    LevelLife: 1,
    LevelMana: 1.5,
    VitalityToLife: 2,
    EnergyToMana: 1.5,
  },
  {
    Class: 3,
    Strength: 26,
    Dexterity: 26,
    Vitality: 26,
    Energy: 26,
    Leadership: 0,
    MaxLife: 110,
    MaxMana: 60,
    LevelLife: 1,
    LevelMana: 1,
    VitalityToLife: 2,
    EnergyToMana: 2,
  },
  {
    Class: 4,
    Strength: 26,
    Dexterity: 20,
    Vitality: 20,
    Energy: 15,
    Leadership: 1000,
    MaxLife: 90,
    MaxMana: 40,
    LevelLife: 1.5,
    LevelMana: 1,
    VitalityToLife: 2,
    EnergyToMana: 1.5,
  },
  {
    Class: 5,
    Strength: 21,
    Dexterity: 21,
    Vitality: 18,
    Energy: 23,
    Leadership: 0,
    MaxLife: 70,
    MaxMana: 40,
    LevelLife: 1,
    LevelMana: 1.5,
    VitalityToLife: 2,
    EnergyToMana: 1.5,
  },
  {
    Class: 6,
    Strength: 32,
    Dexterity: 27,
    Vitality: 25,
    Energy: 20,
    Leadership: 0,
    MaxLife: 100,
    MaxMana: 40,
    LevelLife: 1.3,
    LevelMana: 1,
    VitalityToLife: 2,
    EnergyToMana: 1.3,
  },
];

// 转生赠送点数
export const RESET_LIFE_PER_POINTS = 200;
// 大师转生赠送点数
export const MASTER_RESET_LIFE_PER_POINTS = 8000;
// 最大转生次数
export const RESET_LIFT_MAX_COUNT = 60;
// 转生所需等级
export const RESET_LIFT_REQUIRE_LEVEL = 400;
// 每等级点数
export const LEVEL_UP_POINTS = 8;
// 允许在线转生
export const CAN_RESET_LIFE = false;
// 镶嵌需要积分
export const SOCKET_NEED_JF = 500000;
// 进阶需要积分
export const STAR_NEED_JF = 500000;
// 升级套装所需积分
export const SET_UPDATE_NEED_JF = 100000;
// 强化需要积分
export const ENHANCE_NEED_JF = 200000;
// 改名需要积分
export const CHANGE_NAME_NEED_JF = 500000;
// 允许回收
export const ENABLE_RECYCLE = true;
// 最大等级
export const MAX_C_LEVEL = 10000;
// 最大大师等级
export const MAX_M_LEVEL = 10000;
// 回收角色给与元宝
export const RECYCLE_CHARACTER_YB = 1000000;
// 回收角色等级
export const RECYCLE_CHARACTER_LEVEL = 400;
// 回收角色转生次数
export const RECYCLE_CHARACTER_RESET_COUNT = 500;
// 是否开启自定义称号
export const CUSTOM_TITLE_ENABLE = true;
// 自定义称号积分
export const CUSTOM_TITLE_JF = 500000;

// 是否允许在线加点
export const ENABLE_ADD_POINTS = false;

// 是否开启EXT1的定制
export const EXT1_ENABLE = true;

// 连击概率
export const EXT1_INDEX0 = 0;
// 三倍伤害率
export const EXT1_INDEX1 = 1;
//
export const EXT1_INDEX2 = 0;

export const PRIZE_1_NEED_RESET_COUNT = 9999;

// eslint-disable-next-line
const prize1_1 = {
  name: '血色天使魅惑',
  hex: `697FA20087CB877F0070FFFEFEFEFEFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF697FA20087CB9B7F0080FFFEFEFEFEFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF697FA20087CBA47F0090FFFEFEFEFEFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF697FA20087CBAE7F00A0FFFEFEFEFEFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF697FA20087CBBB7F00B0FFFEFEFEFEFE`,
};
// eslint-disable-next-line
const prize1_2 = {
  name: '暗黑天使魅影',
  hex: `917FA20087CB877F0070FFFEFEFEFEFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF917FA20087CB9B7F0080FFFEFEFEFEFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF917FA20087CBA47F0090FFFEFEFEFEFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF917FA20087CBAE7F00A0FFFEFEFEFEFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF917FA20087CBBB7F00B0FFFEFEFEFEFE`,
};
// eslint-disable-next-line
const prize1_3 = {
  name: '圣天使魅影',
  hex: `9D7FA20087CB877F0070FFFEFEFEFEFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF9D7FA20087CB9B7F0080FFFEFEFEFEFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF9D7FA20087CBA47F0090FFFEFEFEFEFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF9D7FA20087CBAE7F00A0FFFEFEFEFEFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF9D7FA20087CBBB7F00B0FFFEFEFEFEFE`,
};
// eslint-disable-next-line
const prize1_4 = {
  name: '灵魂觉醒魅影',
  hex: `717FA20087CB877F0070FFFEFEFEFEFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF717FA20087CB9B7F0080FFFEFEFEFEFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF717FA20087CBA47F0090FFFEFEFEFEFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF717FA20087CBAE7F00A0FFFEFEFEFEFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF717FA20087CBBB7F00B0FFFEFEFEFEFE`,
};

export const PRIZE1 = [prize1_1, prize1_2, prize1_3, prize1_4];

export const UPDATE_EXT1_TYPE = {
  comboRate: {
    name: '连击概率',
    nameAbbr: '连击',
    jfPerValue: 50000,
    maxValue: 20,
    extIndex: EXT1_INDEX0,
    key: 'comboRate',
  },
  tripleRate: {
    name: '三倍伤害率',
    nameAbbr: '三倍',
    jfPerValue: 50000,
    maxValue: 20,
    extIndex: EXT1_INDEX1,
    key: 'tripleRate',
  },
};
