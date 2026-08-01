/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Search, Loader2 } from "lucide-react"
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
import {
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
} from "@/app/redux/api/userApi"
import { toast } from "sonner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useRef } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN"
  status: "ACTIVE" | "BANNED"
}


export default function UserManagement() {


  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSearch = (value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())

      if (value.trim()) {
        params.set("searchTerm", value.trim())
      } else {
        params.delete("searchTerm")
      }

      router.replace(`${pathname}?${params.toString()}`)
    }, 500)
  }

  const searchTerm = searchParams.get("searchTerm") || ""

  const { data, isLoading } = useGetAllUsersQuery({
    searchTerm,
  })

  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateUserStatusMutation()

  const users = data?.data || []

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE"

    try {
      await updateStatus({ id, status: newStatus }).unwrap()
      toast.success(`User is now ${newStatus}`)
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status")
    }
  }

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin" />
      </div>
    )

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search by name or email..."
          defaultValue={searchParams.get("searchTerm") || ""}
          onChange={(e) => handleSearch(e.target.value)}
          className="border-gray-200 bg-white pl-10"
        />
      </div>


      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <Table className="table-fixed">
          <TableHeader className="bg-gray-50">
            <TableRow className="border-gray-200 hover:bg-gray-50">
              <TableHead className="font-semibold text-gray-900">
                Name
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Email
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Role
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Status
              </TableHead>
              <TableHead className="w-30 text-right font-semibold text-gray-900">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      user.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end">
                    <Button
                      className="w-24 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      size="sm"
                      variant={
                        user.status === "ACTIVE" ? "destructive" : "default"
                      }
                      onClick={() => handleToggleStatus(user.id, user.status)}
                      disabled={isUpdating}
                    >
                      {user.status === "ACTIVE" ? "Ban" : "Unban"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
