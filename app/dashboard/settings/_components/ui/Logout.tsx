import { Button } from '@/components/ui';
import { signOut } from "next-auth/react";
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation'

export function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.push("/auth/signin");
    });
  }


  return (
    <Button
      onClick={handleLogout}
      className="dark:bg-zinc-950 bg-zinc-50 text-black dark:text-white"
    >
      <LogOut className="h-4 w-4 mr-2" />
      LOGOUT
    </Button>
  );
}
