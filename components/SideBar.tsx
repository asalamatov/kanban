'use client'
import boardsSlice from '@/app/GlobalRedux/Features/boards/boardsSlice'
import useDarkMode from '@/hooks/useDarkMode'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import boardIcon from '@/assets/icon-board.svg'
import lightIcon from '../assets/icon-light-theme.svg'
import darkIcon from '../assets/icon-dark-theme.svg'
import showSideBarIcon from '../assets/icon-show-sidebar.svg'
import hideSideBarIcon from '../assets/icon-hide-sidebar.svg'

import Image from 'next/image'
import { Switch } from '@headlessui/react'
import AddEditBoardModal from './modals/AddEditBoardModal'

type Props = { isSideBarOpen: boolean, setIsSideBarOpen: (isSideBarOpen: boolean) => void}

const SideBar = ({ isSideBarOpen, setIsSideBarOpen }: Props) => {

  const dispatch = useDispatch()

  const [colorTheme, setTheme] = useDarkMode();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked : boolean) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  }

  const boards = useSelector((state: any) => state.boards)

  return (
    <div>
      <div className={isSideBarOpen
        ? `min-w-[261px] bg-white dark:bg-[#2b2c37]  fixed top-[72px] h-screen  items-center left-0 z-20`
        : ` bg-[#635FC7] dark:bg-[#2b2c37] dark:hover:bg-[#635FC7] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer  p-0 transition duration-300 transform fixed felx w-[56px] h-[48px] rounded-r-full  `
        }
      >
        <div>
          {/* Rewrite Modal  */}

          {
            isSideBarOpen && (
              <div className='bg-white dark:bg-[#2b2c37] w-full py-4 rounded-xl'>
                <h3
                  className='dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8'
                >
                  ALL BOARDS ({boards?.length})
                </h3>

                <div className='flex flex-col h-[70vh] justify-between'>
                  <div>
                    {boards?.map((board: any, index: number) => (
                      <div
                        className={`flex items-baseline space-x-2 px-5 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white ${board.isActive && 'bg-[#635fc7] text-white rounded-r-full'}`}
                        key={index}
                        onClick={() => {
                          dispatch(boardsSlice.actions.setBoardActive({ index }))
                        }}
                      >
                        <Image src={boardIcon} width={16} alt='board icon' />
                        <p className='text-lg font-bold'>
                          {board?.name}
                        </p>
                      </div>
                    ))
                    }

                    <div
                      onClick={() => {
                        setIsBoardModalOpen(true)
                      }}
                      className='flex items-baseline space-x-2 mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#635fc7] px-5 py-4 hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white'>
                        <Image src={boardIcon} width={16} alt='board icon' />
                        <p className='text-lg font-bold'>
                          Create New Board
                        </p>
                    </div>
                  </div>



                  <div className='mx-2 p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg'>
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
            )
          }


          {/* Hidebar hide - show  */}
          {
            isSideBarOpen ? (
              <div
                onClick={() => {
                  setIsSideBarOpen((state) => !state)
                }}
                className='flex items-center mt-2 absolute bottom-16 text-lg font-bold rounded-r-full hover:text-[#635fc7] cursor-pointer mr-6 mb-8 px-8 py-4 hover:bg-[#635fc71a] dark:hover:bg-white space-x-2 justify-center my-4 text-gray-500'>
                <Image src={hideSideBarIcon} alt='hide sidebar icon' className='min-w-20px' />
                {
                  isSideBarOpen && (
                    <p>Hide Sidebar</p>
                  )
                }
              </div>
            ): (
              <div
                  onClick={() => {
                  setIsSideBarOpen((state) => !state)
                }}
                  className='absolute p-5'>
                <Image src={showSideBarIcon} alt='show sidebar icon' className='min-w-20px' />
              </div>
            )
          }

        </div>

      </div>

      {
        isBoardModalOpen && (
          <AddEditBoardModal type='add' setBoardModalOpen={setIsBoardModalOpen} />
        )
      }


    </div>
  )
}

export default SideBar