import UserProfilePage from '@/components/UserProfilePage';
import { getUserFullProfile } from '@/lib/actions';

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const userProfile = await getUserFullProfile(params.id)
  if (!userProfile?.projects) {
    return <p className='no-result-text'>Failed to fetch user info</p>
  }
  return (
    <UserProfilePage userProfile={userProfile} />
  )
}

export default ProfilePage
