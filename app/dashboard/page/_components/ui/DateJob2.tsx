'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { CalendarIcon } from 'lucide-react';
import { useUserContext } from '@/app/dashboard/context/UserContext';
import { cn } from "@/lib/utils"

interface ServicePriceDialogProps {
  serviceId: string;
}

export function DateJob2({ serviceId }: ServicePriceDialogProps) {
  const { updateUserService } = useUserContext();
  const [price, setPrice] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = React.useState<Date>()

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
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>From</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
