import './SkeletonProfileCard.css'

const SkeletonProfileCard:React.FC = () => {
  return (
    <div className='SkeletonProfileCard'>
      <div className='SkeletonProfileCard__img'></div>
      <div className='SkeletonProfileCard__wrapper'>
        <div className='SkeletonProfileCard__top-row'></div>
        <div className='SkeletonProfileCard__bottom-row'></div>
      </div>
    </div>
  );
}

export default SkeletonProfileCard