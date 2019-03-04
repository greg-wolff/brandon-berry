import React from 'react';
import Helmet from 'react-helmet';
import styled, { createGlobalStyle } from 'styled-components'
import { Link, withPrefix, StaticQuery, graphql } from 'gatsby'
import { connect } from 'react-redux'
import { isMobile } from 'react-device-detect'
import moment from 'moment'

import Player from "./Player"
import Transition from "../components/transition"
import NavPlayer from '../components/NavPlayer'
import { OgImage } from '../assets/images/og.jpg'

//import './index.css'
import "../assets/css/grid.css";
import "../assets/css/animate.css";
import "../assets/css/styles.css";

import Logo from '../components/Logo';

const GlobalStyle = createGlobalStyle`
  img, a{ -webkit-user-select: none; /* Safari 3.1+ */ -moz-user-select: none; /* Firefox 2+ */ -ms-user-select: none; /* IE 10+ */ user-select: none; /* Standard syntax */ user-drag: none; -webkit-user-drag: none; }
`

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
      <GlobalStyle />
      <Nav>
        { (!isHomepage && isMobile) ? 
        <NavLink to="/" style={{ fontFamily: `Times New Roman`, fontSize: `19pt`, lineHeight: `0.65` }}>←</NavLink> :
        <NavLink to="/">Home</NavLink> }
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
          title="Emerald Air"
          titleTemplate="%s | Emerald Air"
          meta={[
            { name: 'description', 
              content: 'Emerald Air is a virtual CD case filled with mixes and art clip-outs uploaded by Brandon Berry. It is home to the show Left Field Lag which airs live on KZSC Santa Cruz 88.1FM' },
            { name: 'keywords', 
              content: `brandon berry, emerald air, brandon berry dj, left field lag, underground house djs ${moment().format('YYYY')}, ra psychedelic djs ${moment().format('YYYY')}, ra psychedelic mix ${moment().format('YYYY')}, underground bay area djs` },
            { prefix: "og: http://ogp.me/ns#", property: 'og:title', content: 'Emerald Air' },
            { prefix: "og: http://ogp.me/ns#", property: 'og:description', content: 'Emerald Air is a virtual CD case filled with mixes and art clip-outs uploaded by Brandon Berry.' },
            { prefix: "og: http://ogp.me/ns#", property: 'og:type', content: 'website' },
            { prefix: "og: http://ogp.me/ns#", property: 'og:image', content: 'http://emeraldair.org/' + OgImage },
            { prefix: "og: http://ogp.me/ns#", property: 'og:image:secure_url', content: 'https://emeraldair.org/' + OgImage },
            { prefix: "og: http://ogp.me/ns#", property: 'og:url', content: 'http://emeraldair.org/' },
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
