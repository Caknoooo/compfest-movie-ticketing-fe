import Cookies from 'universal-cookie';

const cookies = new Cookies({
  secure: true,
});

export const getToken = (): string => {
  return cookies.get('@tmdb/token');
};

export const setToken = (token: string) => {
  cookies.set('@tmdb/token', token, {
    path: '/',
    secure: true,
  });
};

export const removeToken = () => {
  cookies.remove('@tmdb/token', {
    path: '/',
    secure: true,
  });
};
