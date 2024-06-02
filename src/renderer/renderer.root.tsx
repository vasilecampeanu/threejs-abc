import { FC, useEffect, useRef } from "react";
import '../../styles/styles.scss';

interface RootProps {
    onMount: (ref: HTMLDivElement) => void;
}

export const Root: FC<RootProps> = ({ onMount }) => {
    const rendererRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (rendererRef.current) {
            onMount(rendererRef.current);
        }
    }, [onMount]);

    return (
        <div id="renderer" ref={rendererRef}>
        </div>
    );
}
