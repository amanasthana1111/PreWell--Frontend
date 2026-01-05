import React from "react";
import { useLocation } from "react-router-dom";
import useUserAuth from "./hooks/useAuth";

const Report = () => {
  const isAuth = useUserAuth();
    const { state } = useLocation();
  if (isAuth === null) {
    return <div>Loading...</div>;
  }
  // console.log(state);
  return <div>Report</div>;
};

export default Report;

// report json look like 
// {
//   "overall_score": 72,
//   "verdict": "Average – Needs Improvement",

//   "skills_analysis": {
//     "technical_knowledge": 68,
//     "problem_solving": 65,
//     "english_communication": 75,
//     "confidence": 70,
//     "logic_clarity": 66
//   },

//   "english_level": "Intermediate",

//   "company_probability": {
//     "startup": 78,
//     "mid_size_company": 62,
//     "mnc": 45,
//     "faang_level": 28
//   },

//   "strengths": [
//     "Basic conceptual clarity",
//     "Understands common interview patterns",
//     "Good English sentence framing"
//   ],

//   "weaknesses": [
//     "Struggles with new problem variations",
//     "Slow logical breakdown",
//     "Misses edge cases"
//   ],

//   "graphs": {
//     "skill_bar_chart": {
//       "labels": [
//         "Technical",
//         "Problem Solving",
//         "English",
//         "Confidence",
//         "Logic"
//       ],
//       "values": [68, 65, 75, 70, 66]
//     },

//     "company_probability_pie": [
//       { "company": "Startup", "probability": 78 },
//       { "company": "Mid Size", "probability": 62 },
//       { "company": "MNC", "probability": 45 },
//       { "company": "FAANG", "probability": 28 }
//     ],

//     "performance_radar": {
//       "labels": [
//         "Accuracy",
//         "Clarity",
//         "Speed",
//         "Confidence",
//         "Optimization"
//       ],
//       "values": [70, 72, 60, 68, 55]
//     },

//     "progress_line_chart": {
//       "labels": ["Mock 1", "Mock 2", "Mock 3", "Mock 4"],
//       "values": [58, 63, 68, 72]
//     }
//   },

//   "hire_recommendation": {
//     "status": "Not Ready",
//     "confidence_level": 0.46,
//     "reason": "Needs improvement in problem-solving and handling unfamiliar questions."
//   },

//   "improvement_suggestions": [
//     "Practice unseen DSA problems daily",
//     "Explain answers aloud while solving",
//     "Focus on time complexity and edge cases",
//     "Give at least 2 mock interviews per week"
//   ]
// }
