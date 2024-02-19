import {
  Authenticated,
  GitHubBanner,
  Refine,
  WelcomePage,
} from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';

import { useNotificationProvider } from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';

import { authProvider, dataProvider, liveProvider } from './providers';
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { App as AntdApp } from 'antd';
import { Home, ForgotPassword, Login, Register, CompanyList } from './pages';
import Layout from './components/layout';
import { resources } from './config/resources';

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: '9MWsME-ZWUrAe-pDjs8A',
                liveMode: 'auto',
              }}
              resources={resources}
            >
              <Routes>
                {/* <Route index element={<WelcomePage />} /> */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  element={
                    <Authenticated
                      key="authenticated-layout"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        {/* 
                          This is where the nested routes will be rendered
                          (renders the child route of the current route)
                        */}
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route index element={<Home />} />
                  <Route path="/companies" element={<CompanyList />} />
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
