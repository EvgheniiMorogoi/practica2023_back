import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export function EditCrud() {
  return (
    <div>
      <h1>Users / Products</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/users">
              <Button variant="primary" className='me-auto mt-3'>Users</Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/products">
              <Button variant="primary" className='me-auto mt-3'>Products</Button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
