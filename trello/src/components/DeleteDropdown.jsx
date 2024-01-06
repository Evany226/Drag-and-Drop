import "../css/DeleteDropdown.css";

const DeleteDropdown = ({ deleteNote, handleEdit }) => {
  return (
    <div id="delete-dropdown">
      <ul class="dropdown-list">
        <div className="title-wrapper">
          <div className="dropdown-list-title">Action List</div>
        </div>
        <li className="dropdown-list-item" onClick={handleEdit}>
          Edit name...
        </li>
        <li className="dropdown-list-item">Add card...</li>
        <li className="dropdown-list-item">Copy list...</li>
        <hr className="solid"></hr>
        <li id="delete-text" onClick={deleteNote}>
          Delete...
        </li>
      </ul>
    </div>
  );
};

export default DeleteDropdown;
