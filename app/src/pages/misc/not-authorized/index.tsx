import { useHistory } from 'react-router-dom';

import DefaultBtn from '../../../components/default-btn';

const NotAuthorized = () => {

  const history = useHistory()

  return (
    <section className='pb-xhuge'>
      <div className='w-100 text-center'>
        <h2 className='mb-xsm heading-md'>You are not authorized! 🔐</h2>
        <p className='mb-md body-lg'>
          The Webtrends Marketing Lab website in IIS uses the default IUSR account credentials to access the web pages
          it serves.
        </p>
        <DefaultBtn onClick={() => history.push('/')}>Back to Home</DefaultBtn>
      </div>
    </section>
  )
}
export default NotAuthorized
