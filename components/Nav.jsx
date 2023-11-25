'use client';

import iconUp from '@assets/icon-chevron-up.svg';
import iconDown from '@assets/icon-chevron-down.svg';
import addTaskMobile from "@assets/icon-add-task-mobile.svg";
import elipsis from "@/assets/icon-vertical-ellipsis.svg";
import logo from "@/assets/logo-mobile.svg";

import ElipsisMenu from './ElipsisMenu';
import DeleteModal from '@app/modals/DeleteModal';
import HeaderDropdown from './HeaderDropdown';

import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import '@styles/Header.css';

const Nav = ({activeBoard}) => {
  // const isUserLoggedIn = true;
  //const isBigScreen = useMediaQuery({ query: '(min-width: 768px)' });
  const isBigScreen = true;
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState('')
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const onDropdownClick = () => {
    setOpenDropdown(state => !state);
  }

  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  // alert(providers);

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    }
    setUpProviders();
  }, []);


  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };



  return (
    <div className="header-container">
      <header>
        <div className="logo-container">
          <Image src={logo} alt='logo' width={35} height={35} className="logo" />
          <h3 className='logo-text'>{isBigScreen ? 'kanban' : ' '}</h3>
        </div>

        <div className="header-name-container heading-L">
            <h3 className="header-name">board.name</h3>
          {!isBigScreen && (
            <Image
              src={openDropdown ? iconUp : iconDown}
              alt="dropdown opened/closed"
              onClick={() => {
                onDropdownClick();
              }}
            />
          )}
        </div>
        <button
          className={`add-task-btn heading-M`} //</header> ${board.columns.length === 0 && "btn-off"}`}
          onClick={() => {
            setIsTaskModalOpen(true);
            setIsElipsisMenuOpen(false);
          }}
          // disabled={board.columns.length === 0}
        >
          {isBigScreen ? (
            "+ Add New Task"
          ) : (
            <img src={addTaskMobile} alt="add task" />
          )}
        </button>
        <Image
          src={elipsis}
          className='elipsis'
          onClick={() => {
            setIsElipsisMenuOpen(state => !state)
            setBoardType('edit')
          }}
          alt='menu for deleting or editiing board'
        />

        {openDropdown && !isBigScreen && (
          <HeaderDropdown
            setOpenDropdown={setOpenDropdown}
            setIsBoardModalOpen={setIsBoardModalOpen}
          />
        )}
        {isElipsisMenuOpen && (
          <ElipsisMenu
            setOpenEditModal={setOpenEditModal}
            setOpenDeleteModal={setOpenDeleteModal}
            type="board"
          />
        )}

        {/* <div className="fixed top-0 flex h-20 left-0 justify-start px-5 w-[261px] items-center font-bold text-4xl text-black bg-white gap-3">
          <Image src='/assets/images/logo.svg' alt='logo' width={35} height={35} />
          <h1>kanban</h1>
        </div>

        <div className="fixed left-[261px] right-0 top-0 h-20 flex justify-start items-center bg-white pl-4 font-bold text-lg">
          {activeBoard}
        </div>

        {session?.user ? (
          <div className="justify-center content-center">
            <button className="fixed right-[15%] top-0 align-middle p-4 my-3 text-left rounded-[3rem] bg-indigo-600 text-gray-100 hover:bg-indigo-300 hover:text-indigo-600" >
              + Add New Task
            </button>
            <button
              className="fixed right-[6%] top-0 align-middle p-4 my-3 text-left rounded-[3rem] bg-indigo-600 text-gray-100 hover:bg-indigo-300 hover:text-indigo-600"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
            <Link href='/profile'
              className="fixed right-[2%] top-0 align-middle p-2 my-3 text-left rounded-full  font-extrabold text-3xl">
              <Image src={session?.user.image} width={35} height={35} className=" hover:w-10 rounded-full" />
            </Link>
          </div>
        ): (
          <div className="fixed right-[6%] top-0 align-middle p-4 my-3 text-left rounded-[3rem] bg-indigo-600 text-gray-100 hover:bg-indigo-300 hover:text-indigo-600">
            {providers && Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className=""
              >
                Sign In
              </button>
            ))}
          </div>
        )} */}

      </header>
      {isBoardModalOpen && (
        <AddEditBoardModal
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
        />
      )}
      </div>
  );
}

export default Nav;