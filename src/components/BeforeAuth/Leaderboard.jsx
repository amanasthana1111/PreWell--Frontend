import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import useUserAuth from "./hooks/useAuth";

const LEADERBOARD_URL = "https://folify.onrender.com/resumes/leaderboard";

const fallbackRows = [
  {
    rank: 1,
    username: "Top Candidate",
    ats_score: 94,
    profile_type: "Full Stack Developer",
    primary_stack: ["React", "Node.js", "MongoDB"],
  },
  {
    rank: 2,
    username: "Strong Resume",
    ats_score: 88,
    profile_type: "Frontend Developer",
    primary_stack: ["React", "Tailwind", "JavaScript"],
  },
  {
    rank: 3,
    username: "Job Ready User",
    ats_score: 82,
    profile_type: "Backend Developer",
    primary_stack: ["Express", "MongoDB", "Redis"],
  },
];

const getScoreColor = (score) => {
  if (score >= 90) return "bg-green-100 text-green-700";
  if (score >= 75) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

const Leaderboard = () => {
  const isAuth = useUserAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuth) return;

    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(LEADERBOARD_URL, {
          withCredentials: true,
        });

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.leaderboard || response.data?.users || [];

        setRows(data);
      } catch (err) {
        console.error(err);
        setError("Leaderboard backend is not connected yet. Showing demo ranking.");
        setRows(fallbackRows);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [isAuth]);

  const leaderboardRows = useMemo(
    () =>
      rows
        .map((row, index) => ({
          id: row._id || row.id || `${row.username}-${index}`,
          rank: row.rank || index + 1,
          username: row.username || row.name || "Anonymous User",
          atsScore: row.ats_score ?? row.score ?? row.bestScore ?? 0,
          profileType: row.profile_type || row.profileType || "Career Profile",
          primaryStack: Array.isArray(row.primary_stack)
            ? row.primary_stack
            : Array.isArray(row.skills)
              ? row.skills
              : [],
          scans: row.total_scans ?? row.scans ?? 1,
        }))
        .sort((a, b) => b.atsScore - a.atsScore)
        .map((row, index) => ({ ...row, rank: index + 1 })),
    [rows]
  );

  if (isAuth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (!isAuth) return null;

  const topThree = leaderboardRows.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAF4F3] py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h3 className="text-sm text-red-500 font-semibold uppercase mb-2">
            Resume Leaderboard
          </h3>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Rank users by ATS resume score.
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            See which users have the strongest resumes based on their best ATS
            score, resume structure, keywords, and profile strength.
          </p>
        </div>

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl p-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="bg-white/70 rounded-2xl shadow-md p-10 text-center text-gray-600">
            Loading leaderboard...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topThree.map((user) => (
                <div
                  key={user.id}
                  className="bg-white rounded-2xl shadow-lg p-6 text-center"
                >
                  <p className="text-sm text-gray-500 font-semibold">
                    Rank #{user.rank}
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">
                    {user.username}
                  </h2>
                  <p
                    className={`inline-block mt-4 px-4 py-2 rounded-full font-bold ${getScoreColor(
                      user.atsScore
                    )}`}
                  >
                    {user.atsScore}% ATS
                  </p>
                  <p className="text-gray-600 mt-4">{user.profileType}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">
                  Full Ranking
                </h2>
                <p className="text-gray-600 mt-1">
                  Highest ATS score appears first.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#FAF4F3] text-gray-700">
                    <tr>
                      <th className="px-6 py-4">Rank</th>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Profile</th>
                      <th className="px-6 py-4">Skills</th>
                      <th className="px-6 py-4">Scans</th>
                      <th className="px-6 py-4">Best Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardRows.map((user) => (
                      <tr key={user.id} className="border-t border-gray-100">
                        <td className="px-6 py-4 font-bold text-gray-900">
                          #{user.rank}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          {user.username}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {user.profileType}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {user.primaryStack.length ? (
                              user.primaryStack.slice(0, 4).map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm"
                                >
                                  {skill}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500">No skills</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{user.scans}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-4 py-2 rounded-full font-bold ${getScoreColor(
                              user.atsScore
                            )}`}
                          >
                            {user.atsScore}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
