import React from 'react'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import styled from 'styled-components'
import HoverPlay from '../components/HoverPlay'
import moment from 'moment'

const DetailLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  background: white;
  height: calc(100vh - 35px);
  width: 100vw;
  overflow-y: scroll;
`

const MixColumn = styled.div`
  border-right: 1px solid #000;
  display: grid;
  flex-direction: column;
  grid-template: .7fr .3fr / 1fr;
  align-items: center;
  justify-items: center;
  position: sticky;
  top: 0;
  height: calc(100vh - 35px);
`

const NextMix = styled(Link)`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  text-align: center;
  border-top: 1px solid #000;
  text-decoration: none;
  color: #000;
  &:hover {
    text-decoration: underline;
  }
`

const DetailColumn = styled.div`
  padding: 77px 52px;
`

const MixHeader = styled.div`
  font-size: 26pt;
  margin-bottom: 12pt;
`

const MixLink = styled.a`
  font-size: ${props => props.small ? '12pt' : '16pt'};
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const MixTracklist = styled(ReactMarkdown)`
  margin-top: 50pt;
`

const Platter = styled(Img)`
  width: 220px;
  height: 220px;
  border: 1px solid #000;
  border-radius: 50%;
  background: #fff;
  animation: ${props => props.playing ? 'spin 10s linear infinite' : 'spin 10s linear infinite paused'};
  @keyframes spin {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  &:before {
    content: "";
    width: 50px;
    height: 50px;
    display: block;
    position: absolute;
    border-radius: 50%;
    background: #ffffffb8;
    box-sizing: border-box;
    border: 1px solid #000;
    z-index: 99;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
  }
  &:after {
    content: "";
    width: 14px;
    height: 14px;
    display: block;
    position: absolute;
    border-radius: 50%;
    background: white;
    box-sizing: border-box;
    border: 1px solid #000;
    z-index: 99;
    top: calc(50% - 7px);
    left: calc(50% - 7px);
  }
`

const RecordBox = styled.div`
  width: 248px;
  height: 248px;
  border: 1px solid #000;
  display: grid;
  align-items: center;
  justify-items: center;
`

const RecordLabel = styled.span`
  background: white;
  border: 1px solid #000;
  border-radius: 4px;
  padding: 3px 7px;
  text-transform: uppercase;
  position: absolute;
  margin-top: 80px;
`

const Arrow = styled(Link)`
  display: block;
  margin-bottom: 32px;
  color: #000;
  font-family: "Times New Roman";
  font-size: 24pt;
  text-decoration: none;
  cursor: pointer;
`

const ProjectInfo = props => {
  return (
    <DetailLayout>
      <MixColumn>
        <HoverPlay mixName={props.mixName} mixFile={props.mixFile}>
          <RecordBox>
          {props.img ? <Platter fluid={props.img.fluid}
              backgroundColor={"#ffffff"}
              playing={props.playing}
              fadeIn={true}/> : <div>x___x</div>
            }
          </RecordBox>
          {props.mixes.some((el, i) => ((el.title === props.title) && (i === props.mixes.length-1))) && <RecordLabel>Newest Mix!</RecordLabel>}
        </HoverPlay>
        {props.mixes.some((el, i) => ((el.title === props.title) && (i === props.mixes.length-1))) ? 
        <NextMix to={props.slug}>
          new mix on blah
        </NextMix> :
        <NextMix to={props.mixes.slice(0).reverse().find((e, i, arr) => arr[i+1].title === props.title).fields.slug}>
          Next Mix...<br/>{props.mixes.slice(0).reverse().find((e, i, arr) => arr[i+1].title === props.title).title}
        </NextMix>
        }
      </MixColumn>
      <DetailColumn>
        <Arrow to='/'>←</Arrow>
        <MixHeader>{props.date}<br/>{props.title}</MixHeader>
        <MixLink href={props.mixFile} download={props.mixName}>Download Mix</MixLink>
        <MixTracklist source={props.trackList.tracklist}/>
      </DetailColumn>
    </DetailLayout>
  );
};

class MixPage extends React.Component {
  render() {
    return (
      <ProjectInfo
        slug={this.props.data.contentfulMix.fields.slug || ''}
        title={this.props.data.contentfulMix.title || ''}
        date={moment(this.props.data.contentfulMix.date).format('MMMM DD, YYYY') || ''}
        img={this.props.data.contentfulMix.thumbnailImage}
        mixName={this.props.data.contentfulMix.mixFile.file.fileName || ''}
        mixFile={this.props.data.contentfulMix.mixFile.file.url || ''}
        trackList={this.props.data.contentfulMix.tracklist || ''}
        playing={this.props.playing && (this.props.currentName === (this.props.data.contentfulMix.mixFile && (this.props.data.contentfulMix.mixFile.file.fileName || "")))}
        mixes={this.props.data.allContentfulMix.edges.map(el => el.node, {}).sort((a,b) => moment.utc(a.date).diff(moment.utc(b.date)))}
      />
    );
  }
}

export const query = graphql`
  query MixQuery($slug: String!) {
    allContentfulMix {
      edges {
        node {
          id
          title
          date
          fields {
            slug
          }
        }
      }
    }
    contentfulMix(fields: { slug: { eq: $slug } }) {
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
        fluid(maxWidth: 374, maxHeight: 374) {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      tracklist {
        id
        tracklist
      }
      fields {
        slug
      }
    }
  }
`

const mapStateToProps = ({ playing, currentFile, currentName }) => {
  return { playing, currentFile, currentName }
}

export default connect(
  mapStateToProps
)(MixPage)
