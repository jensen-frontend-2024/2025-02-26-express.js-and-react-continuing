import { NavLink } from 'react-router-dom';
import { links } from '../data/links';

export function Navbar() {
  return (
    <header className="navbar">
      <nav className="links">
        {links.map((link) => (
          <NavLink key={link.id} to={link.to}>
            {link.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
