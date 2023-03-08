import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Note Taker - Home</title>
        <meta name="description" content="A note taking app built with T3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col justify-center items-center">   
        <div className="max-w-2xl mt-10">
          <div>
            <h1 className="font-bold text-4xl text-center mb-6">NoteTaker</h1>
            <p>A note app created with <b>NextJS</b>, <b>tRPC</b>, <b>TailwindCSS</b>, <b>Radix</b>, <b>SupaBase</b>, and <b>Prisma</b></p>
          </div>
          <div className="container flex flex-row items-center justify-center space-x-2 px-4 py-8">
            <Link href={"/dashboard"}>
              <Button >
                Try it out
              </Button>
            </Link>
          </div>
        </div>
      
      </main>
    </>
  );
};

export default Home;
