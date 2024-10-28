// default IP
export const defaultIp = '101.132.124.204';

// default port
export const defaultPort = '44405';

// 每次启动登录器都去更新客户端文件
export const updateEveryLaunch = true;

// 显示配置IP跟端口选项
export const showIpAndPortOption = false;

export const EVENT_RUN_MU = 'EVENT_RUN_MU';
export const EVENT_SELECT_FOLDER = 'EVENT_SELECT_FOLDER';
export const EVENT_KILL_MAIN = 'EVENT_KILL_MAIN';

export const EVENT_CHECK_CLIENT_UPDATE = 'EVENT_CHECK_CLIENT_UPDATE';
export const EVENT_UPDATE_PROGRESS = 'EVENT_UPDATE_PROGRESS';
export const EVENT_UPDATE_FINISHED = 'EVENT_UPDATE_FINISHED';

export const EVENT_GET_REGEDIT = 'EVENT_GET_REGEDIT';
export const EVENT_SET_REGEDIT = 'EVENT_SET_REGEDIT';

export const USER_SETTING_KEY = 'userSetting';

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

export const mySessionKey = 'MySessionKey';
export const defaultServerKey = 'DefaultServer';
