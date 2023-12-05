'use client';

import iconUp from '@assets/icon-chevron-up.svg';
import iconDown from '@assets/icon-chevron-down.svg';
import addTaskMobile from "@assets/icon-add-task-mobile.svg";
import elipsis from "@/assets/icon-vertical-ellipsis.svg";
import logo from "@/assets/logo-mobile.svg";

import ElipsisMenu from './ElipsisMenu';
import DeleteModal from '@app/modals/DeleteModal';
import AddEditTaskModal from '@app/modals/AddEditTaskModal';
import HeaderDropdown from './HeaderDropdown';

import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import { useEffect, useLayoutEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import '@styles/Header.css';

const Nav = ({activeBoard}) => {

  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  useLayoutEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
      console.log('Providers received')
    }
    setUpProviders();
  }, []);



  return (
    <div className="header-container">
      <header>
        <div className="logo-container">
          <Image src={logo} alt='logo' width={35} height={35} className="logo" />
          <h3 className='logo-text'>kanban</h3>
        </div>

        <div className="header-name-container heading-L">
            <h3 className="header-name">board.name</h3>
        </div>
        {session?.user ? (
        <button
          className={`add-task-btn heading-M`}
          onClick={() => {

          }}
        >
          + Add New Task
        </button>
        ) : (
        <div>
              {providers && Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className={`add-task-btn heading-M`}
              >
                Sign In
              </button>
            ))}
              </div>
        )}
        <Image
          src={elipsis}
          className='elipsis'
          onClick={() => {
            
          }}
          alt='menu for deleting or editiing board'
        />

      </header>
      </div>
  );
}

export default Nav;