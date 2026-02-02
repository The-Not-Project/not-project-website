import Image from "next/image";
import HeaderBackground from './components/headerBackground.component'
import {
  CenterTitle,
  HeaderContainer,
  SeperatorContainer,
} from "./homepageHeader.styles";

export default function HomePageHeader() {


  return (
    <HeaderContainer>
      <HeaderBackground />
      {/* <div className='quote'>“Not who they expected, exactly who I am”</div> */}
      <CenterTitle>
        <h2>Unbridled Stories, Untamed Voices.</h2>
        <h1>THE NOT</h1>
        <SeperatorContainer>
          <Image
            src="/media/knot-separator.png"
            alt="Logo"
            fill
            sizes="800px"
            priority
          />
        </SeperatorContainer>
        <h1>PROJECT</h1>
        <p>
          Explore meaningful stories from New York City, told without constraint
          or agenda.
        </p>
      </CenterTitle>
    </HeaderContainer>
  );
}
