import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Spinner from "@/components/spinner";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/login");
  }, [session, status]);

  if (status === "loading")
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full gap-4">
      <span className="text-lg text-gray-900 md:text-4xl dark:text-white">
        You are logged in as{" "}
        {session.user.name ? session.user.name : session.user.email}
      </span>
      <button
        type="button"
        className="text-white w-fit bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={signOut}
      >
        Logout
      </button>
    </div>
  );
}

Home.auth = true;
