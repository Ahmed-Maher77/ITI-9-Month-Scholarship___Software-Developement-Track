import { useState, useEffect, useCallback } from "react";
import { getActivity } from "../services/activityService";

/**
 * Hook to fetch and paginate the current user's activity history.
 */
const useActivity = ({ limit = 5 } = {}) => {
    const [items, setItems]         = useState([]);
    const [loading, setLoading]     = useState(true);
    const [error, setError]         = useState(null);
    const [page, setPage]           = useState(1);
    const [hasMore, setHasMore]     = useState(false);
    const [total, setTotal]         = useState(0);

    const fetchActivity = useCallback(async (pageNum = 1) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getActivity({ page: pageNum, limit });
            const result = data.data;
            setItems(result.items);
            setHasMore(result.hasMore);
            setTotal(result.total);
        } catch (err) {
            setError(err.message ?? "Failed to load activity.");
        } finally {
            setLoading(false);
        }
    }, [limit]);

    useEffect(() => {
        fetchActivity(page);
    }, [page, fetchActivity]);

    const nextPage = () => {
        if (hasMore) setPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (page > 1) setPage(prev => prev - 1);
    };

    const refresh = () => {
        if (page === 1) {
            fetchActivity(1);
        } else {
            setPage(1);
        }
    };

    return {
        items,
        loading,
        error,
        page,
        hasMore,
        total,
        totalPages: Math.ceil(total / limit),
        nextPage,
        prevPage,
        refresh
    };
};

export default useActivity;
