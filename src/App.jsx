import { Routes, Route, useNavigate} from "react-router-dom";
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

const App =() => {
  const userdetails = useContext(User);
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<CellPage access={true} />}>
        <Route path="" element={userdetails.data ? (<MarkAttendance />) : (<Login />)} />
        <Route path="addMember" element={<AddCellMembers />} />
        <Route path="cellmembers" element={<CellMember />} />
        <Route path="delete" element={<DeleteRequest />} />
      </Route>

      <Route path="/pcf" element={<PcfPage />}>
        <Route path="" element={<CreateMeeting />} />
        <Route path="deleterequest" element={<DeleteRequestPage />} />
        <Route path="members" element={<Members />} />
        <Route path="addmember" element={<AddMember />} />
        <Route path="createadmin" element={<CreateAdmin />} />
      </Route>

      <Route path="unauth" element={<Unauthorized />}/>

      <Route path="*" element={<h1>Page Not Found</h1>}/>
    </Routes>
  )
}

export default App
