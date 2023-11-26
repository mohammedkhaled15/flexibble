import { ProjectInterface, UserProfile } from '@/common.types'
import Image from 'next/image'
import Button from './Button'
import Link from 'next/link'
import ProjectCard from './ProjectCard'

type Props = {
  userProfile: UserProfile
}

const UserProfilePage = ({ userProfile }: Props) => {
  return (
    <section className='flexCenter flex-col max-w-10xl w-full mx-auto paddings'>
      <section className='flexBetween max-lg:flex-col gap-10 w-full'>
        <div className='flex items-start flex-col w-full'>
          {userProfile?.image && <Image
            src={userProfile?.image}
            alt="profile image"
            width={100}
            height={100}
            className='rounded-full'
          />}
          <p className='text-4xl font-bold mt-10'>{userProfile?.name}</p>
          <p className='md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg'>I'am a Software Developer</p>
          <div className='flex mt-8 gap-5 w-full flex-wrap'>
            <Button
              title="Follow"
              leftIcon="/plus-round.svg"
              bgColor="bg-light-white-400 !w-max"
              textColor="text-black-100"
            />
            <Link href={`mailto:${userProfile?.email}`}>
              <Button title="Hire Me" leftIcon="/email.svg" />
            </Link>
          </div>
        </div>

        {userProfile?.projects?.length > 0 ?
          (<Image
            src={userProfile?.projects[0].image}
            alt="Project Image"
            width={739}
            height={554}
            className='rounded-xl object-contain'
          />) :
          (<Image
            src="/profile-post.png"
            width={739}
            height={554}
            alt="project image"
            className='rounded-xl'
          />)
        }
      </section>

      <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
        <p className="w-full text-left text-lg font-semibold">Recent Work</p>
        <div className="profile_projects">
          {
            userProfile?.projects?.length !== 0 &&
            (userProfile?.projects?.map((project: ProjectInterface) => (
              <ProjectCard
                key={project?.id}
                id={project?.id}
                image={project?.image}
                title={project?.title}
                name={project?.createdBy?.name}
                avatarUrl={project?.createdBy?.image}
                userId={project?.createdBy?.id}
                views={project?.views}
                likedBy={project?.likedBy}
              />
            )))
          }
        </div>
      </section>
    </section>
  )
}

export default UserProfilePage