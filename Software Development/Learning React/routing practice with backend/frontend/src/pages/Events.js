import { Link } from "react-router-dom";

const DUMMY_EVENTS = [
    {
        id: 'e1',
        title: 'Some event',
    },
    {
        id: 'e2',
        title: 'Another event',
    },
];

function EventsPage() {
    return (
        <>
            <h1>Event page</h1>
            <ul>
                {
                    DUMMY_EVENTS.map(event => <li>
                        <Link to={event.id}>{event.title}</Link>
                    </li>)
                }
            </ul>
        </>
    );
}

export default EventsPage;