import { UserProvider } from '../../context/UserContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <div className="dashboard-layout">
        {/* Here you can add the navbar, sidebar, etc... */}
        {children}
      </div>
    </UserProvider>
  );
}