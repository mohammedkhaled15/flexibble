// import { ProjectInterface } from '@/common.types'
// import Modal from '@/components/Modal'
// import { getProjectById } from '@/lib/actions'
// import Image from 'next/image'

// type Props = {
//   params: {
//     id: string
//   }
// }

// const ProjectPage = async ({ params }: Props) => {

//   const project = await getProjectById(params.id) as ProjectInterface

//   console.log(project)

//   if (!project) {
//     <p>Fialed to fetch project information</p>
//   }
//   return (
//     <Modal>
//       <div className='flexStart'>
//         <Image
//           src={project?.createdBy?.image}
//           width={25}
//           height={25}
//           alt="created By"
//         />
//         <div className='flex flex-col gap-3'>
//           <h2>{project?.title}</h2>
//           <p>
//             {`${project?.createdBy?.name} - ${project?.category}`}
//           </p>
//         </div>
//       </div>
//     </Modal>
//   )
// }

// export default ProjectPage