import "./../../styles/MainButton.css";
import { urlList } from "./../../urls";

const MainButton = ({ imgUrl, buttonText, onClick, isLocked }) => {
  return (
    <a
      href="#"
      className="component"
      style={{ backgroundImage: `url(${imgUrl})` }}
      onClick={onClick}
    >
      <div className={isLocked ? "overlay overlay-locked" : "overlay"}>
        {isLocked && (
          <img src={urlList.LockUrl} alt="Locked" className="lock-icon" />
        )}
        <p className="component-text">{buttonText}</p>
      </div>
    </a>
  );
};

export { MainButton };
