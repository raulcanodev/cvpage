'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { Plus } from 'lucide-react';
import { Reorder } from 'framer-motion';
import { BlockCard } from './BlockCard';
// Drag and drop: https://www.youtube.com/watch?v=XlXT9lhy-4M
import { useUserContext } from '@/app/dashboard/context/UserContext';
import { createNewService } from '@/actions';
import { Service } from '@/types/types';
import { toast } from 'sonner';

export function EditUserServices() {
  const [servicesState, setServicesState] = useState<Service[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { userData, updateUserData } = useUserContext();
  const { _id, services } = userData;

  const handleAddService = async () => {
    // TODO: Validate in the backend
    if (userData.services.length >= 99) {
      setIsButtonDisabled(true);
      toast.error('You can only have up to 99.');
      return;
    }

    try {
      setIsButtonDisabled(true);
      const newService = await createNewService();
      setServicesState((prevServices) => [...prevServices, newService]);
      await updateUserData(_id, { services: [...servicesState, newService] });

      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 300);
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
      <Button
        className="bg-zinc-100 text-slate-950 w-full"
        onClick={handleAddService}
        disabled={isButtonDisabled}
      >
        <Plus className="w-4 h-4 mx-1" /> ADD BLOCK
      </Button>
      {services && (
        <Reorder.Group values={servicesState} onReorder={handleReorder}>
          {servicesState
            .filter((service) => service._id)
            .map((service, index) => (
              <Reorder.Item key={service._id} value={service}>
                <BlockCard
                  category={service.category}
                  serviceId={service._id as string}
                  title={service.title}
                  description={service.description}
                  active={service.active}
                />
              </Reorder.Item>
            ))}
        </Reorder.Group>
      )}
    </>
  );
}
