import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './features/layout';
import { Dashboard } from './features/dashboard';
import { CityDetails } from './features/city-details';
import { routes } from './config';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to={routes.cities} replace />} />
        <Route path={routes.cities} element={<Dashboard />} />
        <Route path={`${routes.cities}/:id`} element={<CityDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
