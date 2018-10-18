import React from 'react'
import { StaticQuery, graphql } from "gatsby";
import Layout from "../components/layout"
import Cd from '../components/Cd'

const IndexPage = (props, {data}) => {
  return (
    <StaticQuery
      query={
        graphql`
        query HomepageQuery {
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
                    fileName
                    contentType
                  }
                }
                thumbnailImage {
                  id
                  sizes(maxWidth: 374, maxHeight: 374, resizingBehavior: SCALE) {
                    ...GatsbyContentfulSizes_noBase64 
                  }
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `
      
      }
      render={data => (
        <Layout location={props.location}>
          <main className="animated fadeInUp">
              {data.allContentfulMix.edges.reverse().map(({ node }, i) =>
                <Cd key={node.id}
                  mix={node.fields.slug}
                  date={node.date}
                  img={node.thumbnailImage}
                  title={`${i}. ${node.title}`}
                  mixFile={node.mixFile && (node.mixFile.file.url || "")}
                  mixName={node.mixFile && (node.mixFile.file.fileName || "")} />
              )}
          </main>
        </Layout>
      )}
    />
  )
}

export default IndexPage
