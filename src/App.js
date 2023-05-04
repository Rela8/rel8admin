import { BrowserRouter, Route, Routes } from "react-router-dom";
import Committee from "./components/Committee/Committee";
import DashBoard from "./components/DashBoard/DashBoard";
import Dues from "./components/Dues/Dues";
import Election from "./components/Election/Election";
import Events from "./components/Events/Events";
import Gallery from "./components/Gallery/Gallery";
import Login from "./components/Login/Login";
import Members from "./components/Members/Members";
import News from "./components/News/News";
import Publications from "./components/Publications/Publications";
import Settings from "./components/Settings/Settings";
import SideBar from "./components/SideBar/SideBar";
import FundAProject from './components/FundAProject/FundAProject';
import NotFound from "./components/NotFound/NotFound";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Meetings from "./components/Meetings/Meetings";
import Chapters from "./components/Chapters/Chapters";
import ServiceRequest from "./components/ServiceRequest/ServiceRequest";
import SetProspectiveMembersRules from "./components/SetProspectiveMembersRules/SetProspectiveMembersRules";
import AllProspectivemembers from "./components/AllProspectivemembers/AllProspectivemembers";
import EventAttendies from "./components/Events/EventAttendies";

function App() {
  return (
    <>
    <ToastContainer />
    <BrowserRouter>
        <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route element={<SideBar/>}>
                  <Route path="/" element={<DashBoard />}/>
                  <Route path="/members" element={<Members />} />
                  <Route path="/settings" element={<Settings />}/>
                  <Route path="/events" element={<Events />}/>
                  <Route path="/events/event-attendies/:id" element={<EventAttendies />}/>
                  {/*  */}
                  <Route path="/payments" element={<Dues />}/>
                  <Route path="/news" element={<News />}/>
                  <Route path="/publications" element={<Publications />}/>
                  <Route path="/gallery" element={<Gallery />}/>
                  <Route path="/committee" element={<Committee />}/>
                  <Route path="/meetings" element={<Meetings />}/>
                  <Route path="/chapters" element={<Chapters />} />
                  <Route path="/fund_a_project" element={<FundAProject />} />
                  <Route path="/service_request" element={<ServiceRequest />} />
                  <Route path="/prospective-member" element={<SetProspectiveMembersRules/>} />
                  <Route path="/all-prospectivemembers" element={<AllProspectivemembers/>} />
              </Route>
          <Route path="*" element={<NotFound />}/>
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

