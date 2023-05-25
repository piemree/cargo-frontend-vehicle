import React from 'react';

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import { AppSidebarNav } from './AppSidebarNav';

import { logoNegative } from 'src/assets/brand/logo-negative';
import { sygnet } from 'src/assets/brand/sygnet';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// sidebar nav config
import navigation from '../_nav';
import { useGlobals } from 'src/hooks/useGlobals';

const AppSidebar = () => {
  const globals = useGlobals();
  return (
    <CSidebar
      position="fixed"
      unfoldable={true}
      visible={globals.sidebar}
      onVisibleChange={(visible) => {
        globals.setSidebar(visible);
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={sygnet} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        // onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        onClick={() => globals.setSidebar(!globals.sidebar)}
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
