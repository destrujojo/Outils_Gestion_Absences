import { useRouteError } from 'react-router-dom';
import Navigation from '../components/Navigation';

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <>
      <Navigation />
      <div
        id='error-page'
        className='flex flex-col items-center justify-center h-screen bg-gray-100'
      >
        <h1 className='text-4xl font-bold text-red-600'>Oops!</h1>
        <p className='mt-4 text-lg'>
          Désolé, il semblerait qu'il y ait une erreur.
        </p>
        <p>
          <i>{error?.statusText || error?.message}</i>
        </p>
      </div>
    </>
  );
}
