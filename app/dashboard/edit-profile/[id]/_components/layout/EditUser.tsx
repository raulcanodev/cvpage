import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
  Textarea,
  Label,
  Button,
} from '@/components/ui/';
import { UserLocation, UserEmail, UserInstagram, UserTwitter, UserLinkedin } from '../ui'

import { useUserContext } from '../../../../context/UserContext';

export function EditUser({id}: {id: string}) {
  const { userData, updateUserData } = useUserContext();
  

  const { name, description, location, website, twitter, instagram } = userData;
  

    return (
      <>
        {/* Profile Section */}
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
                onChange={(e) => updateUserData(id, { name: e.target.value })}
              />
            </div>
          </div>
          <Textarea
            className="bg-zinc-900 text-white border-zinc-900 my-7 focus:ring-0"
            defaultValue={description}
            placeholder="Tell us about yourself..."
            onChange={(e) => updateUserData(id, { description: e.target.value })}
          />
          <div className="flex space-x-4 text-zinc-400">
          <UserLocation/>
          <UserInstagram/>
          <UserTwitter/>
          <UserLinkedin/>
          <UserEmail/>
          </div>
        </div>
      </>
    );
  }
