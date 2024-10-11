import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui';
import { Plus } from 'lucide-react';
import { Reorder } from 'framer-motion';
import { BlockCard } from './BlockCard';
import { useUserContext } from '@/app/dashboard/context/UserContext';
import { createNewService } from '@/actions';
import { Service } from '@/types/types';
import { toast } from 'sonner';

export function EditUserServices() {
  const [servicesState, setServicesState] = useState<Service[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { userData, updateUserData } = useUserContext();
  const { premium, _id, services } = userData;

  const hasUserReordered = useRef(false);

  const maxServices = premium ? 100 : 5;

  useEffect(() => {
    if (services && !hasUserReordered.current) {
      setServicesState(services);
    }
    setIsButtonDisabled(services.length >= maxServices);
  }, [services, premium, maxServices]);

  const handleAddService = async () => {
    if (servicesState.length >= maxServices) {
      toast.error(`You can only have up to ${maxServices} blocks.`);
      return;
    }

    setIsButtonDisabled(true);

    toast.promise(createNewService(), {
      loading: 'Adding block...',
      success: (newService) => {
        setServicesState((prevServices) => {
          const updatedServices = [...prevServices, newService];
          updateUserData(_id, { services: updatedServices });
          return updatedServices;
        });
        return 'Block added successfully 🎉';
      },
      error: (err) => {
        return err.message || 'An error occurred while creating block';
      },
      finally: () => {
        setIsButtonDisabled(servicesState.length + 1 >= maxServices);
      },
    });
  };

  const handleReorder = async (newOrder: Service[]) => {
    hasUserReordered.current = true;
    setServicesState(newOrder);
    await updateUserData(_id, { services: newOrder });
  };

  const handleDeleteService = async (serviceId: string) => {
    toast.promise(
      (async () => {
        const updatedServices = servicesState.filter((service) => service._id !== serviceId);
        setServicesState(updatedServices);
        await updateUserData(_id, { services: updatedServices });
        setIsButtonDisabled(updatedServices.length >= maxServices);
      })(),
      {
        loading: 'Deleting block...',
        success: 'Block deleted successfully',
        error: 'Failed to delete block. Please try again.',
      }
    );
  };

  return (
    <>
      <Button
        className="bg-white text-slate-950 w-full rounded-xl border hover:bg-zinc-100 hover:shadow-lg dark:bg-zinc-950 dark:text-white dark:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:shadow-lg transition-all duration-300"
        onClick={handleAddService}
        disabled={isButtonDisabled}
      >
        <Plus className="w-4 h-4 mx-1" /> ADD BLOCK
      </Button>
      {servicesState.length > 0 && (
        <Reorder.Group values={servicesState} onReorder={handleReorder}>
          {servicesState
            .filter((service) => service._id)
            .map((service) => (
              <BlockCard
                key={service._id}
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
                onDelete={handleDeleteService}
                service={service}
              />
            ))}
        </Reorder.Group>
      )}
    </>
  );
}
