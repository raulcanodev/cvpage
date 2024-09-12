import { SideBanner } from "./components/SideBanner";
import { Toaster } from 'sonner';

export default function AuthLayout({ children }: { children: React.ReactNode }) {

  return (
      <div className="min-h-screen bg-black text-white flex">
        <Toaster position="top-center" />
        <SideBanner />
        {children}
      </div>
  );
}