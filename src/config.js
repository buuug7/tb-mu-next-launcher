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

export const DEFAULT_SERVER_KEY_NAME = 'DEFAULT_SERVER_KEY';
export const DEFAULT_SERVER_KEY_VALUE = '1';

export const mySessionKey = 'MySessionKey';

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
export const CAN_RESET_LIFE = true;
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
export const ENABLE_ADD_POINTS = true;
// 是否允许在线洗点
export const EnableResetPoints = true;
// 是否允许回收角色
export const EnableRecycleCharacter = true;

// 是否开启EXT1的定制
export const EXT1_ENABLE = true;

// 连击概率
export const EXT1_INDEX0 = 0;
// 三倍伤害率
export const EXT1_INDEX1 = 1;
//
export const EXT1_INDEX2 = 0;

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
