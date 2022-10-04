import { useMovie } from '../context/MovieContext';

function SideModal() {
  const { openSideModal, toggleSideModal } = useMovie();

  if (!openSideModal) {
    return null;
  }

  return (
    <div className='bg-teal-500 fixed top-0 left-0 bottom-0 w-[300px] z-40'>
      <button onClick={toggleSideModal}>X</button>
    </div>
  );
}

export default SideModal;
