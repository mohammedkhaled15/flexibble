import { getUserFullProfile } from "@/lib/actions";
import ProjectCard from "./ProjectCard";
import { ProjectInterface } from "@/common.types";
import Link from "next/link";

type Props = {
  userId: string;
  projectId: string;
}

const RelatedProjects = async ({ userId, projectId }: Props) => {


  const userProfile = await getUserFullProfile(userId)
  return (
    <section className="flex flex-col w-full mt-32">
      <div className="flexBetween">
        <p className="text-base font-bold">More by {userProfile?.name}</p>
        <Link
          className="text-primary-purple text-base"
          href={`/profile/${userProfile?.id}`}>
          View All
        </Link>
      </div>
      <div className="related_projects-grid">
        {
          userProfile?.projects?.length !== 0 &&
          (userProfile?.projects?.filter(p => p.id !== projectId).map((project: ProjectInterface) => (
            <ProjectCard
              key={project?.id}
              id={project?.id}
              image={project?.image}
              title={project?.title}
              name={project?.createdBy?.name}
              avatarUrl={project?.createdBy?.image}
              userId={project?.createdBy?.id}
              views={project?.views}
            />
          )))
        }
      </div>
    </section>
  )
}

export default RelatedProjects