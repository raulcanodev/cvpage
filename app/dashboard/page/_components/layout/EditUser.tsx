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

  // Flags to track user editing
  const isEditingName = useRef(false);
  const isEditingDescription = useRef(false);
  const isEditingDomain = useRef(false);

  // Sync the name, description, and domain only if they have changed and not while editing
  useEffect(() => {
    if (!isEditingName.current) {
      setNameInput(name); // Sync name with userData if not editing
    }
  }, [name]);

  useEffect(() => {
    if (!isEditingDescription.current) {
      setDescriptionInput(description); // Sync description with userData if not editing
    }
  }, [description]);

  useEffect(() => {
    if (!isEditingDomain.current) {
      setDomainInput(customDomain); // Sync customDomain with userData if not editing
    }
  }, [customDomain]);

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomainInput(e.target.value);
    isEditingDomain.current = true;  // Mark as being edited
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
    isEditingName.current = true;  // Mark as being edited
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionInput(e.target.value);
    isEditingDescription.current = true;  // Mark as being edited
  };

  // Debounced domain update
  useEffect(() => {
    const handler = setTimeout(() => {
      if (domainInput !== customDomain) {
        const escapedDomain = domainInput
          .replace(/[^a-zA-Z0-9-]/g, '')
          .trim()
          .toLowerCase();  // Clean domain input
        updateUserDomain(userData._id, escapedDomain);  // Update domain
      }
      isEditingDomain.current = false;  // Reset the editing flag after updating
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
      isEditingName.current = false;  // Reset the editing flag after updating
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
      isEditingDescription.current = false;  // Reset the editing flag after updating
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
                <span className="absolute inset-y-0 left-0 flex items-center pl-0 text-gray-400">
                  {config.domainName}/
                </span>
                <Input
                  type="text"
                  placeholder="yourname"
                  value={domainInput}
                  onChange={handleDomainChange}
                  className="pl-[5.2rem] bg-transparent border-none text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
