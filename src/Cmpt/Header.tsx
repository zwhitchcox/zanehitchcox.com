import * as React from 'react'
import { FaGithub, FaEnvelope, FaPhone, FaPrint, FaBook, FaBars, FaMoon } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { toggleDarkMode } from '../store/store'

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
    link: "#print", // eslint-disable-line
    icon: <FaPrint />,
    text: "Print",
  },
]


const Header = () => {
  const [menuOpen, setMenuOpen] = React.useState<Boolean>(false);
  const toggleMenu = () => setMenuOpen(!menuOpen)
  const dispatch = useDispatch();
  const darkMode = useSelector((state: any) => state.darkMode.on);

  return (
    <header>
      <nav className={`top-nav ${darkMode ? "top-nav-dark" : ""}`}>
        <div className="logo">Zane Hitchcox</div>
        <div className={`nav-links ${menuOpen ? "" : "hide"}`}>
          {
            menuItems.map(({link, icon, text}) => (
              <a href={link} key={link} onClick={link === "#print" ? window.print : undefined}>
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
          <span className="link" onClick={() => dispatch(toggleDarkMode)}>
            <div className="nav-item">
              <div className="nav-icon">
                <FaMoon />
              </div>
              <div className="nav-text">
                Dark Mode
              </div>
            </div>
          </span>
        </div>
        <div className="bars" onClick={toggleMenu}>
          <FaBars />
        </div>
      </nav>
    </header>
  )
}

export default Header