"use client"

import React, { useState, useRef, useEffect } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from 'dayjs';
import { CalendarDays } from "lucide-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type {} from '@mui/x-date-pickers/themeAugmentation';

const theme = createTheme({
  components: {
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          border: "2px solid #00ff00",
          borderRadius: "8px",
          padding: "16px",
          color:"black",
          backgroundColor: "#00ff00",
          "& .MuiPickersDay-root:hover":{
            backgroundColor:"gray",
            color:"white",
          },
          "& .MuiPickersDay-root.Mui-selected": {
            backgroundColor: "#000000",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "grey",
            },
          },
        },
      },
    },
  },
});

interface CalendarProps {
  selectedDate: string | null;
  uponChange: (date: string | undefined) => void;
}

export default function Calendar({ selectedDate, uponChange }: CalendarProps) {
  const [open, setOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full p-2 relative flex items-center justify-between border rounded-lg" ref={calendarRef}>
      {selectedDate ? (
        <h1 className="text-white text-sm cursor-default">{selectedDate}</h1>
      ) : (
        <h1 className="text-gray-400 text-sm cursor-default">Pick a Date</h1>
      )}
      <CalendarDays color="white" size={16} onClick={() => setOpen(!open)} />
      {open && (
        <div className="absolute top-12 left-0">
          <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar 
              value={selectedDate ? dayjs(selectedDate) : null}
              views={['year', 'month', 'day']}
              onChange={(newValue) => uponChange(newValue ? newValue.format("YYYY-MM-DD") : undefined)}/>
          </LocalizationProvider>
          </ThemeProvider>
        </div>
      )}
    </div>
  );
}
