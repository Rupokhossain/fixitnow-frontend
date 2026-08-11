/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  Search,
  Loader2,
  ShieldCheck,
  Mail,
  Ban,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
} from "@/app/redux/api/userApi"
import { toast } from "sonner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useRef, useState } from "react"
import DashboardSkeleton from "@/app/(dashboardLayout)/_components/dashboard-skeleton"
import { cn } from "@/lib/utils"

export default function UserManagement() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [roleFilter, setRoleFilter] = useState("ALL")

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSearch = (value: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value.trim()) params.set("searchTerm", value.trim())
      else params.delete("searchTerm")
      router.replace(`${pathname}?${params.toString()}`)
    }, 500)
  }

  const searchTerm = searchParams.get("searchTerm") || ""
  const { data, isLoading } = useGetAllUsersQuery({ searchTerm })
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateUserStatusMutation()

  const users = (data?.data || []).filter((u: any) =>
    roleFilter === "ALL" ? true : u.role === roleFilter
  )

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE"
    try {
      await updateStatus({ id, status: newStatus }).unwrap()
      toast.success(`User status updated to ${newStatus}`)
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed")
    }
  }

  if (isLoading) return <DashboardSkeleton />

  return (
    <div className="animate-in space-y-8 pb-10 duration-700 fade-in slide-in-from-bottom-4">
      {/* 1. Header Section */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl leading-none font-black tracking-tighter text-foreground uppercase italic">
            User <span className="NOT-italic text-primary">Management</span>
          </h1>
          <p className="mt-1 text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
            Control center for all platform members
          </p>
        </div>
        <Badge className="rounded-xl border-secondary/20 bg-secondary/10 px-4 py-2 font-bold text-secondary">
          Total Members: {users.length}
        </Badge>
      </div>

      {/* 2. Search & Filter Bar (Requirement 7.3) */}
      <Card className="bg-card/50 rounded-2xl border-border shadow-xl shadow-primary/5 backdrop-blur-sm">
        <CardContent className="flex flex-col gap-4 p-4 md:flex-row">
          <div className="group relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="Search by name or email address..."
              defaultValue={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="h-12 w-full rounded-xl border-border bg-background pl-10 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="h-4 w-4 text-primary" />
            <select
              className="h-12 w-full rounded-xl border border-border bg-background px-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary md:w-48"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="ALL">All Roles</option>
              <option value="CUSTOMER">Customer</option>
              <option value="TECHNICIAN">Technician</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* 3. Data Table (Requirement 7.3) */}
      <Card className="bg-card overflow-hidden rounded-3xl border-border shadow-2xl shadow-primary/5">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-b border-border/50 hover:bg-transparent">
                  <TableHead className="px-6 py-5 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                    User Identity
                  </TableHead>
                  <TableHead className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                    Account Role
                  </TableHead>
                  <TableHead className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                    Current Status
                  </TableHead>
                  <TableHead className="pr-6 text-right text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                    Security Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user: any) => (
                    <TableRow
                      key={user.id}
                      className="border-b border-border/40 transition-colors last:border-0 hover:bg-primary/5"
                    >
                      <TableCell className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-foreground">
                              {user.name}
                            </p>
                            <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                              <Mail size={10} /> {user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-lg border-0 px-3 py-1 text-[10px] font-bold tracking-widest uppercase",
                            user.role === "ADMIN"
                              ? "bg-indigo-100 text-indigo-700"
                              : "bg-blue-50 text-blue-600"
                          )}
                        >
                          {user.role === "ADMIN" && (
                            <ShieldCheck size={10} className="mr-1 inline" />
                          )}
                          {user.role}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "h-2 w-2 rounded-full",
                              user.status === "ACTIVE"
                                ? "animate-pulse bg-green-500"
                                : "bg-red-500"
                            )}
                          />
                          <span
                            className={cn(
                              "text-xs font-black tracking-tighter uppercase",
                              user.status === "ACTIVE"
                                ? "text-green-600"
                                : "text-red-600"
                            )}
                          >
                            {user.status}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="pr-6 text-right">
                        <Button
                          size="sm"
                          variant={
                            user.status === "ACTIVE" ? "outline" : "default"
                          }
                          className={cn(
                            "h-9 w-28 rounded-xl text-[10px] font-black tracking-widest uppercase shadow-sm transition-all active:scale-95",
                            user.status === "ACTIVE"
                              ? "border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                              : "bg-primary hover:bg-primary/90"
                          )}
                          onClick={() =>
                            handleToggleStatus(user.id, user.status)
                          }
                          disabled={isUpdating}
                        >
                          {isUpdating ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : user.status === "ACTIVE" ? (
                            <>
                              <Ban size={12} className="mr-2" /> Ban User
                            </>
                          ) : (
                            <>
                              <CheckCircle2 size={12} className="mr-2" /> Unban
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="py-24 text-center font-bold text-muted-foreground italic"
                    >
                      No users found on the system.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 4. Pagination (Requirement 7.3) */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase italic">
          Showing <span className="text-foreground">{users.length}</span> active
          records
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-10 w-10 rounded-xl border-border hover:bg-muted"
            disabled
          >
            <ChevronLeft size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-10 w-10 rounded-xl bg-primary font-black text-white hover:bg-primary/90"
          >
            1
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-10 w-10 rounded-xl border-border hover:bg-muted"
            disabled
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
