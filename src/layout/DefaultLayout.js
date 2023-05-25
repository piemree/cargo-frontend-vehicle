import React, { Suspense } from 'react'
import { AppSidebar, AppHeader } from '../components/index'
import propTypes from 'prop-types'
import { CContainer, CSpinner } from '@coreui/react'

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer lg>
            <Suspense fallback={<CSpinner color="primary" />}>{children}</Suspense>
          </CContainer>
        </div>
      </div>
    </div>
  )
}

DefaultLayout.propTypes = {
  children: propTypes.node,
}

export default DefaultLayout
