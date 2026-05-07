import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(
            responseData.message || 'Something went wrong with the sent request.'
        );
    }

    return response;
}

export default function useHttp(url, config) {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const sendRequest = useCallback(async function sendRequest() {
        setIsLoading(true);
        try {
            const responseData = sendHttpRequest(url, config);
            setData(responseData);

        } catch (error) {
            setError(error.message || 'Failed sent request');
        }
        setIsLoading(false);
    }, [url, config]);


    useEffect(() => {
        if (config && config.method === 'GET') {
            sendRequest();
        }
    }, [sendRequest, config]);

    return {
        error,
        data,
        isLoading,
        sendRequest
    }
}