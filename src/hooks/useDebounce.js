import { useEffect, useState } from "react";

export default function useDebounce(text, delay) {
    const [value, setValue] = useState("");

    useEffect(() => {
        const timerId = setInterval(() => {
            setValue(text);
        }, delay);
        return () => {
            clearInterval(timerId);
        };
    }, [text, delay]);

    return value;
}