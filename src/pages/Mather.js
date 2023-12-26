import React, {Component} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class Mather extends Component {

  constructor(){
    super();
    this.state = {
      data : [],
      maths : [],
      memories : [],
      math : 0,
      memory : 0,
      id : null,
      image : {},
      token : {},
      name: "0",
      speed : "0",
      form_fact : "0",
      price : 0,
      ram : 0,
      socket: "0"
    };
  }
  componentDidMount = () => {
    axios.get("/all/math").then(response => {
      this.setState({
        data: response.data
      });
    });
    axios.get("/all/math").then(response => {
      this.setState({
        maths: response.data
      });
    });
    axios.get("/all/memory").then(response => {
      this.setState({
        memories: response.data
      });
    });
  };

  handleInputName = e => {
    const tar = e.target
    const m = tar.name;
    const value = tar.type === 'checkbox' ? tar.checked : tar.value;
    this.setState({
      [m]: value
    }
    );
  };



  handleSubmit = () => {
    const pc = {name: this.state.name, socket: this.state.socket,
                form_fact: this.state.form_fact, price: parseInt(this.state.price)
                , speed: this.state.speed}

    try {
      const response = axios.post('/add/math', pc);
      console.log(response.data);
      alert("успех")
    } catch (error) {
      console.error(error);
    }
  };

  render(){
    // {console.log(this.state.data)}
    const mystyle = {
      position: "relative",
      top: "80px",
      left: "10px"
    };
    return (
      <div style={mystyle}>
        <Table striped bordered hover>
          <thead>
            <tr>
            <th>id</th>
            <th>name</th>
            <th>socket</th>
            <th>form_fact</th>
            <th>price</th>
          </tr>
          </thead>
          <tbody>
          {this.state.data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.socket}</td>
              <td>{item.form_fact}</td>
              <td>{item.price}</td>
            </tr>
          )
          )}
          </tbody>
          </Table>
        {/* мать */}
        
        <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3">
        <Form.Text className="text-muted">
          Name
        </Form.Text>
        <Form.Control name="name" style={{width: "150px"}} onChange={this.handleInputName}>
          
        </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Text className="text-muted">
          socket
        </Form.Text>
        <Form.Control name="socket" style={{width: "150px"}} onChange={this.handleInputName}>
          
        </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Text className="text-muted">
          form_fact
        </Form.Text>
        <Form.Control name="form_fact" style={{width: "150px"}} onChange={this.handleInputName}>
          
        </Form.Control>
        </Form.Group>
            
        <Form.Group className="mb-3">
        <Form.Text className="text-muted">
          price
        </Form.Text>
        <Form.Control name="price" style={{width: "150px"}} onChange={this.handleInputName}>
          
        </Form.Control>
        </Form.Group>
        
        
        <Button variant="primary" type="submit">
          add
        </Button>
      </Form>
      </div>
    );
  }
}