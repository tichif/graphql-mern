import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
      <FaExclamationTriangle size='5em' className='text-danger' />
      <h1>404</h1>
      <p className='lead'>Sorry, this page doesn&apos;t exist.</p>
      <Link to={'/'} className='btn btn-primary'>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
