import { use } from "react";
import { OpinionsContext } from "../store/opinions-context";
import { useActionState } from "react";
import { useOptimistic } from "react";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);

  // UI can be updated optimistically based on the change of states,
  // through useOptimistic() hook 
  // It provides much faster UI updation, while regular 
  // state updation operations are still going on in the background,
  // Works in roughly two steps, uses the optimistic state to update the UI,
  // and replace that optimistic state by the actual state 
  // after the scheduled state updations have been run, which can 
  // either resolve into new state value if successful or old state 
  // value if failed, letting the dev not manually handling this kind 
  // of edge cases
  const [optimisticVotes, setOptimisticVotes] = useOptimistic(
    votes, // The actual state passed as init state
    (prevVote, mode) => (mode === 'up' ? prevVote + 1 : prevVote - 1)
    // updation call back recieving the previous state and 
    // var args list as needed for updation, here just one, 'mode' 
  );

  async function upVoteAction() {
    setOptimisticVotes('up');
    await upvoteOpinion(id);
  }

  async function downVoteAction() {
    setOptimisticVotes('down');
    await downvoteOpinion(id);
  }

  const [upvoteFormState, upvoteFormAction, upvotePending] = useActionState(upVoteAction);
  const [downvoteFormState, downvoteFormAction, downvotePending] = useActionState(downVoteAction);

  let pending = upvotePending || downvotePending;
  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        {/* // Individual actionionable elements such as buttons
        //  inside the form can also have 
        // actions just like the encompassing form  through the attribute
        // formAction */}
        <button
          formAction={upvoteFormAction}
          disabled={pending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        {/* <span>{votes}</span> */}
        <span>{optimisticVotes}</span> {/* Optimistic state */}

        <button
          formAction={downvoteFormAction}
          disabled={pending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
