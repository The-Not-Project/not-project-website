import {
  TeamMemberCard,
  ProfileImage,
  ProfileImageContainer,
} from "./team.styles";

type TeamMemberProps = {
  name: string;
  role: string;
  img: string;
};

export default function TeamMember({ name, role, img }: TeamMemberProps) {
  return (
    <TeamMemberCard>
      <ProfileImageContainer>
        <ProfileImage
          src={`/media/${img}`}
          alt={name}
          fill
          sizes="(max-width: 850px) 80vw, 25vw"
        />
      </ProfileImageContainer>
      <h2>{name}</h2>
      <p>{role}</p>
    </TeamMemberCard>
  );
}
