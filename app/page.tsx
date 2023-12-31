import { ProjectInterface } from "@/common.types"
import Categories from "@/components/Categories"
import LoadMore from "@/components/LoadMore"
import ProjectCard from "@/components/ProjectCard"
import { getAllProjects, getAllProjectsLength, getUserFullProfile } from "@/lib/actions"
import { getCurrentUser } from "@/utils/authOptions"

type Props = {
  searchParams: {
    category?: string | null,
    take?: string
  }
}

const Home = async ({ searchParams }: Props) => {
  const session = await getCurrentUser();
  const projects = await getAllProjects(searchParams.category, searchParams.take)
  const projectsLength = await getAllProjectsLength(searchParams.category)

  if (projectsLength === 0 || projectsLength === undefined) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center">No Projects found for This Category, Create them first</p>
      </section>
    )
  }

  const userProfile = await getUserFullProfile(session?.user?.id)
  const likedProjectsIds = userProfile?.likedProjects.map(like => like.projectId) as string[]

  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />
      <section className="projects-grid">
        {
          projects?.map((project: ProjectInterface) => (
            <ProjectCard
              key={project?.id}
              id={project?.id}
              image={project?.image}
              title={project?.title}
              name={project?.createdBy?.name || null}
              avatarUrl={project?.createdBy?.image || null}
              userId={project?.createdBy?.id}
              views={project?.views}
              likedBy={project?.likedBy}
              likedProjectsIds={likedProjectsIds}
            />
          ))
        }
      </section>
      <LoadMore take={searchParams.take} projectsLength={projectsLength} />
    </section>
  )
}
export default Home