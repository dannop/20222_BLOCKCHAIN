

interface ToastProps {
  title: string,
  message: string
}

const Toast = (props: ToastProps) => {
    const { title, message } = props;

    return (
        <>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <h6 className='toast-title mb-xxsm'>{title}</h6>
                </div>
            </div>
            {message && <p className="body-sm text-support">{message}</p>}
        </>
    )
}

export default Toast;