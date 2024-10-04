import { useContext, useState } from "react";
import "./../../styles/UserProfile.css";
import { UserContext } from "../../context/UserContext";
import { format, differenceInCalendarDays } from "date-fns"; // date-fns for better date manipulation
import axios from "axios"; // to handle API calls
import { urlList } from "../../urls"; // assume URLs are in a separate file
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, logout } = useContext(UserContext); // Context for user data and updating it
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const [updatedDetails, setUpdatedDetails] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    dob: user.dob,
    multiPlayerScore: user.multiPlayerScore,
    userProfileImage: user.userProfileImage,
    currentPassword: "", // field to validate password change
    newPassword: "", // field for new password
    confirmPassword: "", // confirmation for new password
  });

  const handleChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    // If the user is trying to change the password, ensure validation
    if (updatedDetails.newPassword || updatedDetails.confirmPassword) {
      if (updatedDetails.newPassword !== updatedDetails.confirmPassword) {
        alert("New passwords do not match.");
        return;
      }

      try {
        // Make an API call to validate and change the password
        const response = await axios.post(
          `${urlList.backendDatabase}/user/change-password`,
          {
            username: user.username,
            currentPassword: updatedDetails.currentPassword,
            newPassword: updatedDetails.newPassword,
          }
        );

        if (response.status === 200) {
          alert("Password changed successfully!");
        }
      } catch (error) {
        alert(
          "Error: " +
            (error.response ? error.response.data.message : error.message)
        );
        return;
      }
    }

    // Save other profile details like First Name, Last Name, Email, DOB, Profile Image
    try {
      const updatedUserResponse = await axios.post(
        `${urlList.backendDatabase}/user/modify`,
        {
          username: user.username,
          firstName: updatedDetails.firstName,
          lastName: updatedDetails.lastName,
          email: updatedDetails.email,
          dob: updatedDetails.dob,
          userProfileImage: updatedDetails.userProfileImage, // Send updated profile image path
        }
      );

      if (updatedUserResponse.status === 200) {
        alert("Profile updated successfully! Please Re-login to see changes!");
        logout();
        navigate("/signin");
        setEditing(false);
      }
    } catch (error) {
      alert(
        "Error: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
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

  return (
    <div className="profile-container">
      <h1 className="profile-title">User Profile</h1>
      <div className="profile-content">
        {/* Profile Image */}
        <div className="profile-image-section">
          <img
            src={updatedDetails.userProfileImage.path}
            alt={`${updatedDetails.firstName[0]} ${updatedDetails.lastName[0]}`}
            className="profile-image"
          />
          <p className="profile-name">
            {updatedDetails.firstName} {updatedDetails.lastName}
          </p>
          <p className="profile-username">{updatedDetails.username}</p>
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
              <span className="detail-value">{updatedDetails.firstName}</span>
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
              <span className="detail-value">{updatedDetails.lastName}</span>
            )}
          </div>

          <div className="detail-item">
            <label className="detail-label">Email:</label>
            {editing ? (
              <input
                type="email"
                name="email"
                value={updatedDetails.email}
                onChange={handleChange}
                className="detail-input"
              />
            ) : (
              <span className="detail-value">{updatedDetails.email}</span>
            )}
          </div>

          <div className="detail-item">
            <label className="detail-label">Date of Birth:</label>
            {editing ? (
              <input
                type="date"
                name="dob"
                value={updatedDetails.dob}
                onChange={handleChange}
                className="detail-input"
              />
            ) : (
              <span className="detail-value">
                {updatedDetails.dob
                  ? new Date(updatedDetails.dob).toDateString()
                  : "N/A"}
              </span>
            )}
          </div>

          <div className="detail-item">
            <label className="detail-label">Multiplayer Score:</label>
            <span className="detail-value">
              {updatedDetails.multiPlayerScore}
            </span>
          </div>

          <div className="detail-item">
            <label className="detail-label">Profile URL:</label>
            {editing ? (
              <input
                type="text"
                name="userProfileImage"
                value={updatedDetails.userProfileImage.path}
                onChange={(e) =>
                  setUpdatedDetails({
                    ...updatedDetails,
                    userProfileImage: {
                      ...updatedDetails.userProfileImage,
                      path: e.target.value, // Update only the path
                    },
                  })
                }
                className="detail-input"
                placeholder="Enter new image URL"
              />
            ) : (
              <span className="detail-value">
                {updatedDetails.userProfileImage.path.length > 50
                  ? updatedDetails.userProfileImage.path.slice(0, 50) + "..."
                  : updatedDetails.userProfileImage.path}
              </span>
            )}
          </div>

          <div className="detail-item">
            <label className="detail-label">Streak Start Date:</label>
            <span className="detail-value">
              {streakStartDate.toDateString()}
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

        {/* Password Section */}
        {editing && (
          <div className="profile-password-section">
            <h2 className="section-title">Change Password</h2>
            <div className="detail-item">
              <label className="detail-label">Current Password:</label>
              <input
                type="password"
                name="currentPassword"
                value={updatedDetails.currentPassword}
                onChange={handleChange}
                className="detail-input"
              />
            </div>
            <div className="detail-item">
              <label className="detail-label">New Password:</label>
              <input
                type="password"
                name="newPassword"
                value={updatedDetails.newPassword}
                onChange={handleChange}
                className="detail-input"
              />
            </div>
            <div className="detail-item">
              <label className="detail-label">Confirm New Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={updatedDetails.confirmPassword}
                onChange={handleChange}
                className="detail-input"
              />
            </div>
          </div>
        )}

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
