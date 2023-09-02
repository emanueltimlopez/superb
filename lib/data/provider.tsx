import React from "react"
import { createContext, useEffect, useMemo, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
}

export interface Token {
  date: Date;
  id: string;
}

export interface Dash {
  id: string;
  userId: string;
  objetive: string;
  type: string;
  theme: string;
  tokens: Token[];
  quantity: number;
  reinforcement: string;
}

export interface IDataContext {
  user: User;
  addToken: (dashId: string, token: number) => void;
  getTokens: (dashId: string) => Token[];
  dashes: Record<string, Dash>;
  addDash: (dash: Dash) => void;
}

export const DataContext = createContext<IDataContext | undefined>(undefined)

interface Props {
  children: React.ReactNode;
  userId: string | undefined;
}

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const jsonValue = JSON.parse(value);
      return jsonValue
    }
  } catch (e) {
    // error reading value
  }
};

export default function DataProvider({ children, userId = '' }: Props) {
  const [user, setUser] = useState<User>()
  const [dashes, setDash] = useState<Record<string, Dash>>({})

  useEffect(() => {
    const getUserData = async () => {
      const data = await getData('dashes')
      if (data) {
        setDash(data)
      }
    }
    getUserData()
  }, [])

  const addToken = (dashId: string, token: string) => {
    const newToken = { date: new Date(), id: token}
    setDash(prevState => {
      const newDashes = {
        ...prevState,
        [dashId]: {
          ...prevState[dashId],
          tokens: [...prevState[dashId].tokens, newToken]
        } 
      }
      storeData('dashes', newDashes)
      return newDashes
    })
  }

  const addDash = (dash: Dash) => {
    setDash(prevState => {
      const newDashes = {
        ...prevState,
        [dash.id]: dash
      }
      storeData('dashes', newDashes)
      return newDashes
    })
  }

  const value = useMemo(() => {
    return {
      user,
      getTokens: (id: string) => dashes[id].tokens,
      addToken,
      addDash,
      dashes,
      getDash: (id: string) => dashes[id]
    };
  }, [user, dashes])

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}
