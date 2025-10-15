import SearchList from "../components/SearchList";
import ColorPicker from "../components/ColorPicker";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

// Views
import HomePage from "../views/HomePage";
import ThreeDemoView from "../views/ThreeDemoView";
import LayoutsView from "../views/LayoutsView";
import SpeechDemoView from "../views/SpeechDemoView";
import GeometryExplorer from "../views/GeometryExplorer";
import SettingsView from "../views/SettingsView";
import DigitalClock from "../components/DigitalClock";
import CountdownTimer from "../components/CountdownTimer";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="three" element={<ThreeDemoView />} />
        <Route path="layouts" element={<LayoutsView />} />
        <Route path="tts" element={<SpeechDemoView />} />
        <Route path="three_2" element={<GeometryExplorer />} />
        <Route path="settings" element={<SettingsView />} />
    <Route path="clock" element={<DigitalClock />} />
  <Route path="countdown" element={<CountdownTimer />} />
  <Route path="color" element={<ColorPicker />} />
  <Route path="search" element={<SearchList />} />
      </Route>
    </Routes>
  );
}

