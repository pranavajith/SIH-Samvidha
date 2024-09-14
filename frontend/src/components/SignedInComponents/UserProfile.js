import { useContext, useState } from "react";
import "./../../styles/UserProfile.css";
import { UserContext } from "../../context/UserContext";
import { format, differenceInCalendarDays } from "date-fns"; // date-fns for better date manipulation

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
    // Call function to update user details, if needed
    // updateUser(updatedDetails);
    setEditing(false);
  };

  // Helper function to check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return format(new Date(date), "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
  };

  // Helper function to check if a date was yesterday
  const isYesterday = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return (
      format(new Date(date), "yyyy-MM-dd") === format(yesterday, "yyyy-MM-dd")
    );
  };

  // Calculate streak status and current streak
  const latestPlayedDate = new Date(user.streakData.latestPlayed);
  const streakStartDate = new Date(user.streakData.latestStreakStartDate);

  const streakStatus =
    isToday(latestPlayedDate) || isYesterday(latestPlayedDate);

  let currentStreak = 0;
  if (streakStatus || isYesterday(latestPlayedDate)) {
    currentStreak =
      differenceInCalendarDays(latestPlayedDate, streakStartDate) + 1;
  }

  // Calculate game progress as the ratio of levels complete to total levels
  const gameProgressPercentage =
    (user.gameProgress.levelsComplete.length / user.gameProgress.totalLevels) *
    100;

  return (
    <div className="profile-container">
      <h1 className="profile-title">User Profile</h1>
      <div className="profile-content">
        {/* Profile Image */}
        <div className="profile-image-section">
          <img
            src={user.userProfileImage.path}
            alt={`${user.firstName[0]} ${user.lastName[0]}`}
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
              {gameProgressPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="detail-item">
            <label className="detail-label">Streak Start Date:</label>
            <span className="detail-value">
              {user.streakData.latestStreakStartDate}
            </span>
          </div>
          <div className="detail-item">
            <label className="detail-label">Streak Status:</label>
            <span className="detail-value">
              {streakStatus ? "Ongoing" : "Inactive"}
            </span>
          </div>
          <div className="detail-item">
            <label className="detail-label">Current Streak:</label>
            <span className="detail-value">{currentStreak} days</span>
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
