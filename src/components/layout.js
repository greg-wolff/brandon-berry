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
  border-bottom: ${props => props.isMix ? `1px solid #000` : `1px solid #fff`};
  a {
    color: ${props => props.isMix ? `#000` : `#fff`};
  }
  background: ${props => props.isMix ? `rgba(255,255,255,1)` : `rgba(255,255,255,0)`};
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
`
const Header = props => {
  const isHomepage = props.location.pathname === withPrefix("/");
  const isMix = !(props.location.pathname === withPrefix("/")) && !(props.location.pathname === withPrefix("about"))
  console.log(!(props.location.pathname === withPrefix("/")), )
  return (
    <div>
      <Nav isHomepage={isHomepage} isMix={isMix}>
        { (!isHomepage && isMobile) ? 
        <NavLink to="/" style={{ fontFamily: `Times New Roman`, fontSize: `19pt`, lineHeight: `0.65` }}>←</NavLink> :
        <NavLink to="/">Index</NavLink> }
        <NavPlayer>{props.currentName}</NavPlayer>
        <NavLink to="/about">About</NavLink>
      </Nav>
      { !isMobile &&
        <HeaderContainer style={{zIndex: -1}}>
          <Logo
            text="Emerald Air"
            material="silver"
            height={1}
            fontName="FrakturB"
            style={{ zIndex: 0, opacity: isHomepage ? 1 : 0 }}
          />
          <BackgroundVideo autoPlay muted loop>
            <source src={`https://cdn-b-east.streamable.com/video/mp4/qo2xw.mp4?token=AQUh_FuDo6PsyIlEj-ginQ&expires=1550546127`} type={`video/mp4`} />
          </BackgroundVideo>
      </HeaderContainer> }
    </div>  
  );
};

const Layout = props => (
  <StaticQuery
    query={graphql`
      query AudioQuery {
        allContentfulMix {
          edges {
            node {
              id
              title
              date
              mixFile {
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
        <Header location={props.location} currentName={props.currentName} playing={props.playing}/>
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

// allContentfulAboutPage {
//   edges {
//     node {
//       homepageVideo {
//         id
//         file {
//           url
//         }
//       }
//     }
//   }
// }    
