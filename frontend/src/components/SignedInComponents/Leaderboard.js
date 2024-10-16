import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import "./../../styles/Leaderboard.css";
import { urlList } from "../../urls";
import { useNarration } from '../../context/NarrationContext';
import { getNarrationText } from '../../utils/narrationData';

const Leaderboard = () => {
  const { isNarrationActive, toggleNarration, narrate } = useNarration();
  
  useEffect(() => {
    if (isNarrationActive) {
      narrate(getNarrationText("LeaderMain"));
    }
  }, [isNarrationActive, narrate]);
  
  const { user } = useContext(UserContext);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendURL = `${urlList.backendDatabase}/users`;

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get(backendURL);
        const usersData = response.data;
        const sortedData = usersData.sort(
          (a, b) => b.multiPlayerScore - a.multiPlayerScore
        );

        setLeaderboardData(sortedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching leaderboard data:", err);
        setError("Failed to fetch leaderboard data.");
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [backendURL]);

  if (loading) {
    return <div className="loading-leaderboard-text">Loading...</div>;
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Leaderboard };
