import { SideBanner } from './components/SideBanner';
import { Toaster } from 'sonner';
import Image from 'next/image';
import cvpageWhite from '@/public/icon.png';


export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-white flex">
      <Toaster position="top-center" />
      {/* <SideBanner /> */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        
      
        <div className="mx-auto w-full max-w-sm">
        {/* <div className="flex items-center justify-center">
          <Image src={cvpageWhite} alt="Logo" width={50} height={50} />
        </div> */}
          {children}</div>
      </div>
    </div>
  );
}
