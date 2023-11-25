'use client';

import React from 'react'

import dbdata from '@utils/dbdata';
import useGlobal from '@core/global';



let columns_list = ['To Do (4)', 'In Progress (6)', 'Done (3)']

const Card = (props) => {
  return (
    <div>
      <h1>{props.card_name}</h1>
    </div>
  )
}

const Columns = (props) => {

  let list = []
  let cards = []

  for (var board of dbdata.boards) {
    if (board.name === props.activeBoard) {
      for (var column of board.columns) {
        list.push(column.name)
        for (var card of column.cards) {
          cards.push(card.name)
        }
      }
    }
  }

  return (
    <div className=" flex flex-row fixed left-60 bottom-0 right-0 top-16 text-slate-400 z-5">
      {dbdata.boards.map((board) => {
        if (board.name === props.activeBoard) {
          return board.columns.map((column) => {
            // if (column.name === )
            // let current_column_cards = column.cards
            return (
              // <div className=" relative left-60 flex-row rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit" key={index}>
              <div
                key={column._id}
                className=" rounded-lg bg-clip-padding p-6 md:w-[300px] w-full h-fit"
              >
                <h1 className="text-xl px-1">{column.name} ({column.cards.length})</h1>
                {column.cards.map((card) => {
                  return (
                    <div className="p-5 select-text my-3 rounded-xl text-black border border-slate-100 shadow-lg" key={card._id}>
                      <h1 className="text-black font-bold p-2" style={{userSelect: 'text'}}>{card.name}</h1>
                    </div>
                  );
                })}

              </div>
            );
          });
        }
      })}
    </div>
  );
}

export default Columns