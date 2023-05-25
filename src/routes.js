import React from 'react';
import Login from './views/pages/login/Login';
import AddPersonel from './views/pages/addPersonel/AddPersonel';
import AddBranch from './views/pages/addBranch/AddBranch';
import AddVehicle from './views/pages/addVehicle/AddVehicle';
import AssignVehicleToPersonel from './views/pages/assignVehicleToPersonel/AssignVehicleToPersonel';
import AddPersonelsToBranch from './views/pages/addPersonelsToBranch/AddPersonelsToBranch';
import BranchDetail from './views/pages/branchDetail/BranchDetail';
import Dashboard from './views/pages/dashboard/Dashboard';


const privateRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

];

export { privateRoutes };
