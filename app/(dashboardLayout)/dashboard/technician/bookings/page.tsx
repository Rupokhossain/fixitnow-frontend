import { BookingsTable } from "../../../_components/bookings-table";

export default function TechnicianBookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Incoming Job Requests</h1>
        <p className="text-gray-600">Manage your bookings and update job status</p>
      </div>

      <BookingsTable userRole="technician" />
    </div>
  );
}