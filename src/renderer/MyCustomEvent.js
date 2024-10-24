export const LOCAL_STORAGE_CHANGE = 'LOCAL_STORAGE_CHANGE';
export const HTTP_CUSTOM_EXCEPTION = 'HTTP_CUSTOM_EXCEPTION';

export function fireHttpCustomException(error) {
  if (!window) return;
  const event = new CustomEvent(HTTP_CUSTOM_EXCEPTION, {
    detail: error,
  });
  window.dispatchEvent(event);
}

export function setLocalStorageItem(key, value) {
  if (!window) return;
  window.localStorage.setItem(key, value);
  const event = new CustomEvent(LOCAL_STORAGE_CHANGE, {
    detail: { key, value },
  });
  window.dispatchEvent(event);
}