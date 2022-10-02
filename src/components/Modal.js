import { useAuth } from '../context/AuthContext';

function Modal({ title, body, open, close }) {
  const { user } = useAuth();

  if (!open) {
    return null;
  }

  return (
    <div
      className='fixed top-0 bottom-0 left-0 right-0 backdrop-blur bg-black bg-opacity-50 flex items-center justify-center'
      onClick={!user ? null : close ? close : null}
    >
      <div
        className=' bg-slate-200 p-5 w-[350px] fadein'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='text-center pb-5'>
          <div className='text-3xl'>{title}</div>
        </div>
        <div>{body}</div>
      </div>
    </div>
  );
}

export default Modal;
