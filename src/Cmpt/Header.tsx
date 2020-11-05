import * as React from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaEnvelope, FaPhone, FaPrint, FaBook, FaBars } from 'react-icons/fa'

const menuItems = [
  {
    link: "mailto:zwhitchcox@gmail.com",
    icon: <FaEnvelope />,
    text: "zwhitchcox@gmail.com",
  },
  {
    link: "tel:+18652360804",
    icon: <FaPhone />,
    text: "(865) 236-0804",
  },
  {
    link: "https://github.com/zwhitchcox",
    icon: <FaGithub />,
    text: "Github",
  },
  {
    link: "javascript:window.print()",
    icon: <FaPrint />,
    text: "Print",
  },
  {
    link: "https://github.com/zwhitchcox?tab=repositories&q=ref-&type=&language=",
    icon: <FaBook />,
    text: "Refs",
  }
]


const Header = () => {
  const [showMenu, setShowMenu] = React.useState(false)
  const toggleShowMenu = () => setShowMenu(!showMenu)

  return (
    <header>
      <nav className="top-nav">
        <Link to="/"><div className="logo">Zane Hitchcox</div></Link>
        <div className={`nav-links ${showMenu ? "" : "hide"}`}>
          {
            menuItems.map(({link, icon, text}) => (
              <a href={link} key={link}>
                <div className="nav-item">
                  <div className="nav-icon">
                  {icon}
                  </div>
                  <div className="nav-text">
                    {text}
                  </div>
                </div>
              </a>
            ))
          }
        </div>
        <div className="bars" onClick={toggleShowMenu}>
          <FaBars />
        </div>
      </nav>
    </header>
  )
}

export default Header