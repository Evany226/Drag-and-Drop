import "../css/BoardSelect.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import noteService from "../services/notes";
import boardService from "../services/boards";
import { Link } from "react-router-dom";
import { ReactComponent as Plus } from "../assets/plus.svg";
import BoardDropdown from "../components/BoardDropdown";
import LogoutButton from "../components/LogoutButton";

const BoardSelectPage = () => {
  const [boards, setBoards] = useState([]);
  const [newBoard, setNewBoard] = useState("");
  const [open, setOpen] = useState(false);
  const [newTheme, setNewTheme] = useState(0);

  const { user } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getData = async () => {
      const accessToken = await getAccessTokenSilently();

      noteService.getAll(accessToken).then((initialBoards) => {
        console.log(initialBoards);
        setBoards(initialBoards);
      });
    };
    getData();
  }, [getAccessTokenSilently]);

  const handleBoardChange = (event) => {
    console.log(event.target.value);
    setNewBoard(event.target.value);
  };

  const addBoard = (event) => {
    event.preventDefault();
    const addData = async () => {
      const accessToken = await getAccessTokenSilently();

      const boardObject = {
        boardName: newBoard,
        themeType: newTheme,
      };

      boardService.create(boardObject, accessToken).then((returnedBoard) => {
        setBoards(boards.concat(returnedBoard));
      });

      setOpen(false);
    };
    if (newBoard === "") {
      window.alert("List name must not be empty");
    } else if (newTheme === 0) {
      window.alert("Must select a theme");
    } else {
      addData();
    }
  };

  return (
    <section className="dashboard-page">
      {open ? (
        <div className="modal-overlay" onClick={() => setOpen(false)} />
      ) : null}

      {open ? (
        <BoardDropdown
          newBoard={newBoard}
          setOpen={setOpen}
          handleBoardChange={handleBoardChange}
          addBoard={addBoard}
          newTheme={newTheme}
          setNewTheme={setNewTheme}
        />
      ) : null}
      <div className="side-nav">
        <div className="side-nav-header">
          <div className="side-nav-title-wrapper">
            <h3 className="side-nav-title"> dragn</h3>
            <h3 className="side-nav-title-2">drop </h3>
          </div>
        </div>
        <div className="side-nav-footer">
          <img className="profile-pic" src={user.picture}></img>
          <p className="profile-name">{user.name}</p>
          <LogoutButton buttonName="Sign out" />
        </div>
      </div>
      <div className="board-wrapper">
        <div className="divider"></div>
        <div className="whiteboard">
          <div className="board-grid">
            <h4 className="grid-header">Your Workspaces</h4>
            <div className="board-listings">
              <div className="add-board-button" onClick={() => setOpen(true)}>
                <Plus style={{ width: "8%" }} />
                <p className="board-button-text">Create workspace</p>
              </div>
              {boards.map((board) => {
                return (
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/boards/${board.id}`}
                    key={board.id}
                  >
                    <div
                      className={
                        board.themeType === 1
                          ? "board-item-1"
                          : board.themeType === 2
                          ? "board-item-2"
                          : board.themeType === 3
                          ? "board-item-3"
                          : null
                      }
                    >
                      <p className="board-item-text">{board.boardName}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoardSelectPage;
