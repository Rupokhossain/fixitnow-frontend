import { getMe } from "@/service/getMe"
import { Header } from "./_components/header"
import { Sidebar } from "./_components/sidebar"
import AuthInitializer from "./_components/AuthInitializer"



const DashboardLayout = async(
    {
        children
    } : {
        children: React.ReactNode
    }
) => {

  const user = await getMe();

  

  return ( 
    <div className="min-h-screen bg-gray-50">

      <AuthInitializer user={user} />
      <Sidebar />

      {/* Header */}
      <Header/>

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