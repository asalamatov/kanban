'use client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import boardIcon from '../assets/icon-board.svg'
import lightIcon from '../assets/icon-light-theme.svg'
import darkIcon from '../assets/icon-dark-theme.svg'

import Image from 'next/image'
import { Switch } from '@headlessui/react'
import useDarkMode from '../hooks/useDarkMode'
import boardsSlice from '@/app/GlobalRedux/Features/boards/boardsSlice'

type Props = {}

const HeaderDropdown = ({ setOpenDropdown, setBoardModalOpen }: any) => {

  const dispatch = useDispatch()


  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  }

  const boards = useSelector((state: any) => state.boards)

  return (
    <div className='py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 bg-[#00000080]'
      onClick={(e) => {
        if (e.target !== e.currentTarget) return
        setOpenDropdown(false)
      }}
    >

      {/* Dropdown modal */}
      <div className='bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-full py-4 rounded-xl '>
        <h3 className='dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8'>
          All Boards ({boards?.length})
        </h3>

        <div>
          {boards.map((board: any, index: number) => (
            <div className={`flex item-baseline dark:text-white space-x-2 px-5 py-4 cursor-pointer
            ${board.isActive && 'bg-[#635fc7] text-white mr-8 rounded-r-full'}`}
              key={index}

              onClick={() => {
                dispatch(boardsSlice.actions.setBoardActive({index}))
              }}
            >
              <Image src={boardIcon} alt='board icon' height={16} width={16} />
              <p className='text-lg font-bold'
              >{board.name}</p>
            </div>
          ))}

          <div
            className='flex item-baseline space-x-2 px-5 py-4 cursor-pointer text-[#635fc7]'
            onClick={() => {
              setBoardModalOpen(true)
              setOpenDropdown(false)

            }}
          >
            <Image src={boardIcon} alt='board icon' height={16} width={16} />
            <p className='text-lg font-bold'
            >Create New Board</p>
          </div>

          <div className='mx-2 p-4 space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg'>
            <Image src={lightIcon} alt='light icon' height={16} />

            {/* switch */}
            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={`${darkSide ? 'bg-[#635fc7]' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span className={`${darkSide ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
            </Switch>

            <Image src={darkIcon} alt='dark icon' height={16} />

          </div>

        </div>

      </div>

    </div>
  )
}

export default HeaderDropdown