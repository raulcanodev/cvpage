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
  const { premium } = userData;
  const { _id, services } = userData;

  const handleAddService = async () => {
    // TODO: Validate in the backend
    const maxServices = premium ? 100 : 5;
    if (userData.services.length >= maxServices) {
      setIsButtonDisabled(true);
      toast.error(`You can only have up to ${maxServices}.`);
      return;
    }

    try {
      setIsButtonDisabled(true);
      const newService = await createNewService();
      setServicesState((prevServices) => [...prevServices, newService]);
      await updateUserData(_id, { services: [...servicesState, newService] });
      toast.success('Block added successfully 🎉');
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
        className="bg-white text-slate-950 w-full rounded-xl border border- hover:bg-zinc-100 hover:shadow-lg dark:bg-zinc-950 dark:text-white dark:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:shadow-lg transition-all duration-300"
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
                  subtitle={service.subtitle}
                  description={service.description}
                  image={service.image}
                  active={service.active}
                  link={service.link}
                  price={service.price}
                  date={service.date}
                  location={service.location}
                />
              </Reorder.Item>
            ))}
        </Reorder.Group>
      )}
    </>
  );
}
