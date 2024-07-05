import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IPhoneFrame from "./components/common/IPhoneFrame.tsx";
import { EventContextProvider } from "./context/EventContext.tsx";

const Home = lazy(() => import("./pages/Home"));
const StudentCard = lazy(() => import("./pages/studentCard/StudentCard"));
const Story = lazy(() => import("./pages/story/Story"));
const PostStory = lazy(() => import("./pages/story/PostStory.tsx"));
const Reward = lazy(() => import("./pages/reward/Reward"));
const Knowledge = lazy(() => import("./pages/knowledge/Knowledge"));
const Event = lazy(() => import("./pages/event/Event"));
const EventDetail = lazy(() => import("./pages/event/EventDetail"));
const PostEvent = lazy(() => import("./pages/event/PostEvent"));
const EventWinner = lazy(() => import("./pages/event/EventWinner"));
const Login = lazy(() => import("./pages/Login"));
const Stories = lazy(() => import("./pages/story/Stories"));
const StoryDetail = lazy(() => import("./pages/story/StoryDetail.tsx"));
const Transactions = lazy(() => import("./pages/story/Transactions"));
const Ranking = lazy(() => import("./pages/reward/Ranking"));
const Gift = lazy(() => import("./pages/reward/Gift"));
const Quiz = lazy(() => import("./pages/reward/Quiz"));
const KnowledgeList = lazy(() => import("./pages/knowledge/KnowledgeList"));
const KnowledgeDetail = lazy(() => import("./pages/knowledge/KnowledgeDetail"));
const EventIng = lazy(() => import("./pages/event/EventIng"));
const EventEnd = lazy(() => import("./pages/event/EventEnd"));

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
          {
            path: "event",
            element: <Event />,
            children: [
              { path: "ing", element: <EventIng /> },
              { path: "end", element: <EventEnd /> },
            ],
          },

          { path: "event/eventDetail/:eventId", element: <EventDetail /> },
          { path: "event/post", element: <PostEvent /> },
          { path: "event/winner/:eventId", element: <EventWinner /> },
          {
            path: "story",
            element: <Story />,
            children: [
              { path: ":deptIdx/stories", element: <Stories /> },
              { path: ":deptIdx/transactions", element: <Transactions /> },
            ],
          },
          { path: "story/detail/:storyIdx", element: <StoryDetail /> },
          { path: "story/post", element: <PostStory /> },
          { path: "reward", element: <Reward /> },
          { path: "reward/ranking", element: <Ranking /> },
          { path: "reward/gift", element: <Gift /> },
          { path: "reward/quiz", element: <Quiz /> },
          { path: "knowledge", element: <Knowledge /> },
          { path: "knowledge/list", element: <KnowledgeList /> },
          {
            path: "knowledge/detail/:knowledgeIdx",
            element: <KnowledgeDetail />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EventContextProvider>
      <RouterProvider router={router} />
    </EventContextProvider>
  </React.StrictMode>,
);
