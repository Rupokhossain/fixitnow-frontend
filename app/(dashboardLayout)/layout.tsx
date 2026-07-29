import Navbar from "@/components/shared/Navbar"
import { Sidebar } from "./_components/sidebar"
import { Header } from "./_components/header"


const DashboardLayout = async(
    {
        children
    } : {
        children: React.ReactNode
    }
) => {

    const userRole = "customer"

  return ( 
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - ডানে রোল পাস করো */}
      <Sidebar userRole={userRole} />

      {/* Header */}
      <Header userName="James Miller" />

      {/* Main Content Area */}
      <main className="pt-24 pl-0 lg:pl-64 pr-4 pb-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4">
          {children}
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout