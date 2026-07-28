import Navbar from "@/components/shared/Navbar"


const AuthLayout = async(
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

export default AuthLayout