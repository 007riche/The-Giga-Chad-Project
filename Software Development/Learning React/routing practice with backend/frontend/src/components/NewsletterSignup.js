import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
  const Fetcher = useFetcher() // to use action set on some page 
  // or component without transitioning,
  // It has several props including an embedded form element 

  const { data, state } = Fetcher;
  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);
  return (
    <Fetcher.Form method="post"
      action='/newsletter'  // to use this action without 
      // being rerouted to /newsletter
      // this action is set on many 
      // if not all the rendered pages since it is part of the 
      // MainNavigation component
      className={classes.newsletter}>
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </Fetcher.Form>
  );
}

export default NewsletterSignup;
