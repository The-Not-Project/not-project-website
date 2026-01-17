import Image from 'next/image';
import { LoadingPageContainer } from './loadingPage.styles';

export default function LoadingPage() {

  return (
    <LoadingPageContainer className='loader'>
        <Image
          src='/media/its_in_motion.png'
          width={300}
          height={300}
          alt='logo'
          priority
        />
    </LoadingPageContainer>
  );
}
