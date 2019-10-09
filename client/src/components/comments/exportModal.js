import React, { Component } from 'react';

class ExportModal extends Component {

  transExport = () => {
    const {comments, url} = this.props;
    let longText = '';
    comments.forEach(comment => {
      longText += `
        [${comment.time}](${url}&t=${comment.time}s)
        ${comment.content}`
    })
    console.log(longText)
    return longText;
  }

  componentDidMount() {
    this.transExport()
  }

  render() {
    return(
      <textarea name='content' />

    )
  }
}

export default ExportModal;