import { UserProvider } from '../context/UserContext';
import { Toaster } from 'sonner';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <Toaster position="top-center" />
      <div className="dashboard-layout">
        {children}
      </div>
    </UserProvider>
  );
}