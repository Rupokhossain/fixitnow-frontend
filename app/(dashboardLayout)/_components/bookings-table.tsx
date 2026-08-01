/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Card, CardContent, CardHeader, CardTitle 
} from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Check, X, Play, CheckCircle, CreditCard, Loader2, Star, MessageSquare 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  useGetBookingsQuery, useGetAllBookingsQuery 
} from "@/app/redux/api/bookingApi";
import { useUpdateTechBookingMutation } from "@/app/redux/api/technicianApi";
import { useCreateReviewMutation } from "@/app/redux/api/reviewApi";
import { reviewSchema, ReviewFormValues } from "@/app/schemas/review.schema";
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

export function BookingsTable({ userRole = "customer", initialData }: BookingsTableProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  // এপিআই হুকস
  const { data: adminRes, isLoading: adminLoading } = useGetAllBookingsQuery(undefined, {
    skip: !!initialData || userRole !== "admin",
  });
  const { data: bookingRes, isLoading: bookingLoading } = useGetBookingsQuery(undefined, {
    skip: !!initialData || userRole === "admin",
  });
  const [updateBooking] = useUpdateTechBookingMutation();
  const [createReview, { isLoading: isReviewing }] = useCreateReviewMutation();

  // ডাটা নির্ধারণ
  const bookings: IBooking[] = initialData ?? (userRole === "admin" ? adminRes?.data : bookingRes?.data) ?? [];
  const isLoading = !initialData && (adminLoading || bookingLoading);

  // রিভিউ ফর্ম সেটআপ
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 5, comment: "" }
  });

  const currentRating = watch("rating");

  // হ্যান্ডেলার: স্ট্যাটাস পরিবর্তন
  const handleStatusChange = async (id: string, status: string) => {
    setLoadingId(id);
    try {
      await updateBooking({ id, status }).unwrap();
      toast.success(`Booking marked as ${status.toLowerCase()}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Action failed");
    } finally {
      setLoadingId(null);
    }
  };

  // হ্যান্ডেলার: রিভিউ সাবমিট
  const onReviewSubmit = async (data: ReviewFormValues) => {
    try {
      await createReview({
        bookingId: selectedBookingId,
        rating: data.rating,
        comment: data.comment
      }).unwrap();
      toast.success("Review submitted! Thank you.");
      reset();
      setSelectedBookingId(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit review");
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <Card className="overflow-hidden rounded-2xl border shadow-sm bg-white">
      <CardHeader className="border-b bg-gray-50/50 px-6 py-4">
        <CardTitle className="text-lg font-bold text-gray-800">
          {userRole === "technician" ? "Service Requests" : userRole === "admin" ? "Platform Bookings" : "My Bookings"}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white">
              <TableRow>
                <TableHead className="px-6 py-4 font-bold text-gray-600">Service</TableHead>
                <TableHead className="font-bold text-gray-600">Scheduled At</TableHead>
                <TableHead className="font-bold text-gray-600">{userRole === "technician" ? "Customer" : "Technician"}</TableHead>
                <TableHead className="text-right font-bold text-gray-600">Price</TableHead>
                <TableHead className="text-center font-bold text-gray-600">Status</TableHead>
                <TableHead className="text-right pr-6 font-bold text-gray-600">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length > 0 ? (bookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-gray-50/30 transition-colors border-b last:border-0">
                  <TableCell className="px-6 font-bold text-gray-900">{booking.service?.name}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {booking.scheduledAt ? (
                      <div>
                        <p className="font-medium">{new Date(booking.scheduledAt).toLocaleDateString()}</p>
                        <p className="text-[10px] text-gray-400 uppercase">{new Date(booking.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    ) : "N/A"}
                  </TableCell>
                  <TableCell className="text-gray-600">{userRole === "technician" ? booking.customer?.name : (booking.technician?.name || "Pending")}</TableCell>
                  <TableCell className="text-right font-black text-gray-900">${booking.price ?? booking.service?.price ?? 0}</TableCell>
                  <TableCell className="text-center">
                    <Badge className={cn("border-0 rounded-full px-3 py-1 font-bold", statusColors[booking.status])}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-6">
                    <div className="flex justify-end gap-2">
                      {/* --- TECHNICIAN ACTIONS --- */}
                      {userRole === "technician" && (
                        <>
                          {booking.status === "REQUESTED" && (
                            <>
                              <Button size="sm" variant="outline" className="h-8 border-green-200 text-green-600" onClick={() => handleStatusChange(booking.id!, "ACCEPTED")} disabled={loadingId === booking.id}>
                                {loadingId === booking.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 border-red-200 text-red-600" onClick={() => handleStatusChange(booking.id!, "DECLINED")} disabled={loadingId === booking.id}>
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {booking.status === "PAID" && (
                            <Button size="sm" className="h-8 bg-indigo-600 hover:bg-indigo-700" onClick={() => handleStatusChange(booking.id!, "IN_PROGRESS")}>
                              <Play className="mr-1 h-3 w-3" /> Start
                            </Button>
                          )}
                          {booking.status === "IN_PROGRESS" && (
                            <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700" onClick={() => handleStatusChange(booking.id!, "COMPLETED")}>
                              <CheckCircle className="mr-1 h-3 w-3" /> Complete
                            </Button>
                          )}
                        </>
                      )}

                      {/* --- CUSTOMER ACTIONS --- */}
                      {userRole === "customer" && (
                        <>
                          {booking.status === "ACCEPTED" && (
                            <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700" onClick={() => router.push(`/dashboard/customer/bookings/${booking.id}/pay`)}>
                              <CreditCard className="mr-1 h-4 w-4" /> Pay Now
                            </Button>
                          )}
                          {booking.status === "COMPLETED" && (
                            <Dialog open={selectedBookingId === booking.id} onOpenChange={(open) => !open && setSelectedBookingId(null)}>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="h-8 border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100" onClick={() => setSelectedBookingId(booking.id!)}>
                                  <MessageSquare className="mr-1 h-3 w-3" /> Review
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px] rounded-3xl">
                                <DialogHeader>
                                  <DialogTitle className="text-2xl font-black text-center">Rate Service</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit(onReviewSubmit)} className="space-y-6 py-4">
                                  <div className="flex justify-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star key={star} size={36} className={cn("cursor-pointer transition-all hover:scale-110", star <= currentRating ? "fill-amber-400 text-amber-400" : "text-gray-200")} onClick={() => setValue("rating", star)} />
                                    ))}
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Your Experience</label>
                                    <Textarea {...register("comment")} placeholder="Describe the service quality..." className="min-h-[120px] rounded-2xl border-gray-200 focus:ring-amber-400" />
                                    {errors.comment && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.comment.message}</p>}
                                  </div>
                                  <Button type="submit" disabled={isReviewing} className="w-full h-12 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl shadow-xl">
                                    {isReviewing ? <Loader2 className="animate-spin" /> : "Submit Review"}
                                  </Button>
                                </form>
                              </DialogContent>
                            </Dialog>
                          )}
                        </>
                      )}
                      
                      {/* ADMIN OR OTHERS */}
                      {((userRole === "admin") || (userRole === "technician" && ["COMPLETED", "DECLINED"].includes(booking.status)) || (userRole === "customer" && !["ACCEPTED", "COMPLETED"].includes(booking.status))) && (
                        <span className="text-gray-300 font-bold">—</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))) : (
                <TableRow><TableCell colSpan={6} className="py-20 text-center text-gray-400 font-medium">No activity found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}