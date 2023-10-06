'use client';


const Header = (props) => {
  return (
    <header className="">
      <div className="fixed top-0 flex h-20 left-0 justify-start px-5 w-[261px] items-center font-bold text-4xl text-black bg-white">
        <h1>❖ kanban</h1>
      </div>
      <div className="fixed left-[261px] right-0 top-0 h-20 flex justify-start items-center bg-white pl-4 font-bold text-lg">
        {props.activeBoard}
      </div>
      <button className="fixed right-16 top-0 align-middle py-4 px-5 text-left rounded-[3rem] bg-indigo-600 text-gray-100 hover:bg-indigo-300 hover:text-indigo-600">
        + Add New Task
      </button>
    </header>
  );
}

export default Header