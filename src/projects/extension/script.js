import React from 'react'
import ReactDOM from 'react-dom'
import MetaData from '../../metaData.js'
import Footer from '../../footer.js'
import Title from '../title.js'
import '../common.css'

ReactDOM.render(<App/>, document.querySelector('body'))

function App(){
  return (
    <div>
      <Title title='Curious stats'/>
      <main>
        <MetaData 
          data={[
            {
              title: 'Year',
              contents: '2020'
            },
            {
              title: 'Technologies',
              contents: 'JavaScript, Chrome Extension API'
            }
          ]}
        />
        <h2>Description</h2>
        <p>Curious stats is an extremely simple extension built in an hour or two, just as proof of concept that I can build and publish extensions.
          It displays some of the data that a website that you are currently visting is seeing about you, such as your geographical location.
        </p>
        <h2>See it in action</h2>
        <p>The extension is available on the chrome web store. <a href="https://chrome.google.com/webstore/detail/curious-stats/dkkibbeiiofjaefpbhbppdihiijojlaa">Feel free to try it out.</a>
        </p>
        <h2>Source code</h2>
        <p>The source code is <a href="https://github.com/ribaricplusplus/curious-stats">available on GitHub.</a></p>
      </main>
      <Footer />
    </div>
  )
}
