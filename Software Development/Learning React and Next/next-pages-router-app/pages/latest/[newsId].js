// Served as domain.com/latest/last-topic

import { useRouter } from "next/router";

function RandomNewsPage() {
    const router = useRouter();
    const newsId = router.query.newsId; // Almost the 
    // same as the slug part in the latter next routing
    return <h1>The last one news</h1>
}

export default RandomNewsPage;