const KEY = 'nixon_gemini_api_key';

export const saveApiKey = (key: string) => {
  try {
    localStorage.setItem(KEY, key);
  } catch (e) {
    console.error('saveApiKey failed', e);
  }
};

export const loadApiKey = (): string | null => {
  try {
    return localStorage.getItem(KEY);
  } catch (e) {
    console.error('loadApiKey failed', e);
    return null;
  }
};
