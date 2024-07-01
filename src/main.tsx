import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { StudentCard } from "./pages/studentCard/StudentCard";
import { Story } from "./pages/story/Story";
import { Reward } from "./pages/reward/Reward";
import { Knowledge } from "./pages/knowledge/Knowledge";
import { Event } from "./pages/event/Event";
import IPhoneFrame from "./components/common/IPhoneFrame.tsx";
import { EventDetail } from "./pages/event/EventDetail.tsx";
import { PostEvent } from "./pages/event/PostEvent.tsx";
import { EventWinner } from "./pages/event/EventWinner.tsx";
import { Login } from "./pages/Login.tsx";
import Stories from "./pages/story/Stories.tsx";
import Transactions from "./pages/story/Transactions.tsx";
import { Ranking } from "./pages/reward/Ranking.tsx";
import { Gift } from "./pages/reward/Gift.tsx";
import { Quiz } from "./pages/reward/Quiz.tsx";
import { KnowledgeList } from "./pages/knowledge/KnowledgeList.tsx";
import { KnowledgeDetail } from "./pages/knowledge/KnowledgeDetail.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <IPhoneFrame />,
        children: [
          { path: "", element: <Home /> },
          { path: "login", element: <Login /> },
          { path: "studentCard", element: <StudentCard /> },
          { path: "event", element: <Event /> },
          { path: "event/eventDetail/:eventId", element: <EventDetail /> },
          { path: "event/post", element: <PostEvent /> },
          { path: "event/winner", element: <EventWinner /> },
          {
            path: "story",
            element: <Story />,
            children: [
              { path: ":deptIdx/stories", element: <Stories /> },
              { path: ":deptIdx/transactions", element: <Transactions /> },
            ],
          },
          { path: "reward", element: <Reward /> },
          { path: "reward/ranking", element: <Ranking /> },
          { path: "reward/gift", element: <Gift /> },
          { path: "reward/quiz", element: <Quiz /> },
          { path: "knowledge", element: <Knowledge /> },
          { path: "knowledge/list", element: <KnowledgeList /> },
          {
            path: "knowledge/detail/:knowledgeId",
            element: <KnowledgeDetail />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
