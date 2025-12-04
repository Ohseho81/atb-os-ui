import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { GlobalTwinPage } from "./pages/GlobalTwinPage";
import { OrgPage } from "./pages/OrgPage";
import { TalentPage } from "./pages/TalentPage";
import { DocsPage } from "./pages/DocsPage";
import { AutomationPage } from "./pages/AutomationPage";
import { SettingsPage } from "./pages/SettingsPage";
import { MarketplacePage } from "./pages/MarketplacePage";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<GlobalTwinPage />} />
          <Route path="/org" element={<OrgPage />} />
          <Route path="/talent" element={<TalentPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/automation" element={<AutomationPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
