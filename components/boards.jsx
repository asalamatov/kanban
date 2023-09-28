'use client'

import { useState } from "react";

const boards_list = [
  'tak1', 'tak2', 'tak3', 'task4 sdjfksjkdjasldjalsjdlasjl', '+ Create New Board'
]

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
  const [hidden, setHidden] = useState(false);

  const styleOfSelected = (boardName) => (boardName == activeBoard)
    ? 'align-middle py-4 px-5 mr-2 text-left rounded-r-[3rem] truncate w-52 bg-yellow-300 text-black'
    : 'align-middle py-4 px-5 mr-2 text-left rounded-r-[3rem] truncate w-52';

  return (
    <div className=" fixed w-60 h-full bg-white flex flex-col flex-wrap justify-start">
      <div
        id="logo"
        className="h-20 flex justify-start px-5 bg-yellow-300 w-full items-center font-bold text-4xl"
      >
        <h1>❖ kanban</h1>
      </div>
      <div className="text-slate-400 h-10 w-[45]">
        <h2 className="my-7 mx-5">All Boards ({5})</h2>
        <div className="flex flex-col">
          {boards_list.map((boardName, index) => {
            return (
              // <BoardItem boardName={boardName} key={boardName} isBoardSelected={isBoardSelected}  />
              <button
                onClick={() => setActiveBoard(boardName)}
                className={styleOfSelected(boardName)}
              >
                ⌘&nbsp;&nbsp;&nbsp;{boardName}
              </button>
            );
          })}
        </div>
        <button className="fixed bottom-6 align-middle py-4 px-5 mr-2 text-left rounded-r-[3rem] truncate w-52 bg-black">
          👀 Hide Sidebar
        </button>
      </div>
    </div>
  );
}

export default Boards;