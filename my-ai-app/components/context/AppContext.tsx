"use client"

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

import toast from 'react-hot-toast';


interface Thread {
  IsOpen: true
}

interface Chat {
  title: string
}

interface AppState {
  chat: Chat[],
  newThread: boolean,
  responseLoading: boolean,
  loading: boolean
}

type AppAction =
 // | { type: 'SET_USER'; payload: UserData | null }
  | { type: 'SET_NEW_THREAD'; payload: boolean }
  | { type: 'ADD_NEW_CHAT'; payload: Chat[]}
  | { type: 'SET_RESPONSE_LOADING'; payload: boolean }
  | { type: 'SET_LOADING'; payload: boolean }

const initialState: AppState = {
  chat: [],
  newThread: false,
  responseLoading: false,
  loading: false
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
    default:
      return state;
  }
};



const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  actions: {
    addChat: () => void;
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
    addChat: () => {
      
    }
    }

  
  
  

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  );
};