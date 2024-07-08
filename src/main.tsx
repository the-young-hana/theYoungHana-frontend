import React, { lazy, ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import IPhoneFrame from "./components/common/IPhoneFrame.tsx";
import { EventContextProvider } from "./context/EventContext.tsx";
import { TransactionProvider } from "./context/TransactionContext.tsx";
import TransferSuccess from "./pages/transfer/TransferSuccess.tsx";
import { getCookie } from "./utils/cookie.ts";

const ACCESS_TOKEN = getCookie("accessToken");
const DEPT_IDX = getCookie("deptIdx");

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
const Notification = lazy(
  () => import("./pages/notification/Notification.tsx"),
);
const Transfer = lazy(() => import("./pages/transfer/Transfer.tsx"));
const NotFoundStudent = lazy(
  () => import("./pages/studentCard/NotFoundStudent.tsx"),
);

const protectedRoute = (Component: ReactNode) =>
  ACCESS_TOKEN && DEPT_IDX ? (
    Component
  ) : (
    <Navigate replace to="/notfoundstudent" />
  );

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
          { path: "studentCard", element: protectedRoute(<StudentCard />) },
          {
            path: "event",
            element: protectedRoute(<Event />),
            children: [
              { path: "ing", element: protectedRoute(<EventList />) },
              { path: "end", element: protectedRoute(<EventList />) },
            ],
          },

          {
            path: "event/eventDetail/:eventId",
            element: protectedRoute(<EventDetail />),
          },
          { path: "event/post", element: protectedRoute(<PostEvent />) },
          {
            path: "event/winner/:eventId",
            element: protectedRoute(<EventWinner />),
          },
          {
            path: "story",
            element: <Story />,
            children: [
              {
                path: ":deptIdx/stories",
                element: protectedRoute(<Stories />),
              },
              {
                path: ":deptIdx/transactions",
                element: protectedRoute(<Transactions />),
              },
            ],
          },
          {
            path: "story/detail/:storyIdx",
            element: protectedRoute(<StoryDetail />),
          },
          { path: "story/post/1", element: protectedRoute(<PostStory1 />) },
          { path: "story/post/2", element: protectedRoute(<PostStory2 />) },
          {
            path: "story/completion",
            element: protectedRoute(<StoryCompletion />),
          },
          {
            path: "story/update/:storyIdx/1",
            element: protectedRoute(<StoryUpdate1 />),
          },
          {
            path: "story/update/:storyIdx/2",
            element: protectedRoute(<StoryUpdate2 />),
          },
          { path: "reward", element: protectedRoute(<Reward />) },
          { path: "reward/ranking", element: protectedRoute(<Ranking />) },
          { path: "reward/gift", element: protectedRoute(<Gift />) },
          { path: "reward/quiz", element: protectedRoute(<Quiz />) },
          { path: "knowledge", element: protectedRoute(<Knowledge />) },
          {
            path: "knowledge/list",
            element: protectedRoute(<KnowledgeList />),
          },
          {
            path: "knowledge/detail/:knowledgeIdx",
            element: protectedRoute(<KnowledgeDetail />),
          },
          {
            path: "notification",
            element: <Notification />,
          },
          { path: "transfer", element: <Transfer /> },
          { path: "transfer/success", element: <TransferSuccess /> },
          { path: "notfoundstudent", element: <NotFoundStudent /> },
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
