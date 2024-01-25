import { useCallback, useEffect, useState } from "react";

export const useAuth = () =>{

  const [userId, setUserId] = useState(false);
  const [token, setToken] = useState(null);
  const [name, setName] = useState('TM');
  const [filter, setFilter] = useState(null);
  

  const updateFilter = useCallback((props) => {
    setFilter(props);
  },[]);


  const login = useCallback((uid,token,name) => {
    setUserId(uid);
    setToken(token);
    setName(name);
    localStorage.setItem('userData', JSON.stringify({userId:uid,token:token,name:name}));
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setToken(null);
    setName('TM');
    localStorage.removeItem('userData');
  }, []);

  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(userData && userData.token){
       login(userData.userId, userData.token, userData.name);
    }
  },[login]);

    return {userId, token, login, logout, name, filter, updateFilter};
}