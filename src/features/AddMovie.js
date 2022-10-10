import Joi from 'joi';

import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useLoading } from '../context/LoadingContext';
import { useMovie } from '../context/MovieContext';
import {
  CATEGORY_ACTION,
  CATEGORY_DRAMA,
  CATEGORY_ANIME,
  CATEGORY_COMEDY,
  CATEGORY_CRIME,
  CATEGORY_DOCUMENTARY,
  CATEGORY_FAMILY,
  CATEGORY_FANTASY,
  CATEGORY_HORROR,
  CATEGORY_ROMANCE,
  CATEGORY_THRILLER,
  CATEGORY_TV_SHOWS
} from '../config/constants';
import SpinIcon from '../components/svg/SpinIcon';

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

      await createMovie(formData);
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
            className='h-10 text-center outline-blue-500 rounded-lg shadow-lg'
            placeholder='title'
          />
          <select
            className='h-10 text-center outline-blue-500 text-gray-400 rounded-lg shadow-lg'
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=''>choose category</option>
            <option value={CATEGORY_ACTION}>Action</option>
            <option value={CATEGORY_ANIME}>Anime</option>
            <option value={CATEGORY_COMEDY}>Comedy</option>
            <option value={CATEGORY_CRIME}>Crime</option>
            <option value={CATEGORY_DOCUMENTARY}>Documentary</option>
            <option value={CATEGORY_DRAMA}>Drama</option>
            <option value={CATEGORY_FAMILY}>Family</option>
            <option value={CATEGORY_FANTASY}>Fantasy</option>
            <option value={CATEGORY_HORROR}>Horror</option>
            <option value={CATEGORY_ROMANCE}>Romance</option>
            <option value={CATEGORY_THRILLER}>Thriller</option>
            <option value={CATEGORY_TV_SHOWS}>TV Shows</option>
          </select>
          <textarea
            className='h-20 text-center outline-blue-500 rounded-lg shadow-lg'
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
            <button className='flex justify-center items-center bg-blue-500 h-10 text-white rounded-lg shadow-lg'>
              <div role='status'>
                <SpinIcon />
                <span className='sr-only'>Loading...</span>
              </div>
              Processing...
            </button>
          ) : (
            <div className='flex flex-col gap-1'>
              <button
                type='button'
                onClick={() => fileEl.current.click()}
                className='bg-blue-500 h-10 text-white rounded-lg shadow-lg active:scale-95'
              >
                {coverImage ? 'file selected' : 'upload image'}
              </button>
              <button className='bg-yellow-500 h-10 text-white rounded-lg shadow-lg active:scale-95'>
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

export default AddMovie;
