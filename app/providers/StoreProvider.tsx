"use client"

import { Provider } from "react-redux"
import { store } from "@/app/redux/store"
import { setUser } from "@/app/redux/features/authSlice"
import { useEffect } from "react"

interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface StoreProviderProps {
  children: React.ReactNode;
  initialUser: IUser | null; 
}

export const StoreProvider = ({ children, initialUser }: StoreProviderProps) => {
  
  useEffect(() => {
    if (initialUser) {
      store.dispatch(setUser(initialUser))
    }
  }, [initialUser])

  return <Provider store={store}>{children}</Provider>
}