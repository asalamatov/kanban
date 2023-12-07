'use client'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import closeIcon from '../../assets/icon-cross.svg'
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import boardsSlice from '@/app/GlobalRedux/Features/boards/boardsSlice';

type Props = {}

const AddEditBoardModal = ({ setBoardModalOpen, type }: any) => {

  const dispatch = useDispatch()

  const [isFirstLoad, setIsFirstLoad] = useState(true)

  const [name, setName] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [newColumns, setNewColumns] = useState(
    [
      { name: 'To Do', task: [], id: uuidv4() },
      { name: 'In Progress', task: [], id: uuidv4() },
      { name: 'Done', task: [], id: uuidv4() }
    ]
  )

  const boards = useSelector((state: any) => state.boards)
  const board = boards.find((board) => board.isActive)

  if (type === 'edit' && isFirstLoad) {

    setName(board.name)
    setNewColumns(board.columns.map(column => {
      return { ...column, id: uuidv4() }
    }))
    setIsFirstLoad(false)
  }

  const validate = () => {
    setIsValid(false)
    if (!name.trim()) return false

    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) return false
    }
    setIsValid(true)
    return true

  }

  const onChange = (id, newValue) => {
    setNewColumns(prevState => {
      const newState = [...prevState]
      const column = newState.find(column => column.id === id)
      column.name = newValue
      return newState
    })
  }

  const onSubmit = (type: string) => {
    setBoardModalOpen(false)
    if (type === 'add') {
      dispatch(boardsSlice.actions.addBoard({ name, newColumns }))
    } else {
      dispatch(boardsSlice.actions.editBoard({ name, newColumns }))
    }
  }

  const onDelete = ( id ) => {
    setNewColumns(prevState => prevState.filter(column => column.id !== id)
    )
  }

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) return
        setBoardModalOpen(false)
      }}
      className='fixed right-0 left-0 top-0 bottom-0 px-2 py-4 bg-[#00000080] overflow-scroll z-50 justify-center items-center flex scrollbar-hide'
    >
      {/* Modal Section */}
      <div className='scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl'>
        <h3 className='text-lg'>
          { type === 'edit' ? 'Edit Board' : 'Add New Board'}
        </h3>

        {/* Board Name */}
        <div className='mt-8 flex flex-col space-y-3'>
          <label className='text-sm dark:text-white text-gray-500'>
            Board Name
          </label>
          <input
            className='bg-transparent px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#635fc7] dark:focus:outline-[#635fc7] outline-1 ring-0'
            placeholder='e.g. Web Design'
            value={name}
            onChange={(e => setName(e.target.value))}
            id='board-name-input'
          />
        </div>

        {/* Board Column  */}

        <div className='mt-8 flex flex-col space-y-3'>
          <label htmlFor="" className='text-sm dark:text-white text-gray-500'>
            Board Columns
          </label>

          {
            newColumns.map((column, index) => (
              <div key={index} className='flex items-center w-full'>
                <input
                  type="text"
                  className='bg-transparent flex-grow px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#735fc7]'
                  value={column.name}
                  onChange={e => {
                    onChange(column.id, e.target.value)
                  }}
                />

                <Image src={closeIcon} alt='close icon' height={16} className='cursor-pointer m-4' onClick={()=>onDelete( column.id )} />

              </div>
            ))
          }
        </div>

        <div>
          <button
            onClick={() => { setNewColumns(state => [...state, { name: '', task: [], id: uuidv4() }]) }}
            className='w-full items-center hover:opacity-75 mt-2 dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] py-2 rounded-full'>
            + Add New Column
          </button>

          <button
            className='w-full items-center hover:opacity-75 dark:text-white mt-8 dark:bg-[#635fc7] text-white bg-[#635fc7] py-2 rounded-full'
            onClick={() => {
              const isValid = validate()
              if (isValid) {
                onSubmit(type)
              }
            }}
          >
            {type === 'add' ? 'Create New Board' : 'Save Changes'}
          </button>
        </div>


      </div>

    </div>
  )
}

export default AddEditBoardModal