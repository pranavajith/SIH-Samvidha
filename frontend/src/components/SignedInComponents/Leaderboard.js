import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "./../../styles/Leaderboard.css";

const Leaderboard = ({ data }) => {
  const { user } = useContext(UserContext);
  // Extract current user from context

  // Sort leaderboard data in decreasing order of scores
  const sortedData = [...data].sort((a, b) => b.score - a.score);

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
            <th>League</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((player, index) => (
            <tr
              key={player.username}
              className={
                user.username === player.username ? "highlighted-row" : ""
              }
            >
              <td>{index + 1}</td>
              <td>{player.username}</td>
              <td>{player.score}</td>
              <td>{player.league}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Leaderboard };
