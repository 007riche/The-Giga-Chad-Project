import { Outlet, useLoaderData, useNavigation, useSubmit } from "react-router-dom";
import MainNavigation from '../components/MainNavigation';
import { useEffect } from "react";
import { getTokenDuration } from "./util/auth";

function RootPage() {
    // const navigation = useNavigation();
    // navigation.state = loading | idle | submitting
    const token = useLoaderData();
    const submit = useSubmit();
    useEffect(() => {
        if (!token) {
            return;
        }

        if (token === 'EXPIRED') {
            submit(null, {
                action: '/logout',
                method: 'post'
            });
        }
        const remainingTokenDuration = getTokenDuration();
        console.log("Remaing session time: ", remainingTokenDuration);

        setTimeout(() => {
            submit(null, {
                action: '/logout',
                method: 'post'
            });
        }, remainingTokenDuration);
    }, [token, submit]);

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