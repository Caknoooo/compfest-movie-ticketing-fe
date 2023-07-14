import { useRouter } from 'next/router';
import * as React from 'react';

import Loading from '@/components/Loading';
import api from '@/libs/axios';
import { getToken, removeToken } from '@/libs/cookies';
import useAuthStore from '@/store/useAuthStore';
import { ApiReturn } from '@/types/api';
import { GetMeResponse, role, User } from '@/types/auth';

export interface WithAuthProps {
  user: User;
}

export default function WithAuth<T>(
  Component: React.ComponentType<T>,
  routePermission: typeof role,
  withRefetch: false,
) {
  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const router = useRouter();
    const { authed } = router.query;

    //#region  //*=========== STORE ===========
    const isAuthenticated = useAuthStore.useIsAuthenticated();
    const isLoading = useAuthStore.useIsLoading();
    const login = useAuthStore.useLogin();
    const logout = useAuthStore.useLogout();
    const stopLoading = useAuthStore.useStopLoading();
    const user = useAuthStore.useUser();
    //#endregion  //*======== STORE ===========

    const checkAuth = React.useCallback(() => {
      const token = getToken();

      if (!token) {
        isAuthenticated && logout();
        stopLoading();
        return;
      }

      const loadUser = async () => {
        try {
          const res = await api.get<ApiReturn<GetMeResponse>>('/user/me');
          login({
            ...res.data.data,
            token: token,
          });
        } catch (error) {
          removeToken();
        } finally {
          stopLoading();
        }
      };

      if (!isAuthenticated || withRefetch || authed) {
        loadUser();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    React.useEffect(() => {
      if (user && isAuthenticated) {
        if (!routePermission.includes(user.role)) {
          router.replace('/');
        }
      } else if (!user) {
        router.push('/');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routePermission, user, isAuthenticated, isLoading]);

    React.useEffect(() => {
      checkAuth();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading || !user) {
      return <Loading />;
    }
    return <Component {...(props as T)} user={user} />;
  };

  return ComponentWithAuth;
}
