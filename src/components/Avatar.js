import missingImage from '../images/missingProfile.png';

function Avatar({ src, size }) {
  return (
    <div>
      <img
        className={`h-[${size}px] w-[${size}px] rounded-full`}
        src={src || missingImage}
        alt=''
      />
    </div>
  );
}

export default Avatar;
