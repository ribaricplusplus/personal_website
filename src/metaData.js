import React from 'react'
import './metaData.css'

/**
 * [{title, contents}, {title, contents}]
 * @param {Array} props.data
 */
export default function MetaData(props) {
  const items = props.data.map((entry) => (
    <div className="meta-data">
      <div>{entry.title}</div>
      <div>{entry.contents}</div>
    </div>
  ))
  return <div className="project-info">{items}</div>
}
