interface ILiferay {
  ThemeDisplay: IThemeDisplay;
  Util: LiferayUtil;
  authToken: string;
}

declare global {
  interface Window {
    Liferay: ILiferay;
  }
}

interface IThemeDisplay {
  getLanguageId: () => string;
  getUserEmailAddress: () => string;
  getUserName: () => string;
}

interface LiferayUtil {
  openToast: (options?: any) => void;
}

export const Liferay = window.Liferay || {
  ThemeDisplay: {
    getLanguageId: () => "en_US",
    getUserEmailAddress: () => "test@liferay.com",
    getUserName: () => "Test Test",
  },
  authToken: "",
};

export async function baseFetch(url: string, options?: RequestInit) {
  const response = await fetch(window.origin + "/" + url, {
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": Liferay.authToken,
    },
    ...options,
  });

  if (options?.method !== "DELETE") {
    return response.json();
  }
}
