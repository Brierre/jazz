import { useEffect } from "react";

const useKeyDown = (key, action) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === key) {
                action();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [key, action]);
};

export default useKeyDown;