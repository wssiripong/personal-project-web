import { Routes, Route } from 'react-router-dom';
import AuthLayout from '../layout/auth/AuthLayout';
import Home from '../pages/Home';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route path='/' element={<Home />} />
      </Route>
    </Routes>
  );
}

export default Router;
