import { useRouteError } from 'react-router-dom';
import PageContent from '../components/PageContent';
import MainNavigation from '../components/MainNavigation';

function ErrorPage() {

    const error = useRouteError();

    let title = "An error occured!";
    let message = "Something went wrong!";

    if (error.status === 500) {
        message = JSON.parse(error.data).message; // using throw Response
        // message = error.data.message; // not working, @react-router-dom > 7+

    }
    if (error.status === 404) {
        message = "Not found";
    }
    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    );
}

export default ErrorPage;