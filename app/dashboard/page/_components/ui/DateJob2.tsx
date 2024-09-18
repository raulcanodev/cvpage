'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Input,
  Button,
  DialogClose,
  Calendar,
} from '@/components/ui';
import { CalendarIcon } from 'lucide-react';
import { useUserContext } from '@/app/dashboard/context/UserContext';

interface ServicePriceDialogProps {
  serviceId: string;
}

export function DateJob2({ serviceId }: ServicePriceDialogProps) {
  const { updateUserService } = useUserContext();
  const [price, setPrice] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^([$€]?)\d*\.?\d{0,2}$/.test(value) || value === '') {
      setPrice(value);
      setError(null);
    } else {
      setError('Please enter a valid price (up to 2 decimal places)');
    }
  };

  const handleSaveChanges = async () => {
    try {
      const numericPrice = parseFloat(price);
      if (isNaN(numericPrice) || numericPrice < 0) {
        setError('Please enter a valid positive number');
        return;
      }
      await updateUserService(serviceId, { price: numericPrice });
    } catch (error) {
      console.error('Failed to update service price:', error);
      setError('Failed to update price. Please try again.');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center justify-center">
          <CalendarIcon className="w-5 h-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Service Price</DialogTitle>
          <DialogDescription>
            Set the price for your service. Add the currency symbol if needed.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            
            <div className="col-span-3 relative">
              <Calendar/>
            
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={handleSaveChanges} disabled={!!error}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
