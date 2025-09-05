import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function TaskCalendar() {
  const [events, setEvents] = useState([]);

  const fetchCalendarTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/dashboard/calendar-tasks");
      if (response?.data?.success) {
        const formattedEvents = response.data.data.map((task) => ({
          ...task,
          start: new Date(task.start),
          end: new Date(task.end),
        }));
        setEvents(formattedEvents);
      }
    } catch (error) {
      console.error("Failed to fetch calendar tasks:", error);
    }
  };

  useEffect(() => {
    fetchCalendarTasks();
  }, []);

  return (
    <div className="bg-gray-900 rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-yellow-400">Calendar View</h2>
      <div className="h-[600px] bg-white rounded-xl overflow-hidden">
        <div className="h-full">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%", width: "100%" }}
            toolbar={false}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: event.isCompleted ? "#22c55e" : "#ef4444",
                color: "#fff",
                borderRadius: "6px",
                padding: "4px",
              },
            })}
          />
        </div>
      </div>
    </div>
  );
}
