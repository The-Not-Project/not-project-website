import { Story as StoryType } from '@/app/types/types';
import {
  ActionsContainer,
  StoryContainer,
  StoryContentContainer,
  StoryImageContainer,
} from './storyCard.styles';
import { Button } from '../../../shared/components/button/button';

type StoryProps = {
  story: StoryType;
  onDelete: (id: string) => Promise<void>;
  onEdit: (story: StoryType) => void;
};

export default function Story({ story, onDelete, onEdit }: StoryProps) {
  const date = new Date(story.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });  

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      try {
        await onDelete(id);
      } catch (error) {
        console.error('Failed to delete story:', error);
      }
    }
  };

  return (
    <StoryContainer>
      <StoryImageContainer
        src={story.thumbnail}
        alt='Photo'
        width={150}
        height={100}
      />
      <StoryContentContainer>
        <h2>{story.title}</h2>
        <p>By {`${story.author.firstName} ${story.author.lastName}`}</p>
        <p>Created At {date}</p>
      </StoryContentContainer>
      <ActionsContainer>
        <Button className='inverted' onClick={() => onEdit(story)}>
          Edit
        </Button>
        <Button onClick={() => handleDelete(story.id)}>Delete</Button>
      </ActionsContainer>
    </StoryContainer>
  );
}
