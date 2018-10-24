import React from 'react';
import Helmet from 'react-helmet';
import styled, { injectGlobal } from 'styled-components';
import ReactHowler from 'react-howler'
import { Link, withPrefix, StaticQuery, graphql } from 'gatsby';
import { connect } from 'react-redux'

import NavPlayer from '../components/NavPlayer'

//import './index.css'
import "../assets/css/grid.css";
import "../assets/css/animate.css";
import "../assets/css/styles.css";

import Logo from '../components/Logo';

injectGlobal`
  html, body {
    height: 100%;
    overflow: hidden;
  }
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
  border-bottom: 1px solid #000;
  z-index: 1;
  top: 0;
  background: white;
`;

const Content = styled.main`
  margin-top: ${props => (props.homepage ? "90vh" : "35px")};
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
        <NavLink to="/">Index</NavLink>
        <NavPlayer>{props.currentName}</NavPlayer>
        <NavLink to="/about">About</NavLink>
      </Nav>
      <HeaderContainer style={{zIndex: -1}}>
        <Logo
          text="Brandon Berry"
          material="gold"
          height={20}
          fontName="FrakturB"
          style={{ zIndex: -1, opacity: isHomepage ? 1 : 0 }}
        />
      </HeaderContainer>
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
        <ReactHowler
          src={`http:${props.currentFile}`}
          playing={props.playing}
          preload
        />
        <Header location={props.location} currentName={props.currentName} playing={props.playing}/>
        <Content homepage={props.location.pathname === withPrefix("/")}>
          {props.children}
        </Content>
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
