import { use } from "react";
import { OpinionsContext } from "../store/opinions-context";
import { useActionState } from "react";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);

  async function upVoteAction() {
    await upvoteOpinion(id);
  }

  async function downVoteAction() {
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

        <span>{votes}</span>

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
