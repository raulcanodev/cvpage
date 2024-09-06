import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Paintbrush, BarChart2, Settings, Menu, X, Cog } from 'lucide-react';
import { ThemeSwitcher } from '@/components/layout';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui';

const menuItems = [
  { icon: User, label: 'Profile', href: '/dashboard/profile' },
  { icon: Paintbrush, label: 'Design', href: '/dashboard/design' },
  { icon: BarChart2, label: 'Analytics', href: '/dashboard/analytics' },
];

//* Add to the layout >
export function DashboardNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-zinc-950 text-white fixed w-full z-50">
      <div className="container mx-auto py-3">
        <div className="flex justify-between items-center">
          <Link href="/dashboard" className="text-xl font-bold">
            hitme.to
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="flex items-center space-x-2 hover:text-gray-300 transition-colors">
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </div>
              </Link>
            ))}
            <div>
              <Menubar className="flex items-center border-none hover:text-gray-300 transition-colors">
                <MenubarMenu>
                  <MenubarTrigger className="cursor-pointer">
                    <div className="flex items-center gap-2 hover:text-gray-300 transition-colors">
                      <Cog className="w-5 h-5" />
                      <span className="text-sm">Settings</span>
                    </div>
                  </MenubarTrigger>
                  <MenubarContent className="bg-[#2C2C2E]">
                    <MenubarItem className="text-white focus:bg-[#3A3A3C] focus:text-white">
                      Reset Password
                    </MenubarItem>
                    <MenubarItem className="text-white focus:bg-[#3A3A3C] focus:text-white">
                      Logout
                    </MenubarItem>
                    <MenubarItem>
                      <div className="flex items-center justify-between w-full">
                        <span>Dark Mode</span>
                        <ThemeSwitcher />
                      </div>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-64 bg-zinc-950 shadow-lg md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-end items-center p-4 border-b border-gray-800">
                {/* <span className="text-xl font-bold">Menu</span> */}
                <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col space-y-4 p-4">
                {menuItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                    <div className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded transition-colors">
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                ))}
                <ThemeSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
