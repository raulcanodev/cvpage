"use client"

import React, { useEffect } from "react"
import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { toast } from 'sonner'  // Import Sonner toast

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useUserContext } from "@/app/dashboard/context/UserContext"

interface DateJobPickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  serviceId: string;  // Add serviceId prop
}

export function DateJobPickerWithRange({
  className,
  serviceId,  // Destructure serviceId from props
}: DateJobPickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: undefined,  // Initial to value can be undefined
  })
  
  const { updateUserService } = useUserContext();

  const handleDateChange = async (newDate: DateRange | undefined) => {
    setDate(newDate);

    // Check if the "from" date is set (the start date is mandatory)
    if (newDate?.from) {
      try {
        // Send date range to the database using serviceId
        const response = await updateUserService(serviceId, { date: newDate });

        if (response.success) {
          toast.success("Date range updated successfully!");
        } else {
          toast.error("Failed to update date range: " + response.error);
        }
      } catch (error) {
        toast.error("Error updating date range: " + error.message);
      }
    } else {
      toast.error("Please select a start date.");
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange} // Update handleDateChange when user selects a date
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}