import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import EventForm from '../components/EventForm';

function EditEventPage() {
    // const data = useLoaderData(); // uses highest and 
    // closest loader available in route hierarchy
    const data = useRouteLoaderData('event-details');  // uses specific loader


    return (
        <EventForm method='PATCH' event={data.event} />
    );
}

export default EditEventPage;