export const dynamic = "force-dynamic";


import { BookingsTable } from "../../../_components/bookings-table";


export default function CustomerBookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-gray-600">Track and manage your service requests</p>
      </div>
      

      <BookingsTable userRole="customer" />
    </div>
  );
}