// Served as domain.com/latest

import Link from "next/link";
import { Fragment } from "react";


function LatestNewsPage() {
    return (<Fragment>
        <h1>The News Page</h1>
        <ul>
            <li>
                {/* <a href="/latest/nextjs-is-a-great-framework"> */}
                <Link href="/latest/nextjs-is-a-great-framework">
                    NextJS Link
                </Link>
                {/* </a> */}
            </li>
            <li>Another link</li>
        </ul>
    </Fragment>);
}

export default LatestNewsPage;