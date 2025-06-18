import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function LazyLoadGameImage ({ image }) {
    return (
        <LazyLoadImage
            alt="Game Image"
            effect="blur"
            wrapperProps={{ 
                style: {transitionDelay: "0.5s" },
            }}   
            src={image}/>
    )
};