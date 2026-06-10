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

export default function HomePage() {
    return <MeetupList meetups={DUMMY_MEETUP} />;

}