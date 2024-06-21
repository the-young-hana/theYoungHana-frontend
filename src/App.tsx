import "./App.css";
import { Route, Routes } from "react-router-dom";
import { StudentCard } from "./pages/studentCard/StudentCard";
import { Story } from "./pages/story/Story";
import { Reward } from "./pages/reward/Reward";
import { Knowledge } from "./pages/knowledge/Knowledge";
import { Event } from "./pages/event/Event";
import Main from "./pages/Main";
import IPhoneFrame from "./components/common/IPhoneFrame";

function App() {
  return (
    <IPhoneFrame>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/studentCard" element={<StudentCard />} />
        <Route path="/event" element={<Event />} />
        <Route path="/story" element={<Story />} />
        <Route path="/reward" element={<Reward />} />
        <Route path="/knowledge" element={<Knowledge />} />
      </Routes>
    </IPhoneFrame>
  );
}

export default App;
