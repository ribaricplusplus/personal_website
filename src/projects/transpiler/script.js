import React from 'react'
import ReactDOM from 'react-dom'
import '../common.css'
import Footer from '../../footer.js'
import equation from './img/equation.svg'
import MetaData from '../../metaData.js'
import Title from '../title.js'

ReactDOM.render(<App />, document.querySelector('body'))
// How did I get the idea to do this? What was the problem?
// What did I do?
// What is the outcome?
function App() {
  React.useEffect(() => {
    document.addEventListener('load', () => {
      console.log(document.documentElement.innerHTML)
    })
  }, [])
  return (
    <div>
      <Title title="LaTeX transpiler" />
      <main>
        <MetaData
          data={[
            { title: 'For', contents: 'Photomath' },
            {
              title: 'Year',
              contents: '2020',
            },
            {
              title: 'Technologies',
              contents:
                'JavaScript, Parsing expression grammar, React, MobX, Semantic UI, Peg.js, Babel, Jest, Webpack, Gulp',
            },
          ]}
        />
        <h2>Description</h2>
        <p>
          I first joined <a href="https://www.photomath.net/en/">Photomath</a>{' '}
          as a content creator, solving mathematical problems that were too
          difficult for <em>PM Solver</em>, a Mathematica-like proprietary
          software. PM Solver solves things like mathematical equations, and
          explains step-by-step how it arrived at the solution. For more
          difficult problems, content creators and PM Solver work together.
          Content creators setup the problem and the equations, then pass them
          on to PM Solver, and so Photomath users get a difficult math problem
          solved down to most basic steps. The difficulty was that content
          creators wrote mathematics in{' '}
          <a href="https://en.wikipedia.org/wiki/LaTeX">LaTeX</a>, whereas PM
          Solver has its own syntax, and so other content creators and I had to
          waste a lot of time doing these error-prone syntax conversions.
          Therefore, I wrote a transpiler which takes in LaTeX input, and
          produces PM Solver syntax. Similar to how TypeScript gets converted
          into JavaScript. This made me and other content creators much more
          efficient, though soon after this Photomath moved me to the web
          development team.
        </p>
        <h2>See it in action</h2>
        <p>
          Photomath released a video that shows how a LaTeX expression can
          easily be copied into the PM solver.
        </p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/aIKy3VWFR9o?start=32"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <h2>More complex example</h2>
        <p>
          The LaTeX expression in the video is pretty simple. Consider a more
          complex LaTeX expression:
        </p>
        <div className="code">
          {String.raw`\begin{aligned}
\sin{x}+\cos{y}=\frac{1}{2}\\
\frac{x^2+10x+2}{10y}+y=5
\end{aligned}`}
        </div>
        <p>This is what that expression looks like when rendered:</p>
        <img src={'/' + equation} />
        <p>
          When run through the transpiler, it produces the following PM Solver
          syntax:
        </p>
        <div className="code">
          {String.raw`system(sin(x)+cos(y)={{1}/{2}},{{x^2+10x+2}/{10y}}+y=5)`}
        </div>
        <p>Typing this by hand would not be fun.</p>
      </main>
      <Footer />
    </div>
  )
}
