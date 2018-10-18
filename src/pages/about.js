import React from 'react'
import styled from 'styled-components'
import Layout from "../components/layout"

const AboutText = styled.div`

    margin: 0px 25px;
    text-transform: uppercase;
    font-size: 16px;
    letter-spacing: 1px;

    @media only screen and (min-width: 800px) {
      padding-top: 100px;
      margin: 0px 40px;
    }

`

// const SocialLink = styled.div`

//   margin-top: 5px;

//   a {
//     text-decoration: none;
//     color: black;
//     transition: opacity 200ms ease-in-out;
//   }

//   a:hover {
//       opacity: 0.6;
//   }

//   @media only screen and (min-width: 800px) {
//     left: 40px;
//     bottom: 40px;
//     margin-top: 12px;
//   }
// `

// const LinkContainer = styled.div`

//     position: fixed;
//     text-transform: uppercase;
//     font-size: 13px;
//     letter-spacing: 1px;
//     bottom: 25px;
//     left: 25px;

//     @media only screen and (min-width: 800px) {
//       left: 40px;
//       bottom: 40px;
//     }
// `

const AboutPage = ({ props, data }) => (
  <Layout location={props.location}>
    {/* <AboutText className="col-lg-4" dangerouslySetInnerHTML={{__html: data.contentfulAbout.aboutParagraph.aboutParagraph.replace(/(?:\r\n|\r|\n)/g, '<br />')}} /> */}
    <AboutText className="col-lg-4" >asdf</AboutText>
    {/* <LinkContainer>
      <SocialLink className="col-lg-">
        {data.contentfulAbout.phone}
      </SocialLink>

      <SocialLink>
        <a target="_none" href={`mailto:${data.contentfulAbout.email}/`}>
          {data.contentfulAbout.email}
        </a>

      </SocialLink>

      <SocialLink>
        <a target="_none" href={`https://www.instagram.com/${data.contentfulAbout.instagram}/`}>
          @{data.contentfulAbout.instagram}
        </a>
      </SocialLink>
    </LinkContainer> */}
  </Layout>
)

export default AboutPage

// export const query = graphql`
//   query AboutQuery {
//     contentfulAbout(title: { eq: "About"} ) {
//       phone
//       email
//       instagram

//       aboutParagraph {
//         aboutParagraph
// 		  }
//   	}
//   }
// `
