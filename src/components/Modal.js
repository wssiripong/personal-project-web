function Modal({ title, body, open }) {
  if (!open) {
    return null;
  }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-50 flex items-center justify-center'>
      <div className=' bg-slate-200 p-5 w-[350px]'>
        <div className='text-center pb-5'>
          <div className='text-3xl'>{title}</div>
        </div>
        <div>{body}</div>
      </div>
    </div>
  );
}

export default Modal;
