import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button"

export const Header = () => {

  const { data: sessionData } = useSession();

  console.log(sessionData)

  return (
    <div className="flex flex-row items-center justify-center mt-2 max-w-xl space-x-2">
      {/* <Navigation /> */}
      <div className="flex">
        { sessionData?.user?.name ? `Notes for ${sessionData.user.name}` : "Please log in"}
      </div>
      <div className="flex flex-row ">
        <Button
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </Button>
        
        
      </div>
    </div>
    
  )
}

export default Header