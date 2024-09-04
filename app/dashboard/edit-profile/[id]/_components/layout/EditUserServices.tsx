'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { Plus } from 'lucide-react';
import { Reorder } from 'framer-motion';
import { ServiceCard } from '../ui';
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
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleReorder = async (reorderedServices: Service[]) => {
    setServicesState(reorderedServices);
    console.log("reorderedServices", reorderedServices);
    const serviceIds = reorderedServices.map(service => service._id);
    console.log("serviceIds", serviceIds);
    
    
    try {
      // Update user data with the new service order
      await updateUserData(_id, { services: reorderedServices });
      return serviceIds;
    } catch (error) {
      console.error('Error updating service order:', error);
    }
  };

  useEffect(() => {
    if (services) {
      setServicesState(services);
    }
  }, [services]);

  return (
    <>
      <Button className="bg-blue-600 text-white w-full" onClick={handleAddService}>
        <Plus className="w-5 h-5 mx-2" /> ADD SERVICE
      </Button>
      <Reorder.Group values={servicesState} onReorder={handleReorder}>
        {servicesState.map((service, index) => (
          <Reorder.Item key={service._id} value={service}>
            <ServiceCard index={index} title={service.title} description={service.description} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </>
  );
}