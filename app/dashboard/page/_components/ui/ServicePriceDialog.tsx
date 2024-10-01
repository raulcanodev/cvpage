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
} from '@/components/ui';
import { DollarSign, Euro } from 'lucide-react';
import { useUserContext } from '@/app/dashboard/context/UserContext';

interface ServicePriceDialogProps {
  serviceId: string;
  servicePrice: string;
}

export function ServicePriceDialog({ serviceId, servicePrice }: ServicePriceDialogProps) {
  const { updateUserService } = useUserContext();
  const [price, setPrice] = useState(servicePrice || '');

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(value);
  };

  const handleSaveChanges = async () => {
    try {
      const numericPrice = parseFloat(price);
      await updateUserService(serviceId, { price: numericPrice });
    } catch (error) {
      console.error('Failed to update service price:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center justify-center">
          <DollarSign className="w-5 h-5" />
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
            <label htmlFor="servicePrice" className="text-right col-span-1">
              Price
            </label>
            <div className="col-span-3 relative">
              <Euro className="absolute w-5 h-5 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                id="servicePrice"
                placeholder="0.00"
                className="pl-8"
                value={price}
                onChange={handlePriceChange}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={handleSaveChanges}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
