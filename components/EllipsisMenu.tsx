import React from 'react'

type Props = {}

const EllipsisMenu = ({type, setOpenEditModal, setOpenDeleteModal }: any) => {
  return (
    <div className={type === 'Boards' ? 'absolute top-16 right-5' :
      'absolute top-6 right-4'}>

      <div className='flex justify-end items-center'>
        <div className='w-40 text-sm x-50 font-medium shadow-md shadow-[#364e7e1a] bg-white dark:bg-[#20212c] space-y-4 py-5 px-4 rounded-lg h-auto pr-12'>
          <p className='cursor-pointer dark:text-gray-400 text-gray-700'
            onClick={() => {
              setOpenEditModal(true)
            }}
          >
            Edit {type}
          </p>

          <p className=' cursor-pointer text-red-500'
            onClick={() => {
              setOpenDeleteModal(true)
            }}
          >
            Delete {type}
          </p>
        </div>
      </div>

    </div>
  )
}

export default EllipsisMenu