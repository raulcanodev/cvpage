'use client';

import React, { useState, useEffect } from 'react';
import { format, parse } from 'date-fns';
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
  date?: string;
  dateEnd?: string;
}

export function BlockDate({ serviceId, date, dateEnd }: BlockDateProps) {
  const { updateUserService } = useUserContext();
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isPresent, setIsPresent] = useState(false);
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);

  // Initialize startDate and endDate based on the provided date and dateEnd
  useEffect(() => {
    if (date) {
      setStartDate(parse(date, 'dd MMM yyyy', new Date())); // Adjust format as needed
    }
    if (dateEnd && dateEnd !== 'Present') {
      setEndDate(parse(dateEnd, 'dd MMM yyyy', new Date())); // Adjust format as needed
    } else if (dateEnd === 'Present') {
      setIsPresent(true);
    }
  }, [date, dateEnd]);

  const handleDateSelect = async (isEndDate: boolean, selectedDate: Date | undefined) => {
    if (isEndDate) {
      setEndDate(selectedDate);
      setIsEndDateOpen(false);
    } else {
      setStartDate(selectedDate);
      setIsStartDateOpen(false);
    }

    if (selectedDate) {
      try {
        const updateField = isEndDate ? 'dateEnd' : 'date';
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
    <Popover open={isEndDate ? isEndDateOpen : isStartDateOpen} onOpenChange={isEndDate ? setIsEndDateOpen : setIsStartDateOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[240px] justify-start text-left font-normal bg-transparent",
            !date && "text-muted-foreground"
          )}
          disabled={isEndDate && isPresent}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{isEndDate ? 'End date' : 'Start date'}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={date}
          onSelect={(newDate) => handleDateSelect(isEndDate, newDate)}
          disabled={(date) => 
            date > new Date() || 
            date < new Date('1900-01-01') ||
            (isEndDate && startDate ? date <= startDate : false) ||
            (!isEndDate && endDate ? date >= endDate : false)
          }
          fromYear={1960}
          toYear={2030}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center w-full sm:space-x-2 space-y-2 sm:space-y-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <DateButton date={startDate} isEndDate={false} />
          <span className="hidden sm:inline">to</span>
          <DateButton date={endDate} isEndDate={true} />
        </div>
        <div className="flex items-center gap-2 sm:ml-3">
          <Switch
            id="present-mode"
            checked={isPresent}
            onCheckedChange={handlePresentToggle}
          />
          <Label htmlFor="present-mode">Present</Label>
        </div>
      </div>
    </div>
  );
}
