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
  return 'http://localhost:3000';
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
