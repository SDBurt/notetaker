
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Inter as FontSans } from "next/font/google"

import { api } from "@/utils/api";


import "@/styles/globals.css";
import MainLayout from "@/components/layouts/MainLayout";


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <style jsx global>{`
				:root {
					--font-sans: ${fontSans.style.fontFamily};
				}
			}`}</style>
      <SessionProvider session={session}>
        <MainLayout>
          <Component {...pageProps} /> 
        </MainLayout>
      </SessionProvider>
    </>
    
  );
};

export default api.withTRPC(MyApp);
