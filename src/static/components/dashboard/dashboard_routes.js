

import HomeDashboard from 'static/components/dashboard/views/HomeDashboard';
import DashboardStatic from 'static/components/dashboard/views/StaticDashboard1';

const routes=[
  {
    path: "/dashboard/home",
    route_name:'Dashboard',
    component: HomeDashboard,
    key:'1',
  },
  {
    path: "/dashboard/static1",
    route_name:'Dash 2',
    component: DashboardStatic,
    key:'2',
  },
  {
    path: "/dashboard",
    component: HomeDashboard,
    key:'3',
  },
]

export default routes;