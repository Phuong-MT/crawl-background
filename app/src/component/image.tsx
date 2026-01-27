import { useState } from "react";

type ImageProps = {
    src: string;
    alt?: string;
    title?: string;
    ratio?: number; // 👈 thêm
    className?: string;
    lazy?: boolean;
};

export default function Image({
    src,
    alt = "",
    title,
    className = "",
    lazy = false,
    ratio,
}: ImageProps) {
    const [loading, setLoading] = useState(true);

    return (
        <div className="relative overflow-hidden">
            {loading && <div className="absolute inset-0 z-10 animate-pulse bg-gray-200" />}{" "}
            {title && (
                <div className="absolute top-0 left-0 bg-black/60 text-white text-xs px-2 py-1 truncate">
                    {title}
                </div>
            )}
            {ratio !== undefined && (
                <div className="absolute top-0 right-0 bg-blue-600/80 text-white text-xs px-2 py-1 z-20">
                    {(ratio * 100).toFixed(1)}%
                </div>
            )}
            <img
                src={src}
                alt={alt}
                loading={lazy ? "lazy" : "eager"}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
                className={`block object-cover border border-gray-300 shadow ${className}`}
            />{" "}
        </div>
    );
}
