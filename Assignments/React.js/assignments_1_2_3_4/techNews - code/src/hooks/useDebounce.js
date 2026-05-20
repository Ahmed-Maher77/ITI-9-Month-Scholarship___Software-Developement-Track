import { useEffect, useState } from "react";

function useDebounce(value, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [delay, value]);

    return debouncedValue;
}

export default useDebounce;
