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
      className="border-none"
      variant={"outline"}
    >
      <LogOut className="h-4 w-4 mr-2" />
      LOGOUT
    </Button>
  );
}
