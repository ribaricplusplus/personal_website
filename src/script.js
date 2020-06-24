import React from 'react'
import ReactDOM from 'react-dom'
import '../index.html'
import '../style.css'

let breakpoints = []
const BP_LEVEL1 = 600
let breakElements
let tabElemMap

ReactDOM.render(<Website />, document.getElementById('root'))

function Website() {
  return (
    <div>
      <Header />
      <Content />
    </div>
  )
}

function Header() {
  const tabs = ['Top', 'Work', 'Skills & Services']
  const [activeTab, setActiveTab] = React.useState(tabs[0])
  React.useEffect(() => {
    const breakElements = document.querySelectorAll('.breakpoint')
    tabElemMap = {}
    for (let i = 0; i<tabs.length; ++i){
      tabElemMap[tabs[i]] = breakElements[i]
    }
  }, [])
  React.useEffect(() => {
    const manageScroll = (e) => {
      breakpoints = []
      const breakElements = document.querySelectorAll('.breakpoint')
      for (const breakElement of breakElements) {
        breakpoints.push(breakElement.offsetTop-300)
      }
      breakpoints[0] = 0
      if (breakpoints.length < 2) return
      for(let i = 1; i < breakpoints.length ; ++i){
        if (breakpoints[i] > window.scrollY){
          if (activeTab === tabs[i-1]) return
          setActiveTab(tabs[i-1])
          return
        }
        if (i == breakpoints.length-1 && activeTab !== tabs[i]) {
          setActiveTab(tabs[i])
        }
      }
    }
    document.addEventListener("scroll", manageScroll , {passive: true})
  }, [activeTab])
  const tabsNodes = tabs.map((text) => (
    <NavSection  text={text} active={text === activeTab} key={text} />
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
    <div onClick={(e) => {
      const elem = tabElemMap[props.text]
      elem.scrollIntoView()
    }} ref={elemRef} className="nav-section">
      {props.text}
    </div>
  )
}

function Content() {
  React.useEffect(() => {
    const laptopGuy = document.querySelector('.laptop-guy img')
    const laptopRect = laptopGuy.getBoundingClientRect()
  }, [])
  const servicesList = [
    `Front end development of responsive websites`,
    `Custom Chrome and Firefox browser extensions`,
    `Fixing, improving, and maintaining existing websites`,
    `Back-end work with Node.js`,
    `Other services involving web technologies`
  ]
  const skillsList = [
    `Primary technologies: TypeScript, JavaScript, HTML, CSS`,
    `Chrome and Firefox API for browser extensions`,
    `Frameworks: React, MobX, Semantic UI`,
    `Node.js and Express`,
    `Other languages: C, Java, Python, Bash scripts`,
    `Tools: Git, GitHub, webpack, Babel, gulp, Jira, ...`,
    `Looking forward to learning new things! :)`
  ]
  const cardContents = {
    compiler: {
      title: "LaTeX transpiler",
      description: "Tool built for Photomath that transpiles LaTeX expressions into syntax used by the internal Photomath calculator.",
      technologies: ['JavaScript', 'React', 'MobX', 'Webpack', 'Node.js', 'Parsing Expression Grammar', 'peg.js']
    },
    tools: {
      title: "GeoGebra tools",
      description: "Built for Photomath. Application used by graphical artists for creating complex GeoGebra constructions and solving inequalities graphically.",
      technologies: ['JavaScript', 'React', 'MobX', 'Semantic UI', 'GeoGebra API', 'Webpack', 'Gulp']
    },
    extension: {
      title: "Wikipedia extended",
      description: "Cross-browser extension that shows free online courses, books, and other material related to a Wikipedia page that a user is reading.",
      technologies: ['JavaScript', 'Chrome/Firefox/Opera API', 'Coursera/edX API', 'Wikipedia API']
    }
  }
  return (
    <React.Fragment>
      <div className="main-wrapper breakpoint">
        <div className="initial-screen ">
          <div className="laptop-guy">
            <div className="my-name">Bruno</div>
            <img id="laptop-guy" src="img/laptop-guy.svg" />
          </div>
          <div className="title-and-description">
            <div className="title"> Web Developer </div>
            <div className="description">
              I create browser extensions and responsive web applications.
            </div>
            <div className="contact-links">
              <div className="contact">
                <img src="img/email-icon.svg" className='contact-icon'/>
                <div>br.ribaric@gmail.com</div>
              </div>
              <img src="img/linkedin.svg" className="contact-icon" />
              <img src="img/github.svg" className="contact-icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="work">
        <h1 className="breakpoint work-samples-title">Work samples</h1>
        <div className="work-cards">
          <WorkSampleCard
            mediaSource="img/PhotoMath_Logo.png"
            content={cardContents.compiler}
          />
          <WorkSampleCard
            mediaSource="img/geogebra.svg"
            content={cardContents.tools}
          />
          <WorkSampleCard
            mediaSource="img/plugin.svg"
            content={cardContents.extension}
          />
        </div>
      </div>
      <div className="skills-and-services breakpoint">
        <DisplayList type="services" icon="img/services.svg" title="Services"
                     listItems={servicesList.map(service => <li>{service}</li>)}/>
        <DisplayList type="skills" icon="img/skills.svg" title="Skills"
                     listItems={skillsList.map(skill => <li>{skill}</li>)}/>
      </div>
      <footer>
        <div className="links">
          <div>Links:</div>
          <div className="links-icons">
            <img src="img/linkedin.svg"/>
            <img src="img/github.svg"/>
          </div>
          <div>
            Icons made by <a href="https://www.flaticon.com/authors/freepik">Freepik</a> and <a href="">Pixel perfect</a> from <a href="https://www.flaticon.com/">flaticon.com</a>
          </div>
        </div>
      </footer>
    </React.Fragment>
  )
}

/**
 * @param {Object} props
 * @property {string} props.mediaSource
 * @property {Object} props.content
 * @property {string} props.content.title
 * @property {string} props.content.description
 * @property {Array} props.content.technologies
 */
function WorkSampleCard(props) {
  const [viewportWidth, setViewportWidth] = React.useState(window.innerWidth)
  React.useEffect(() => {
    const resizeHandler = () => {
      setViewportWidth(window.innerWidth)
    }
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])
  const cardVersion = (
    <div className="mdc-card mdc-card--outlined card">
      <div className="mdc-card__media card-picture">
        <img src={props.mediaSource} />
      </div>
      <div className="card-content">
        <h2>{props.content.title}</h2>
        <div>{props.content.description}</div>
        <div>Technologies will go here</div>
      </div>
    </div>
  )
  const rowVersion = (
    <div className="work-row">
      <div className="work-row-media">
        <img src={props.mediaSource} />
      </div>
      <div className="work-row-content">
        <h2>{props.content.title}</h2>
        <div className="work-row-description">
          {props.content.description}
        </div>
      </div>
    </div>
  )
  const Display = viewportWidth > BP_LEVEL1 ? cardVersion : rowVersion
  return (
    Display
  )
}

/**
 * @param {Object} props
 * @property {string} props.type
 * @property {string} props.icon
 * @property {string} props.title
 * @property {React.Node} props.listItems
 */
function DisplayList(props) {
  return (
    <div className={props.type}>
      <div className="icon-heading">
        <img src={props.icon} />
        <h1>{props.title}</h1>
      </div>
      <ul className="skills-list-items">{props.listItems}</ul>
    </div>
  )
}
