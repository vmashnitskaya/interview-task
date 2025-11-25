import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './features/layout';
import { Dashboard } from './features/dashboard';
import { CityDetails } from './features/city-details';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/cities" replace />} />
        <Route path="/cities" element={<Dashboard />} />
        <Route path="/cities/:id" element={<CityDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
