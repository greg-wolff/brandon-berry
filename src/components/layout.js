import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
// import ReactAudioPlayer from "react-audio-player";
import { Link, withPrefix, StaticQuery, graphql } from "gatsby";

//import './index.css'
import "../assets/css/grid.css";
import "../assets/css/animate.css";
import "../assets/css/styles.css";

import Logo from "../components/Logo";

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
    <HeaderContainer>
      <Nav>
        {/* <NavLink to="/">Index</NavLink>
        <NavLink to="/about">About</NavLink> */}
        <Link to="/a/">Tets</Link>
      </Nav>
      <Logo
        text="Brandon Berry"
        material="gold"
        height={20}
        fontName="FrakturB"
        style={{ zIndex: -1, opacity: isHomepage ? 1 : 0 }}
      />
    </HeaderContainer>
  );
};
export default ({ children, location }) => (
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
    render={({ data }) => (
      <div>
        <Helmet
          title="Brandon Berry"
          meta={[
            { name: "description", content: "Sample" },
            { name: "keywords", content: "sample, something" }
          ]}
        />
        {/* <ReactAudioPlayer
      src={`http:${data.allContentfulMix.edges[0].node.mixFile.file.url}`}
      autoPlay
      
    />
    {console.log(children, location, data)} */}
        <Header location={location} />
        <Content homepage={location.pathname === withPrefix("/")}>
          {children}
        </Content>
      </div>
    )}
  />
);
