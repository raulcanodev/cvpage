import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default async function AuthButton() {
  const session = await getServerSession(authOptions);
  const router = useRouter();

  const showSession = () => {
    if (session) {
      return (
        <>
          <button
            className=""
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                router.push("/");
              });
            }}
          >
            Sign Out
          </button>
        </>
      );
    } else if (!session) {
      return <span className="">Loading...</span>;
    } else {
      return (
        <>
          <Link href="/login" className="">
            Log In
          </Link>
        </>
      );
    }
  };

  return showSession();
}
