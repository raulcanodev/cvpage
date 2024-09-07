'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { Plus } from 'lucide-react';
import { Reorder } from 'framer-motion';
import { ServiceCard } from '../ui';
// Drag and drop: https://www.youtube.com/watch?v=XlXT9lhy-4M
import { useUserContext } from '@/app/dashboard/context/UserContext';
import { createNewService } from '@/actions';
import { Service } from '@/types/types';
import { Bars } from 'react-loader-spinner'

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
  };

  useEffect(() => {
    if (services) {
      setServicesState(services);
    }
  }, [services]);

  return (
    <>
      <Button className="bg-slate-300 text-slate-950 w-full" onClick={handleAddService}>
        <Plus className="w-5 h-5 mx-2" /> ADD SERVICE
      </Button>
    {services && (
      <Reorder.Group values={servicesState} onReorder={handleReorder}>
        {servicesState
          .filter((service) => service._id) 
          .map((service, index) => (
            <Reorder.Item key={service._id} value={service}>
              <ServiceCard
                serviceId={service._id as string}
                title={service.title}
                description={service.description}
                active={service.active}
              />
            </Reorder.Item>
          ))}
      </Reorder.Group>
    )}
    {/* {!services && (
      <div className='flex justify-center'>
        <Bars
        visible={true}
        height="80"
        width="80"
        color='#4B5563'
        ariaLabel="puff-loading"
        />
      </div>
    )} */}
      
    </>
  );
}
