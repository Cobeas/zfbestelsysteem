import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

async function fetchWithToken(url: string, options: RequestInit = {}) {
  let accessToken = Cookies.get('accessToken');

  if (!accessToken || isTokenExpiringSoon(accessToken)) {
    const refreshToken = Cookies.get('refreshToken');
    const response = await fetch('/api/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
    const data = await response.json();
    if (data.accessToken) {
      accessToken = data.accessToken;
      Cookies.set('accessToken', accessToken as string);
    } else {
      throw new Error('Unable to refresh token');
    }
  }

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`,
    },
  });
}

function isTokenExpiringSoon(token: string) {
  const decoded: any = jwt.decode(token);
  const expirationTime = decoded.exp * 1000;
  const currentTime = Date.now();
  const bufferTime = 5 * 60 * 1000;
  return currentTime + bufferTime > expirationTime;
}

export default fetchWithToken;