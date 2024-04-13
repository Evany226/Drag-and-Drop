import "../css/BoardSelect.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import noteService from "../services/notes";
import { Link } from "react-router-dom";

const BoardSelectPage = () => {
  const [boards, setBoards] = useState([]);

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

  return (
    <section className="dashboard-page">
      <div className="side-nav">
        <div className="side-nav-header">
          <p className="side-nav-title">Username Dashboard</p>
        </div>
      </div>
      <div className="board-wrapper">
        <div className="divider"></div>
        <div className="whiteboard">
          <div className="board-grid">
            <h4 className="grid-header">Applications</h4>
            <div className="board-listings">
              {boards.map((board) => {
                return (
                  <Link to={`/boards/${board.id}`} key={board.id} state={board}>
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
