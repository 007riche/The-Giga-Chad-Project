import MeetupDetails from "../../components/meetups/MeetupDetails";

export default function MeetupDetailsPage() {
    return (<MeetupDetails
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Louvre_Museum_Wikimedia_Commons.jpg/1920px-Louvre_Museum_Wikimedia_Commons.jpg"
        title='The Firts Meetup at Le Louvre'
        address='Some ramdom location, KISS CITY'
        description='The meetup Description'
    />);

}


// To Set the value of all params in the path of all resulting 
// paths for pre-rendering
export async function getStaticPaths() {
    return {

        fallback: false, // for all  supported or set values
        // true for dynamically generated values, by next
        paths: [
            {
                params: {
                    meetupId: 'm1',
                },
            },
            {
                params: {
                    meetupId: 'm2',
                },
            }
        ], // Note the struncture of the paths (It is an array, 
        // some kind of pre-knonwn elements)

    };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId; // the meetupId prop 
    // in the context.params id the set slug for dynamic param part in the url
    return {
        props: {
            meetupData: {
                id: meetupId, // should be known at the pre-generation stage
                image:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Louvre_Museum_Wikimedia_Commons.jpg/1920px-Louvre_Museum_Wikimedia_Commons.jpg",
                title: 'The Firts Meetup at Le Louvre',
                address: 'Some ramdom location, KISS CITY',
                description: 'The meetup Description'
            },
        },
    };
} // A good solution but require the completeness of data, 
// (Here all the values of the dynamic meetupId),
// Sol, another pre-rendering method to override, getStaticPaths