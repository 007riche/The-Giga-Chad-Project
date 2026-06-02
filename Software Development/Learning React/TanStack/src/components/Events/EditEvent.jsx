import {
  Link, redirect, useNavigate, useParams,
  // useNavigation, useSubmit
} from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, queryClient, updateEvent } from '../../util/http.js';
// import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();

  const params = useParams();

  // React router approach
  // const submit = useSubmit();
  // const { state } = useNavigation();


  const { data, isError, error } = useQuery({
    // const { data, isPending, isError, error } = useQuery({

    queryKey: ['events', params.id], // cached results
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
    staleTime: 5000, // Automatically refetch data after 5 seconds, add 
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      const newEvent = data.event;

      await queryClient.cancelQueries({ queryKey: ['events', params.id], });
      // Manually aborting, ongoing triggered queries by useQuery 
      // to avoid clash update clashes
      const previousEvent = queryClient.getQueriesData(['events', params.id]);
      queryClient.setQueryData(['events', params.id], newEvent); // Optimistic and 
      //  Manual update of 
      // data identified by queryKey: ['events', params.id]
      return { previousEvent }; // returns the previous state, accessed via the context
      // usefull for rollback
    },

    // onError, something went wrong with the mutation and captured
    onError: (error, data, context) => {
      queryClient.setQueriesData(['events', params.id], context.previousEvent);
    },

    // utlimate process, final event
    onSettled: () => {
      queryClient.invalidateQueries(['events', params.id]); // mutation, 
      // final event, error, rollback
    }
  });

  function handleSubmit(formData) {
    mutate({ id: params.id, event: formData });
    navigate('../');

    // react router approach
    // submit(formData, { method: 'PUT'}); // The wanted mutation is updation
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  // if (isPending) {
  //   content = (
  //     <div className='center'>
  //       <LoadingIndicator />
  //     </div>
  //   );
  // }

  if (isError) {
    content = <>
      <ErrorBlock
        title="Failed to load event"
        message={error.info?.message ||
          'Failed to load event. Please check your inputs and try again later.'
        } />
      <div className="form-actions">
        <Link to='../' >
          Okay
        </Link>
      </div>
    </>
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {/* {state === 'submitting' ? <p>Updating...</p> : (
          <> */}
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
        {/* </>
        )} */}
      </EventForm>
    );
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params }),
  });
}

// React router approach // but 
// I will keep the ReactQuery(@TanStack/Query) approach with the optimistic approach
export async function action({ request, params }) {
  const formData = await request.formData();
  const updateEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updateEventData });
  await queryClient.invalidateQueries(['events'])
  return redirect('../');
}