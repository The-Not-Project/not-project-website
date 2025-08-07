import { Story } from "@/app/types/types";
import {
  RadarDescription,
  RadarPhoto,
  RadarCardContainer,
} from "./radarStory.styles";


export default function RadarCard({ story }: { story: Story }) {

  return (
    <>
      <RadarCardContainer>
        <RadarDescription>
          <h2 className="title">{story.title}</h2>
          <p className="summary">“{story.summary}”</p>
          <p className="author">
            By {`${story.author.firstName} ${story.author.lastName}`}
          </p>
        </RadarDescription>
        <RadarPhoto $url={story.thumbnail} />
      </RadarCardContainer>
      {/* <DeleteButton onClick={() => onDeleteAction()}>Delete</DeleteButton> */}
    </>
  );
}
