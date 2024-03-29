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
import NotFound from "./components/NotFound/NotFound";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Meetings from "./components/Meetings/Meetings";
import Chapters from "./components/Chapters/Chapters";
import NotificationPage from "./components/NotificationPage";
import ServiceRequest from "./components/ServiceRequest/ServiceRequest";
import MemberServiceRequestSubmission from "./components/ServiceRequest/MemberServiceRequestSubmission";

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
                  <Route path="/payments" element={<Dues />}/>
                  <Route path="/news" element={<News />}/>
                  <Route path="/publications" element={<Publications />}/>
                  <Route path="/gallery" element={<Gallery />}/>
                  <Route path="/elections" element={<Election />}/>
                  <Route path="/committee" element={<Committee />}/>
                  <Route path="/meetings" element={<Meetings />}/>
                  <Route path="/chapters" element={<Chapters />} />
                  <Route path="/notification" element={<NotificationPage/>} />
                  <Route path="/service-request" element={<ServiceRequest/>} />
                  <Route path="/service-request/member-submission/:id" element={<MemberServiceRequestSubmission />} />
                  

              </Route>
          <Route path="*" element={<NotFound />}/>
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

