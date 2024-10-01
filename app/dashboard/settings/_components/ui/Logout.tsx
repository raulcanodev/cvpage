import { Button } from '@/components/ui';
import { signOut } from "next-auth/react";
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation'

export function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.push("/auth/login");
    });
  }


  return (
    <Button
      onClick={handleLogout}
      className="dark:text-zinc-100 text-zinc-500"
    >
      <LogOut className="h-4 w-4 mr-2" />
      LOGOUT
    </Button>
  );
}
