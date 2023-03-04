import { Routes, Route, useNavigate, Navigate} from "react-router-dom";
import { useContext, useEffect } from "react";
//  Layouts
import CellPage from "./Layouts/cellPage";
import PcfPage from "./Layouts/pcfPage";


// Cell Page
import CellMember from "./Pages/cellPages/cellMembers";
import DeleteRequest from "./Pages/cellPages/deleteRequest";
import MarkAttendance from "./Pages/cellPages/markAttendance";
import {AddMember as AddCellMembers} from './Pages/cellPages/addMember';

// Pcf Page
import AddMember from "./Pages/pcfPages/addMember";
import CreateMeeting from "./Pages/pcfPages/createMeeting";
import DeleteRequestPage from './Pages/pcfPages/deleteRequest'
import Members from "./Pages/pcfPages/members";
import Unauthorized from "./Pages/unauthorized";
import CreateAdmin from "./Pages/pcfPages/createAdmin";
import Login from "./Pages/cellPages/login";
import User from "./context/userContext";
import { useState } from "react";
import Attendance from "./Pages/pcfPages/attendance";
import PcfLogin from "./Pages/pcfPages/login";
import Admin from "./context/admin";

const App =() => {
  const userdetails = useContext(User);
  const AdminDetails = useContext(Admin)
  
  return (
    <Routes>
      <Route path="/" element={<CellPage  access={true}/>}>
        <Route path="login" element={userdetails.data === null ? (<Login />): (<Navigate to="/" replace={true} />)} />
        <Route path="" element={userdetails.data === null ? (<Navigate to="/login" replace={true} />): (<MarkAttendance />)} />
        <Route path="addMember" element={userdetails.data === null ? (<Navigate to="/login" replace={true} />): (<AddCellMembers />)} />
        <Route path="cellmembers" element={userdetails.data === null ? (<Navigate to="/login" replace={true} />): (<CellMember />)} />
        <Route path="delete" element={userdetails.data === null ? (<Navigate to="/login" replace={true} />): (<DeleteRequest />)} />
      </Route>

      <Route path="/pcf" element={<PcfPage />}>
        <Route path="" element={AdminDetails.data !== null ? (<CreateMeeting />): (<Navigate to="/pcf/login"/>)} />
        <Route path="deleterequest" element={AdminDetails.data !== null ? (<DeleteRequestPage />): (<Navigate to="/pcf/login"/>)} />
        <Route path="members" element={AdminDetails.data !== null ? (<Members />): (<Navigate to="/pcf/login"/>)} />
        <Route path="addmember" element={AdminDetails.data !== null ?(<AddMember />):  (<Navigate to="/pcf/login"/>)} />
        <Route path="createadmin" element={AdminDetails.data !== null ?(<CreateAdmin />):  (<Navigate to="/pcf/login"/>)} />
        <Route path="attendance" element={AdminDetails.data !== null ?(<Attendance />):  (<Navigate to="/pcf/login"/>)} />
        <Route path="login" element={AdminDetails.data === null ? (<PcfLogin />): (<Navigate to="/pcf"/>)} />
      </Route>

      <Route path="unauth" element={<Unauthorized />}/>

      <Route path="*" element={<h1>Page Not Found</h1>}/>
    </Routes>
  )
}

export default App
