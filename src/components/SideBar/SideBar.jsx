import React from "react";
import {
  CommitteeIcon,
  DashBoardIcon,
  DuesIcon,
  ElectionIcon,
  EventsIcon,
  GalleryIcon,
  LogoOutIcon,
  NewsIcon,
  NotificationIcon,
  PublicIcon,
  SettingsIcon,
  UsersIcon,
} from "../../assets/SideBar/svgs";
import {
  CloseSlider,
  Hamburger,
  LogOutBtn,
  SideBarContainer,
  SideBarContainer2,
  SideBarItem,
  SideBarItemCon,
  SideBarLogo,
  SideBarLogoCon,
  TopNav,
  TopNavIcons,
  TopNavTitle,
} from "./SideBar.styles";
import LogoImage from "../../assets/SideBar/Logo.png";
import { useState } from "react";
import {
  Navigate,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { rel8Purple, rel8White } from "../../globals";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { userStore } from "../../zustand/stores";

const CustNavLink = ({ where, children }) => (
  <NavLink
    to={where}
    style={({ isActive }) => ({
      color: isActive ? `${rel8White}` : `${rel8Purple}`,
      backgroundColor: isActive ? `${rel8Purple}` : "",
    })}
  >
    {children}
  </NavLink>
);

const SideBar = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [sideIsOpen, openSide] = useState(false);
  const location = useLocation();

  const userInfo = userStore((state) => state.user);
  const clearUser = userStore((state) => state.delUser);
  const navigate = useNavigate();

  const logoutHandler = () => {
    toast.success("Logout successful", {
      progressClassName: "toastProgress",
      icon: false,
    });
    clearUser();
    navigate("/login");
  };

  if (!userInfo) {
    return <Navigate to={"/login"} state={{ from: location.pathname }} />;
  }

  return (
    <>
      <TopNav>
        <Hamburger onClick={() => openSide(!sideIsOpen)} />
        <TopNavTitle>Admin Dashboard</TopNavTitle>
        <TopNavIcons>
          <SettingsIcon
            style={{ width: "25px", height: "25px", cursor: "pointer" }}
          />
          <NotificationIcon
            style={{ width: "25px", height: "25px", cursor: "pointer" }}
          />
        </TopNavIcons>
      </TopNav>
      <SideBarContainer>
        <SideBarLogoCon>
          <SideBarLogo alt="" src={LogoImage} />
        </SideBarLogoCon>

        <SideBarItemCon>
          <SideBarItem>
            <CustNavLink where={"/"}>
              <DashBoardIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              DashBoard
            </CustNavLink>
          </SideBarItem>
          <SideBarItem>
            <CustNavLink where={"/members"}>
              <UsersIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Members
            </CustNavLink>
          </SideBarItem>
          <SideBarItem>
            <CustNavLink where={"/events"}>
              <EventsIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Events
            </CustNavLink>
          </SideBarItem>
          <SideBarItem>
            <CustNavLink where={"/news"}>
              <NewsIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              News
            </CustNavLink>
          </SideBarItem>
          <SideBarItem>
            <CustNavLink where={"/publications"}>
              <PublicIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Publications
            </CustNavLink>
          </SideBarItem>
          <SideBarItem>
            <CustNavLink where={"/payments"}>
              <DuesIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Payments
            </CustNavLink>
          </SideBarItem>
          <SideBarItem>
            <CustNavLink where={"/gallery"}>
              <GalleryIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Gallery
            </CustNavLink>
          </SideBarItem>
          {/* <SideBarItem>
            <CustNavLink where={"/elections"}>
              <ElectionIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Elections
            </CustNavLink>
          </SideBarItem> */}
          <SideBarItem>
            <CustNavLink where={"/committee"}>
              <CommitteeIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Committee
            </CustNavLink>
          </SideBarItem>
          <SideBarItem>
            <CustNavLink where={"/meetings"}>
              <UsersIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Meetings
            </CustNavLink>
          </SideBarItem>

          <SideBarItem>
            <CustNavLink where={"/fund_a_project"}>
              <UsersIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Fund A Project
            </CustNavLink>
          </SideBarItem>

          <SideBarItem>
            <CustNavLink where={"/service_request"}>
              <UsersIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Service Request
            </CustNavLink>
          </SideBarItem>


  {/* <SideBarItem>
            <CustNavLink where={"/chapters"}>
              <EventsIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Branch
            </CustNavLink>
          </SideBarItem>
          {/* <SideBarItem>
            <CustNavLink where={"/all-prospectivemembers"}>
              <EventsIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
            Prospective Members 
            </CustNavLink>
          </SideBarItem> */}

          {/* <SideBarItem>
            <CustNavLink where={"/prospective-member"}>
              <EventsIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
             Set Prospective Members Rules
            </CustNavLink>
          </SideBarItem> */}

          {/* <SideBarItem>
            <CustNavLink where={"/settings"}>
              <SettingsIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Settings
            </CustNavLink>
          </SideBarItem> */}
          <LogOutBtn onClick={logoutHandler}>
            <LogoOutIcon
              style={{ width: "25px", height: "25px", marginRight: "10px" }}
            />
            Logout
          </LogOutBtn>
        </SideBarItemCon>
      </SideBarContainer>

      <SideBarContainer2 open={sideIsOpen}>
        <SideBarLogoCon>
          <SideBarLogo alt="" src={LogoImage} />
          <CloseSlider onClick={() => openSide(!sideIsOpen)} />
        </SideBarLogoCon>

        <SideBarItemCon>
          <SideBarItem>
            <CustNavLink where={"/"}>
              <DashBoardIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              DashBoard
            </CustNavLink>
          </SideBarItem>
          <SideBarItem>
            <CustNavLink where={"/members"}>
              <UsersIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Members
            </CustNavLink>
          </SideBarItem>
          <SideBarItem>
            <CustNavLink where={"/events"}>
              <EventsIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Events
            </CustNavLink>
          </SideBarItem>
          <SideBarItem>
            <CustNavLink where={"/news"}>
              <NewsIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              News
            </CustNavLink>
          </SideBarItem>
          <SideBarItem>
            <CustNavLink where={"/publications"}>
              <PublicIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Publications
            </CustNavLink>
          </SideBarItem>
          <SideBarItem>
            <CustNavLink where={"/payments"}>
              <DuesIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Payments
            </CustNavLink>
          </SideBarItem>
          <SideBarItem>
            <CustNavLink where={"/gallery"}>
              <GalleryIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Gallery
            </CustNavLink>
          </SideBarItem>
          <SideBarItem>
            <CustNavLink where={"/elections"}>
              <ElectionIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Elections
            </CustNavLink>
          </SideBarItem>
          <SideBarItem>
            <CustNavLink where={"/committee"}>
              <CommitteeIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Committee
            </CustNavLink>
          </SideBarItem>
          <SideBarItem>
            <CustNavLink where={"/meetings"}>
              <UsersIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Meetings
            </CustNavLink>
          </SideBarItem>

          <SideBarItem>
            <CustNavLink where={"/chapters"}>
              <EventsIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Branch
            </CustNavLink>
          </SideBarItem>

          <SideBarItem>
            <CustNavLink where={"/settings"}>
              <SettingsIcon
                style={{ width: "25px", height: "25px", marginRight: "10px" }}
              />
              Settings
            </CustNavLink>
          </SideBarItem>
          <LogOutBtn onClick={logoutHandler}>
            <LogoOutIcon
              style={{ width: "25px", height: "25px", marginRight: "10px" }}
            />
            Logout
          </LogOutBtn>
        </SideBarItemCon>
      </SideBarContainer2>

      <Outlet />
    </>
  );
};

export default SideBar;
