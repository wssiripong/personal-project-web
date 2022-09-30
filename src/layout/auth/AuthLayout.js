import { Outlet } from 'react-router-dom';
import Container from '../containers/Container';
import Navbar from '../headers/Navbar';

function AuthLayout() {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default AuthLayout;
