import React from 'react'
import {BrowserRouter , Routes, Route, Navigate} from 'react-router-dom' 
import Login from './pages/Login.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import EmployeeDashboard from './pages/EmployeeDashboard.jsx'
import RoleBaseRoutes from './utils/RoleBaseRoutes.jsx'
import PrivateRoutes from './utils/privateRoutes.jsx'
import AdminSummary from './components/AdminSummary.jsx'
import AddDepartment from './components/Department/AddDepartment.jsx'
import DepartmentList from './components/Department/DepartmentList.jsx'
import EditDepartment from './components/Department/EditDepartment.jsx'
import List from './components/employee/List.jsx'
import Add from './components/employee/Add.jsx'
import View from './components/employee/View.jsx'
import Edit from './components/employee/Edit.jsx'
import AddSalary from './components/salary/Add.jsx'
import ViewSalary from './components/salary/View/View.jsx'

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to = "/admin-dashboard"/>}> </Route>
          <Route path='/login' element={<Login />}> </Route>
          <Route path='/admin-dashboard' element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={['admin']}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
            }> 
             <Route index element={<AdminSummary />} />
             <Route path="/admin-dashboard/departments" element={<DepartmentList />} />
             <Route path="/admin-dashboard/add-department" element={<AddDepartment />} />
             <Route path="/admin-dashboard/department/:id" element={<EditDepartment />} />


             <Route path="/admin-dashboard/employee" element={<List />} />
             <Route path="/admin-dashboard/add-employee" element={<Add/>} />
             <Route path="/admin-dashboard/employee/:id" element={<View/>} />
             <Route path="/admin-dashboard/employee/edit/:id" element={<Edit/>} />
             <Route path="/admin-dashboard/employee/salary/:id" element={<ViewSalary/>} />

             <Route path="/admin-dashboard/salary/add" element={<AddSalary/>} />
            </Route>
          <Route path='/employee-dashboard' element={<EmployeeDashboard />}> </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App;
