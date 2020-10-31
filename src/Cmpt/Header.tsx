import * as React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <header>
      <nav className="top-nav">
        <ul className="menu">
          <Link to="/"><li className="logo">Zane Hitchcox</li></Link>
          <li className="space" />
          <Link to="/refs"><li className="item">Refs</li></Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header