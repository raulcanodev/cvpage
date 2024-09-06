'use client';
import { EditUser, EditUserServices, Preview } from './_components/layout';

export default function DashboardEditProfile() {
  return (
    <>
      <div className="">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - User */}
          <div className="flex-1 space-y-8 ">
            <EditUser />
            <EditUserServices />
          </div>
          {/* Right - Phone Preview */}
          <div className="lg:w-1/3">
            <Preview />
          </div>
        </div>
      </div>
    </>
  );
}
