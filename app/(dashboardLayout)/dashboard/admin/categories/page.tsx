/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Plus, Search, Loader2, Layers, LayoutGrid, Info, CheckCircle2, FolderPlus, Hash, AlignLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

import { categorySchema, CategoryFormValues } from "@/app/schemas/category.schema"
import { useGetCategoriesQuery, useAddCategoryMutation } from "@/app/redux/api/categoryApi"
import DashboardSkeleton from "@/app/(dashboardLayout)/_components/dashboard-skeleton"

export default function CategoryManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { data, isLoading } = useGetCategoriesQuery({})
  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation()

  const categories = data?.data || []

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
  })

  const onSubmit = async (formData: CategoryFormValues) => {
    try {
      await addCategory(formData).unwrap()
      toast.success("Deployment Successful: New department added.")
      reset()
      setIsDialogOpen(false)
    } catch (err: any) {
      toast.error(err?.data?.message || "Deployment Failed")
    }
  }

  const filteredCategories = categories.filter((cat: any) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) return <DashboardSkeleton />

  return (
    <div className="space-y-10 pb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      
      {/* 1. Page Title & Global Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.4em] mb-2">
             <div className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
             Live Inventory
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground uppercase italic leading-none">
            Service <span className="text-primary NOT-italic">Clusters</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 bg-card border border-border p-2 rounded-2xl shadow-sm">
           <Badge className="bg-primary text-white hover:bg-primary px-4 py-1.5 rounded-xl font-bold uppercase tracking-widest text-[10px]">
             {categories.length} Total Departments
           </Badge>
        </div>
      </div>

      {/* 2. Action Bar: Search + Create Button */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute top-1/2 left-4 -translate-y-1/2 transform text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
          <Input
            placeholder="Quick search department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-14 rounded-2xl border-border bg-card/50 pl-12 text-md shadow-xl shadow-primary/5 focus:ring-primary backdrop-blur-sm"
          />
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-14 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/30 transition-all active:scale-95 gap-3">
              <FolderPlus size={18} /> New Category
            </Button>
          </DialogTrigger>
          
          {/* Glassmorphism Dialog */}
          <DialogContent className="sm:max-w-lg rounded-[3rem] p-0 border-none overflow-hidden bg-white shadow-none">
            <div className="bg-card/90 backdrop-blur-2xl border border-white/20 p-10 space-y-8">
              <DialogHeader className="space-y-3">
                <div className="h-14 w-14 rounded-3xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30 rotate-3">
                   <Plus size={32} strokeWidth={3} />
                </div>
                <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter text-foreground">
                  Launch <span className="text-primary NOT-italic">Category</span>
                </DialogTitle>
                <DialogDescription className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest">
                  Configure a new service cluster for the platform
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                       <Hash size={14} /> Name of Cluster
                    </div>
                    <Input {...register("name")} placeholder="e.g. Home Sanitation" className="h-14 rounded-2xl border-border bg-background/50 focus:ring-primary font-bold text-md" />
                    {errors.name && <p className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                       <AlignLeft size={14} /> Scope Description
                    </div>
                    <textarea
                      {...register("description")}
                      placeholder="Define the boundaries of this cluster..."
                      className="min-h-32 w-full rounded-4xl border border-border bg-background/50 px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground"
                    />
                    {errors.description && <p className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1">{errors.description.message}</p>}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-muted">Cancel</Button>
                  <Button type="submit" disabled={isAdding} className="flex-2 h-14 rounded-2xl bg-primary font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20">
                    {isAdding ? <Loader2 className="h-5 w-5 animate-spin" /> : "Deploy Now"}
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 3. High-Contrast Premium Table */}
      <Card className="rounded-[3rem] border-border bg-card shadow-2xl shadow-primary/5 overflow-hidden">
        <div className="bg-muted/30 px-10 py-8 border-b border-border/50 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                 <LayoutGrid size={20} />
              </div>
              <div>
                 <h3 className="font-black uppercase tracking-tighter text-xl italic leading-none">Cluster <span className="text-primary NOT-italic">Log</span></h3>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Platform Architecture Data</p>
              </div>
           </div>
        </div>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="border-b border-border/50 hover:bg-transparent">
                  <TableHead className="px-10 py-6 font-black uppercase tracking-[0.2em] text-[10px] text-muted-foreground w-1/3">Cluster Name</TableHead>
                  <TableHead className="px-10 py-6 font-black uppercase tracking-[0.2em] text-[10px] text-muted-foreground w-2/3 text-right md:text-left">Scope & Operations</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category: any, i: number) => (
                    <TableRow key={category._id || category.id} className="border-b border-border/40 transition-all last:border-0 hover:bg-primary/[0.02] group">
                      <TableCell className="px-10 py-8">
                         <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-2xl bg-muted group-hover:bg-primary transition-all flex items-center justify-center text-muted-foreground group-hover:text-white font-black text-xs">
                               {i + 1}
                            </div>
                            <span className="font-black text-foreground text-md uppercase tracking-tight group-hover:text-primary transition-colors">{category.name}</span>
                         </div>
                      </TableCell>
                      <TableCell className="px-10 py-8">
                         <p className="text-muted-foreground font-medium text-sm leading-relaxed max-w-2xl line-clamp-2 italic group-hover:text-foreground transition-colors">
                           {category.description || "System has no predefined scope for this cluster. Update required."}
                         </p>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="py-32 text-center">
                       <div className="flex flex-col items-center gap-6 opacity-30">
                          <div className="p-8 rounded-[2.5rem] bg-muted/50 border border-dashed border-border">
                             <Info size={64} strokeWidth={1} />
                          </div>
                          <p className="text-xl font-black uppercase tracking-tighter italic">No Operational Clusters Found</p>
                       </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Small Decorative Footer */}
      <div className="flex items-center justify-center gap-3 text-muted-foreground opacity-30 select-none">
         <div className="h-px w-10 bg-current" />
         <CheckCircle2 size={14} />
         <p className="text-[10px] font-black uppercase tracking-[0.3em]">End of Audit Log</p>
         <div className="h-px w-10 bg-current" />
      </div>
    </div>
  )
}