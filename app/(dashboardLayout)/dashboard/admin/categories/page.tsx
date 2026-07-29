'use client'

import { useState } from 'react'
import { Trash2, Edit, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Category {
  id: string
  name: string
  description: string
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Plumbing', description: 'Pipe repairs, drain cleaning, and water system maintenance' },
    { id: '2', name: 'Electrical', description: 'Wiring, installation, and electrical repairs' },
    { id: '3', name: 'HVAC', description: 'Heating, ventilation, and air conditioning services' },
    { id: '4', name: 'Carpentry', description: 'Woodworking, repairs, and installations' },
    { id: '5', name: 'Painting', description: 'Interior and exterior painting services' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', description: '' })

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateCategory = () => {
    if (formData.name.trim()) {
      if (editingId) {
        setCategories(
          categories.map((cat) =>
            cat.id === editingId
              ? { ...cat, name: formData.name, description: formData.description }
              : cat
          )
        )
        setEditingId(null)
      } else {
        const newCategory: Category = {
          id: Date.now().toString(),
          name: formData.name,
          description: formData.description,
        }
        setCategories([...categories, newCategory])
      }
      setFormData({ name: '', description: '' })
      setIsDialogOpen(false)
    }
  }

  const handleEditCategory = (category: Category) => {
    setFormData({ name: category.name, description: category.description })
    setEditingId(category.id)
    setIsDialogOpen(true)
  }

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setEditingId(null)
    setFormData({ name: '', description: '' })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">Manage service categories</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus size={18} />
              Create Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Category' : 'Create New Category'}</DialogTitle>
              <DialogDescription>
                {editingId ? 'Update the category details below.' : 'Add a new service category to your platform.'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <Input
                  id="name"
                  placeholder="e.g., Plumbing"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Brief description of the category..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full min-h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button onClick={handleCreateCategory} className="bg-blue-600 hover:bg-blue-700">
                {editingId ? 'Update' : 'Create'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300"
            />
          </div>
        </CardHeader>
      </Card>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
          <CardDescription>{filteredCategories.length} categories found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 hover:bg-transparent">
                  <TableHead className="text-gray-700 font-semibold">Category Name</TableHead>
                  <TableHead className="text-gray-700 font-semibold">Description</TableHead>
                  <TableHead className="text-gray-700 font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <TableRow key={category.id} className="border-gray-200 hover:bg-gray-50 transition-colors">
                      <TableCell className="font-medium text-gray-900">{category.name}</TableCell>
                      <TableCell className="text-gray-600 max-w-md truncate">{category.description}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditCategory(category)}
                            className="gap-1 border-gray-300 hover:bg-blue-50"
                          >
                            <Edit size={16} />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteCategory(category.id)}
                            className="gap-1 border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                      No categories found. Try adjusting your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
