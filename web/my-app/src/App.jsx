
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';

function App() {
  return (
    <Router>
      <Navbar bg="primary">
        <Container>
          <Link to={"/"} className="navbar-brand text-white">
            React & Laravel CRUD APP
          </Link>
        </Container>
      </Navbar>

      <Container className='mt-5'>
        <Row>
          <Col md={12}>
            <Routes>
              <Route exact path="/" element={<ProductList />} />
              <Route path="/product/create" element={<CreateProduct />} />
              <Route path="/product/update/:id" element={<EditProduct />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  )
}

export default App