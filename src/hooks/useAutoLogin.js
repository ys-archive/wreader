import { useEffect } from 'react';
import { Alert } from '#components/alert';
import { useStoreActions } from 'easy-peasy';
import {
  actionsLogin,
  actionsSetEmail,
  actionsSetUserId,
  actionsSetUserInfo,
  actionsSetPassword,
} from '#store/actions';

import * as SecureStore from 'expo-secure-store';
import AuthService from '../services/AuthService';

export const useAutoLogin = () => {
  const login = useStoreActions(actionsLogin);
  const setEmail = useStoreActions(actionsSetEmail);
  const setPassword = useStoreActions(actionsSetPassword);
  const setUserId = useStoreActions(actionsSetUserId);
  const setUserInfo = useStoreActions(actionsSetUserInfo);

  useEffect(() => {
    (async () => {
      if ((await SecureStore.getItemAsync('isAutoLogin')) !== 'true') {
        return;
      }

      const email = await SecureStore.getItemAsync('email');
      const password = await SecureStore.getItemAsync('password');
      console.log('auto login email: ', email, ', password: ', password);

      if (!email || !password) {
        return;
      }

      const { code, item } = await AuthService.POST_login(email, password);

      if (code === 1) {
        login();
        setEmail(email);
        setPassword(password);
        setUserId(item.id);
        setUserInfo(item);

        // Alert('자동 로그인 성공');

        // if ((await SecureStore.getItemAsync('isAutoLogin')) === 'true') {
        //   await StorageService.saveSigninInfo(email, password);
        //   console.log('Auto Login + 데이터 등록됨: ', email, password);
        // }

        // nav.navigate(ScreenNames.Main);
      }

      if (code === 100) {
        Alert("Fail (it's in the withdrawal status)");
        return;
      }

      if (code === 102 || code === 103) {
        Alert('Fail (neither email or password is correct)');
        return;
      }
    })();
  }, []);
};
