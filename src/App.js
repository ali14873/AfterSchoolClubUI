import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import NavbarTop from './components/Navbar';
import Login from './components/Login';
import AddStudent from './components/AddStudent';
import AddTeacher from './components/AddTeacher';
import AddAllergy from './components/AddAllergy';
import AddHealth from './components/AddHealth';
import Upload from './components/Upload';
import AddStudentTable from './components/AddStudentTable';
import AddTeacherTable from './components/AddTeacherTable';
import AddHealthTable from './components/AddHealthTable';
import AddAllergyTable from './components/AddAllergyTable';
import AddStudentParentRelation from './components/AddStudentParentRelation';
import AddEmergencycontact from './components/AddEmergencycontact';
import AddStudentParentRelationTable from './components/AddStudentParentRelationTable';
import AddEmergencyContactTable from './components/AddEmergencyContactTable';
import Clubs from './components/Clubs';
import EventCalendar from './components/EventCalender';
import AddResource from './components/AddResource';
import AddResourcetable from './components/AddResourcetable';
import AddComment from './components/AddComment';
import ProfilePage from './components/ProfilePage';
import AddResourceInventory from './components/AddResourceInventory';
import AddResourceInventoryTable from './components/AddResourceInventoryaTable';
import AddSession from './components/AddSession';
import AddSessionTable from './components/AddClubTable';
import AddClubTable from './components/AddClubTable';
import AddClub from './components/AddClub';
import AddCriticalIncident from './components/AddCriticalIncident';
import AddCriticalIncidenttable from './components/AddCriticalIncidenttable';
import Club from './components/Club';
import { BarChart } from './components/BarChart';
import Progress from './components/Progress';
import AddParents from './components/AddParents';
import AddParentsTable from './components/AddParentsTable';
import NotFound from './components/NotFound';

const NavbarConditional = () => {
  const location = useLocation();
  const { pathname } = location;
  const showNavbar = !["/login" ,"/","/addclubcalender"].includes(pathname);

  return showNavbar ? <NavbarTop /> : null;
};

const App = () => {



  
  return (
    <div>
      <BrowserRouter>
        <NavbarConditional />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="/addteacher" element={<AddTeacher />} />
          <Route path="/addallergy" element={<AddAllergy />} />
          <Route path="/addhealth" element={<AddHealth />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/addstudenttable" element={<AddStudentTable />} />
          <Route path="/addteachertable" element={<AddTeacherTable />} />
          <Route path="/addhealthtable" element={<AddHealthTable />} />
          <Route path="/addallergytable" element={<AddAllergyTable />} />
          <Route path="/addstudentparentrelation" element={<AddStudentParentRelation />} />
          <Route path="/addemergencycontact" element={<AddEmergencycontact />} />
          <Route path="/addstudentparentrelationtable" element={<AddStudentParentRelationTable />} />
          <Route path="/addemergencycontacttable" element={<AddEmergencyContactTable />} />
          <Route path="/club" element={<Clubs/>} />
          <Route path="/addclubcalender" element={<EventCalendar />} />
          <Route path="/addsession/:clubid" element={<AddSession />} />
          <Route path="/addsessiontable" element={<AddSessionTable />} />
          <Route path="/addresource" element={<AddResource />} />
          <Route path="/addresourcetable" element={<AddResourcetable />} />
          <Route path="/club/:clubid" element={<Club />} />
          <Route path="/addcomment/:clubid" element={<AddComment />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/addresourceinventory" element={<AddResourceInventory />} />

          <Route path="/addresourceinventorytable" element={<AddResourceInventoryTable />} />
          <Route path="/addclub" element={<AddClub />} />
          <Route path="/addclubtable" element={<AddClubTable />} />

          <Route path="/addcritical" element={<AddCriticalIncident />} />
          <Route path="/addcriticaltable" element={<AddCriticalIncidenttable />} />

          <Route path="/analytics" element={<Progress />} />
          
          <Route path="/addparents" element={<AddParents />} />
                    
          <Route path="/addparenttable" element={<AddParentsTable />} />
          <Route path="*" element={<NotFound />} />



        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
