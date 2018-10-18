import React from "react"
// import styled, { injectGlobal } from "styled-components"

const ProjectInfo = (props) => {
  return (
    <div className="animated fadeInUp">
        <h4>{props.title}</h4>
        <h3>{props.date}</h3>
    </div>
  )
}

class MixPage extends React.Component {
  render() {
    return (
      <ProjectInfo
        title={this.props.data.contentfulMix.title.toUpperCase()}
        date={this.props.data.contentfulMix.date}
      />
    )
  }
}

export const query = graphql`
  query MixQuery($slug: String!) {
    contentfulMix(fields: { slug: { eq: $slug } }) {
      title
      date
      mixFile {
        id
      }
      fields {
        slug
      }
    }
  }
`

export default MixPage;
