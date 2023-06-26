'use client'
import { useSession, signOut } from "next-auth/react"

export default function ProfilePage() {

  const { data: session, status } = useSession()

  console.log(session, status)

  return (
    <div className=" justify-center  flex  flex-col gap-3 items-center">
      <h1 className="font-bold text-3xl">Profile</h1>
      <pre className=" bg-zinc-800 text-white p-4">
        {JSON.stringify(
          {
            session,
            status,
          },
          null,
          2
        )}
      </pre>
      <button className=" bg-red-400 text-white px-4 py-2 mb-2"
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </button>
    </div>
  )
}