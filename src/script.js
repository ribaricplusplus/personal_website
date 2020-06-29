import React from 'react'
import ReactDOM from 'react-dom'
import Footer from './footer.js'
import '../style.css'
import laptopGuy from '../img/laptop-guy.svg'
import emailIcon from '../img/email-icon.svg'
import linkedIn from '../img/linkedin.svg'
import photomathLogo from '../img/PhotoMath_Logo.png'
import geogebraLogo from '../img/geogebra.svg'
import pluginLogo from '../img/plugin.svg'
import githubLogo from '../img/github.svg'
import servicesIcon from '../img/services.svg'
import skillsIcon from '../img/skills.svg'

let breakpoints = []
const BP_LEVEL1 = 600
let breakElements
let tabElemMap

ReactDOM.render(<Website />, document.querySelector('body'))

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
    for (let i = 0; i < tabs.length; ++i) {
      tabElemMap[tabs[i]] = breakElements[i]
    }
  }, [])
  React.useEffect(() => {
    const manageScroll = (e) => {
      breakpoints = []
      const breakElements = document.querySelectorAll('.breakpoint')
      for (const breakElement of breakElements) {
        breakpoints.push(breakElement.offsetTop - 300)
      }
      breakpoints[0] = 0
      if (breakpoints.length < 2) return
      for (let i = 1; i < breakpoints.length; ++i) {
        if (breakpoints[i] > window.scrollY) {
          if (activeTab === tabs[i - 1]) return
          setActiveTab(tabs[i - 1])
          return
        }
        if (i == breakpoints.length - 1 && activeTab !== tabs[i]) {
          setActiveTab(tabs[i])
        }
      }
    }
    document.addEventListener('scroll', manageScroll, { passive: true })
  }, [activeTab])
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
    <div
      onClick={(e) => {
        const elem = tabElemMap[props.text]
        elem.scrollIntoView()
        let rem = getComputedStyle(
          document.querySelector('html')
        ).getPropertyValue('font-size')
        if (rem === '') {
          rem = 16
        } else {
          console.log('Parsing...')
          rem = parseInt(rem)
          console.log('Rem = ', rem)
        }
        window.scrollBy(null, -7 * rem)
      }}
      ref={elemRef}
      className="nav-section"
    >
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
    `Other services involving web technologies`,
  ]
  const skillsList = [
    `Primary technologies: TypeScript, JavaScript, HTML, CSS`,
    `Chrome and Firefox API for browser extensions`,
    `Frameworks: React, MobX, Semantic UI`,
    `Node.js and Express`,
    `Other languages: C, Java, Python, Bash scripts`,
    `Tools: Git, GitHub, webpack, Babel, gulp, Jira, ...`,
    `Looking forward to learning new things! :)`,
  ]
  const cardContents = {
    compiler: {
      title: 'LaTeX transpiler',
      description:
        'Tool built for Photomath that transpiles LaTeX expressions into syntax used by the internal Photomath calculator.',
      technologies: [
        'JavaScript',
        'React',
        'MobX',
        'Webpack',
        'Node.js',
        'Parsing Expression Grammar',
        'peg.js',
      ],
      link: 'projects/transpiler',
    },
    tools: {
      title: 'GeoGebra tools',
      description:
        'Built for Photomath. Application used by graphical artists for creating complex GeoGebra constructions and solving inequalities graphically.',
      technologies: [
        'JavaScript',
        'React',
        'MobX',
        'Semantic UI',
        'GeoGebra API',
        'Webpack',
        'Gulp',
      ],
      link: 'projects/tools',
    },
    extension: {
      title: 'Curious stats',
      description:
        'Extremely simple Chrome extension, created just as proof of concept that I can build and publish extensions.',
      technologies: ['JavaScript', 'Chrome Extension API'],
      link: 'projects/extension',
    },
  }
  return (
    <React.Fragment>
      <div className="main-wrapper breakpoint">
        <div className="initial-screen ">
          <div className="laptop-guy">
            <div className="my-name">Bruno</div>
            <img id="laptop-guy" src={laptopGuy} />
          </div>
          <div className="title-and-description">
            <div className="title"> Web Developer </div>
            <div className="description">
              I create browser extensions and responsive web applications.
            </div>
            <div className="contact-links">
              <div className="contact">
                <img src={emailIcon} className="contact-icon" />
                <div>br.ribaric@gmail.com</div>
              </div>
              <a href="https://www.linkedin.com/in/bruno-r-811430123/">
                <img src={linkedIn} className="contact-icon" />
              </a>
              <a href="https://github.com/ribaricplusplus">
                <img src={githubLogo} className="contact-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="work">
        <h1 className="breakpoint work-samples-title">Work samples</h1>
        <div className="work-cards">
          <WorkSampleCard
            mediaSource={photomathLogo}
            content={cardContents.compiler}
          />
          <WorkSampleCard
            mediaSource={geogebraLogo}
            content={cardContents.tools}
          />
          <WorkSampleCard
            mediaSource={pluginLogo}
            content={cardContents.extension}
          />
        </div>
      </div>
      <div className="skills-and-services breakpoint">
        <DisplayList
          type="services"
          icon={servicesIcon}
          title="Services"
          listItems={servicesList.map((service) => (
            <li>{service}</li>
          ))}
        />
        <DisplayList
          type="skills"
          icon={skillsIcon}
          title="Skills"
          listItems={skillsList.map((skill) => (
            <li>{skill}</li>
          ))}
        />
      </div>
      <Footer />
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
  const technologies = props.content.technologies.map((tech) => (
    <span className="technology">{tech}</span>
  ))
  React.useEffect(() => {
    const resizeHandler = () => {
      setViewportWidth(window.innerWidth)
    }
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])
  const handleClick = () => {
    window.location.pathname = '/' + props.content.link
  }
  const cardVersion = (
    <div onClick={handleClick} className="mdc-card mdc-card--outlined card">
      <div className="mdc-card__media card-picture">
        <img src={props.mediaSource} />
      </div>
      <div className="card-content">
        <h2>{props.content.title}</h2>
        <div>{props.content.description}</div>
        <div className="technologies">{technologies}</div>
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
        <div className="work-row-description">{props.content.description}</div>
      </div>
    </div>
  )
  const Display = viewportWidth > BP_LEVEL1 ? cardVersion : rowVersion
  return Display
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
