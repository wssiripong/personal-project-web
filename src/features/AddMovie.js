import Joi from 'joi';

import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useMovie } from '../context/MovieContext';

function AddMovie() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const fileEl = useRef();

  const { createMovie, toggleAddMovie } = useMovie();

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
          <button
            type='button'
            onClick={() => fileEl.current.click()}
            className='bg-blue-500 h-10 text-white'
          >
            upload image
          </button>
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
          <button className='bg-yellow-500 h-10 text-white'>Submit</button>
          <button
            onClick={toggleAddMovie}
            className='bg-red-500 h-10 text-white'
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddMovie;
