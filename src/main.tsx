import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IPhoneFrame from "./components/common/IPhoneFrame.tsx";
import { EventContextProvider } from "./context/EventContext.tsx";
import { TransactionProvider } from "./context/TransactionContext.tsx";

const Home = lazy(() => import("./pages/Home"));
const StudentCard = lazy(() => import("./pages/studentCard/StudentCard"));
const Story = lazy(() => import("./pages/story/Story"));
const PostStory1 = lazy(() => import("./pages/story/PostStory1.tsx"));
const PostStory2 = lazy(() => import("./pages/story/PostStory2.tsx"));
const StoryCompletion = lazy(() => import("./pages/story/StoryCompletion.tsx"));
const StoryUpdate1 = lazy(() => import("./pages/story/StoryUpdate1.tsx"));
const StoryUpdate2 = lazy(() => import("./pages/story/StoryUpdate2.tsx"));
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
const EventList = lazy(() => import("./pages/event/EventList"));

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
              { path: "ing", element: <EventList /> },
              { path: "end", element: <EventList /> },
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
          { path: "story/post/1", element: <PostStory1 /> },
          { path: "story/post/2", element: <PostStory2 /> },
          { path: "story/completion", element: <StoryCompletion /> },
          { path: "story/update/:storyIdx/1", element: <StoryUpdate1 /> },
          { path: "story/update/:storyIdx/2", element: <StoryUpdate2 /> },
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
    <TransactionProvider>
      <EventContextProvider>
        <RouterProvider router={router} />
      </EventContextProvider>
    </TransactionProvider>
  </React.StrictMode>,
);
