/* eslint-disable import/prefer-default-export */

import {
  SERVERS,
  DEFAULT_SERVER_KEY_NAME,
  DEFAULT_SERVER_KEY_VALUE,
  VIPS,
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
