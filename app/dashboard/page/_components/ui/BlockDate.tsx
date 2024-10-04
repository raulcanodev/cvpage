'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Switch,
  Label,
} from '@/components/ui';
import { CalendarIcon } from 'lucide-react';
import { useUserContext } from '@/app/dashboard/context/UserContext';
import { cn } from "@/lib/utils"
import { toast } from "sonner";

interface BlockDateProps {
  serviceId: string;
}

export function BlockDate({ serviceId }: BlockDateProps) {
  const { updateUserService } = useUserContext();
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isPresent, setIsPresent] = useState(false);

  const handleDateSelect = async (isEndDate: boolean, selectedDate: Date | undefined) => {
    if (isEndDate) {
      setEndDate(selectedDate);
    } else {
      setStartDate(selectedDate);
    }

    if (selectedDate) {
      try {
        const updateField = isEndDate ? 'dateEnd' : 'date';
        // Formatear la fecha antes de guardarla
        const formattedDate = format(selectedDate, 'dd MMM yyyy');
        await updateUserService(serviceId, { [updateField]: formattedDate });
        toast.success('Date updated');
      } catch (error) {
        console.error('Failed to update service date:', error);
        toast.error('Failed to update date. Please try again.');
      }
    }
  };

  const handlePresentToggle = async (checked: boolean) => {
    setIsPresent(checked);
    if (checked) {
      try {
        await updateUserService(serviceId, { dateEnd: 'Present' });
        setEndDate(undefined);
        toast.success('Date updated');
      } catch (error) {
        console.error('Failed to update service date:', error);
        toast.error('Failed to update date. Please try again.');
      }
    }
  };

  const DateButton = ({ date, isEndDate }: { date: Date | undefined, isEndDate: boolean }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[140px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
          disabled={isEndDate && isPresent}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PP") : <span>{isEndDate ? 'End date' : 'Start date'}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => handleDateSelect(isEndDate, newDate)}
          disabled={(date) => 
            date > new Date() || 
            date < new Date('1900-01-01') ||
            (isEndDate && startDate ? date <= startDate : false) ||
            (!isEndDate && endDate ? date >= endDate : false)
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <DateButton date={startDate} isEndDate={false} />
        <span>to</span>
        <DateButton date={endDate} isEndDate={true} />
        <Switch
          id="present-mode"
          checked={isPresent}
          onCheckedChange={handlePresentToggle}
        />
        <Label htmlFor="present-mode">Present</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        
      </div>
    </div>
  );
}
