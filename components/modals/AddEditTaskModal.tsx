'use client'
import React, { use, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import closeIcon from '../../assets/icon-cross.svg'
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import boardsSlice from '@/app/GlobalRedux/Features/boards/boardsSlice';

type Props = {}

const AddEditTaskModal = ({ type, device, setOpenAddEditTask, taskIndex, setIsTaskModalOpen, prevColumnIndex = 0 }) => {

  const dispatch = useDispatch();

  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [subtasks, setSubTasks] = useState(
    [
      { title: '', isCompleted: false, id: uuidv4() },
      { title: '', isCompleted: false, id: uuidv4() }
    ]
  )

  const board = useSelector((state: any) => state.boards.find(board => board.isActive));
  const columns = board?.columns
  const prevColumn = columns.find((column, index) => index === prevColumnIndex)
  const task = prevColumn ? prevColumn.tasks.find((task, index) => index === taskIndex) : []

  const [status, setStatus] = useState(prevColumn?.name || 'To Do')
  const [newColumnIndex, setNewColumnIndex] = useState(prevColumnIndex);

  if (isFirstLoad && type === 'edit') {
    setSubTasks(
      task.subtasks.map(subtask => ({ ...subtask, id: uuidv4() }))
    )
    setTitle(task.title)
    setDescription(task.description)
    setIsFirstLoad(false)
  }

  const onDelete = (id) => {
    setSubTasks(prevState => prevState.filter(subTask => subTask.id !== id))
  }

  const onChange = (id, newValue) => {
    setSubTasks(prevState => {
      const newState = [...prevState]
      const subTask = newState.find(subTask => subTask.id === id)
      subTask.title = newValue
      return newState
    })
  }

  const validate = () => {
    setIsValid(false)
    if (!title.trim()) return false

    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) return false
    }
    setIsValid(true)
    return true
  }

  const onSubmit = (type: string) => {
    setOpenAddEditTask(false)
    if (type === 'add') {
      dispatch(boardsSlice.actions.addTask({ title, description, subtasks, status, newColumnIndex }))
    } else {
      dispatch(boardsSlice.actions.editTask({ title, description, subtasks, status, taskIndex, prevColumnIndex, newColumnIndex }))
    }
  }

  const onChangeStatus = (e) => {
    setStatus(e.target.value)
    setNewColumnIndex(e.target.selectedIndex)
  }

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) return
        setOpenAddEditTask(false)
      }}
      className={
        device === 'mobile'
          ? 'py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-[-100vh] top-0 bg-[#00000080]'
          : 'py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-0 top-0 bg-[#00000080]'}
    >
      {/* Modal Section */}

      <div className='scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl'>
        <h3 className='text-lg '>
          {type === 'add' ? 'Add New Task' : 'Edit Task'}
        </h3>

        {/* Task Name  */}

        <div className='mt-8 flex flex-col space-y-1'>
          <label htmlFor="" className='text-sm dark:text-white text-gray-500'>
            Task Name
          </label>
          <input
            type="text"
            value={title}
            className='bg-transparent px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#635fc7] dark:focus:outline-[#635fc7] outline-1 ring-0'
            onChange={(e) => setTitle(e.target.value)}
            placeholder='e.g. Take Coffee Break'
          />
        </div>

        {/* Task Description  */}

        <div className='mt-8 flex flex-col space-y-1'>
          <label htmlFor="" className='text-sm dark:text-white text-gray-500'>
            Description
          </label>
          <textarea
            className='bg-transparent min-h-[200px] px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#635fc7] dark:focus:outline-[#635fc7] outline-1 ring-0'
            placeholder='e.g. It is always good to take a break and have a cup of coffee'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Subtasks Section */}

        <div
          className='mt-8 flex flex-col space-y-1'
        >
          <label htmlFor="" className='text-sm dark:text-white text-gray-500'>
            Subtasks
          </label>

          {
            subtasks.map((subtask, index) => (
              <div className='flex items-center w-full' key={index}>
                <input
                  onChange={(e) => {
                    onChange(subtask.id, e.target.value)
                  }}
                  type="text"
                  value={subtask.title}
                  className='bg-transparent flex-grow px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#735fc7]'
                  placeholder='e.g. Take coffee from the kitchen'
                />
                <Image src={closeIcon} alt='close icon' height={16} width={16}
                  onClick={() => {
                    onDelete(subtask.id)
                  }}
                  className='cursor-pointer m-4' />
              </div>
            ))
          }

          <button
            onClick={() => { setSubTasks(state => [...state, { title: '', isCompleted: false, id: uuidv4() }]) }}
            className='w-full items-center hover:opacity-75 mt-2 dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] py-2 rounded-full'>
            + Add New Subtask
          </button>



        </div>


        {/* Current Status  */}

        <div className='mt-8 flex flex-col space-y-3'>
          <label className='text-sm dark:text-white text-gray-500'>
            Current Status
          </label>
          <select
            value={status}
            className='select-status flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-300 focus:outline-[#637fc7] outline-none'
            onChange={(e) => onChangeStatus(e)}
          >
            {columns.map((column, index) => (
              <option key={index} value={column.name}>{column.name}</option>

            ))}
          </select>

          <button
            onClick={() => {
              const isValid = validate()
              if (isValid) {
                onSubmit(type)
                setOpenAddEditTask(false)
              }
            }}
            className='w-full items-center text-white bg-[#635fc7] py-2 rounded-full'>
              {type === 'add' ? 'Create Task' : 'Save Edit'}
          </button>
        </div>


      </div>

    </div>
  )
}

export default AddEditTaskModal