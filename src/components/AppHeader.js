import React from 'react';
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CButton,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilExitToApp, cilMenu } from '@coreui/icons';

import { useGlobals } from 'src/hooks/useGlobals';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
  const globals = useGlobals();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      globals.setUser(null);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => globals.setSidebar(!globals.sidebar)}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        <CHeaderNav className="ms-3">
          <div className="d-flex align-items-center">
            <div className="me-2"> {globals?.user?.name}</div>
          </div>
          <CButton
            onClick={handleLogout}
            color="white"
            className="outline-none border-0"
          >
            <CIcon icon={cilExitToApp} className="me-2" />
          </CButton>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
