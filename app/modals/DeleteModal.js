import React from 'react'

const DeleteModal = ({ type, title, onDeleteButtonClick}) => {
  return (
    <div className="modal-container dimmed">
      <div className="delete-modal">
        <h3 className="heading-L">Delete this {type}?</h3>
        {type === "task" ? (
          <p className="text-L">
            Are you sure you want to delete the "{title}" task and its subtasks?
            This action cannot be reversed.
          </p>
        ) : (
          <p className="text-L">
            Are you sure you want to delete the "{title}" board? This action
            will remove all columns and tasks and cannot be reversed.
          </p>
        )}

        <div className="delete-modal-btns">
          <button onClick={onDeleteBtnClick} className="btn delete-btn">
            Delete
          </button>
          <button onClick={onDeleteBtnClick} className="btn cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal