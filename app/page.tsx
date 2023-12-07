'use client'

import type { RootState } from "./GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";
import Header from "@/components/Header";
import Center from "@/components/Center";
import { useState } from "react";
import boardsSlice from "./GlobalRedux/Features/boards/boardsSlice";
import EmptyBoard from "@/components/EmptyBoard";

export default function Home() {

  const [boardModalOpen, setBoardModalOpen] = useState(false);

  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);

  if (!activeBoard && boards.length > 0) {
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));

  }

  return (
    <main className="overflow-hidden overflow-x-scroll">
      <>

        {boards.length > 0 ? (
          <>
            {/* Header Section */}
            <Header boardModalOpen={boardModalOpen} setBoardModalOpen={setBoardModalOpen} />

            {/* Center Section */}
            <Center boardModalOpen={boardModalOpen} setBoardModalOpen={setBoardModalOpen} />
          </>
        ): (
          <EmptyBoard type='add' />
        )}

      </>

    </main>
  )
}
