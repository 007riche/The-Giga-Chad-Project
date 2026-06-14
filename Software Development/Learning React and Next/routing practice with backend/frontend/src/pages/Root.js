import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from '../components/MainNavigation';

function RootPage() {
    // const navigation = useNavigation();
    // navigation.state = loading | idle | submitting
    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default RootPage;