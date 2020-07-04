import { PDFDocument, StandardFonts, PageSizes } from 'pdf-lib'
import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'

ReactDOM.render(<App/>, document.querySelector('body'))


// Create page and return its contents as URI for iframe
async function createPage(query){
  console.log('Inside magical async function')
  console.log('Query...', query)
  const strippedCategories = query.pages[0].categories.map(category => category.title.substring('Category:'.length, category.length))
  const title = query.pages[0].title
  const doc = await PDFDocument.create()
  const coolFont = await  doc.embedFont(StandardFonts.Helvetica)
  const firstPage = doc.addPage(PageSizes.A4)
  const dimensions = firstPage.getSize()
  const downwards = [2*24, 50, 30]
  const MAX_HEIGHT = dimensions.height-100
  firstPage.moveTo(50, dimensions.height-downwards[0])
  firstPage.drawText('Programmatically generated PDF document\nfor Upwork', {
    size: 24,
    font: coolFont
  })
  firstPage.moveDown(downwards[0])
  firstPage.drawText(`Page title: ${title}`, {
    size: 16,
    font: coolFont
  })
  firstPage.moveDown(downwards[1])
  firstPage.drawText('Categories:', {
    size: 16,
    font: coolFont
  })
  firstPage.moveDown(downwards[2])
  let spentHeight = downwards.reduce((prev, current) => prev + current)
  let index = 0
  while(spentHeight < MAX_HEIGHT && index < strippedCategories.length){
    firstPage.drawText(`${strippedCategories[index++]}`, {
      size: 14,
      font: coolFont
    })
    const DOWN_CONSTANT = 1.5*14
    firstPage.moveDown(DOWN_CONSTANT)
    spentHeight+=DOWN_CONSTANT
  }
  return await doc.saveAsBase64({dataUri: true})
}


function injectPage(page){
  console.log('Received page', page)
  document.querySelector('iframe').src = page
}

// Actually should name it getQuery
async function getCategories(pageUrl){
  const url = new URL(pageUrl)
  if (!url.host.endsWith('wikipedia.org')){
    console.error('URL host does not end with wikipedia.org.', url.host)
    return Promise.reject()
  }
  console.log(url.pathname)
  const title = url.pathname.substring('/wiki/'.length,url.pathname.length)
  console.log('Page title is', title)
  const response = await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=${title}&prop=categories&clshow=!hidden&format=json&formatversion=2`)
  if (!response.ok ||
      typeof response.headers['MediaWiki-Api-Error'] !== 'undefined' ||
      typeof response.warnings !== 'undefined'
     ){
    console.error('An error occurred in the response.', response.headers)
    return Promise.reject()
  }
  const respjson = await response.json()
  console.log('Response', respjson)
  return respjson.query
}

function App(){
  const [urlValue, setUrlValue] = React.useState('https://en.wikipedia.org/wiki/Berlin')
  const runMagic = () => {
    console.log('Running magic')
    getCategories(urlValue)
      .then(createPage)
      .then(injectPage).catch(err => {
      console.log("Something very bad happened", err)
    })
  }
  return (
    <div>
      <h1>Programmatic PDF generator</h1>
      <p>Extract Wikipedia page categories and produce a PDF document showing those categories.
        This page has been created as a quick sample for an Upwork job.
      </p>
      <hr/>
      <div className='page-metadata'>
        <div>Page URL:</div>
        <input type="text" value={urlValue} onChange={(e) => {
          setUrlValue(e.target.value)
        }}/>
        <button onClick={runMagic}>Generate PDF</button>
      </div>
      <div>
        <h3>Other pages to try</h3>
        <ul>
          <li>https://en.wikipedia.org/wiki/Battle_of_Malvern_Hill</li>
          <li>https://en.wikipedia.org/wiki/Lazarus_Chakwera</li>
          <li>https://en.wikipedia.org/wiki/Newland_Oak</li>
        </ul>
      </div>
       <iframe width="600" height="900"></iframe>
    </div>
  )
}
