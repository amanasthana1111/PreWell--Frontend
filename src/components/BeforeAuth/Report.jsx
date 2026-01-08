import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useUserAuth from "./hooks/useAuth";
import NoPageFound from "./NoPageFound";
import axios from "axios";

const Report = () => {
  const isAuth = useUserAuth();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const interviewData = state?.interviewData;
  useEffect(() => {
    if (isAuth === null || !interviewData) return;
    const reportAi = async () => {
      
      setLoading(true);
      try {
        const response = await axios.post(
          "https://folify.onrender.com/api/google",
          interviewData,
          { withCredentials: true }
        );
        setData(response.data);
      } catch (error) {
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    reportAi();
  }, [interviewData, navigate]);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  if (!interviewData) {
    return <NoPageFound />;
  }

  if (loading) {
    return <div>Generating Report...</div>;
  }

  return (
    <div>
      <h2>Interview Report</h2>
      {data && (
        <>
          <p>
            <b>Score:</b> {data.overall_score}
          </p>
          <p>
            <b>Verdict:</b> {data.verdict}
          </p>
          <p>
            <b>English Level:</b> {data.english_level}
          </p>
        </>
      )}
    </div>
  );
};

export default Report;
