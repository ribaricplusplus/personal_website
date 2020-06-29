import React from 'react'
import ReactDOM from 'react-dom'
import MetaData from '../../metaData.js'
import Footer from '../../footer.js'
import Title from '../title.js'
import '../common.css'

ReactDOM.render(<App />, document.querySelector('body'))

function App() {
  return (
    <div>
      <Title title="GeoGebra tools" />
      <main>
        <MetaData
          data={[
            {
              title: 'For',
              contents: 'Photomath',
            },
            {
              title: 'Year',
              contents: '2020',
            },
            {
              title: 'Technologies',
              contents:
                'JavaScript, GeoGebra API, React(with utils such as React Router), Semantic UI, MobX, Webpack, Jest, Babel, Gulp',
            },
          ]}
        />
        <h2>Description</h2>
        <p>
          GeoGebra has its fair share of restrictions, which{' '}
          <a href="https://www.photomath.net/en/">Photomath</a> graph artists
          often have to work around. One of these restrictions is the inability
          to draw numberlines: doing that manually takes a lot of time and
          effort.
        </p>
        <p>
          GeoGebra tools is an application that embeds GeoGebra and allows graph
          artists to draw numberlines and solve inequalities graphically. It
          also configures everything properly so that graph artists need not do
          any special GeoGebra manipulations to present the solution to the
          users of Photomath.
        </p>
        <h2>See it in action</h2>
        <p>
          Everything you can see in this video was created by me: the user
          interface and the underlying logic that draws numberlines, solves
          inequalities graphically, creates breakpoints, etc. Unfortunately, due
          to GeoGebra security issues, this software has to be downloaded
          locally as you can see in the video.
        </p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/POVXkMinc-c"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </main>
      <Footer />
    </div>
  )
}
