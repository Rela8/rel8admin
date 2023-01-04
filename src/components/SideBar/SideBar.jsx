import React from 'react'
import { DashBoardIcon, DuesIcon, ElectionIcon, EventsIcon, GalleryIcon, LogoOutIcon, NewsIcon,
     NotificationIcon, PublicIcon, SettingsIcon, UsersIcon } from '../../assets/SideBar/svgs'
import { CloseSlider, Hamburger, SideBarContainer, SideBarContainer2,
     SideBarItem, SideBarItemCon, SideBarLogo, SideBarLogoCon,
      TopNav, TopNavIcons, TopNavTitle } from './SideBar.styles'
import LogoImage from '../../assets/SideBar/Logo.png'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { rel8Purple, rel8White } from '../../globals'
import { useEffect } from 'react'

const CustNavLink = ({where,children}) => (
    <NavLink to={where} style={({ isActive }) => ({ color: isActive ? `${rel8White}` : `${rel8Purple}`, backgroundColor: isActive ? `${rel8Purple}` : ""})}>
        {children}
    </NavLink>
)

const SideBar = () => {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    const [sideIsOpen,openSide] = useState(false)
  return (
    <>
    <TopNav>
        <Hamburger onClick={()=>openSide(!sideIsOpen)}/>
        <TopNavTitle>Admin Dashboard</TopNavTitle>
        <TopNavIcons>
            <SettingsIcon style={{width:"25px",height:"25px",cursor:"pointer"}}/>
            <NotificationIcon style={{width:"25px",height:"25px",cursor:"pointer"}}/>
        </TopNavIcons>
    </TopNav>
    <SideBarContainer>
        <SideBarLogoCon>
            <SideBarLogo alt='' src={LogoImage}/>
        </SideBarLogoCon>

        <SideBarItemCon>
                <SideBarItem>
                    <CustNavLink where={"/"}>
                        <DashBoardIcon style={{width:"25px",height:"25px",marginRight:"10px"}}/>DashBoard
                    </CustNavLink>
                </SideBarItem>
                <SideBarItem>
                    <CustNavLink where={"/members"}>
                        <UsersIcon style={{width:"25px",height:"25px",marginRight:"10px"}}/>
                        Members
                    </CustNavLink>
                </SideBarItem>
            <SideBarItem>
                <CustNavLink where={"/events"}>
                    <EventsIcon style={{width:"25px",height:"25px",marginRight:"10px"}}/>
                    Events
                </CustNavLink>
            </SideBarItem>
            <SideBarItem>
                <CustNavLink where={"/news"}>
                    <NewsIcon style={{width:"25px",height:"25px",marginRight:"10px"}}/>
                    News
                </CustNavLink>
            </SideBarItem>
            <SideBarItem>
                <CustNavLink where={"/publications"}>
                    <PublicIcon style={{width:"25px",height:"25px",marginRight:"10px"}}/>
                    Publications
                </CustNavLink>
            </SideBarItem>
            <SideBarItem>
                <CustNavLink where={"/dues"}>
                    <DuesIcon style={{width:"25px",height:"25px",marginRight:"10px"}}/>
                    Dues
                </CustNavLink>
            </SideBarItem>
            <SideBarItem>
                <CustNavLink where={"/gallery"}>
                    <GalleryIcon style={{width:"25px",height:"25px",marginRight:"10px"}}/>
                    Gallery
                </CustNavLink>
            </SideBarItem>
            <SideBarItem>
                <CustNavLink where={"/elections"}>
                    <ElectionIcon style={{width:"25px",height:"25px",marginRight:"10px"}}/>
                    Elections
                </CustNavLink>
            </SideBarItem>
            <SideBarItem>
                <CustNavLink where={"/settings"}>
                    <SettingsIcon style={{width:"25px",height:"25px",marginRight:"10px"}}/>
                    Settings
                </CustNavLink>
            </SideBarItem>
            <SideBarItem>
                <CustNavLink where={"/logout"}>
                    <LogoOutIcon style={{width:"25px",height:"25px",marginRight:"10px"}}/>
                    Logout
                </CustNavLink>
            </SideBarItem>
        </SideBarItemCon>
    </SideBarContainer>

    <SideBarContainer2 open={sideIsOpen}>
        <SideBarLogoCon>
            <SideBarLogo alt='' src={LogoImage}/>
            <CloseSlider onClick={()=>openSide(!sideIsOpen)}/>
        </SideBarLogoCon>

        <SideBarItemCon>
        <SideBarItem>
                    <CustNavLink where={"/"}>
                        <DashBoardIcon style={{width:"25px",height:"25px",marginRight:"10px"}}/>DashBoard
                    </CustNavLink>
                </SideBarItem>
                <SideBarItem>
                    <CustNavLink where={"/members"}>
                        <UsersIcon style={{width:"25px",height:"25px",marginRight:"10px"}}/>
                        Members
                    </CustNavLink>
                </SideBarItem>
            <SideBarItem>
                <CustNavLink where={"/events"}>
                    <EventsIcon style={{width:"25px",height:"25px",marginRight:"10px"}}/>
                    Events
                </CustNavLink>
            </SideBarItem>
            <SideBarItem>
                <CustNavLink where={"/news"}>
                    <NewsIcon style={{width:"25px",height:"25px",marginRight:"10px"}}/>
                    News
                </CustNavLink>
            </SideBarItem>
            <SideBarItem>
                <CustNavLink where={"/publications"}>
                    <PublicIcon style={{width:"25px",height:"25px",marginRight:"10px"}}/>
                    Publications
                </CustNavLink>
            </SideBarItem>
            <SideBarItem>
                <CustNavLink where={"/dues"}>
                    <DuesIcon style={{width:"25px",height:"25px",marginRight:"10px"}}/>
                    Dues
                </CustNavLink>
            </SideBarItem>
            <SideBarItem>
                <CustNavLink where={"/gallery"}>
                    <GalleryIcon style={{width:"25px",height:"25px",marginRight:"10px"}}/>
                    Gallery
                </CustNavLink>
            </SideBarItem>
            <SideBarItem>
                <CustNavLink where={"/elections"}>
                    <ElectionIcon style={{width:"25px",height:"25px",marginRight:"10px"}}/>
                    Elections
                </CustNavLink>
            </SideBarItem>
            <SideBarItem>
                <CustNavLink where={"/settings"}>
                    <SettingsIcon style={{width:"25px",height:"25px",marginRight:"10px"}}/>
                    Settings
                </CustNavLink>
            </SideBarItem>
            <SideBarItem>
                <CustNavLink where={"/logout"}>
                    <LogoOutIcon style={{width:"25px",height:"25px",marginRight:"10px"}}/>
                    Logout
                </CustNavLink>
            </SideBarItem>
        </SideBarItemCon>
    </SideBarContainer2>
    </>
  )
}

export default SideBar