function Modal({ title, body, open, close }) {
  if (!open) {
    return null;
  }

  return (
    <div
      className='fixed top-0 bottom-0 left-0 right-0 backdrop-blur bg-black bg-opacity-50 flex items-center justify-center'
      onClick={close}
    >
      <div
        className=' bg-teal-300 p-5 w-[350px] rounded-xl fadein'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='text-center pb-5'>
          <div className='text-3xl font-bangers text-teal-800'>{title}</div>
        </div>
        <div>{body}</div>
      </div>
    </div>
  );
}

export default Modal;
