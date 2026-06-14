import { useNavigate, Form, useNavigation, useActionData, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';
import { getAuthToken } from '../pages/util/auth';

const BASE_URL = 'http://localhost:8080/events/';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData() // provides data submitted via the form's action with 
  // all the states  
  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    // Form element from @react-router-dom to simply 
    // form submission handling, it need the name attribute on 
    // its elements like inputs etc..., method, 
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required
          defaultValue={event ? event.title : ''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required
          defaultValue={event ? event.image : ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required
          defaultValue={event ? event.date : ''} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required
          defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting' : 'Save'}</button>
      </div>
    </Form>
  );
}

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  let requestUrl = BASE_URL;
  if (method === 'PATCH') {
    const eventId = params.eventId;
    requestUrl = BASE_URL + eventId;
  }

  const token = getAuthToken();
  const response = await fetch(requestUrl, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(eventData),
  });
  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({
      message: 'Could not save event'
    }),
      {
        status: 500
      });
  }
  // Passed error on post request
  return redirect('/events'); // From @react-router-dom 
  //  Not from the browser window object
}


export default EventForm;
