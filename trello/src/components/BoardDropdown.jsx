import "../css/BoardDropdown.css";

export default function BoardDropdown({
  setOpen,
  newBoard,
  handleBoardChange,
  addBoard,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="board-modal">
        <h1 className="modal-title">Create Workspace</h1>
        <form className="board-form" onSubmit={addBoard}>
          <p className="board-subtitle">Board Name</p>
          <input
            className="board-input"
            placeholder="Enter board name..."
            value={newBoard}
            onChange={handleBoardChange}
            autoFocus
            onFocus={(e) => e.currentTarget.select()}
          />
          <p className="board-subtitle">Board Name</p>
          <div className="theme-button-wrapper">
            <div className="theme-button-1"></div>
            <div className="theme-button-2"></div>
            <div className="theme-button-3"></div>
          </div>
          <div className="board-button-wrapper">
            <button className="create-board-btn" type="submit">
              Create
            </button>
            <button className="cancel-board-btn" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
