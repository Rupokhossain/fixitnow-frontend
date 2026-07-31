"use client"

import { useGetTechProfileQuery, useGetTechAvailabilityQuery } from "@/app/redux/api/technicianApi";
import OverviewCards from "../../_components/overview-card";
import { Loader2, User as UserIcon, CalendarCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TechnicianOverview() {
  const { data: profileRes, isLoading: profileLoading } = useGetTechProfileQuery();
  const { data: availabilityRes, isLoading: availLoading } = useGetTechAvailabilityQuery();

  if (profileLoading || availLoading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;
  }

  const profile = profileRes?.data;
  const availability = availabilityRes?.data;

  // Overview Card এর জন্য ডাটা ক্যালকুলেশন
  const stats = {
    totalUsers: 0, 
    totalBookings: 0, // এগুলো পরে বুকিং ডাটা থেকে ক্যালকুলেট করা যাবে
    totalRevenue: profile?.technicianProfile?.pricing || 0,
    activeTechnicians: 1
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Technician Dashboard</h1>
        <p className="text-gray-600">Welcome back, {profile?.name}</p>
      </div>

      <OverviewCards stats={stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Summary */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <UserIcon size={20} className="text-blue-600" />
            <CardTitle className="text-lg">Profile Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Bio: {profile?.technicianProfile?.bio || "No bio set"}</p>
            <div className="mt-4 flex gap-2">
              <Badge variant="outline">{profile?.technicianProfile?.experience} Exp</Badge>
              <Badge variant="secondary">${profile?.technicianProfile?.pricing} /hr</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Availability Status */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <CalendarCheck size={20} className="text-green-600" />
            <CardTitle className="text-lg">Work Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${availability?.status === 'Available' ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-medium">{availability?.status || "Offline"}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Update this from your Scheduler settings.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}