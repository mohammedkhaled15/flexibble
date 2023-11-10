import Image from "next/image"
import Link from "next/link"

type ProjectProps = {
  key: string,
  id: string,
  image: string,
  title: string,
  name: string,
  avatarUrl: string,
  userId: string,
}

const ProjectCard = ({ key, id, image, title, name, avatarUrl, userId, }: ProjectProps) => {
  return (
    <div key={key} className="flexCenter flex-col rounded-2xl drop-shadow-card">
      <Link className="flexCenter group relative w-full h-full" href={`/projects/${id}`}>
        <Image
          src={image}
          width={414}
          height={314}
          alt="Project Image"
          className="w-full h-full object-cover rounded-2xl "
        />
        <div className="hidden group-hover:flex profile_card-title">
          <p className="w-full">{title}</p>
        </div>
      </Link>

      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
        <Link href={`/profile/${userId}`}>
          <div className="flexCenter gap-2">
            <Image
              src={avatarUrl}
              width={24}
              height={24}
              className="rounded-full"
              alt="profile image"
            />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ProjectCard