import axios from 'axios'
import { useState, useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

function EditProduct() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    await axios.get(`http://localhost:8000/api/products/${id}`).then(({ data }) => {
      const { title, description } = data.product;
      setTitle(title);
      setDescription(description);
    }).catch(({ response: { data } }) => {
      Swal.fire({
        text: data.message,
        icon: "error"
      })
    })
  }

  const updateProduct = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('_method', 'PATCH');
    formData.append('title', title);
    formData.append('description', description);
    if (image != null) {
      formData.append('image', image);
    }

    await axios.post(`http://localhost:8000/api/products/${id}`, formData).then(({ data }) => {
      Swal.fire({
        icon: 'success',
        text: data.message
      })
      navigate('/')
    }).catch(({ response }) => {
      if (response.status === 422) {
        setValidationError(response.data.error)
      } else {
        Swal.fire({
          text: response.data.message,
          icon: 'error'
        })
      }
    })
  }

  const changeHandler = (event) => {
    setImage(event.target.files[0]);
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title"> Update Product</h4>
              <hr />
              <div className="form-wrapper">
                {Object.keys(validationError).length > 0 && (
                  <div className="row">
                    <div className="col-12">
                      <div className="alert alert-danger">
                        <ul className="mb-0">
                          {Object.entries(validationError).map(([key, value]) => (
                            <li key={key}>{value}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                <form onSubmit={updateProduct}>
                  <Row>
                    <Col>
                      <Form.Group controlId='Name'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' value={title} onChange={(event) => { setTitle(event.target.value) }} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId='Name'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(event) => { setDescription(event.target.value) }} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId='Name'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={changeHandler} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant='primary' className='mt-3' size='lg' block="block" type="submit" >
                    save
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default EditProduct