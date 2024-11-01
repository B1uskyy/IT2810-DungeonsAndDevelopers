import { createContext, ReactNode, useReducer } from 'react';

const initialState: LoginState = {
  token: localStorage.getItem('token') || '',
  userId: localStorage.getItem('userId') || '',
  userName: localStorage.getItem('userName') || '',
};

interface LoginState {
  token: string;
  userId: string;
  userName: string;
}

interface LoginAction {
  type: 'LOGIN';
  payload: {
    token: string;
    userId: string;
    userName: string;
  };
}

interface LogoutAction {
  type: 'LOGOUT';
}

type AuthAction = LoginAction | LogoutAction;

const AuthContext = createContext<{
  token: string;
  userId: string;
  userName: string;
  login: (data: { token: string; userId: string; userName: string }) => void;
  logout: () => void;
}>({
  token: '',
  userId: '',
  userName: '',
  login: () => {},
  logout: () => {},
});

function authReducer(state: LoginState, action: AuthAction): LoginState {
  switch (action.type) {
    case 'LOGIN':
      return {
        token: action.payload.token,
        userId: action.payload.userId,
        userName: action.payload.userName,
      };
    case 'LOGOUT':
      return {
        token: '',
        userId: '',
        userName: '',
      };
    default:
      return state;
  }
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: { token: string; userId: string; userName: string }) => {
    console.log('Logging in with:', userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('userId', userData.userId);
    localStorage.setItem('userName', userData.userName);
    localStorage.setItem('loginToast', 'true');
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const logout = () => {
    localStorage.clear();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ token: state.token, userId: state.userId, userName: state.userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
