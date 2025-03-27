export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { path: '/index', name: '主页', icon: 'BankOutlined', component: './Index' },
  { path: '/interface_info/:id', name: '接口文档',  component: './InterfaceInfo',hideInMenu:true },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/interface_info' },
      { path: '/admin/interface_info', name: '接口管理', component: './Admin/InterfaceInfo' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
