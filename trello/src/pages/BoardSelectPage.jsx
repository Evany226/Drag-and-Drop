import "../css/BoardSelect.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import noteService from "../services/notes";
import boardService from "../services/boards";
import { Link } from "react-router-dom";
import { ReactComponent as Plus } from "../assets/plus.svg";
import BoardDropdown from "../components/BoardDropdown";

const BoardSelectPage = () => {
  const [boards, setBoards] = useState([]);
  const [newBoard, setNewBoard] = useState("");
  const [open, setOpen] = useState(false);

  // const { user } = useAuth0();
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

  const addBoard = () => {
    const addData = async () => {
      const accessToken = await getAccessTokenSilently();

      const boardObject = {
        boardName: "Evan Board 2",
      };

      boardService.create(boardObject, accessToken).then((returnedBoard) => {
        setBoards(boards.concat(returnedBoard));
      });
    };
    addData();
  };

  return (
    <section className="dashboard-page">
      {open ? <div className="overlay" onClick={() => setOpen(false)} /> : null}

      {open ? <BoardDropdown open={open} setOpen={setOpen} /> : null}
      <div className="side-nav">
        <div className="side-nav-header">
          <p className="side-nav-title">Username Dashboard</p>
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
                  <Link to={`/boards/${board.id}`} key={board.id}>
                    <div className="board-item">
                      <p className="board-item-text">{board.boardname}</p>
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
