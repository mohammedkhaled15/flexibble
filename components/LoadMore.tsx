"use client"

import { useRouter } from "next/navigation"
import Button from "./Button"

const LoadMore = ({ take, projectsLength }: { take?: string, projectsLength: number }) => {

  const router = useRouter()
  const currentSearchParams = typeof window !== "undefined" && new URLSearchParams(window.location.search)

  const handleNavigation = () => {
    if (take || 0 < projectsLength) {
      currentSearchParams && currentSearchParams.set("take", (+(take || "1") + 8).toString())
      router.push(`${window.location.pathname}?${currentSearchParams.toString()}`)
    }
  }

  return (
    <div className="w-full flexCenter gap-5 mt-10">
      <Button isSubmitting={(Number(take) || 8) > projectsLength || (Number(take) || 8) == projectsLength} title="Load More" handleClick={handleNavigation} />
    </div>
  )
}

export default LoadMore