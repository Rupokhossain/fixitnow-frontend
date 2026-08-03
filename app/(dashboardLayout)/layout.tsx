export const dynamic = "force-dynamic";


import { Header } from "./_components/header"
import { Sidebar } from "./_components/sidebar"



const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="pt-24 pr-4 pb-8 pl-0 transition-all duration-300 lg:pl-64">
        <div className="mx-auto max-w-7xl px-4">{children}</div>
      </main>
    </div>
  )
}

export default DashboardLayout
