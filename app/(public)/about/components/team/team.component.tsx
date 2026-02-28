import { OurTeamContainer, TeamList, TeamBanner } from "./team.styles";
import TeamMember from "./teamMember.component";
import teamMembers from "@/static/about/team.json"

export default function Team() {



  return (
    <OurTeamContainer>
      <TeamBanner>
        <h1>MEET OUR TEAM</h1>
        <p>The people who make it all possible.</p>
        <TeamList>
          {teamMembers.map((member) => (
            <TeamMember
              key={member.name}
              name={member.name}
              role={member.role}
              img={member.img}
            />
          ))}
        </TeamList>
      </TeamBanner>
    </OurTeamContainer>
  );
}