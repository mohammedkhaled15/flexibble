import { ProjectInterface } from "@/common.types"
import Categories from "@/components/Categories"
import ProjectCard from "@/components/ProjectCard"
import { getAllProjects } from "@/lib/actions"

const Home = async ({ searchParams }: { searchParams: { category: string } }) => {
  console.log(searchParams)
  const projects = await getAllProjects(searchParams.category, "")

  if (projects?.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center">No Projects found for This Category, Create them first</p>
      </section>
    )
  }
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
            />
          ))
        }
      </section>
      <h1>LoadMore</h1>
    </section>
  )
}
export default Home