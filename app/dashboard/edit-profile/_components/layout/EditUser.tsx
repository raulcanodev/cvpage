import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage, Input, Textarea, Button } from '@/components/ui/';
import { UserLocation, UserEmail, UserInstagram, UserTwitter, UserLinkedin, UserGithub } from '../ui';
import { useUserContext } from '@/app/dashboard/context/UserContext';
import { Toaster, toast } from 'sonner';

export function EditUser() {
  const { userData, updateUserData } = useUserContext();
  const { name, description, customDomain } = userData;
  const [error, setError] = useState(null);

  // Local state for customDomain
  const [domainInput, setDomainInput] = useState(customDomain);
  const [hasDomainChanged, setHasDomainChanged] = useState(false); // Flag to check if user changed input

  // Update local state when userData changes
  useEffect(() => {
    setDomainInput(customDomain); // Update domain input if customDomain changes
  }, [customDomain]);

  // Update domain only when user stops typing and input is different from initial value
  useEffect(() => {
    if (hasDomainChanged) {
      const handler = setTimeout(() => {
        if (domainInput !== customDomain) {
          const escapedDomain = domainInput
            .replace(/[^a-zA-Z0-9-]/g, '')
            .trim()
            .toLowerCase(); // Remove special characters, trim whitespace, and convert to lowercase
          updateUserData(userData._id, { customDomain: escapedDomain });
        }
        setHasDomainChanged(false); // Reset the flag after update
      }, 500); // Debounce time (500ms)

      return () => {
        clearTimeout(handler); // Clear the timeout if user types again
      };
    }
  }, [domainInput, customDomain, userData._id, hasDomainChanged, updateUserData]);

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomainInput(e.target.value);
    setHasDomainChanged(true); // Mark that user has changed the domain input
  };

  return (
    <>
      <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg">
        <div className="flex items-center space-x-2 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="" alt="Raul Cano" />
            <AvatarFallback>:D</AvatarFallback>
          </Avatar>
          <div>
            <Input
              className="text-2xl font-bold text-white bg-zinc-900 border-zinc-900 focus:ring-transparent"
              defaultValue={name}
              placeholder="Your name"
              onChange={(e) => updateUserData(userData._id, { name: e.target.value })}
            />
          </div>
        </div>

        <Textarea
          className="bg-zinc-900 text-white border-zinc-900 my-7 focus:ring-0"
          defaultValue={description}
          placeholder="Tell us about yourself..."
          onChange={(e) => updateUserData(userData._id, { description: e.target.value })}
        />

        <div className="flex text-zinc-400 md:justify-between md:items-center md:flex-row flex-col gap-3">
          <div className="flex gap-4">
            <UserLocation />
            <UserInstagram />
            <UserTwitter />
            <UserLinkedin />
            <UserGithub />
            <UserEmail />
          </div>

          <div className="flex row ">
            <div className="flex rounded-md shadow-sm">

              <div className="relative flex-grow ">
                <span className="absolute inset-y-0 left-0 flex items-center pl-0 text-gray-400">
                  hitme.to/
                </span>
                <Input
                  type="text"
                  placeholder="yourname"
                  value={domainInput}
                  onChange={handleDomainChange}
                  className="pl-[4.3rem] bg-zinc-900 border-none text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
