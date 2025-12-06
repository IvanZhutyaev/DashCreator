import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/core/providers/ThemeProvider';
import { Layout } from '@/components/layout/Layout';
import { DashboardListPage } from '@/modules/dashboard/pages/DashboardListPage';
import { DashboardBuilderPage } from '@/modules/dashboard/pages/DashboardBuilderPage';
import { DataSourcesPage } from '@/modules/data-sources/pages/DataSourcesPage';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboards" element={<DashboardListPage />} />
          <Route path="/dashboards/:id" element={<DashboardBuilderPage />} />
          <Route path="/dashboards/new" element={<DashboardBuilderPage />} />
          <Route path="/data-sources" element={<DataSourcesPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;

