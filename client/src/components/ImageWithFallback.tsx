import React, { useState } from 'react';

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
    const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
    const [error, setError] = useState(false);

    const handleError = () => {
        if (!error) {
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