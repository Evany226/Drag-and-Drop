import "../css/Button.css";

const CreateButton = ({ buttonName, buttonFunc }) => {
  return (
    <button className="create-button" onClick={buttonFunc}>
      {buttonName}
    </button>
  );
};

export default CreateButton;
