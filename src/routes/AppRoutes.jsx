import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";

// Citizen pages
import CitizenDashboard from "../pages/citizen/CitizenDashboard";
import ReportProblem from "../pages/citizen/ReportProblem";
import MyComplaints from "../pages/citizen/MyComplaints";
import ComplaintDetails from "../pages/citizen/ComplaintDetails";
import Notifications from "../pages/citizen/Notifications";
import Feedback from "../pages/citizen/Feedback";
import Profile from "../pages/citizen/Profile";

// Officer pages
import OfficerDashboard from "../pages/officer/OfficerDashboard";
import DepartmentSelection from "../pages/officer/DepartmentSelection";
import DepartmentWorkspace from "../pages/officer/DepartmentWorkspace";
import DepartmentWorkspaceHome from "../pages/officer/DepartmentWorkspaceHome";
import FieldWorkers from "../pages/officer/FieldWorkers";
import ComplaintReview from "../pages/officer/ComplaintReview";
import OfficerProfile from "../pages/officer/OfficerProfile";
import AllFieldWorkers from "../pages/officer/AllFieldWorkers";
import PriorityQueue from "../pages/officer/PriorityQueue";
import WardMap from "../pages/officer/WardMap";
import PredictiveMaintenance from "../pages/officer/PredictiveMaintenance";
import Reports from "../pages/officer/Reports";
import FieldWorkerDashboard from "../pages/fieldWorker/FieldWorkerDashboard";
import FieldWorkerTaskDetails from "../pages/fieldWorker/FieldWorkerTaskDetails";
import WorkValidation from "../pages/officer/WorkValidation";
import FieldWorkerTasks from "../pages/fieldWorker/FieldWorkerTasks";
import FieldWorkerMap from "../pages/fieldWorker/FieldWorkerMap";
import FieldWorkerCompleted from "../pages/fieldWorker/FieldWorkerCompleted";
import FieldWorkerProfile from "../pages/fieldWorker/FieldWorkerProfile";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Common */}
      <Route path="/" element={<Login />} />

      {/* Citizen */}
      <Route
        path="/citizen/dashboard"
        element={<CitizenDashboard />}
      />

      <Route
        path="/citizen/report"
        element={<ReportProblem />}
      />

      <Route
        path="/citizen/complaints"
        element={<MyComplaints />}
      />

      <Route
        path="/citizen/complaints/:id"
        element={<ComplaintDetails />}
      />

      <Route
        path="/citizen/notifications"
        element={<Notifications />}
      />

      <Route
        path="/citizen/feedback"
        element={<Feedback />}
      />

      <Route
        path="/citizen/profile"
        element={<Profile />}
      />

      {/* Officer */}
      <Route
        path="/officer/dashboard"
        element={<OfficerDashboard />}
      />

      <Route
        path="/officer/departments"
        element={<DepartmentSelection />}
      />

      {/* Department credential page */}
      <Route
        path="/officer/departments/:departmentId"
        element={<DepartmentWorkspace />}
      />

      {/* Authenticated department workspace */}
      <Route
        path="/officer/departments/:departmentId/workspace"
        element={<DepartmentWorkspaceHome />}
      />

      {/* Department field workers */}
      <Route
        path="/officer/departments/:departmentId/workers"
        element={<FieldWorkers />}
      />

      {/* Complaint review */}
      <Route
        path="/officer/complaints/:id"
        element={<ComplaintReview />}
      />

      <Route
  path="/officer/profile"
  element={<OfficerProfile />}
/>

<Route
  path="/officer/workers"
  element={<AllFieldWorkers />}
/>
<Route
  path="/officer/priority-queue"
  element={<PriorityQueue />}
/>
<Route
  path="/officer/ward-map"
  element={<WardMap />}
/>
<Route
  path="/officer/predictive-maintenance"
  element={<PredictiveMaintenance />}
/>
<Route
  path="/officer/reports"
  element={<Reports />}
/>
<Route
  path="/fieldworker/dashboard"
  element={<FieldWorkerDashboard />}
/>
<Route
  path="/fieldworker/tasks/:taskId"
  element={<FieldWorkerTaskDetails />}
/>
<Route
  path="/officer/work-validation"
  element={<WorkValidation />}
/>
<Route
  path="/fieldworker/tasks"
  element={<FieldWorkerTasks />}
/>
<Route
  path="/fieldworker/tasks/:taskId"
  element={<FieldWorkerTaskDetails />}
/>

<Route
  path="/fieldworker/map"
  element={<FieldWorkerMap />}
/>

<Route
  path="/fieldworker/completed"
  element={<FieldWorkerCompleted />}
/>

<Route
  path="/fieldworker/profile"
  element={<FieldWorkerProfile />}
/>
    </Routes>
    
    
  );
}