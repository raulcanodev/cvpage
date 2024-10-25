'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [isAddingService, setIsAddingService] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { userData, updateUserData, updateUserService } = useUserContext();
  const { premium, _id, services } = userData;

  const hasUserReordered = useRef(false);

  const maxServices = premium ? 100 : 5;

  useEffect(() => {
    if (services && !hasUserReordered.current) {
      setServicesState(services);
      setIsLoading(false);
    }
  }, [services, premium, maxServices]);

  const handleAddService = async () => {
    if (isAddingService || servicesState.length >= maxServices) {
      if (servicesState.length >= maxServices) {
        toast.error(`Upgrade to Premium to add up to 100 blocks`);
      }
      return;
    }

    setIsAddingService(true);

    toast.promise(createNewService(), {
      loading: 'Adding block...',
      success: (newService) => {
        setServicesState((prevServices) => {
          const updatedServices = [...prevServices, newService];
          updateUserData(_id, { services: updatedServices });
          return updatedServices;
        });
        setIsAddingService(false);
        return 'Block added successfully 🎉';
      },
      error: (err) => {
        setIsAddingService(false);
        return err.message || 'An error occurred while creating block';
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
      })(),
      {
        loading: 'Deleting block...',
        success: 'Block deleted successfully',
        error: 'Failed to delete block. Please try again.',
      }
    );
  };

  const handleUpdateService = useCallback(
    async (serviceId: string, updatedService: Partial<Service>) => {
      setServicesState((prevServices) =>
        prevServices.map((service) =>
          service._id === serviceId ? { ...service, ...updatedService } : service
        )
      );
      await updateUserService(serviceId, updatedService);
    },
    [updateUserService]
  );

  if (isLoading) {
    return <div
    className='flex items-center justify-center
    animate-pulse text-gray-900 dark:text-gray-100'>Loading...</div>;
  }

  return (
    <>
      <Button
        className="bg-sky-100 hover:bg-sky-200 text-sky-700 dark:bg-sky-900 dark:hover:bg-sky-800 dark:text-sky-100 border border-sky-200 dark:border-sky-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
        onClick={handleAddService}
        variant="outline"
        disabled={isAddingService || servicesState.length >= maxServices}
      >
        <Plus className="w-4 h-4 mr-2" /> {isAddingService ? 'ADDING...' : 'ADD BLOCK'}
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
                dateEnd={service.dateEnd}
                location={service.location}
                onDelete={handleDeleteService}
                onUpdate={handleUpdateService}
                service={service}
              />
            ))}
        </Reorder.Group>
      )}
    </>
  );
}