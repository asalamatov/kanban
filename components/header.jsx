'use client';


const Header = (props) => {
  return (
    <div className="fixed left-60 right-0 top-0 h-20 flex justify-start items-center bg-red-200 pl-4">
      {props.activeBoard}
    </div>
  )
}

export default Header