"use client"

import { ProjectInterface, SessionInterface } from "@/common.types"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ChangeEvent, useEffect, useState } from "react"
import FormField from "./FormField"
import { categoryFilters } from "@/constants"
import CustomMenu from "./CustomMenu"
import Button from "./Button"
import { UpdateProject, createProject } from "@/lib/actions"

type ProjectFormProps = {
  type: string,
  session: SessionInterface,
  projectToEdit?: ProjectInterface | null
}

const ProjectForm = ({ type, projectToEdit, session }: ProjectFormProps) => {

  const router = useRouter()

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      if (type === "create") {
        const project = await createProject(form.image, form)
        if (project) {
          setIsSubmitting(false)
          router.push("/")
        }
      } else if (type === "edit" && projectToEdit) {
        const updatedProject = await UpdateProject(projectToEdit?.id, form)
        if (updatedProject) {
          setIsSubmitting(false)
          router.push("/")
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]
    if (!file) return;
    if (!file.type.includes("image")) {
      alert("Please upload an image file")
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      handleStateChange("image", result)
    }
  }

  const handleStateChange = (fieldName: string, value: string) => {
    setForm(prev => ({ ...prev, [fieldName]: value }))
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [form, setForm] = useState({
    title: projectToEdit?.title || "",
    description: projectToEdit?.description || "",
    image: projectToEdit?.image || "",
    liveSiteUrl: projectToEdit?.liveSiteUrl || "",
    githubUrl: projectToEdit?.githubUrl || "",
    category: projectToEdit?.category || ""
  })

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={(e) => handleChangeImage(e)}
        />
        {form.image && (
          <Image
            src={form.image}
            className="sm:p-10 object-contain z-20"
            alt="Project Poster"
            fill
          />
        )}
      </div>

      <FormField
        title="Title"
        state={form?.title}
        placeholder="Flexibble"
        setState={(value: string) => handleStateChange("title", value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects"
        setState={(value: string) => handleStateChange("description", value)}
      />
      <FormField
        type="url"
        title="Website Url"
        state={form.liveSiteUrl}
        placeholder="https://example.com"
        setState={(value: string) => handleStateChange("liveSiteUrl", value)}
      />
      <FormField
        type="url"
        title="Github Url"
        state={form.githubUrl}
        placeholder="https://github.com/yourName"
        setState={(value: string) => handleStateChange("githubUrl", value)}
      />

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value: string) => handleStateChange("category", value)}
      />

      <div className="flexStart w-full">
        <Button
          title={isSubmitting ? `${type === "create" ? "Creating" : "Editing"}` : `${type === "create" ? "Create" : "Edit"}`}
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  )
}

export default ProjectForm