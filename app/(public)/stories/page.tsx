import StoriesPageComponent from './components/StoriesPage/storiesPage.component';
import { Metadata } from 'next';
import { storiesPageMetadata } from '@/app/constants/metadata';

export const metadata : Metadata = storiesPageMetadata

export default function Page() {
  return <StoriesPageComponent />;
}

