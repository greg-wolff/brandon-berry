import React from 'react';
import Helmet from 'react-helmet';
import styled, { createGlobalStyle } from 'styled-components'
import ReactHowler from 'react-howler'
import { Link, withPrefix, StaticQuery, graphql } from 'gatsby'
import { connect } from 'react-redux'
import { isMobile } from 'react-device-detect'
import moment from 'moment'

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
  border-bottom: 1px solid #000;
  z-index: 1;
  top: 0;
  background: white;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #000;
  &:hover {
    text-decoration: underline;
  }
`;

const Header = props => {
  const isHomepage = props.location.pathname === withPrefix("/");

  return (
    <div>
      <Nav>
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
            material="royal"
            height={1}
            fontName="FrakturB"
            style={{ zIndex: -1, opacity: isHomepage ? 1 : 0 }}
          />
      </HeaderContainer> }
    </div>  
  );
};

const Player = props =>
  props.data.allContentfulMix.edges.sort((a,b) => moment.utc(a.node.date).diff(moment.utc(b.node.date))).slice(0).reverse().map(({ node }, i, arr) =>
    <div key={node.id}>
    {/* <ReactHowler
      src={`http:${node.mixFile.file.url}`}
      playing={(props.currentFile === node.mixFile.file.url) && props.playing ? true : false}
      preload
    /> */}
    </div>
  )

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
        <Player data={data} currentFile={props.currentFile} playing={props.playing} />
        <Header location={props.location} currentName={props.currentName} playing={props.playing}/>
        <div style={{marginTop: `35px`}}>
          <Transition location={props.location}>
            {props.children}
          </Transition>
        </div>
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
