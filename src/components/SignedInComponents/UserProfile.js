import { useContext, useState } from "react";
import "./../../styles/UserProfile.css";
import { UserContext } from "../../context/UserContext";

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
  });

  const handleChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // updateUser(updatedDetails);
    setEditing(false);
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">User Profile</h1>
      <div className="profile-content">
        {/* Profile Image */}
        <div className="profile-image-section">
          <img
            src={user.userProfileImage.path}
            alt={`${user.firstName} ${user.lastName}`}
            className="profile-image"
          />
          <p className="profile-name">
            {user.firstName} {user.lastName}
          </p>
          <p className="profile-username">{user.userName}</p>
        </div>

        {/* User Details */}
        <div className="profile-details-section">
          <h2 className="section-title">Account Details</h2>
          <div className="detail-item">
            <label className="detail-label">First Name:</label>
            {editing ? (
              <input
                type="text"
                name="firstName"
                value={updatedDetails.firstName}
                onChange={handleChange}
                className="detail-input"
              />
            ) : (
              <span className="detail-value">{user.firstName}</span>
            )}
          </div>
          <div className="detail-item">
            <label className="detail-label">Last Name:</label>
            {editing ? (
              <input
                type="text"
                name="lastName"
                value={updatedDetails.lastName}
                onChange={handleChange}
                className="detail-input"
              />
            ) : (
              <span className="detail-value">{user.lastName}</span>
            )}
          </div>
          <div className="detail-item">
            <label className="detail-label">Username:</label>
            {editing ? (
              <input
                type="text"
                name="userName"
                value={updatedDetails.userName}
                onChange={handleChange}
                className="detail-input"
              />
            ) : (
              <span className="detail-value">{user.userName}</span>
            )}
          </div>

          {/* Performance Section */}
          <h2 className="section-title">Performance</h2>
          <div className="detail-item">
            <label className="detail-label">Game Progress:</label>
            <span className="detail-value">
              {(user.gameProgress.progress * 100).toFixed(1)}%
            </span>
          </div>
          <div className="detail-item">
            <label className="detail-label">Streak:</label>
            <span className="detail-value">
              Streak Start Date: {user.streakData.latestStreakStartDate}
            </span>
          </div>
        </div>

        {/* Edit/Save Buttons */}
        <div className="profile-actions">
          {editing ? (
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="edit-button" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export { UserProfile };
