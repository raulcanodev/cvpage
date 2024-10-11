import { useState, useEffect, useRef } from 'react';
import { Input, Textarea } from '@/components/ui/';
import { UserLocation, UserInstagram, UserTwitter, UserLinkedin, UserGithub, UserAvatar } from '../ui';
import { useUserContext } from '@/app/dashboard/context/UserContext';
import config from '@/config';

export function EditUser() {
  const { userData, updateUserData, updateUserDomain } = useUserContext();
  const { name, description, customDomain } = userData;

  // Local state for name, description, and customDomain
  const [nameInput, setNameInput] = useState(name);
  const [descriptionInput, setDescriptionInput] = useState(description);
  const [domainInput, setDomainInput] = useState(customDomain);

  // Track if the component has mounted
  const hasMounted = useRef(false);

  // Set initial values only on mount
  useEffect(() => {
    if (!hasMounted.current) {
      setDescriptionInput(description); // Set description from userData only on first mount
      hasMounted.current = true; // Mark that the component has mounted
    }
  }, [description]); // Only run this effect when description changes

  // Set initial values for name and domain
  useEffect(() => {
    setNameInput(name); // Always set name from userData
  }, [name]);

  useEffect(() => {
    setDomainInput(customDomain); // Always set domain from userData
  }, [customDomain]);

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomainInput(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionInput(e.target.value);
  };

  // Debounced domain update
  useEffect(() => {
    const handler = setTimeout(() => {
      if (domainInput !== customDomain) {
        const escapedDomain = domainInput
          .replace(/[^a-zA-Z0-9-]/g, '')
          .trim()
          .toLowerCase(); // Clean domain input
        updateUserDomain(userData._id, escapedDomain); // Update domain
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [domainInput, customDomain, userData._id, updateUserDomain]);

  // Debounced name update
  useEffect(() => {
    const handler = setTimeout(() => {
      if (nameInput !== name) {
        updateUserData(userData._id, { name: nameInput });
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [nameInput, name, userData._id, updateUserData]);

  // Debounced description update
  useEffect(() => {
    const handler = setTimeout(() => {
      if (descriptionInput !== description) {
        updateUserData(userData._id, { description: descriptionInput });
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [descriptionInput, description, userData._id, updateUserData]);

  return (
    <>
      <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-2xl border">
        <div className="flex items-center space-x-2 mb-4">
          <UserAvatar />
          <div>
            <Input
              className="bg-transparent border-none text-2xl font-bold text-gray-900 dark:text-white focus:ring-transparent"
              value={nameInput}
              placeholder="Name"
              onChange={handleNameChange}
            />
          </div>
        </div>

        <Textarea
          className="bg-transparent text-gray-900 dark:text-white border-none my-7 focus:ring-0"
          value={descriptionInput}
          placeholder="I enjoy the purple cats that dance under the moonlight while eating ice cream"
          onChange={handleDescriptionChange}
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
            <div className="flex rounded-md">
              <div className="relative flex-grow">
                <span className="text-gray-400 pl-4">
                  {config.domainName}/{customDomain || '' }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
