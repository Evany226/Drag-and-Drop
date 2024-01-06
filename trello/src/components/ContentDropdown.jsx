import "../css/ContentDropdown.css";
import { ReactComponent as CloseButton } from "../assets/x.svg";
import { useRef } from "react";

const ContentDropdown = ({
  handleOpen,
  changeContent,
  newContent,
  handleContentChange,
}) => {
  const myRef = useRef(null);

  const onEnterPress = (event) => {
    if (event.keyCode == 13 && event.shiftKey == false) {
      event.preventDefault();
      myRef.current.requestSubmit();
    }
  };

  return (
    <div id="content-dropdown">
      <form
        ref={myRef}
        className="content-dropdown-form"
        onSubmit={changeContent}
      >
        <div className="content-input-wrapper">
          <textarea
            className="content-input"
            placeholder="Enter Name..."
            value={newContent}
            onChange={handleContentChange}
            onKeyDown={(event) => onEnterPress(event)}
          />
        </div>
        <div className="content-button-wrapper">
          <button className="content-button" type="submit">
            Add
          </button>
          <CloseButton
            style={{ width: "8%", cursor: "pointer" }}
            onClick={handleOpen}
          />
        </div>
      </form>
    </div>
  );
};

export default ContentDropdown;
