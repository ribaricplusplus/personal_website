import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'

ReactDOM.render(<App/>, document.querySelector('body'))

function App(){
  React.useEffect(() => {
    document.addEventListener('load', () => {
      console.log(document.documentElement.innerHTML)
    })
  }, [])
  return (
    <div>
      <h1>LaTeX transpiler</h1>
      <div>
        <div><div>For:</div><a href="https://www.photomath.net/en/">Photomath</a></div>
        <div><div>Year:</div><div>2020</div></div>
        <div><div>Technologies:</div><div>Technologies will go here</div></div>
      </div>
      <h2>Description</h2>
      <p>When I first joined Photomath... Didn't like it, so I built the transpiler</p>
      <h2>See it in action</h2>
      <p>Photomath released a video that shows how a LaTeX expression can easily be copied into the PM solver.</p>
      <video></video>
      <h2>More complex example</h2>
      <p>The LaTeX expression in the video is pretty simple. Consider a more complex LaTeX expression:</p>
      <div className="latex">
        {String.raw`\begin{aligned}
\sin{x}+\cos{y}=\frac{1}{2}\\
\frac{x^2+10x+2}{10y}+y=5
\end{aligned}`}
      </div>
    </div>
  )
}
