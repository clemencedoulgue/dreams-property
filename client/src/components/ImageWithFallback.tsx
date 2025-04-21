import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps {
    src: string | undefined;
    alt: string;
    fallbackSrc?: string;
    className?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
    src,
    alt,
    fallbackSrc = '/images/placeholder.jpg',
    className = '',
}) => {
    // Log initial props for debugging
    console.log(`ImageWithFallback - Initial props for ${alt}:`, { src, fallbackSrc });

    const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Update imgSrc if src changes
        if (!error && src !== imgSrc) {
            console.log(`ImageWithFallback - Source changed for ${alt}:`, { oldSrc: imgSrc, newSrc: src });
            setImgSrc(src || fallbackSrc);
        }
    }, [src, fallbackSrc, imgSrc, error, alt]);

    const handleError = () => {
        console.log(`ImageWithFallback - Image load error for ${alt}:`, { attemptedSrc: imgSrc });
        if (!error) {
            console.log(`ImageWithFallback - Using fallback for ${alt}:`, { fallbackSrc });
            setImgSrc(fallbackSrc);
            setError(true);
        }
    };

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={className}
            onError={handleError}
            loading="lazy"
            style={{ minHeight: '200px', objectFit: 'cover' }}
        />
    );
};

export default ImageWithFallback; 