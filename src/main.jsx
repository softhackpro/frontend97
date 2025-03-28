import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router";
import InPlayScreen from "./screens/InPlayScreen.jsx";
import SettingHeader from "./components/Roshan/Profile/SettingHeader.jsx";
import ExchangeHeader from "./components/Roshan/Profile/ExchangeHeader.jsx";
import { Homescreen } from "./screens/Homescreen.jsx";
import EndedGameDetailsScreen from "./screens/EndedGameDetailsScreen.jsx";
import { EventDetails } from "./screens/EventDetails.jsx";
import CasinoProvider from "./services/casino/casino.context.jsx";
import SportsProvider from "./services/allsports/sports.context.jsx";
import Fullgame from "./screens/Fullgame.jsx";

import SportsScreen from "./screens/SportsScreen.jsx";
import { AuthProvider } from "./services/auth/auth.context.jsx";
import ProtectedRoute from "./screens/ProtectedRoute.jsx";
import CasinoBox from "./components/casino/CasinoBox.jsx";
import CasinoScreen from "./screens/CasinoScreen.jsx";
import { Toaster } from "react-hot-toast";
import ExposureDetailPopup from "./components/ExposerDetails.jsx";
import BatDetailsScreen from "./screens/BatDetailspage.jsx";
import { io } from "socket.io-client";
import AccountDetails from "./components/Roshan/Profile/AccountDetails.jsx";
import TestUi from "./components/Roshan/TestUi.jsx";
import MultiMarketsCard from "./components/Roshan/MultiMarkets.jsx";
import PasswordChangeHistory from "./components/Roshan/PasswordChangeHistory.jsx";
import ActivityLog from "./components/Roshan/ActivityLog.jsx";
import ProfitLoss from "./components/Roshan/ProfitLoss.jsx";
import BetHistory from "./components/Roshan/BetHistory.jsx";
import AccountStmt from "./components/Roshan/AccountStmt.jsx";
import RollingCommision from "./components/Roshan/RollingCommision.jsx";
export const socket = io("https://titan97.live");

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Toaster position="top-right" reverseOrder={false} />{" "}
    <SportsProvider>
      <CasinoProvider>
        <Router>
          <Routes>
            <Route path="/bets" element={<BatDetailsScreen />} />
            <Route path="/" element={<App />}>
              <Route index element={<Homescreen />} />
              <Route path="/sports" element={<SportsScreen />} />
              <Route path="/in-play" element={<InPlayScreen />} />
              <Route path="/game" element={<EndedGameDetailsScreen />} />
              <Route path="/casino" element={<CasinoScreen />} />
              <Route path="/fullgame/:id" element={<Fullgame />} />
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/settings" element={<SettingHeader />} />
                <Route path="/account" element={<ExchangeHeader />} />
                <Route path="/casino/:id" element={<EventDetails />} />
                <Route path="/casino" element={<CasinoBox />} />
                <Route path='/myProfile' element={<AccountDetails />} />
                <Route path='/BallByBall' element={<TestUi />} />
                <Route path='/Multi-Markets' element={<MultiMarketsCard />} />
                <Route path='/PasswordChangeHistory' element={<PasswordChangeHistory />} />
                <Route path='/ActivityLog' element={<ActivityLog />} />
                <Route path='/BetHistory' element={<BetHistory />} />
                <Route path='/RollingCommision' element={<RollingCommision />} />
                <Route path='/ProfitLoss' element={<ProfitLoss />} />
                <Route path='/AccountStmt' element={<AccountStmt />} />
              </Route>
              
            </Route>
          </Routes>
        </Router>
      </CasinoProvider>
    </SportsProvider>
  </AuthProvider>
);
