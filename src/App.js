import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import NoMatch from "./scenes/NoMatch";
import MainLayout from "./scenes/MainLayout";

import adminRoutes from "./app/admin/routes";
import AdminOutlet from "./app/admin/scenes/AdminOutlet";
import clientRoutes from "./app/client/routes";

import "antd/dist/antd.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/admin" element={<AdminOutlet/>}>
            {adminRoutes.map((item, index) => {
              const Component = item.component;
              return <Route index={!index} key={item.path} path={item.path} element={<Component/>}/>
            })}
            <Route path="*" element={<NoMatch/>}/>
          </Route>

          {clientRoutes.map(item => {
            const Component = item.component;
            return <Route key={item.path} path={`/${item.path}`} element={<Component/>}/>;
          })}


          <Route path="*" element={<NoMatch/>}/>
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
