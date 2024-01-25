import Main from './components/main.component';
import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hook'; 

function App() {
  const {name, userId, token, login, logout, filter, updateFilter} = useAuth();
 
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        userId: userId,
        login: login,
        logout: logout,
        name: name,
        token:token,
        filter: filter,
        updateFilter:updateFilter
      }}
    >
    <Main />
    </AuthContext.Provider>
  );
}

export default App;
