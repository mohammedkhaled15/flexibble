"use client"

import { likeProject } from "@/lib/actions";
import Image from "next/image"
import Link from "next/link"
import { useOptimistic, useState } from "react";
import { useSession } from 'next-auth/react'
import { Like } from "@/common.types";

type ProjectProps = {
  key: string,
  id: string,
  image: string,
  title: string,
  name: string | null | undefined,
  avatarUrl: string | null | undefined,
  userId?: string,
  views: number,
  likedBy?: Like[],
  likedProjectsIds?: string[]
}

const ProjectCard = ({ key, id, image, title, name, avatarUrl, userId, views, likedBy, likedProjectsIds }: ProjectProps) => {

  const { data: session } = useSession()

  const [clicked, setClicked] = useState(likedProjectsIds?.includes(id))
  const [hover, setHover] = useState(false)
  const [optimisticLikes, changeOptimisticLikes] = useOptimistic(likedBy?.length, (state: number | undefined, amount: number) => Number(state) + amount)
  const [optimisticHeart, changeOptimisticHeart] = useOptimistic(likedProjectsIds?.includes(id), (state: boolean | undefined, color) => !state)

  const handleLikeClick = async () => {
    if (session?.user?.email) {
      if (!clicked) {
        changeOptimisticLikes(1)
        setClicked(true)
      } else {
        changeOptimisticLikes(-1)
        setClicked(false)
      }
      changeOptimisticHeart("")
      const res = await likeProject(id)
    } else {
      return
    }
  }

  return (
    <div key={key} className="flexCenter flex-col rounded-2xl drop-shadow-card">
      <Link className="flexCenter group relative w-full h-full " href={`/project/${id}`}>
        <div className="w-[414px] h-[314px]">
          <Image
            src={image}
{/*             width={414} */}
{/*             height={314} */}
            alt="Project Image"
{/*             className="w-full h-full object-cover rounded-2xl " */}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
        <div className="invisible  flex group-hover:visible profile_card-title transition-all ease-in-out  delay-[2500] ">
          <p className="w-full transition-all ease-in-out  delay-[2500]">{title}</p>
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
              src={`${hover || optimisticHeart ? "/heart-purple.svg" : "/heart.svg"}`}
              width={13}
              height={12}
              alt="heart"
              onMouseOver={() => (session && setHover(true))}
              onMouseOut={() => (setHover(false))}
              onClick={() => handleLikeClick()}
              className={`${session ? "cursor-pointer" : "cursor-default"}`}
            />
            <p className="text-sm">{optimisticLikes}</p>
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
