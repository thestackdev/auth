import { useSession } from 'next-auth/react'

export default function Settings() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full gap-4">
        <span className="text-lg text-gray-900 md:text-4xl dark:text-white">
          You are not logged in
        </span>
      </div>
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: e.target.full_name.value,
      }),
    })
  }

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1
        className="text-3xl mb-6 font-bold text-gray-900 dark:text-white border-b pb-2
      "
      >
        Settings
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="relative cursor-pointer w-full mx-auto mb-6 flex items-center justify-center max-w-[100px] h-[100px] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="text-4xl capitalize font-bold text-gray-600 dark:text-gray-300">
            {session.user.name ? session.user.name[0] : session.user.email[0]}
          </span>
        </div>

        <div className="mb-6">
          <div>
            <label
              htmlFor="full_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Full name
            </label>
            <input
              type="text"
              id="full_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John Doe"
              defaultValue={session.user.name}
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            value={session.user.email}
            disabled
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
    </div>
  )
}
