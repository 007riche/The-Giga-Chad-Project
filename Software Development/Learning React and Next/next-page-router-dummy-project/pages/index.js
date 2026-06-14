import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUP = [
    {
        id: 'm1',
        title: 'A first Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Louvre_Museum_Wikimedia_Commons.jpg/1920px-Louvre_Museum_Wikimedia_Commons.jpg',
        address: 'Some city, 12345',
        description: 'This is a meetup plan by Ricky'
    },
    {
        id: 'm1',
        title: 'A second Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Louvre_Museum_Wikimedia_Commons.jpg/1920px-Louvre_Museum_Wikimedia_Commons.jpg',
        address: 'Some city, 12345',
        description: 'This is a meetup plan by Young JON'
    },
];

export default function HomePage(
    props // Accept the static props

) {
    // Has a flaw, the first rendered DOM misses the data
    // const [loadedMeetups, setLoadedMeetups] = useState();
    // useEffect(() => {
    //     setLoadedMeetups(DUMMY_MEETUP);
    // });
    return <MeetupList meetups={props.meetups} />;
}

/**
 *  Kind of overriding next's getStaticProps()
 *  This is used to load data needed before rendering 
 *  the component even for the first time, for 
 * instance loading data that is not readily available like from a DB or 
 * another source. 
 * Export it to make it available to the other caller functions.
 * Here it is useful since next pre-renders components before serving them
 * the involved components should have correctly populated data.
 */


// Solution for the first component rendering, but still has a flaw;
// For the new ingested data 
// (Here the newly created meetups) at least if the revalidation 
// IS NOT SET timely or on event
// export async function getStaticProps() {
//     /**
//      * The code here is executed on the server side like
//      * a server action 
//     */
//     return {
//         props: {
//             meetups: DUMMY_MEETUP,
//         },
//         revalidate: 1
//     };
// }

// Same kind as the getStaticProps
// But runs for every income request
// It comes with a cost (the eval cost for every incoming request)
// It can be usefull where data REALLY CHANGE VERY (VERY) QUICKLY
export async function getServerSideProps(constext) {
    /**
         * The code here is executed on the server side like
         * a server action 
         * 
         * I will keep this strategy, and comment getStaticProps()
        */

    // The req and res parts of the automatically recived context param 
    // is only with the getServerSidePros not with the getStaticProps()
    // Eventhough both recive that context object as argument
    const req = constext.req;
    const res = constext.res;

    return {
        props: {
            meetups: DUMMY_MEETUP,
        },
    };
}