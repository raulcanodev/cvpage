import { UserProvider } from '../context/UserContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <div className="dashboard-layout">
        {children}
      </div>
    </UserProvider>
  );
}