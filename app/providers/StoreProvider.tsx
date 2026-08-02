"use client"

import { Provider } from "react-redux"
import { useEffect } from "react"

import { store } from "@/app/redux/store"
import { setUser, logout, IUser } from "@/app/redux/features/authSlice"

interface StoreProviderProps {
  children: React.ReactNode
  initialUser: IUser | null
  initialToken: string | null
}

export const StoreProvider = ({
  children,
  initialUser,
  initialToken,
}: StoreProviderProps) => {
  useEffect(() => {
    if (initialUser && initialToken) {
      store.dispatch(
        setUser({
          user: initialUser,
          token: initialToken,
        })
      )
    } else {
      store.dispatch(logout())
    }
  }, [initialUser, initialToken])

  return <Provider store={store}>{children}</Provider>
}