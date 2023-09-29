import {Routes , Route} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Home } from './pages/Home'
import { Store } from './pages/Store'
import { About } from './pages/About'
import {Navbar} from './components/Navbar'
import {EditCrud} from './pages/EditCrud'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { Users } from './pages/Users'
import { Products } from './pages/Products'
import AddUser from './pages/AddUser'
import AddProduct from './pages/AddProduct'
import ViewUser from './pages/ViewUser'
import ViewProduct from './pages/ViewProduct'



function App() {
  return (
      <ShoppingCartProvider>
        <Navbar/>
        <Container className='mb-4'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/store' element={<Store/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/editCrud' element={<EditCrud/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/addUser' element={<AddUser/>}/>
            <Route path='/addProduct' element={<AddProduct/>}/>
            <Route path='/update/users/:id' element={<AddUser/>}/>
            <Route path='/update/products/:id' element={<AddProduct/>}/>
            <Route path='/view/users/:id' element={<ViewUser/>}/>
            <Route path='/view/products/:id' element={<ViewProduct/>}/>
          </Routes>
        </Container>
      </ShoppingCartProvider>
    )
}

export default App
