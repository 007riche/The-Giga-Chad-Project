import { Await, redirect, useLoaderData, useParams, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";
import { Suspense } from "react";
import EventsList from "../components/EventsList";
import { getAuthToken } from "./util/auth";

function EventDetailPage() {
    const params = useParams();
    // const data = useLoaderData();  // uses highest and 
    // closest loader available in route hierarchy
    // const data = useRouteLoaderData('event-details');  // uses specific loader
    const { event, events } = useRouteLoaderData('event-details');  // uses specific loader


    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading the details of the selected event... please wait</p>}>
                <Await resolve={event}>
                    {(loadedEvent) => <EventItem event={loadedEvent} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading the list of all the events... please wait</p>}>
                <Await resolve={events}>
                    {(loadedEvents) => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
            {/* <EventItem event={data.event} /> */}
        </>
    );
}

// export async function loader({ request, params }) {
// const id = params.eventId;
async function loadEvent(id) {

    const response = await fetch("http://localhost:8080/events/" + id);

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: "Could not fectch details for selected event." }), {
            status: 500
        });
    } else {
        // return response;
        const resData = await response.json();
        return resData.event;
    }
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

export async function loader({ request, params }) {
    const id = params.eventId;
    return {
        event: await loadEvent(id), // await will defer the component 
        // rendering until the call of loadEvent(id) resolves
        events: loadEvents() // will be rendered at any time, before, during 
        // or after the component has been rendered
    };
}

export async function action({ params, request }) {
    const id = params.eventId;
    const token = getAuthToken(); // from local storage
    const response = await fetch("http://localhost:8080/events/" + id, {
        method: request.method,
        headers: {
            'Authorization': 'Bearer ' + token
        },
    });

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: "Could delete this event." }), {
            status: 500
        });
    }
    return redirect("/events");
}

export default EventDetailPage;