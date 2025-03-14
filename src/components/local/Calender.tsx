"use client";

import React, { useState, useRef, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { CalendarDays } from "lucide-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type {} from "@mui/x-date-pickers/themeAugmentation";

const theme = createTheme({
  components: {
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          backgroundColor: "#00ff00",
          color: "black",
          "& .MuiTypography-root": {
            color: "black",
          },
        },
      },
    },
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "#00ff00",
          "& .MuiTypography-root": {
            color: "black",
          },
        },
      },
    },
    MuiDayCalendar: {
      styleOverrides: {
        root: {
          "& .MuiPickersDay-root:hover": {
            backgroundColor: "gray",
            color: "white",
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
    MuiPickersYear: {
      styleOverrides: {
        root: {
          color: "black", // Make years visible
        },
        yearButton: {
          color: "black",
          "&.Mui-selected": {
            backgroundColor: "#000000",
            color: "#ffffff",
          },
          "&:hover": {
            backgroundColor: "gray",
            color: "white",
          },
        },
      },
    },
    MuiPickersMonth: {
      styleOverrides: {
        root: {
          color: "black",
        },
        monthButton: {
          color: "black",
          "&.Mui-selected": {
            backgroundColor: "#000000",
            color: "#ffffff",
          },
          "&:hover": {
            backgroundColor: "gray",
            color: "white",
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
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
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
      <CalendarDays
        color="white"
        size={16}
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); 
          setOpen(!open);
        }}
      />
      {open && (
        <div className="absolute top-12 left-0 z-50 bg-white shadow-lg rounded-lg">
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={selectedDate ? dayjs(selectedDate, "DD-MM-YYYY") : null}
                views={["year", "month", "day"]}
                onChange={(newValue: Dayjs | null) =>
                  uponChange(newValue ? newValue.format("DD-MM-YYYY") : undefined)
                }
              />
            </LocalizationProvider>
          </ThemeProvider>
        </div>
      )}
    </div>
  );
}
