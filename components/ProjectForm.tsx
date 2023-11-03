"use client"

import { SessionInterface } from "@/common.types"
import Image from "next/image"
import { ChangeEvent } from "react"
import FormField from "./FormField"
import { categoryFilters } from "@/constants"

type ProjectFormProps = {
  type: string,
  session: SessionInterface
}

const ProjectForm = ({ type, session }: ProjectFormProps) => {

  const handleFormSubmit = (e: React.FormEvent) => { }
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => { }

  const handleStateChange = (fieldName: string, value: string) => {

  }

  const form = {
    image: "/Screenshot 2023-11-02 144725.png",
    title: "",
    description: ""
  }

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
          onChange={handleChangeImage}
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
        state={form.title}
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
        <button>Create</button>
      </div>
    </form>
  )
}

export default ProjectForm