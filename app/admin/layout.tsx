import { AdminServerActionsProvider } from '@/app/contexts/admin-server-actions';
import NavBar from './shared/components/navbar/navbar.component';
import { AdminContainer } from './shared/components/layout/layout.styles';
import Back from './shared/components/backButton/backButton.component';
import { getUser, UpdateUser } from '../database/repositories/user.repository';
import {
  createCategory,
  deleteCategory,
  editCategory,
  getCategories,
} from '../database/repositories/category.repository';
import {
  createStory,
  deleteStory,
  editStory,
  getHiddenStories,
  getStories,
  getStory,
  republishStory,
  unpublishStory,
} from '../database/repositories/story.repository';
import {
  addRecommendation,
  getRecommendations,
  removeRecommendation,
} from '../database/repositories/recommendation.repository';
import {
  getRadarStory,
  updateRadarStory,
} from '../database/repositories/radar.repository';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const groupedActions = {
    getUser,
    UpdateUser,
    createCategory,
    getCategories,
    editCategory,
    deleteCategory,
    createStory,
    getStories,
    getStory,
    editStory,
    deleteStory,
    getRecommendations,
    addRecommendation,
    removeRecommendation,
    getRadarStory,
    updateRadarStory,
    unpublishStory,
    republishStory,
    getHiddenStories
  };

  return (
    <AdminServerActionsProvider {...groupedActions}>
      <AdminContainer>
        <Back />
        <div className='admin-content'>
          <h1>The Not Project - Admin Page</h1>
          <NavBar />
          {children}
        </div>
      </AdminContainer>
    </AdminServerActionsProvider>
  );
}
