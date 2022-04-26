import React, { useCallback, useEffect, useRef, useState } from "react";

function useHttpClient() {
    const [loading, setLoading] = useState(false)

    const activeHttpRequests = useRef([])

    const fetchData = useCallback(
        async (url, method = 'GET', headers = {}, body = null) => {
            const httpAbortCtrl = new AbortController()
            activeHttpRequests.current.push(httpAbortCtrl)
            setLoading(true)
            try {
                const response = await fetch(url, {
                    method,
                    headers,
                    body,
                    signal: httpAbortCtrl.signal
                })
                const responseData = await response.json()
                activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl)
                if(!response.ok) {
                    throw new Error(responseData.message)
                }
                setLoading(false)
                return responseData.result
            } catch (error) {
                setLoading(false)
                throw error
            }
        },
        []
    )

    useEffect(() => {
        // return () => {
        //     activeHttpRequests.current?.forEach(abortCtrl => abortCtrl.abort())
        // }
    }, [])

    return { loading, fetchData }
}

export default useHttpClient