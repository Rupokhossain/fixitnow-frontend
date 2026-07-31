"use client"

import { useGetTechBookingsQuery } from "@/app/redux/api/technicianApi";
import { BookingsTable } from "../../../_components/bookings-table";
import { Loader2 } from "lucide-react";

export default function TechnicianBookingsPage() {
  const { data, isLoading } = useGetTechBookingsQuery();
  const bookings = data?.data || [];

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage My Bookings</h1>
      <BookingsTable userRole="technician" initialData={bookings} />
    </div>
  );
}