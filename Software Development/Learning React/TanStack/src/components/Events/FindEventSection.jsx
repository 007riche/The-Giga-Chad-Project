import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { fetchEvents } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import EventItem from './EventItem.jsx';

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', { search: searchTerm }], // here the keys are kind 
    // of compound elements (a kind of tuple), the first part 'events' unchanged
    // and second dynamic ${search}, to uniquely identify each query, 
    // since the results of all of these queries are cached. 
    // using only 'events' as key would use 
    // the cached results of the query in the NewEventsSection also identified by 'events' 
    queryFn: () => fetchEvents(searchTerm),
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  let content = <p>Please enter a serch term to find events.</p>

  if (isError) {
    content = <ErrorBlock
      title="An error occured during events fetching."
      message={error.info?.message || 'Failed to fecth events.'} />
  }

  if (isPending) {
    content = <LoadingIndicator />
  }

  if (data) {
    content = (
      <ul className='events-list'>
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
