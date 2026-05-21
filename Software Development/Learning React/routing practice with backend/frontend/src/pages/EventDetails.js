import { redirect, useLoaderData, useParams, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailPage() {
    const params = useParams();
    // const data = useLoaderData();  // uses highest and 
    // closest loader available in route hierarchy
    const data = useRouteLoaderData('event-details');  // uses specific loader


    return (
        <>
            <EventItem event={data.event} />
        </>
    );
}

export async function loader({ request, params }) {
    const id = params.eventId;
    const response = await fetch("http://localhost:8080/events/" + id);

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: "Could not fectch details for selected event." }), {
            status: 500
        });
    } else {
        return response;
    }
}

export async function action({ params, request }) {
    const id = params.eventId;
    const response = await fetch("http://localhost:8080/events/" + id, {
        method: request.method,
    });

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: "Could delete this event." }), {
            status: 500
        });
    }
    return redirect("/events");
}

export default EventDetailPage;