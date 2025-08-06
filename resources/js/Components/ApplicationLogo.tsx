import { ImgHTMLAttributes } from 'react';

export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/images/usls.png"
            alt="University of St. La Salle BACOLOD"
            className="h-10 w-auto"
            {...props}
        />
    );
}
