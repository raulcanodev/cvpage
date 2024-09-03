'use client';
import { useState } from 'react';
import { Button } from '@/components/ui';
import { Plus } from 'lucide-react';
import { Reorder } from 'framer-motion';
import { ServiceCard } from '../ui';
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
            <ServiceCard index={index}/>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </>
  );
}
