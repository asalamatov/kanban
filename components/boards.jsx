'use client'

import { useLayoutEffect, useState } from "react";

import dbdata from "@utils/dbdata";
import Columns from "./Columns";
import Nav from "./Nav";

/*
if (
                      boardName ===
                      boards_list.at(boards_list.length - 1)
                    ) {
                      var new_board_name = prompt('New Board Name: ', 'Board No: ');
                      setNewBoardName(new_board_name);
                      console.log(new_board_name);
                      if (newBoardName !== '') {
                        var create_new_board_text = boards_list.pop();
                        boards_list.push(new_board_name);
                        boards_list.push(create_new_board_text);
                        console.log("I AM HERE")
                        setActiveBoard(new_board_name);
                        createTable();

                      } else {
                        setActiveBoard(prev_board);
                      }
*/

import { useSession } from "next-auth/react";
import { set } from "mongoose";

var boards_db = dbdata.boards
const boards_list = []
for (var board of boards_db) {
  boards_list.push(board.name)
}

boards_list.push('+ Create New Board');

// const boards_list = [
//   'tak1', 'tak2', 'tak3', 'task4', '+ Create New Board'
// ]

const BoardItem = ({ boardName, isBoardSelected }) => {
  const styleOfSelected = isBoardSelected
    ? 'align-middle py-4 px-5 mr-2 text-left rounded-r-[3rem] truncate w-52 bg-yellow-300 text-black'
    : 'align-middle py-4 px-5 mr-2 text-left rounded-r-[3rem] truncate w-52';
  return (
    <>
      <h1 className={styleOfSelected}>
          ⌘ {boardName}
      </h1>
    </>
  );
}

const Boards = () => {
  const [activeBoard, setActiveBoard] = useState(boards_list[0]);
  const [newBoardName, setNewBoardName] = useState('example');
  const [hidden, setHidden] = useState(false);
  const { data: session } = useSession();

  const createTable = async (e) => {
    e.preventDefault();
    console.log('creating new board');
    var new_board_name = prompt('New Board Name: ', 'Board No: ');
    setNewBoardName(new_board_name);
    console.log(new_board_name);
    if (newBoardName !== '') {
      var create_new_board_text = boards_list.pop();
      boards_list.push(new_board_name);
      boards_list.push(create_new_board_text);
      console.log("I AM HERE")
      setActiveBoard(new_board_name);
      createTable();

    } else {
      setActiveBoard(prev_board);
    }
    try {
      const response = await fetch('/api/boards/new', {
        method: 'POST',
        body: JSON.stringify({
          name: newBoardName,
          userId: session?.user.id,
        }),
      });

      if (response.ok) {
        console.log('new board created');
      }
    } catch (error) {
       console.log("ERROR Creating New Board");
    }
  }

  const styleOfSelected = (boardName) =>
    boardName == activeBoard
      ? 'align-middle py-4 px-5 mr-2 text-left rounded-r-[3rem] truncate w-52 bg-indigo-600 text-gray-100 hover:bg-indigo-100 hover:text-indigo-600'
      : 'align-middle py-4 px-5 mr-2 text-left rounded-r-[3rem] truncate w-52 hover:bg-indigo-100 hover:text-indigo-600';

  // const styleOfBoardHidden = (hidden) => {
  //   hidden
  //     ? 'fixed w-60 h-full bg-white flex flex-col flex-wrap justify-start hidden'
  //     : 'fixed w-60 h-full bg-white flex flex-col flex-wrap justify-start';
  // }

  return (
    <div className='fixed w-[261px] top-20 h-full flex flex-col flex-wrap justify-start' hidden={true} >

      <div className="text-slate-400 h-10 w-[261px]">
        <h2 className="my-7 mx-5">All Boards ({boards_list.length - 1})</h2>
        <div className="flex flex-col">
          {boards_list.map(
            (boardName, index) => {
              return (
                // <BoardItem boardName={boardName} key={boardName} isBoardSelected={isBoardSelected}  />
                <button
                  key={index}
                  onClick={() => {
                    var prev_board = activeBoard;
                    setActiveBoard(boardName);
                    }
                  }
                  className={styleOfSelected(boardName)}
                >
                  ⌘&nbsp;&nbsp;&nbsp;{boardName}
                  </button>
              );
            }
          )}
        </div>
        <button className="fixed bottom-20 align-middle py-4 px-5 mr-2 text-left rounded-r-[3rem] truncate w-52 bg-black"
        >
          New Board
        </button>
        <button
          className="fixed bottom-6 align-middle py-4 px-5 mr-2 text-left rounded-r-[3rem] truncate w-52 bg-black"
          onClick={(prev) => {
            setHidden(!prev);
          }}
          // onClick={() => { createTable()}}
        >
          Hide Sidebar
        </button>
      </div>
      <Columns activeBoard={activeBoard} />
      {/* <Nav activeBoard={activeBoard} /> */}
    </div>
  );
}

export default Boards;