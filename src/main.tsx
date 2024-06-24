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
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <IPhoneFrame />,
        children: [
          { path: "", element: <Home /> },
          { path: "studentCard", element: <StudentCard /> },
          { path: "event", element: <Event /> },
          { path: "story", element: <Story /> },
          { path: "reward", element: <Reward /> },
          { path: "knowledge", element: <Knowledge /> },
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
