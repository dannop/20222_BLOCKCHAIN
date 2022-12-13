import { Link } from 'react-router-dom';

import './style.scss';

interface CardLinkProps {
    link: string,
    title: string,
    description?: string
}

const CardLink = (props: CardLinkProps) => {
    const { link, title, description } = props;
    
    return (
        <Link className='d-flex align-items-center justify-content-center flex-column card-link' to={link}>
            <span className='heading-md'>{title}</span>
            <span className='body-lg'>{description}</span>
        </Link>
    )
}

export default CardLink