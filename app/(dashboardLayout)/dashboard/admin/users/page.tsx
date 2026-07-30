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

// const initialUsers: User[] = [
//   {
//     id: '1',
//     name: 'Sarah Johnson',
//     email: 'sarah.johnson@example.com',
//     role: 'customer',
//     status: 'active',
//   },
//   {
//     id: '2',
//     name: 'Mike Rodriguez',
//     email: 'mike.rodriguez@example.com',
//     role: 'technician',
//     status: 'active',
//   },
//   {
//     id: '3',
//     name: 'Emma Davis',
//     email: 'emma.davis@example.com',
//     role: 'customer',
//     status: 'active',
//   },
//   {
//     id: '4',
//     name: 'John Chen',
//     email: 'john.chen@example.com',
//     role: 'technician',
//     status: 'banned',
//   },
//   {
//     id: '5',
//     name: 'Lisa Anderson',
//     email: 'lisa.anderson@example.com',
//     role: 'customer',
//     status: 'active',
//   },
//   {
//     id: '6',
//     name: 'David Martinez',
//     email: 'david.martinez@example.com',
//     role: 'technician',
//     status: 'active',
//   },
//   {
//     id: '7',
//     name: 'Rachel Brown',
//     email: 'rachel.brown@example.com',
//     role: 'customer',
//     status: 'banned',
//   },
//   {
//     id: '8',
//     name: 'James Wilson',
//     email: 'james.wilson@example.com',
//     role: 'technician',
//     status: 'active',
//   },
// ]

export default function UserManagement() {
  // const [users, setUsers] = useState<User[]>(initialUsers)
  // const [searchQuery, setSearchQuery] = useState('')

  // const filteredUsers = useMemo(() => {
  //   return users.filter((user) =>
  //     user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     user.email.toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  // }, [users, searchQuery])

  // const handleToggleBan = (userId: string) => {
  //   setUsers((prevUsers) =>
  //     prevUsers.map((user) =>
  //       user.id === userId
  //         ? {
  //             ...user,
  //             status: user.status === 'active' ? 'banned' : 'active',
  //           }
  //         : user
  //     )
  //   )
  // }

  // const getRoleBadgeVariant = (role: string) => {
  //   return role === 'technician' ? 'default' : 'secondary'
  // }

  // const getStatusBadgeVariant = (status: string) => {
  //   return status === 'active' ? 'default' : 'destructive'
  // }

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
          // value={searchQuery}
          // onChange={(e) => setSearchQuery(e.target.value)}
          defaultValue={searchParams.get("searchTerm") || ""}
          onChange={(e) => handleSearch(e.target.value)}
          className="border-gray-200 bg-white pl-10"
        />
      </div>

      {/* Results Count */}
      {/* <div className="text-sm text-gray-600">
        Showing {filteredUsers.length} of {users.length} users
      </div> */}

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
              <TableHead className="w-[120px] text-right font-semibold text-gray-900">
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
