"use client"

import { getUserFullProfileByEmail, likeProject } from "@/lib/actions";
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react'
import { Like } from "@/common.types";

type ProjectProps = {
  key: string,
  id: string,
  image: string,
  title: string,
  name: string | null,
  avatarUrl: string | null,
  userId?: string,
  views: number,
  likedBy?: Like[]
}

const ProjectCard = ({ key, id, image, title, name, avatarUrl, userId, views, likedBy }: ProjectProps) => {

  const { data: session } = useSession()
  // console.log(session)

  const [hover, setHover] = useState(false)
  // const [liked, setLiked] = useState(false)
  const [likedProjects, setLikedProjects] = useState<string[]>()

  useEffect(() => {
    const getUserByEmail = async (email: string) => {
      try {
        const userProfile = await getUserFullProfileByEmail(email)
        const likedProjectsIds = userProfile?.likedProjects.map(like => like.projectId)
        console.log(likedProjectsIds, id)
        setLikedProjects(likedProjectsIds)
      } catch (error) {
        console.log(error)
      }
    }
    session?.user?.email && getUserByEmail(session?.user?.email)
  }, [session?.user?.email])

  const handleLikeClick = async () => {
    if (session?.user?.email) {
      const res = await likeProject(id)
      if (res) {
        setHover(prev => !prev)
      }
    } else {
      return
    }
  }

  return (
    <div key={key} className="flexCenter flex-col rounded-2xl drop-shadow-card">
      <Link className="flexCenter group relative w-full h-full" href={`/project/${id}`}>
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
            {avatarUrl && <Image
              src={avatarUrl}
              width={24}
              height={24}
              className="rounded-full"
              alt="profile image"
            />}
            <p className="text-sm">{name}</p>
          </div>
        </Link>

        <div className="flexCenter gap-3">
          <div className="flexCenter gap-2 ">
            <Image
              src={`${hover || likedProjects?.includes(id) ? "/heart-purple.svg" : "/heart.svg"}`}
              width={13}
              height={12}
              alt="heart"
              onMouseEnter={() => (session && setHover(true))}
              onMouseOut={() => (!likedProjects?.includes(id) && setHover(false))}
              onClick={handleLikeClick}
              className={`${session ? "cursor-pointer" : "cursor-default"}`}
            />
            <p className="text-sm">{likedBy?.length}</p>
          </div>
          <div className="flexCenter gap-2">
            <Image
              src={"/eye.svg"}
              width={13}
              height={12}
              alt="eye"
            />
            <p className="text-sm">{views}</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProjectCard