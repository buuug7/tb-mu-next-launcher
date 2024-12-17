// default IP
export const defaultIp = '117.72.12.89';

// default port
export const defaultPort = '44405';

// 显示配置IP跟端口选项
export const showIpAndPortOption = false;

export const EVENT_CHECK_CLIENT_UPDATE = 'EVENT_CHECK_CLIENT_UPDATE';
export const EVENT_UPDATE_PROGRESS = 'EVENT_UPDATE_PROGRESS';
export const EVENT_UPDATE_FINISHED = 'EVENT_UPDATE_FINISHED';

export const USER_SETTING_KEY = 'userSettingTB';

export const EVENT_ELECTRON_STORE_CHANGE_SUBSCRIBE =
  'EventElectronStoreChangeSubscribe';

export const EVENT_ELECTRON_STORE_CHANGE_UNSUBSCRIBE =
  'EventElectronStoreChangeUnsubscribe';

// 网站 base URL
export function getBaseUrl() {
  // http://mu.yoursoups.com:39155
  const codePoints = [
    104, 116, 116, 112, 58, 47, 47, 109, 117, 46, 121, 111, 117, 114, 115, 111,
    117, 112, 115, 46, 99, 111, 109, 58, 51, 57, 49, 53, 53,
  ];

  // return String.fromCodePoint(...codePoints);
  // return 'http://localhost:3003';
  return 'http://117.72.12.89:39155';
}

// 新闻
export const newsUrl = `${getBaseUrl()}/json/news.json`;

export const mySessionKey = 'MySessionKey';
export const defaultServerKey = 'DefaultServer';
