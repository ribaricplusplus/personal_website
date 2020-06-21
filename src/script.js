import React from 'react'
import ReactDOM from 'react-dom'
import '../index.html'
import '../style.css'

ReactDOM.render(<Website />, document.getElementById('root'))
const breakpoints = []

function Website() {
  React.useEffect(() => {
    const breakElements = document.querySelectorAll('.breakpoint')
    for (const breakElement of breakElements) {
      const rect = breakElement.getBoundingClientRect()
      breakpoints.push(rect.top)
    }
    breakpoints[0] = 0
  }, [])
  return (
    <div>
      <Header />
      <Content />
    </div>
  )
}

function Header() {
  const tabs = ['Top', 'Work', 'Skills & Services']
  const [activeTab, setActiveTab] = React.useState('Top')
  const tabsNodes = tabs.map((text) => (
    <NavSection text={text} active={text === activeTab} key={text} />
  ))
  return <div className="header">{tabsNodes}</div>
}

function NavSection(props) {
  const elemRef = React.useRef(null)
  React.useEffect(() => {
    if (props.active && elemRef.current) {
      elemRef.current.classList.add('nav-section-active')
    } else if (!props.active && elemRef.current) {
      elemRef.current.classList.remove('nav-section-active')
    }
  }, [props.active])
  return (
    <div ref={elemRef} className="nav-section">
      {props.text}
    </div>
  )
}

function Content() {
  return (
    <React.Fragment>
      <div className="initial-screen">
        <div className="laptop-guy">
          <div className="my-name">Bruno</div>
          <img src="img/laptop-guy.svg" />
        </div>
        <div className="title-and-description">
          <div className="title"> Web Developer </div>
          <div className="description">
            I create browser extensions and responsive web applications.
          </div>
          <div className="contact">
            <img src="img/email-icon.svg" width="32" height="32" />
            <div>br.ribaric@gmail.com</div>
          </div>
        </div>
      </div>
      <div className="work">
      <h1>Work samples</h1>
      <div className="work-cards">
        <WorkSampleCard
          mediaSource="img/PhotoMath_Logo.png"
          content={`Card information`}
      />
      <WorkSampleCard mediaSource="img/PhotoMath_Logo.png"
    content={`Card information`}/>
      <WorkSampleCard mediaSource="img/PhotoMath_Logo.png" content={`Card information`} />
      </div>
      </div>
      <div className="skills-and-services">

      </div>
    </React.Fragment>
  )
}

/**
 * @param {Object} props
 * @property {string} props.mediaSource
 * @property {string} props.content
 */
function WorkSampleCard(props) {
  return (
    <div className="mdc-card mdc-card--outlined card">
      <div className="mdc-card__media card-picture">
        <img src={props.mediaSource} />
      </div>
      <div className="card-content">{props.content}</div>
    </div>
  )
}

/**
 * @param {Object} props
 * @property {string} props.type
 * @property {string} props.icon
 * @property {string} props.title
 * @property {React.Node} props.listItems
 */
function DisplayList(props){
  return (
      <div className={props.type}>
      <div className="icon-heading">
      <img src={props.icon} />
      <h2>{props.title}</h2>
      </div>
      <ul>
      {props.listItems}
      </ul>
      </div>
  )
}
