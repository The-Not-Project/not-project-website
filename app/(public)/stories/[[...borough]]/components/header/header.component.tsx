import {
  BoroughSelectionContainer,
  HeaderContainer,
  HeaderDescriptionContainer,
  HeaderPhoto,
  HeaderPhotoContainer,
} from "./header.styles";
import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  borough: {
    key: string;
    name: string;
    description: string;
  };
};

export default function HeaderComponent({ borough }: HeaderProps) {

  return (
    <HeaderContainer>
      <HeaderPhotoContainer>
        <HeaderPhoto>
          <Image
            src={`/media/boroughBackdrops/${borough.key}.webp`}
            alt="borough backdrop"
            fill
            sizes="(max-width: 850px) 100vw, (max-width: 1200px) 45vw, 900px"
            style={{objectFit: 'cover'}}
            priority
          />
        </HeaderPhoto>
      </HeaderPhotoContainer>
      <HeaderDescriptionContainer>
        <h1>
          The {borough.key == 'nyc' ? 'City' : 'Borough'} Of <br /> <span>{borough.name}</span>
        </h1>

        <p>
          {borough.description}
        </p>
        <BoroughSelectionContainer>
          <h2>Interested in Your Borough?</h2>
          <ul>
            <li><Link href="/stories/queens"><span>Queens</span>: Many worlds, one borough ↗</Link></li>
            <li><Link href="/stories/brooklyn"><span>Brooklyn</span>: Cool, before it knew it was ↗</Link></li>
            <li><Link href="/stories/manhattan"><span>Manhattan</span>: The pressure cooker ↗</Link></li>
            <li><Link href="/stories/bronx"><span>The Bronx</span>: Where it all started ↗</Link></li>
            <li><Link href="/stories/statenisland"><span>Staten Island</span>: Close enough to leave ↗</Link></li>
          </ul>
        </BoroughSelectionContainer>
      </HeaderDescriptionContainer>
    </HeaderContainer>
  );
}
