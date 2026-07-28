import Navbar from "@/components/shared/Navbar"


const DashboardLayout = async(
    {
        children
    } : {
        children: React.ReactNode
    }
) => {

  return ( 
    <>
        <Navbar></Navbar>

        {children}
    </>
  )
}

export default DashboardLayout