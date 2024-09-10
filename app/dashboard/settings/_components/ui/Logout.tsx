import { Button } from '@/components/ui';
import { signOut, useSession } from "next-auth/react";
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation'

export function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.push("/");
    });
  }


  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      className="border-none text-white hover:bg-zinc-800"
    >
      <LogOut className="h-4 w-4 mr-2" />
      LOGOUT
    </Button>
  );
}
