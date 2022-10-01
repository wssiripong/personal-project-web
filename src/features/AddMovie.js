import Joi from 'joi';

import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useLoading } from '../context/LoadingContext';
import { useMovie } from '../context/MovieContext';

function AddMovie() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const fileEl = useRef();

  const { createMovie, toggleAddMovie } = useMovie();
  const { loading, startLoading, stopLoading } = useLoading();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();

      const schema = Joi.object({
        title: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
        coverImage: Joi.required()
      });

      const { error } = schema.validate({
        title,
        category,
        description,
        coverImage
      });

      if (error) {
        toast.error(error);
      }

      formData.append('title', title);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('coverImage', coverImage);

      startLoading();

      const res = await createMovie(formData);
      toggleAddMovie();
      setTitle('');
      setCoverImage(null);
      setCategory('');
      setDescription('');

      toast.success('movie added successfully');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data.message);
    } finally {
      stopLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-3 items-center p-3'>
        <div className='flex flex-col gap-3 w-full'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='h-10 text-center outline-blue-500'
            placeholder='title'
          />
          <select
            className='h-10 text-center outline-blue-500 text-gray-400'
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=''>choose category</option>
            <option value='ACTION'>Action</option>
            <option value='ANIME'>Anime</option>
            <option value='COMEDY'>Comedy</option>
            <option value='CRIME'>Crime</option>
            <option value='DOCUMENTARY'>Documentary</option>
            <option value='DRAMA'>Drama</option>
            <option value='FAMILY'>Family</option>
            <option value='FANTASY'>Fantasy</option>
            <option value='HORROR'>Horror</option>
            <option value='ROMANCE'>Romance</option>
            <option value='THRILLER'>Thriller</option>
            <option value='TV_SHOWS'>TV Shows</option>
          </select>
          <textarea
            className='h-20 text-center outline-blue-500'
            placeholder='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type='file'
            className='hidden'
            ref={fileEl}
            onChange={(e) => {
              if (e.target.files[0]) {
                setCoverImage(e.target.files[0]);
              }
            }}
          />

          {loading ? (
            <button className='flex justify-center items-center bg-blue-500 h-10'>
              <div role='status'>
                <svg
                  class='inline mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-blue-600 fill-gray-600 dark:fill-gray-300'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
                <span class='sr-only'>Loading...</span>
              </div>
              Processing...
            </button>
          ) : (
            <div className='flex flex-col gap-1'>
              <button
                type='button'
                onClick={() => fileEl.current.click()}
                className='bg-blue-500 h-10 text-white'
              >
                upload image
              </button>
              <button className='bg-yellow-500 h-10 text-white'>Submit</button>
              <button
                onClick={toggleAddMovie}
                className='bg-red-500 h-10 text-white'
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

export default AddMovie;
