/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  X,
  Play,
  CheckCircle,
  CreditCard,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useGetBookingsQuery,
  useGetAllBookingsQuery,
} from "@/app/redux/api/bookingApi";
import { useUpdateTechBookingMutation } from "@/app/redux/api/technicianApi";
import { toast } from "sonner";
import { IBooking } from "@/lib/types";
import { useRouter } from "next/navigation";

interface BookingsTableProps {
  userRole?: "customer" | "technician" | "admin";
  initialData?: IBooking[];
}

const statusColors: Record<string, string> = {
  REQUESTED: "bg-yellow-100 text-yellow-800",
  ACCEPTED: "bg-blue-100 text-blue-800",
  PAID: "bg-purple-100 text-purple-800",
  IN_PROGRESS: "bg-indigo-100 text-indigo-800",
  COMPLETED: "bg-green-100 text-green-800",
  DECLINED: "bg-red-100 text-red-800",
};

export function BookingsTable({
  userRole = "customer",
  initialData,
}: BookingsTableProps) {
  const router = useRouter();

  const { data: adminRes, isLoading: adminLoading } =
    useGetAllBookingsQuery(undefined, {
      skip: !!initialData || userRole !== "admin",
    });

  const { data: bookingRes, isLoading: bookingLoading } =
    useGetBookingsQuery(undefined, {
      skip: !!initialData || userRole === "admin",
    });

  const [updateBooking] = useUpdateTechBookingMutation();

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const bookings: IBooking[] =
    initialData ??
    (userRole === "admin" ? adminRes?.data : bookingRes?.data) ??
    [];

  const isLoading =
    !initialData && (adminLoading || bookingLoading);

  const handleStatusChange = async (
    id: string,
    status:
      | "ACCEPTED"
      | "DECLINED"
      | "IN_PROGRESS"
      | "COMPLETED"
  ) => {
    setLoadingId(id);

    try {
      await updateBooking({
        id,
        status,
      }).unwrap();

      toast.success(`Booking ${status.toLowerCase()} successfully`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="overflow-hidden rounded-2xl border shadow-sm">
      <CardHeader className="border-b bg-gray-50">
        <CardTitle className="text-lg font-bold">
          {userRole === "technician"
            ? "Service Requests"
            : userRole === "admin"
            ? "All Bookings"
            : "My Bookings"}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-6">
                  Service
                </TableHead>

                <TableHead>
                  Scheduled At
                </TableHead>

                <TableHead>
                  {userRole === "technician"
                    ? "Customer"
                    : "Technician"}
                </TableHead>

                <TableHead className="text-right">
                  Price
                </TableHead>

                <TableHead className="text-center">
                  Status
                </TableHead>

                <TableHead className="text-right pr-6">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="px-6 font-medium">
                      {booking.service?.name}
                    </TableCell>

                    <TableCell className="text-sm">
                      {booking.scheduledAt ? (
                        <>
                          {new Date(
                            booking.scheduledAt
                          ).toLocaleDateString()}
                          <br />
                          <span className="text-xs text-gray-500">
                            {new Date(
                              booking.scheduledAt
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>

                    <TableCell>
                      {userRole === "technician"
                        ? booking.customer?.name
                        : booking.technician?.name ||
                          "Not Assigned"}
                    </TableCell>

                    <TableCell className="text-right font-semibold">
                      $
                      {booking.price ??
                        booking.service?.price ??
                        0}
                    </TableCell>

                    <TableCell className="text-center">
                      <Badge
                        className={cn(
                          "border-0",
                          statusColors[booking.status]
                        )}
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="pr-6">
                      <div className="flex justify-end gap-2">

                        {/* REQUESTED */}

                        {userRole === "technician" &&
                          booking.status ===
                            "REQUESTED" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={
                                  loadingId === booking.id
                                }
                                onClick={() =>
                                  handleStatusChange(
                                    booking.id!,
                                    "ACCEPTED"
                                  )
                                }
                              >
                                {loadingId ===
                                booking.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Check className="h-4 w-4" />
                                )}
                              </Button>

                              <Button
                                size="sm"
                                variant="outline"
                                disabled={
                                  loadingId === booking.id
                                }
                                onClick={() =>
                                  handleStatusChange(
                                    booking.id!,
                                    "DECLINED"
                                  )
                                }
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}

                        {/* PAID */}

                        {userRole === "technician" &&
                          booking.status ===
                            "PAID" && (
                            <Button
                              size="sm"
                              onClick={() =>
                                handleStatusChange(
                                  booking.id!,
                                  "IN_PROGRESS"
                                )
                              }
                            >
                              <Play className="mr-1 h-4 w-4" />
                              Start
                            </Button>
                          )}

                        {/* IN PROGRESS */}

                        {userRole === "technician" &&
                          booking.status ===
                            "IN_PROGRESS" && (
                            <Button
                              size="sm"
                              onClick={() =>
                                handleStatusChange(
                                  booking.id!,
                                  "COMPLETED"
                                )
                              }
                            >
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Complete
                            </Button>
                          )}

                        {/* CUSTOMER */}

                        {userRole === "customer" &&
                          booking.status ===
                            "ACCEPTED" && (
                            <Button
                              size="sm"
                              onClick={() =>
                                router.push(
                                  `/dashboard/customer/bookings/${booking.id}/pay`
                                )
                              }
                            >
                              <CreditCard className="mr-1 h-4 w-4" />
                              Pay
                            </Button>
                          )}

                        {((userRole === "admin") ||
                          (userRole ===
                            "technician" &&
                            ["COMPLETED", "DECLINED"].includes(
                              booking.status
                            )) ||
                          (userRole ===
                            "customer" &&
                            booking.status !==
                              "ACCEPTED")) && (
                          <span className="text-gray-300">
                            —
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-20 text-center text-gray-500"
                  >
                    No bookings found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}