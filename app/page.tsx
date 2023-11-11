import { ProjectInterface } from "@/common.types"
import ProjectCard from "@/components/ProjectCard"
import { getAllProjects } from "@/lib/actions"

const Home = async () => {
  const projects = await getAllProjects("", "")

  if (projects?.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        Categories

        <p className="no-result-text text-center">No Projects found, Create them first</p>
      </section>
    )
  }
  return (
    <section className="flex-start flex-col paddings mb-16">
      <h1>Categories</h1>
      <section className="projects-grid">
        {
          projects?.map((project: ProjectInterface) => (
            <ProjectCard
              key={project?.id}
              id={project?.id}
              image={project?.image}
              title={project?.title}
              name={project?.createdBy?.name}
              avatarUrl={project?.createdBy?.image}
              userId={project?.createdBy?.id}
            />
          ))
        }
      </section>
      <h1>LoadMore</h1>
    </section>
  )
}
export default Home