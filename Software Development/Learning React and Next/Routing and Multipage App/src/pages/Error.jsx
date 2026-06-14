import { useNavigate } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
    // Programmatic navigation
    //
    const navigate = useNavigate();

    function navigateHomeHandler() {
        navigate('/'); // Receives route as argument
    }

    return (
        <>
            <MainNavigation />
            <main>
                <p>We didn't find it</p>
                <button onClick={navigateHomeHandler}>Home</button>
            </main>
        </>
    );
}

export default ErrorPage;