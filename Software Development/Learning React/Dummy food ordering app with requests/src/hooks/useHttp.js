import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(
            responseData.message || 'Something went wrong with the sent request.'
        );
    }

    return responseData;
}

export default function useHttp(url, config, initialState) {
    const [data, setData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const sendRequest = useCallback(
        async function sendRequest(data) {
            setIsLoading(true);
            console.log("isLoading: ", isLoading);
            try {
                const responseData = await sendHttpRequest(url, { ...config, body: data });
                setData(responseData);
            } catch (error) {
                setError(error.message || 'Failed sent request');
            }
            setIsLoading(false);
        }, [url, config]);


    useEffect(() => {
        if ((config && (config.method === 'GET' || !config.method)) || !config) {
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