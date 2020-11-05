import * as React from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaEnvelope, FaPhone, FaPrint } from 'react-icons/fa'


const Header = () => {
  return (
    <header>
      <nav className="top-nav">
        <ul className="menu">
          <Link to="/"><li className="logo">Zane Hitchcox</li></Link>
          <li className="space" />
          <a href="https://github.com/zwhitchcox"><li>
            <FaGithub />
         </li></a>
          <a href="mailto:zwhitchcox@gmail.com"><li>
            <FaEnvelope />
         </li></a>
          <a href="tel:+18652360804"><li>
            <FaPhone />
         </li></a>
          <a onClick={window.print}><li>
            <FaPrint />
         </li></a>
          <Link to="/refs"><li className="item">Refs</li></Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header