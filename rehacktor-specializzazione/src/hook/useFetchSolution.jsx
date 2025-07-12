import { useState, useEffect, useCallback } from 'react';

function useFetchSolution(initialUrl) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(initialUrl);

    useEffect(() => {
        setUrl(initialUrl);
    }, [initialUrl]);

    const load = useCallback (async () => {
        setData(null);
        if (!url) {
            setError('Error URL provided');
            return;
        } else {
            setError(null);
        }
        setLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setData(json);
        } catch (error) {
            setError(error.message);
            setData(null);
        }
        setLoading(false);
    }, [url]);
    
    useEffect(() => {
        load();
    }, [load]);
    
    return {
        data,
        loading,
        error,
        url,
        load,
        updateUrl: setUrl
    };
};
export default useFetchSolution;