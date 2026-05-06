import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayjs from 'dayjs';
import { fetchTrainings, fetchCustomerByUrl } from '../trainingapi';
import type { CalendarEvent, TrainingData, CustomerData } from '../types';


function Calendar() {

    const [events, setEvents] = useState<CalendarEvent[]>([]);

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        try {
            const data = await fetchTrainings();
            const trainings: TrainingData[] = data._embedded.trainings;

            const calendarEvents = await Promise.all(
                trainings.map(async (item) => {
                    // Fetching the specific customer for this training
                    const customer: CustomerData = await fetchCustomerByUrl(item._links.customer.href);

                    return {
                        id: item._links.self.href,
                        title: `${item.activity} / ${customer.firstname} ${customer.lastname}`,
                        start: item.date,
                        end: dayjs(item.date).add(item.duration, 'minute').toISOString(),
                        customer: item._links.customer.href
                    };
                })
            );

            setEvents(calendarEvents);
        } catch (err) {
            console.error("Error fetching data", err);
        }
    };


    return (
        <>
            <h1>Training calendar</h1>
            <div style={{ width: "90%", margin: "auto", boxSizing: "border-box" }}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    events={events}
                    height="85vh"
                    aspectRatio={1.5}
                    handleWindowResize={true}
                    allDaySlot={false}
                />
            </div>
        </>
    )
}

export default Calendar;