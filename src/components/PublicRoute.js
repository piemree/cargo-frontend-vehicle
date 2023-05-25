/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useGlobals } from 'src/hooks/useGlobals';
const PublicRoute = ({ children }) => {
  const { getUser } = useGlobals();

  const user = getUser();
  if (user && user.role === 'transportPersonel') {
    // eslint-disable-next-line react/react-in-jsx-scope
    return <Navigate to="/" replace />;
  }
  return children;
};

PublicRoute.propTypes = {
  children: PropTypes.node,
};

export default PublicRoute;
