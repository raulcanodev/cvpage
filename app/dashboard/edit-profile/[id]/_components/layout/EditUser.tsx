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

export function EditUser() {
    return (
      <>
        {/* Profile Section */}
        <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Raul Cano" /> 
              <AvatarFallback>:D</AvatarFallback>
            </Avatar>
            <div>
              <Input
                className="text-2xl font-bold text-white bg-zinc-900 border-zinc-900 focus:ring-transparent"
                defaultValue={'Raul Cano'}
              />
            </div>
          </div>
          <Textarea
            className="bg-zinc-900 text-white border-zinc-900 my-7 focus:ring-0"
            placeholder="Tell us about yourself..."
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
