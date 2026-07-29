'use client'

import { useState, useMemo } from 'react'
import { Search, Ban, RotateCcw } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface User {
  id: string
  name: string
  email: string
  role: 'customer' | 'technician'
  status: 'active' | 'banned'
}

const initialUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'customer',
    status: 'active',
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    email: 'mike.rodriguez@example.com',
    role: 'technician',
    status: 'active',
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    role: 'customer',
    status: 'active',
  },
  {
    id: '4',
    name: 'John Chen',
    email: 'john.chen@example.com',
    role: 'technician',
    status: 'banned',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    role: 'customer',
    status: 'active',
  },
  {
    id: '6',
    name: 'David Martinez',
    email: 'david.martinez@example.com',
    role: 'technician',
    status: 'active',
  },
  {
    id: '7',
    name: 'Rachel Brown',
    email: 'rachel.brown@example.com',
    role: 'customer',
    status: 'banned',
  },
  {
    id: '8',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    role: 'technician',
    status: 'active',
  },
]

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [users, searchQuery])

  const handleToggleBan = (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === 'active' ? 'banned' : 'active',
            }
          : user
      )
    )
  }

  const getRoleBadgeVariant = (role: string) => {
    return role === 'technician' ? 'default' : 'secondary'
  }

  const getStatusBadgeVariant = (status: string) => {
    return status === 'active' ? 'default' : 'destructive'
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white border-gray-200"
        />
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredUsers.length} of {users.length} users
      </div>

      {/* Table */}
      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="border-gray-200 hover:bg-gray-50">
              <TableHead className="font-semibold text-gray-900">Name</TableHead>
              <TableHead className="font-semibold text-gray-900">Email</TableHead>
              <TableHead className="font-semibold text-gray-900">Role</TableHead>
              <TableHead className="font-semibold text-gray-900">Status</TableHead>
              <TableHead className="font-semibold text-gray-900 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="font-medium text-gray-900">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-gray-600">{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={getRoleBadgeVariant(user.role)}
                      className="capitalize"
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getStatusBadgeVariant(user.status)}
                      className="capitalize"
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => handleToggleBan(user.id)}
                      variant={user.status === 'active' ? 'outline' : 'default'}
                      size="sm"
                      className={`${
                        user.status === 'active'
                          ? 'border-red-200 text-red-600 hover:bg-red-50'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      {user.status === 'active' ? (
                        <>
                          <Ban className="h-4 w-4 mr-1" />
                          Ban
                        </>
                      ) : (
                        <>
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Unban
                        </>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No users found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
