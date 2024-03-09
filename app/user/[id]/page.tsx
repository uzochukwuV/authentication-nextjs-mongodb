'use client'

import UserDetails from "@/components/userDetails";
import { useState } from "react";

export default function Page({ params }: { params: { id: string } }) {

  const [id, setId] = useState(params.id)

    return <div className="h-screen bg-white">My Post: {params.id}
        <UserDetails id={id} />
    </div>
  }