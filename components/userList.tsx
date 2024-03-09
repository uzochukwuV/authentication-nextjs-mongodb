"use client";
import React, { Key, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  name: String;
  email: String;
  _id: String;
  image?: String;
  isAdmin: boolean;
  likes?: String[];
  age?: number;
}

async function getData() {
  const res = await fetch("/api/users");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export function Users() {
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0)
  const router = useRouter()
  const getUsers = async () => {
    const data = await getData();
    console.log(data.data);

    setUser(data.data);
    setLoading(false);
  };

  useEffect(() => {
    console.log(user);
    
    return () => {
      getUsers();
    };
  }, []);

  const handleDelete = (id: any) => {

    const val = fetch("/api/user/delete", {
      body: JSON.stringify({ id }),
      method:'POST'
    });
    const  det = val.then((res)=> res.json()
    ).then((va)=>      
        user.findIndex((obg)=> obg._id === va.data._id)
    )

    det.then((res)=> setUser(user.toSpliced(res, 1))
    )

    
    

    // setUser(user.toSpliced(index,1))

    // console.log(user);
    

  };

  return (
    <div>
      <ul className="flex gap-4 flex-col text-pretty font-serif font-medium text-sm">
        {user.length > 0 &&
          user.map((mem, ind) => (
            <div className="flex justify-between gap-3" key={mem._id as Key}>
              <div className="flex gap-2">
                <div>
                  <Link href={`/user/${mem._id}`}>
                    <Image
                      alt="mem"
                      src={`${mem.image || ""}`}
                      width={80}
                      height={80}
                    ></Image>
                  </Link>
                </div>
                <div className="text-start ">
                  <p className="text-xl">{mem.name}</p>
                  <p className="text-slate-600">
                    {mem.email} {mem.age || ""}
                  </p>
                  <p>
                    {index}, {ind}
                  </p>
                </div>
              </div>

              <div>
                <input type="checkbox" name="" id="" checked={mem.isAdmin} />
                <div>
                  <button className="border border-red-500 px-4 py-2" onClick={() => handleDelete(mem._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
      </ul>

      {loading && (
        <>
          <p className=" animate-ping delay-75 0h-20 w-20 rounded-full bg-slate-100 mt-2">
            .
          </p>
          <p className=" animate-ping delay-200 h-20 w-20 rounded-full bg-slate-100 mt-2">
            .
          </p>
          <p className=" animate-ping delay-50 h-20 w-20 rounded-full bg-slate-100 mt-24">
            .
          </p>
          <p className=" animate-ping delay-700 h-20 w-20 rounded-full bg-slate-100 mt-24">
            .
          </p>
        </>
      )}
    </div>
  );
}

export default Users;
