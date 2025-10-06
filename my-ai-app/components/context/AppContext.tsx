"use client"

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

import toast from 'react-hot-toast';
import axios from "axios";

const BASE_URL = "http://localhost:3000"
interface Thread {
  IsOpen: true
}

export interface UserData {
  name: string;
  email: string;
}

interface Chat {
  title: string
}

interface AppState {
  chat: Chat[];
  newThread: boolean;
  responseLoading: boolean;
  loading: boolean;
  user: UserData | null;
}

type AppAction =
 // | { type: 'SET_USER'; payload: UserData | null }
  | { type: 'SET_NEW_THREAD'; payload: boolean }
  | { type: 'ADD_NEW_CHAT'; payload: Chat[]}
  | { type: 'SET_RESPONSE_LOADING'; payload: boolean }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: UserData | null }

const initialState: AppState = {
  chat: [],
  newThread: false,
  responseLoading: false,
  loading: false,
  user: null,

};



const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_NEW_THREAD':
      return { ...state, newThread: action.payload };
    case 'ADD_NEW_CHAT':
      return { ...state, chat: action.payload };
    case 'SET_RESPONSE_LOADING':
      return { ...state, responseLoading: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
      case 'SET_USER':
        return { ...state, user: action.payload };
    default:
      return state;
  }
};



const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  actions: {
    signin: (method: 'email' | 'wallet' | 'google', email: string, password: string) => Promise<{ success: boolean; error: string; }>;
    signup: (method: 'email' | 'wallet' | 'google', username: string, password: string, email: string) => Promise<{ success: boolean; error: string; }>;
    logout: () => void;
    addChat: () => void;
    getUser: () => Promise<void>;

  };
} | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // console.log(state.user?.name)



  const actions = {
    signin: async (method: 'email' | 'wallet' | 'google', email: string, password: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {

        const response = await axios.post(`${BASE_URL}/api/users/signin`, {
          email,
          password
        })


        if (response.data.error) {
          toast.error(response.data.error);
          return {
            success: false,
            error: response.data.error as string
          };
        }

        toast.success('signin successful!');


        console.log(response.data.error)

        return {
          success: true,
          error: ""
        };
      } catch (error) {
        toast.error('signin failed. Please try again.');
        return {
          success: false,
          error: error as string
        };
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    signup: async (method: 'email' | 'wallet' | 'google', username: string, password: string, email: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {

        const response = await axios.post(`${BASE_URL}/api/users/signup`, {
          username,
          password,
          email,
        })


        if (response.data.error) {
          toast.error('signin failed. Please try again');
          return {
            success: false,
            error: response.data.error as string
          };
        }


        return {
          success: true,
          error: ''
        };
      } catch (error) {
        return {
          success: false,
          error: error as string
        };
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },


    logout: async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/users/logout`);
        if (!res.data.success) {
          return;

        }

        dispatch({ type: 'SET_USER', payload: null });
        toast.success('Logged out successfully!');

        return;
      } catch (error) {
        toast.error('error in logging out!');
        return;
      }

    },
    getUser: async () => {
      try {

        const response = await axios.get(`${BASE_URL}/api/users/getUser`)


        if (response.data.error) {
          toast.error('user is not signed in');
        }

        const userData: UserData = {
          email: response.data.email,
          name: response.data.username
        }
        dispatch({ type: 'SET_USER', payload: userData });
        toast.success('user is signed in');

        console.log(response.data.message)

      } catch (error: any) {
        toast.error('signin failed. Please try again.');
        throw Error(error)
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    addChat: () => {
      
    }
    }

  
  
  

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  );
};