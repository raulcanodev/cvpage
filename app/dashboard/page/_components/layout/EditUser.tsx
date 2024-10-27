import { useState, useEffect, useRef, useCallback } from 'react';
import { Input, Textarea } from '@/components/ui/';
import {
  UserLocation,
  UserInstagram,
  UserTwitter,
  UserLinkedin,
  UserGithub,
  UserAvatar,
  UserEmail,
} from '../ui';
import { useUserContext } from '@/app/dashboard/context/UserContext';
import config from '@/config';
import { toast } from 'sonner';

export function EditUser() {
  const { userData, updateUserData } = useUserContext();
  const { name, description, customDomain } = userData;

  // Local state for name and description
  const [nameInput, setNameInput] = useState(name);
  const [descriptionInput, setDescriptionInput] = useState(description);

  // Ref to track if the update is from user input
  const isUserInput = useRef(false);

  // Update local state when userData changes
  useEffect(() => {
    if (!isUserInput.current) {
      setNameInput(name);
      setDescriptionInput(description);
    }
  }, [name, description]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
    isUserInput.current = true;
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionInput(e.target.value);
    isUserInput.current = true;
  };

  // Debounced update function
  const debouncedUpdate = useCallback(
    (field: string, value: string) => {
      const handler = setTimeout(() => {
        updateUserData(userData._id, { [field]: value });
        isUserInput.current = false;
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    },
    [userData._id, updateUserData]
  );

  // Debounced name update
  useEffect(() => {
    if (isUserInput.current && nameInput !== name) {
      return debouncedUpdate('name', nameInput);
    }
  }, [nameInput, name, debouncedUpdate]);

  // Debounced description update
  useEffect(() => {
    if (isUserInput.current && descriptionInput !== description) {
      return debouncedUpdate('description', descriptionInput);
    }
  }, [descriptionInput, description, debouncedUpdate]);

  return (
    <>
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border">
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
          placeholder="Tell us about yourself"
          onChange={handleDescriptionChange}
        />

        <div className="flex text-zinc-400 md:justify-between md:items-center flex-col md:flex-row justify-between gap-3">
          <div className="flex gap-4">
            <UserLocation />
            <UserEmail />
            <UserInstagram />
            <UserTwitter />
            <UserLinkedin />
            <UserGithub />
          </div>

          <div className="flex row">
            <div className="flex rounded-md">
              <div className="relative flex-grow">
                <button
                  className="text-gray-400 hover:underline"
                  onClick={() => {
                    navigator.clipboard.writeText(`${config.domainName}/${customDomain || ''}`);
                    toast.success('Copied to clipboard');
                  }}
                >
                  {config.domainName}/{customDomain || ''}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}