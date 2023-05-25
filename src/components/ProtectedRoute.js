/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useGlobals } from 'src/hooks/useGlobals';
const ProtectedRoute = ({ children }) => {
  const { getUser } = useGlobals();

  const user = getUser();

  if (!user || user.role !== 'transportPersonel') {
    localStorage.removeItem('token');
    // eslint-disable-next-line react/react-in-jsx-scope
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
