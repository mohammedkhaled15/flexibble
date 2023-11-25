"use client"
import { categoryFilters } from '@/constants';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const Categories = () => {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const category = searchParams.get("category")
  const handleTag = (tag: string) => {
    router.push(`${pathName}?category=${tag}`)
  }

  return (
    <div className='flexBetween w-full gap-5 flex-wrap'>
      <ul className='gap-2 flex overflow-auto'>
        <button
          type={"button"}
          onClick={() => handleTag("All")}
          className={`${(category === "All" || !category) ? "bg-light-white-300 font-medium" : "font-normal"} px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
        >
          All
        </button>
        {categoryFilters.map(filter => (
          <button
            key={filter}
            type={"button"}
            onClick={() => handleTag(filter)}
            className={`${category === filter ? "bg-light-white-300 font-medium" : "font-normal"} px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
          >
            {filter}
          </button>
        ))}
      </ul>
    </div>
  )
}

export default Categories