import { useState, useEffect } from 'react';
import { Input, Textarea } from '@/components/ui/';
import { UserLocation, UserInstagram, UserTwitter, UserLinkedin, UserGithub, UserAvatar } from '../ui';
import { useUserContext } from '@/app/dashboard/context/UserContext';

export function EditUser() {
  const { userData, updateUserData, updateUserDomain } = useUserContext();
  const { name, description, customDomain } = userData;
  const [error, setError] = useState(null);

  // Local state for name, description, and customDomain
  const [nameInput, setNameInput] = useState(name);
  const [descriptionInput, setDescriptionInput] = useState(description);
  const [domainInput, setDomainInput] = useState(customDomain);
  
  const [hasDomainChanged, setHasDomainChanged] = useState(false);
  const [hasNameChanged, setHasNameChanged] = useState(false);
  const [hasDescriptionChanged, setHasDescriptionChanged] = useState(false);

  // Update local state when userData changes
  useEffect(() => {
    setNameInput(name); // Sync name with userData
    setDescriptionInput(description); // Sync description with userData
    setDomainInput(customDomain); // Sync customDomain with userData
  }, [name, description, customDomain]);

  // Debounce logic for updating the domain
  useEffect(() => {
    if (hasDomainChanged) {
      const handler = setTimeout(() => {
        if (domainInput !== customDomain) {
          const escapedDomain = domainInput
            .replace(/[^a-zA-Z0-9-]/g, '')
            .trim()
            .toLowerCase(); // Clean domain input
          updateUserDomain(userData._id, escapedDomain); // Update domain
        }
        setHasDomainChanged(false);
      }, 500); // Debounce delay

      return () => {
        clearTimeout(handler);
      };
    }
  }, [domainInput, customDomain, userData._id, hasDomainChanged, updateUserDomain]);

  // Debounce logic for updating the name
  useEffect(() => {
    if (hasNameChanged) {
      const handler = setTimeout(() => {
        if (nameInput !== name) {
          updateUserData(userData._id, { name: nameInput });
        }
        setHasNameChanged(false);
      }, 500); // Debounce delay for name

      return () => {
        clearTimeout(handler);
      };
    }
  }, [nameInput, name, userData._id, hasNameChanged, updateUserData]);

  // Debounce logic for updating the description
  useEffect(() => {
    if (hasDescriptionChanged) {
      const handler = setTimeout(() => {
        if (descriptionInput !== description) {
          updateUserData(userData._id, { description: descriptionInput });
        }
        setHasDescriptionChanged(false);
      }, 500); // Debounce delay for description

      return () => {
        clearTimeout(handler);
      };
    }
  }, [descriptionInput, description, userData._id, hasDescriptionChanged, updateUserData]);

  // Handlers for input changes
  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomainInput(e.target.value);
    setHasDomainChanged(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
    setHasNameChanged(true);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionInput(e.target.value);
    setHasDescriptionChanged(true);
  };

  return (
    <>
      <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg">
        <div className="flex items-center space-x-2 mb-4">
          <UserAvatar />
          <div>
            <Input
              className="text-2xl font-bold text-white bg-zinc-900 border-zinc-900 focus:ring-transparent"
              value={nameInput}
              placeholder="Great Name"
              onChange={handleNameChange} // Debounced update for name
            />
          </div>
        </div>

        <Textarea
          className="bg-zinc-900 text-white border-zinc-900 my-7 focus:ring-0"
          value={descriptionInput}
          placeholder="Tell us about yourself..."
          onChange={handleDescriptionChange} // Debounced update for description
        />

        <div className="flex text-zinc-400 md:justify-between md:items-center md:flex-row flex-col gap-3">
          <div className="flex gap-4">
            <UserLocation />
            <UserInstagram />
            <UserTwitter />
            <UserLinkedin />
            <UserGithub />
          </div>

          <div className="flex row">
            <div className="flex rounded-md shadow-sm">
              <div className="relative flex-grow">
                <span className="absolute inset-y-0 left-0 flex items-center pl-0 text-gray-400">
                  hitme.to/
                </span>
                <Input
                  type="text"
                  placeholder="yourname"
                  value={domainInput}
                  onChange={handleDomainChange} // Debounced update for domain
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