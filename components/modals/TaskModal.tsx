'use client'
import Image from 'next/image';
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import ellipsis from '@/assets/icon-vertical-ellipsis.svg'
import EllipsisMenu from '../EllipsisMenu';
import Subtask from '../Subtask';
import boardsSlice from '@/app/GlobalRedux/Features/boards/boardsSlice';
import DeleteModal from './DeleteModal';
import AddEditTaskModal from './AddEditTaskModal';

type Props = {}

const TaskModal = ({ colIndex, taskIndex, setIsTaskModalOpen }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const columns = board?.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col?.tasks.find((task, i) => i === taskIndex);
  const subtasks = task.subtasks;

  let completed = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  })

  const [status, setStatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
  const [ellipsisMenuOpen, setEllipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddEditTaskModalOpen, setIsAddEditTaskModalOpen] = useState(false);

  const setOpenEditModal = () => {
    setIsAddEditTaskModalOpen(true);
    setEllipsisMenuOpen(false);
  }

  const setOpenDeleteModal = () => {
    setEllipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  }

  const onChange = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  }

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return
    }

    dispatch(
      boardsSlice.actions.setTaskStatus({
        taskIndex, colIndex, newColIndex, status
      })
    )

    setIsTaskModalOpen(false);
  }

  const onDeleteBtnClick = () => {
    dispatch(boardsSlice.actions.deleteTask({ taskIndex, colIndex }))
    setIsDeleteModalOpen(false)
    setIsTaskModalOpen(false)
  }


  return (
    <div
      onClick={onClose}
      className='fixed right-0 left-0 top-0 bottom-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 justify-center items-center flex bg-[#00000080]'
    >

      {/* Modal Section  */}

      <div className='scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl'>
        <div className='relative flex justify-between w-full items-center'>
          <h1 className='text-lg'>
            {task.title}
          </h1>
          <Image
            alt='ellipsis icon for task modal'
            onClick={() => setEllipsisMenuOpen(state => !state)}
            src={ellipsis}
            height={24}
            className='cursor-pointer' />

          {/* Ellipsis Menu Section  */}
          {
            ellipsisMenuOpen && (<EllipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type='Task'
            />)
          }

        </div>


        <p className='text-gray-500 font-semibold tracking-wide text-sm pt-6'>
          {task.description}
        </p>

        <p className='pt-6 text-gray-500 tracking-widest text-sm '>
          Subtasks ({completed} of {subtasks.length} completed)
        </p>

        {/* Subtasks Section  */}
        <div className='mt-3 space-y-2'>
          {
            subtasks.map((subtask, i) => (
              <Subtask key={i} index={i} taskIndex={taskIndex} colIndex={colIndex} />
            ))
          }
        </div>

        {/* Current Status Section  */}
        <div className='mt-8 flex flex-col spaace-y-3'>
          <label className='text-sm dark:text-white text-gray-500'>
            Current Status
          </label>
          <select className='select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-300 focus:outline-[#635fc7] outline-none'
            value={status}
            onChange={onChange}
          >
            {
              columns.map((col, i) => (
                <option key={i} value={col.name} className='status-option'>
                  {col.name}
                </option>
              )
              )
            }
          </select>
        </div>



      </div>

      {
        isDeleteModalOpen && (
          <DeleteModal
            onDeleteBtnClick={onDeleteBtnClick}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            title={task.title}
            type='task'
          />
        )
      }

      {
        isAddEditTaskModalOpen && (
          <AddEditTaskModal
            setOpenAddEditTask={setIsAddEditTaskModalOpen}
            prevColumnIndex={colIndex}
            taskIndex={taskIndex}
            type='edit'
            setIsTaskModalOpen={setIsTaskModalOpen}
          />
        )
      }





    </div>
  )
}

export default TaskModal