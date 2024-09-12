
import { SideBanner } from "./components/SideBanner";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="min-h-screen bg-black text-white flex">
        <SideBanner />
        {children}
      </div>
  );
}