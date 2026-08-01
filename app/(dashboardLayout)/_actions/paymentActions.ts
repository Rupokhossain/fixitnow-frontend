"use server"

import { cookies } from "next/headers"


interface IPaymentResponse {
  success: boolean;
  message: string;
  data?: string;
}

export const createPaymentAction = async (bookingId: string): Promise<IPaymentResponse> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, message: "Authentication required. Please login again." };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`,
      },
      body: JSON.stringify({ bookingId }),
    });

    const result: IPaymentResponse = await res.json();
    return result;
  } catch (error) {
    console.error("Payment API Error:", error);
    return { success: false, message: "Internal Server Error" };
  }
}