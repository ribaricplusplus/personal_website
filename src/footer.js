import React from 'react'
import linkedInLogo from '../img/linkedin.svg'
import githubLogo from '../img/github.svg'
import './footer.css'

export default function Footer() {
  return <footer>
        <div className="wrapper">
          <div className="footer-contact">
            <div>Contact:</div>
            <div className="email">br.ribaric@gmail.com</div>
          </div>
          <div className="links">
            <div>Links:</div>
            <div className="links-icons">
              <a href="https://www.linkedin.com/in/bruno-r-811430123/"><img src={'/' + linkedInLogo}/></a>
              <a href="https://github.com/ribaricplusplus"><img src={'/' + githubLogo}/></a>
            </div>
          </div>
          <div className="source-code-website">
            <div><a href="https://github.com/ribaricplusplus/personal_website">Source code of this website</a></div>
          </div>
          <div>
            Icons made by <a href="https://www.flaticon.com/authors/freepik">Freepik</a> and <a href="">Pixel perfect</a> from <a href="https://www.flaticon.com/">flaticon.com</a>
          </div>
        </div>
      </footer>
}
