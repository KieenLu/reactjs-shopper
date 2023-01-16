import { localStorageCache, sessionStorageCache } from "@/utils/cache"
import { useRef } from "react"
import { useMemo } from "react"
import { useEffect, useState } from "react"

const _cache = {
    localStorage: localStorageCache,
    sessionStorage: sessionStorageCache,
}


export const useQuery = (options = {}) => {
    const { queryFn,
        queryKey,
        dependencyList = [],
        enabled = true,
        cacheTime,
        storeDriver = 'localStorage' } = options
    const cache = _cache[storeDriver]
    const refetchRef = useRef()

    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const [status, setStatus] = useState('idle')
    useEffect(() => {
        if(typeof refetchRef.current === 'boolean') {
            refetchRef.current = true
        }
    }, dependencyList)

    useEffect(() => {
        if (enabled) {
            fetchData()
        }
    }, [queryKey, enabled].concat(...dependencyList))

    const fetchData = async () => {
        try {
            setLoading(true)
            setStatus('pending')

            let res
            // Kiểm tra cache xem có dữ liệu hay không
            if (queryKey && !refetchRef.current) {
                res = cache.get(queryKey)
            }

            if (!res) {
                res = await queryFn()
            }

            setStatus('success')
            setData(res)


            // update lại thời gian expired trong trường hợp cache đã tồn tại
            if (queryKey) {
                let expired = cacheTime
                if (cacheTime) {
                    expired += Date.now()
                }
                cache.set(queryKey, res, expired)
            }

            refetchRef.current = false
        } catch (err) {
            setError(err)
            setStatus('error')
        }
        finally {
            setLoading(false)
        }
    }
    return {
        loading,
        error,
        data,
        status
    }
}