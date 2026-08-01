"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/redux/features/authSlice";

interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN';
}

interface AuthInitializerProps {
  user: IUser | null;
}

export default function AuthInitializer({
  user,
}: {
  user: AuthInitializerProps;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch, user]);

  return null;
}