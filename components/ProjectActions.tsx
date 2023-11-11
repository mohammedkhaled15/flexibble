"use client"

import { deleteProject } from "@/lib/actions"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Props = {
  projectId: string
}

const ProjectActions = ({ projectId }: Props) => {

  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteProject = async () => {
    setIsDeleting(true)
    try {
      const res = await deleteProject(projectId)
      if (res) {
        router.push("/")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action_btn"
      >
        <Image
          src={"/pencile.svg"}
          width={15}
          height={15}
          alt="edit"
        />
      </Link>

      <button
        type="button"
        className={`flexCenter delete-action_btn ${isDeleting ? "bg-gray" : "bg-primary-purple"}`}
        onClick={handleDeleteProject}
      >
        <Image
          src={"/trash.svg"}
          width={15}
          height={15}
          alt="delete"
        />
      </button>
    </>
  )
}

export default ProjectActions