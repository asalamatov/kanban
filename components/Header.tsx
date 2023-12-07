'use client'
import React, { useState } from 'react'
import Image from 'next/image'

import logo from '../assets/logo-mobile.svg'
import iconDown from '../assets/icon-chevron-down.svg'
import iconUp from '../assets/icon-chevron-up.svg'
import ellipsis from '../assets/icon-vertical-ellipsis.svg'
import HeaderDropdown from './HeaderDropdown'
import AddEditBoardModal from './modals/AddEditBoardModal'
import { useDispatch, useSelector } from 'react-redux'
import AddEditTaskModal from './modals/AddEditTaskModal'
import EllipsisMenu from './EllipsisMenu'
import DeleteModal from './modals/DeleteModal'
import boardsSlice from '@/app/GlobalRedux/Features/boards/boardsSlice'

type Props = {}

const Header = ({ boardModalOpen, setBoardModalOpen }: any) => {

  const dispatch = useDispatch()
  const boards = useSelector((state: any) => state.boards)
  const board = boards.find((board) => board.isActive)

  const [openDropdown, setOpenDropdown] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const [isEllipsisOpen, setIsEllipsisOpen] = useState(false);
  const [boardType, setBoardType] = useState('add')

  const setOpenEditModal = () => {
    setBoardModalOpen(true)
    setIsEllipsisOpen(false)
  }

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true)
    setIsEllipsisOpen(false)
  }

  const onDeleteBtnClick = () => {
    dispatch(boardsSlice.actions.deleteBoard(board.id))
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }))
    setIsDeleteModalOpen(false)
  }

  const onDropdownClick = () => {
    setBoardType('add')
    setOpenDropdown(state => !state)
    setIsEllipsisOpen(false)
  }

  return (
    <div className='p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0'>
      <header className='flex justify-between dark:text-white items-center'>
        {/* Left Side */}
        <div className='flex items-center space-x-2 md:space-x-4'>
          <Image src={logo} alt='logo' width={24} height={24} />
          <h3
            className='hidden md:inline-block font-bold font-sans md:text-xl'
          >Kanbanchik</h3>
          <div
            className='flex items-center cursor-pointer'
            // onClick={() => setOpenDropdown(state => !state)}
            onClick={onDropdownClick}
          >
            <h3
              className='truncate max-w-[200px] md:text-2xl text-xl font-bold font-sans md:ml-20'
            >{board.name}</h3>
            <Image src={openDropdown ? iconUp : iconDown} alt='dropdown icon' width={12} className='ml-2 md:hidden cursor-pointer'
              // onClick={() => setOpenDropdown(state => !state)}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className='flex space-x-4 items-center md:space-x-6'>
          <button className='hidden md:block button'
            onClick={() => {
              setOpenAddEditTask( state => !state)
            }}
          >
            + Add New Task
          </button>

          <button className='button py-1 px-3 md:hidden'
            onClick={() => {
              setOpenAddEditTask( state => !state)
            }}
          >
            +
          </button>

          <Image
            src={ellipsis}
            onClick={() => {
              setBoardType('edit')
              setOpenDropdown(false)
              setIsEllipsisOpen(state => !state)
            }}
            alt='ellipsis icon'
            height={24} />

          {isEllipsisOpen &&
            <EllipsisMenu type='Boards'
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />}

        </div>

      </header>


      {openDropdown && <HeaderDropdown setBoardModalOpen={setBoardModalOpen} setOpenDropdown={setOpenDropdown} />}

      {
        boardModalOpen && <AddEditBoardModal type={boardType} setBoardModalOpen={setBoardModalOpen} />
      }

      {
        openAddEditTask && <AddEditTaskModal type='add' setOpenAddEditTask={setOpenAddEditTask} device='mobile'  />
      }

      {
        isDeleteModalOpen && <DeleteModal title={board.name} type='board' setIsDeleteModalOpen={setIsDeleteModalOpen} onDeleteBtnClick={onDeleteBtnClick} />
      }

    </div>
  )
}

export default Header