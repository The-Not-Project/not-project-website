import Image from 'next/image';
import { LoadingPageContainer } from './loadingPage.styles';
import { BeatLoader } from 'react-spinners';
import { useEffect } from 'react';

type LoadingPageProps = {
  isLoading: boolean;
  isHome: boolean;
};

export default function LoadingPage({ isLoading, isHome }: LoadingPageProps) {
  useEffect(() => {
      document.body.style.overflow = "hidden";
  
      return () => {
        document.body.style.overflow = ""; // cleanup on unmount
      };
    }, []);
  return (
    <LoadingPageContainer $isLoading={isLoading} $isHome={isHome}>
      {isHome ? (
        <Image
          src='/media/its_in_motion.png'
          width={300}
          height={300}
          alt='logo'
        />
      ) : (
        <BeatLoader color='white' />
      )}
    </LoadingPageContainer>
  );
}
