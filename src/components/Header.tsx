import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button"
import Navigation from "./Navigation";

export const Header = () => {

  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-row items-center py-4 justify-between border-b mb-4">
      <div>
        <Navigation />
      </div>
      <div className="flex justify-center items-center space-x-2">
        { sessionData?.user?.name ? <p>{`Notes for ${sessionData.user.name}`}</p> : <p>Please log in</p>}
        <Button
          variant="subtle"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </Button>
      </div>
    
    </div>
    
  )
}

export default Header