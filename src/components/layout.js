import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components'
import { Link, withPrefix, StaticQuery, graphql } from 'gatsby'
import { connect } from 'react-redux'
import { isMobile } from 'react-device-detect'

import Player from "./Player"
import Transition from "../components/transition"
import NavPlayer from '../components/NavPlayer'

//import './index.css'
import "../assets/css/grid.css";
import "../assets/css/animate.css";
import "../assets/css/styles.css";

import Logo from '../components/Logo';

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Nav = styled.nav`
  box-sizing: border-box;
  position: fixed;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  padding: 7px 16px;
  z-index: 1;
  top: 0;
  border-bottom: 1px solid #fff;
  background: rgba(255,255,255,0);
  a {
    color: #fff;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #000;
  &:hover {
    text-decoration: underline;
  }
`;

const Desktop = styled.div`
  margin-top: 35px;
`

const BackgroundVideo = styled.video`
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%; 
  min-height: 100%;
  z-index: -1;
  filter: saturate(1.3);
`
const Header = props => {
  const isHomepage = props.location.pathname === withPrefix("/");
  const isTrackUpload = props.location.pathname === withPrefix("/trackUpload/");
  return !isTrackUpload && (
    <div>
      <Nav>
        { (!isHomepage && isMobile) ? 
        <NavLink to="/" style={{ fontFamily: `Times New Roman`, fontSize: `19pt`, lineHeight: `0.65` }}>←</NavLink> :
        <NavLink to="/">Index</NavLink> }
        <NavPlayer>{props.currentName}</NavPlayer>
        <NavLink to="/about">About</NavLink>
      </Nav>
      <HeaderContainer style={{zIndex: -1}}>
      { !isMobile && 
        <Logo
          text="Emerald Air"
          material="silver"
          height={1}
          fontName="FrakturB"
          style={{ zIndex: 0, opacity: isHomepage ? 1 : 0 }}
        />
      }
      <BackgroundVideo autoPlay muted loop>
        <source src={props.video} type={`video/mp4`} />
      </BackgroundVideo>
      </HeaderContainer> 
    </div>  
  );
};

const Layout = props => (
  <StaticQuery
    query={graphql`
      query AudioQuery {
        allContentfulAboutPage {
          edges {
            node {
              homepageVideo {
                id
                file {
                  url
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <div>
        <Helmet
          title="Brandon Berry"
          meta={[
            { name: "description", content: "Sample" },
            { name: "keywords", content: "sample, something" }
          ]}
        />
        <Player />
        <Header location={props.location} currentName={props.currentName} playing={props.playing} video={data.allContentfulAboutPage.edges[0].node.homepageVideo.file.url}/>
        <Desktop>
          <Transition location={props.location}>
            {props.children}
          </Transition>
        </Desktop>
      </div>
    )}
  />
);

const mapStateToProps = ({ playing, currentFile, currentName }) => {
  return { playing, currentFile, currentName }
}

export default connect(
  mapStateToProps
)(Layout)
