
import HomeComponent from 'static/Home';
import LoginComponent from 'static/User/Login';
import UpdateUserComponent from 'static/User/Update';

import DashboardComponent from 'static/components/dashboard/dashboard';

var routes={};

routes['routes_static']=[
  {
    path: "/(home|)/",
    public:true,
    component: HomeComponent,
  },
  {
    path: "/dashboard/:id",
    public:false,
    component: DashboardComponent,
  },
  {
    path: "/dashboard/",
    public:false,
    component: DashboardComponent,
  },
  {
    path: "/login",
    public:true,
    component: LoginComponent,
  },
  {
    path: "/profile/update",
    public:false,
    component: UpdateUserComponent,
  },
]


export default routes;
