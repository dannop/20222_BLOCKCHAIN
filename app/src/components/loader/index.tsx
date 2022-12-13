import './style.scss';

interface LoaderProps {
  fixed?: boolean,
  background?: boolean,
  size: number,
  color: "primary" | "white",
}

const Loader = (props: LoaderProps) => {
  const { fixed, background, size, color } = props;

  return (
    <div className={`fallback-spinner${background ? ' background' : ''}${fixed ? ' fixed' : ''} spinner-${color}`}>
      <div style={{height: size, width: size}} className='loading'>
        <div style={{height: size - 5, width: size - 5}} className='effect-1 effects'></div>
        <div style={{height: size - 5, width: size - 5}} className='effect-2 effects'></div>
        <div style={{height: size - 5, width: size - 5}} className='effect-3 effects'></div>
      </div>
    </div>
  );
}

Loader.defaultProps = {
  color: 'primary',
  size: 55
}

export default Loader;