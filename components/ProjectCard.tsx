"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";

type ProjectProps = {
  key: string,
  id: string,
  image: string,
  title: string,
  name: string | null,
  avatarUrl: string | null,
  userId: string,
  views: number
}

const ProjectCard = ({ key, id, image, title, name, avatarUrl, userId, views }: ProjectProps) => {

  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState('');
  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 10000))
    setRandomViews(String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + 'k'))
  }, []);

  const [hover, setHover] = useState(false)
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
              src={`${hover ? "/heart-purple.svg" : "/heart.svg"}`}
              width={13}
              height={12}
              alt="heart"
              onMouseEnter={() => setHover(true)}
              onMouseOut={() => setHover(false)}
              className="cursor-pointer"
            />
            <p className="text-sm">{randomLikes}</p>
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