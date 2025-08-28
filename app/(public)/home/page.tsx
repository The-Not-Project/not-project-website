'use client';

import { useEffect } from 'react';
import { useStore } from '../../zustand/store';
import clsx from 'clsx';
import RadarCard from './components/radarCard/radarCard.component';
import Header from './components/homepageHeader/homepageHeader.component';
import Boroughs from './components/boroughsSection/boroughs.component';
import Recommendations from './components/recommendations/recommendations.component';
// import LoadingPage from '../shared/components/loadingPage/loadingPage.component';

export default function HomePage() {

  // const [isLoading, setIsLoading] = useState(true);
  // const [showLoader, setShowLoader] = useState(true);

  const isMenuOpen = useStore(state => state.mobileLayout.isMenuOpen);
  const setIsMobile = useStore(state => state.mobileLayout.setIsMobile);


  useEffect(() => {

    const handleResize = () => setIsMobile(window.innerWidth <= 850);
    
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {

    // window.scrollTo(0, 0);
    // if (!isLoading) {
    //   const timer = setTimeout(() => {
    //     setShowLoader(false);
    //   }, 300);
    //   return () => clearTimeout(timer);
    // }
  // }, []);

  return (
    <div className={clsx('page-wrapper', { shifted: isMenuOpen })}>
      {/* {showLoader && <LoadingPage isLoading={isLoading} isHome={true} />} */}
      <Header />
      <RadarCard />
      <Boroughs />
      <Recommendations />
    </div>
  );
}
