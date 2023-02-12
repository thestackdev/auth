import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full gap-4">
      <span className="text-lg text-gray-900 md:text-4xl dark:text-white">
        You are logged in as{' '}
        {session.user.name ? session.user.name : session.user.email}
      </span>
      <div className="flex gap-2">
        <Link
          href="/settings"
          className="text-white w-fit bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Settings
        </Link>
        <button
          type="button"
          className="text-white w-fit bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          onClick={signOut}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

Home.auth = true
