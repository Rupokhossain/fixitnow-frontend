"use client"

import { Provider } from "react-redux"
import { store } from "@/app/redux/store"
import { setUser, IUser } from "@/app/redux/features/authSlice"
import { useEffect } from "react"
interface StoreProviderProps {
  children: React.ReactNode;
  initialUser: IUser | null; 
  initialToken: string | null; 
}

export const StoreProvider = ({ 
  children, 
  initialUser, 
  initialToken 
}: StoreProviderProps) => {
  
  useEffect(() => {
    if (initialToken) {
      store.dispatch(setUser({ 
        user: initialUser, 
        token: initialToken 
      }))
    }
  }, [initialUser, initialToken])

  return <Provider store={store}>{children}</Provider>
}