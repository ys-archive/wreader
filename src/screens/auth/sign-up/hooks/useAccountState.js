import { useState } from 'react';
import constate from 'constate';

const useAccountState = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setValid] = useState(false);

  return {
    email,
    setEmail,
    password,
    setPassword,
    isValid,
    setValid,
  };
};

export const [
  AccountStateProvider,
  useEmail,
  useSetEmail,
  usePassword,
  useSetPassword,
  useIsValid,
  useSetValid,
] = constate(
  useAccountState,
  value => value.email,
  value => value.setEmail,
  value => value.password,
  value => value.setPassword,
  value => value.isValid,
  value => value.setValid,
);
