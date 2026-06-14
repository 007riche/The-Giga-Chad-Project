import { useLoaderData, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {
    // const data = useLoaderData(); // Gets all the things that happen 
    // // when loading, passed data, events etc...
    // const events = data.events;
    const { events } = useLoaderData();
    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => < EventsList events={loadedEvents} />}
            </Await>
        </Suspense>

    );
}

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        //
        throw new Response(JSON.stringify({ message: 'Could not fetch events.' }),
            { status: 500 });
        // return json({ message: 'Could not fetch events.' }, {
        //     status: 500
        // });
    } else {
        const resData = await response.json();
        return resData.events;
        // return response; // type: Promise<Response>

    }
}

export function loader() {
    // return defer({
    //     events: loadEvents(),
    // }); // @react-router ≤ V6
    return {
        events: loadEvents(),
    }; // @react-router v7
}

export default EventsPage;