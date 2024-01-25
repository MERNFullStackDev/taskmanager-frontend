import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  name:'TM',
  userId: null,
  token:null,
  login: () => {},
  logout: () => {},
  filter: null,
});
