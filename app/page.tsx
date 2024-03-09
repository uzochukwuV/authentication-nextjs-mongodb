import { Users } from "@/components/userList";
import Image from "next/image";



export default function Home() {
  

  return (
    <main className="bg-white h-full absolute top-0 left-0 right-0">
      <nav className="h-16 shadow-sm z-10 flex items-center justify-between p-8">
        <div>
          <Image src={'vercel.svg'} height={80} width={80} alt="logo" ></Image>
        </div>
        <div className="flex gap-4">
            <div>
              <a href="/" className="border px-4 py-2" >Login</a>
            </div>
            <div>
              <a href="/auth/register" className="border px-4 py-2 bg-gray-700 text-white" >Sign up</a>
            </div>
        </div>
      </nav>
      <div className="h-full p-8 flex flex-col  items-center gap-4">
              <div className="max-w-md w-full text-center">
                <h1 className="font-mono text-5xl text-gray-700">Home Page</h1>
              </div>
              <div>
                <h2 className="font-bold text-xl text-gray-700">List of Users</h2>
                <Users />
              </div>
      </div>
    </main>
  );
}
