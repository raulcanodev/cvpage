'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { Plus } from 'lucide-react';
import { Reorder } from 'framer-motion';
import { ServiceCard } from '../ui';
// Drag and drop: https://www.youtube.com/watch?v=XlXT9lhy-4M
import { useUserContext } from '../../../../context/UserContext';
import { createNewService } from '@/actions';
import { Service } from '@/types/types';

export function EditUserServices() {
  const [servicesState, setServicesState] = useState<Service[]>([]);
  const { userData, updateUserData } = useUserContext();
  const { _id, services } = userData;

  const handleAddService = async () => {
    try {
      const newService = await createNewService();
      setServicesState((prevServices) => [...prevServices, newService]);
      await updateUserData(_id, { services: [...servicesState, newService] });
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleReorder = async (newOrder: Service[]) => {
    setServicesState(newOrder);
    await updateUserData(_id, { services: newOrder });
    
  }

  const reset = async () => {
    await updateUserData(_id, { services: [] });
  }

  useEffect(()=>{
    if(services){
      setServicesState(services)
    }

  },[services])

  return (
    <>
    <Button onClick={reset} >Reset</Button>
      <Button className="bg-blue-600 text-white w-full" onClick={handleAddService}>
        <Plus className="w-5 h-5 mx-2" /> ADD SERVICE
      </Button>
      <Reorder.Group values={servicesState} onReorder={handleReorder}>
        {servicesState.map((service, index) => (
          <Reorder.Item key={service._id} value={service}>
            <ServiceCard serviceId={service._id} title={service.title} description={service.description} active={service.active}/>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </>
  );
}
