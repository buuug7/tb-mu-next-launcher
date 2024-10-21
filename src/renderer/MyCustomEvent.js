export const HTTP_401_EVENT = 'HTTP_401_EVENT';
export const LOCAL_STORAGE_CHANGE = 'LOCAL_STORAGE_CHANGE';

export function fireHttp401Event(response) {
  if (!window) {
    return;
  }

  const event = new CustomEvent(HTTP_401_EVENT, {
    detail: response,
  });

  window.dispatchEvent(event);
}

export function setLocalStorageItem(key, value) {
  if (!window) {
    return;
  }

  window.localStorage.setItem(key, value);
  const event = new CustomEvent(LOCAL_STORAGE_CHANGE, {
    detail: { key, value },
  });
  window.dispatchEvent(event);
}
