'use client';
import { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Input,
  Switch,
  Textarea,
} from '@/components/ui';
import { Plus, DollarSign, Link, Tag, Flag, Maximize2, Trash2, GripVertical } from 'lucide-react';
import { Reorder } from 'framer-motion';
// Drag and drop: https://www.youtube.com/watch?v=XlXT9lhy-4M

export function EditUserServices() {
  const [services, setServices] = useState([1, 2, 3, 4, 5]);

  return (
    <>
      <Button className="bg-blue-600 text-white w-full">
        <Plus className="w-5 h-5 mx-2" /> ADD SERVICE
      </Button>

      <Reorder.Group values={services} onReorder={setServices}>
        {services.map((service, index) => (
          <Reorder.Item key={service} value={service}>
            {/* Service */}
            <Card className="bg-zinc-900 border-zinc-800 overflow-hidden my-2">

              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <GripVertical className="w-5 h-5 text-zinc-400 cursor-pointer" />
                  <div className="flex-1">

                    {/* Top - Avatar, Title and Switch */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-7 h-7 border border-zinc-700">
                          <AvatarImage
                            src="/placeholder.svg?height=40&width=40"
                            alt="Change this"
                          />
                          <AvatarFallback>{index}</AvatarFallback>
                        </Avatar>
                        <Input
                          className="font-semibold bg-transparent border-none  text-white focus:ring-0 h-auto w-full"
                          placeholder="Service title..."
                        />
                      </div>
                      <Switch className="data-[state=checked]:bg-pink-500" />
                    </div>

                    {/* Description */}
                    <Input
                      className="bg-zinc-900 text-white border-none focus:ring-0 mb-4 w-full h-auto"
                      placeholder="Description of your service..."
                    />

                    {/* Bottom - Actions */}
                    <div className="flex items-center justify-between text-zinc-400">
                      <div className="flex space-x-3">
                        <button className="hover:text-white transition-colors">
                          <Link className="w-5 h-5" />
                        </button>
                        <button className="hover:text-white transition-colors">
                          <DollarSign className="w-5 h-5" />
                        </button>
                        <button className="hover:text-white transition-colors">
                          <Tag className="w-5 h-5" />
                        </button>
                        <button className="hover:text-white transition-colors">
                          <Flag className="w-5 h-5" />
                        </button>
                        <button className="hover:text-white transition-colors">
                          <Maximize2 className="w-5 h-5" />
                        </button>
                      </div>
                      <button className="hover:text-red-500 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                  </div>
                </div>
              </CardContent>

            </Card>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </>
  );
}
