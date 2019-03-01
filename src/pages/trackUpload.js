import React from 'react'
import ReactMarkdown from 'react-markdown'

class TrackUploadPage extends React.Component {
  state = {
    text: ``
  }
  tsvToMd(tsv) {
    let rows = tsv.trim().split("\n");

    var div = "|" + rows[0].split("\t").map(cell => "----------").join("|") + "|";

    rows = rows.map(function(row) {
        return "|" + row.trim().split("\t").join("|") + "|"
    });

    rows.splice(1, 0, div);

    return rows.join("\n")
  }
  render() {
    return (
        <main className="animated fadeInUp">
          <div>
            paste spreadsheet<br/>
            <textarea rows={20} cols={100} value={this.state.text} onChange={(e) => this.setState({text: e.target.value})}></textarea>
          </div>

          <div style={{marginTop: 40}}>
            markdown for contentful
            <div><pre>{this.tsvToMd(this.state.text)}</pre></div>
          </div>

          <div style={{marginTop: 40}}>
            screenshot zone
            <div style={{margin: `40px 0`}}><ReactMarkdown source={this.tsvToMd(this.state.text)}/></div>
          </div>
        </main>
    )
  }
}
export default TrackUploadPage
