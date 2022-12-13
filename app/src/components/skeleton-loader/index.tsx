import './style.scss';

interface SkeletonLoaderProps {
    width: number,
    height: number
    className?: string
}

const SkeletonLoader = (props: SkeletonLoaderProps) => {
    const { className, ...styleProps } = props;

    return (
        <div style={{...styleProps}} className={`skeleton-loader${className ? ` ${className}` : ''}`} />
    )
}

SkeletonLoader.defaultProps = {
    width: 200,
    height: 70
}

export default SkeletonLoader