import './SkeletonProfileCard.css'
import SkeletonProfileImg from './SkeletonProfileImg/SkeletonProfileImg';

const SkeletonProfileCard:React.FC = () => {
  return (
    <div className='SkeletonProfileCard'>
      <SkeletonProfileImg/>
      <div className='SkeletonProfileCard__wrapper'>
        <div className='SkeletonProfileCard__top-row'></div>
        <div className='SkeletonProfileCard__bottom-row'></div>
      </div>
    </div>
  );
}

export default SkeletonProfileCard