import { ProjectInterface } from '@/common.types'
import Modal from '@/components/Modal'
import ProjectActions from '@/components/ProjectActions'
import RelatedProjects from '@/components/RelatedProjects'
import { getProjectById } from '@/lib/actions'
import { getCurrentUser } from '@/utils/authOptions'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  params: {
    id: string
  }
}

const ProjectPage = async ({ params }: Props) => {

  const session = await getCurrentUser()

  const project = await getProjectById(params.id) as ProjectInterface

  if (!project) {
    <p>Fialed to fetch project information</p>
  }

  const renderLink = () => `/profile/${project?.createdBy?.id}`
  return (
    <Modal>
      <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
        <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
          {project?.createdBy?.image &&
            <Link href={renderLink()}>
              <Image
                src={project.createdBy.image}
                width={50}
                height={50}
                alt="profile"
                className="rounded-full"
              />
            </Link>}

          <div className="flex-1 flexStart flex-col gap-1">
            <p className="self-start text-lg font-semibold">
              {project?.title}
            </p>
            <div className="user-info">
              <Link href={renderLink()}>
                {project?.createdBy?.name}
              </Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
              <Link href={`/?category=${project.category}`} className="text-primary-purple font-semibold">
                {project?.category}
              </Link>
            </div>
          </div>
        </div>

        {session?.user?.email === project?.createdBy?.email && (
          <div className="flex justify-end items-center gap-2">
            <ProjectActions projectId={project?.id} />
          </div>
        )}
      </section>

      <section className="mt-14">
        <Image
          src={`${project?.image}`}
          className="object-cover rounded-2xl"
          width={1064}
          height={798}
          alt="poster"
        />
      </section>

      <section className="flexCenter flex-col mt-20">
        <p className="max-w-5xl text-xl font-normal">
          {project?.description}
        </p>

        <div className="flex flex-wrap mt-5 gap-5">
          <Link href={project?.githubUrl} target="_blank" rel="noreferrer" className="flexCenter gap-2 tex-sm font-medium text-primary-purple">
            🖥 <span className="underline">Github</span>
          </Link>
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          <Link href={project?.liveSiteUrl} target="_blank" rel="noreferrer" className="flexCenter gap-2 tex-sm font-medium text-primary-purple">
            🚀 <span className="underline">Live Site</span>
          </Link>
        </div>
      </section>

      <section className="flexCenter w-full gap-8 mt-28">
        <span className="w-full h-0.5 bg-light-white-200" />
        {project?.createdBy?.image &&
          <Link href={renderLink()} className="min-w-[82px] h-[82px]">
            <Image
              src={project.createdBy.image}
              className="rounded-full"
              width={82}
              height={82}
              alt="profile image"
            />
          </Link>}
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>

      <RelatedProjects userId={project?.createdBy?.id} projectId={project?.id} />
    </Modal>
  )
}

export default ProjectPage