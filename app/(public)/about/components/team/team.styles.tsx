import styled from "styled-components";

export const OurTeamContainer = styled.div`
  margin-block: 4rem;
  background: url("/media/texture.png") no-repeat center center/cover;
  padding: 200px 100px;
  @media (max-width: 1100px) {
    padding: 50px 10px;
    margin-bottom: 0;
    margin: 4rem 0rem;
    background-image: url("/media/texture.png") no-repeat center center/cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    padding: 2rem;
  }
`;

export const TeamBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 60px;
  background-color: #e7e0d6;

  @media (max-width: 1100px) {
    padding: 30px 0px;
  }

  h1 {
    font-size: 2rem;
  }
`;
export const TeamList = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    margin-top: 2rem;
  }
`;
export const TeamMemberCard = styled.div`
  text-align: center;
  width: 30%;

  @media (max-width: 1100px) {
    width: 100%;
    padding-inline: 10%;
  }
  h2 {
    font-size: 1.8rem;
    font-family: var(--font-georgia), serif;
    font-weight: normal;
  }

  p {
    font-size: 1.2rem;
    color: #3b3b3b;
  }
`;

export const ProfileImageContainer = styled.figure`
  margin-bottom: 1.2rem;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 6 / 7;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.4s ease;
  filter: grayscale(100%);
  &:hover {
    filter: none;
    scale: 1.05;
  }
`;
