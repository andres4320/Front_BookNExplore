import { Outlet } from "react-router-dom"

const BaseDashboard = () => {
  return (
    <div>
      <h1>BaseDashBoard</h1>
      <Outlet />
    </div>
  )
}

export default BaseDashboard