import { use } from "react";
import { useActionState } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);

  async function shareOpinionAction(prevFormData, formData) {
    const title = formData.get('title');
    const body = formData.get('body');
    const userName = formData.get('userName');

    let errors = [];
    if (title.trim().length < 5) {
      errors.push('Title must be at least five characters longs.');
    }
    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push('Your opinion should be between 10 and 300 characters long.');
    }
    if (!userName.trim()) {
      errors.push('Please provide your user name.');
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValue: {
          userName,
          title,
          body
        }
      };
    }

    await addOpinion({ title, body, userName });
    // Reseting the fields after passing the validation and submission
    return { errors: null };
  }
  // the 3rd destructured element (Typically called pending) of the return of useActionState 
  // can be used to indicate the state of the ongoing submission  

  // one other way to handle the form submission status is to 
  // use the useFormStatus hook from the react-dom, But it should 
  // be used inside a nested component of the 
  // form component (here, which is NewOpinion component) 
  const [formState, formAction] = useActionState(shareOpinionAction, { errors: null });
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        {
          formState.errors && (
            <ul className="errors">
              {formState.errors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )
        }
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName"
              defaultValue={formState.enteredValue?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title"
              defaultValue={formState.enteredValue?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5}
            defaultValue={formState.enteredValue?.body}
          ></textarea>
        </p>

        <Submit />
      </form>
    </div>
  );
}
