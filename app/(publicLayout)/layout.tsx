import Navbar from "@/components/shared/Navbar"


const PublicLayout = async(
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

export default PublicLayout