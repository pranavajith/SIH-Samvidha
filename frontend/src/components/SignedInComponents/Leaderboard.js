import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import "./../../styles/Leaderboard.css";
import { urlList } from "../../urls";

const Leaderboard = () => {
  const { user } = useContext(UserContext); // Get the current user from the context
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL for the backend (you may adjust this depending on your server setup)
  const backendURL = `${urlList.backendDatabase}/users`; // Make sure to replace this with the correct endpoint

  // Fetch the leaderboard data from the server when the component mounts
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        // Make a GET request to fetch users data from the server
        const response = await axios.get(backendURL);
        console.log("hey!");
        // Assuming the server returns a list of users, each with a multiPlayerScore
        const usersData = response.data;

        // Sort users based on multiPlayerScore in descending order
        const sortedData = usersData.sort(
          (a, b) => b.multiPlayerScore - a.multiPlayerScore
        );

        // Set the leaderboard data in state
        setLeaderboardData(sortedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching leaderboard data:", err);
        setError("Failed to fetch leaderboard data.");
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  console.log(leaderboardData);

  // Render loading or error states
  if (loading) {
    return <div>Loading leaderboard...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
            {/* <th>League</th> */}
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((player, index) => (
            <tr
              key={player.username}
              className={
                user.username === player.username ? "highlighted-row" : ""
              }
            >
              <td>{index + 1}</td>
              <td>{player.username}</td>
              <td>{player.multiPlayerScore}</td>
              {/* <td>{player.league || "Unranked"}</td>{" "} */}
              {/* Assuming the user has a league field */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Leaderboard };
