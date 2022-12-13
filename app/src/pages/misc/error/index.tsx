import { useHistory } from 'react-router-dom';

import DefaultBtn from '../../../components/default-btn';

const Error = () => {

  const history = useHistory()

  return (
    <section className='pb-xhuge'>
      <div className='w-100 text-center'>
        <h2 className='mb-xsm heading-md'>Page Not Found 🕵🏻‍♀️</h2>
        <p className='mb-md body-lg'>Oops! 😖 The requested URL was not found on this server.</p>
        <DefaultBtn onClick={() => history.push('/')}>Back to Home</DefaultBtn>
      </div>
    </section>
  )
}
export default Error
