import "../css/BoardDropdown.css";

export default function BoardDropdown({
  setOpen,
  newBoard,
  handleBoardChange,
  addBoard,
  newTheme,
  setNewTheme,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="board-modal">
        <h1 className="modal-title">Create Workspace</h1>
        <form className="board-form" onSubmit={addBoard}>
          <p className="board-subtitle">Board name</p>
          <input
            className="board-input"
            placeholder="Enter board name..."
            value={newBoard}
            onChange={handleBoardChange}
            autoFocus
            onFocus={(e) => e.currentTarget.select()}
          />
          <p className="board-subtitle">Theme</p>
          <div className="theme-button-wrapper">
            <div
              className={
                newTheme === 1 ? "theme-button-1-active" : "theme-button-1"
              }
              onClick={() => setNewTheme(1)}
            ></div>
            <div
              className={
                newTheme === 2 ? "theme-button-2-active" : "theme-button-2"
              }
              onClick={() => setNewTheme(2)}
            ></div>
            <div
              className={
                newTheme === 3 ? "theme-button-3-active" : "theme-button-3"
              }
              onClick={() => setNewTheme(3)}
            ></div>
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
