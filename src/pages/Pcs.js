import React, {Component} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default class Pcs extends Component {

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
    };
  }
  componentDidMount = () => {
    axios.get("/all/pc").then(response => {
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

  handleInputMath = e => {
    axios.get("/get/math/na/" +e.target.value)
    .then(response =>{
      this.setState({
        math: response.data[0].id
      }
      );
      
    })
  };

  handleInputMemory = e => {
    axios.get("/get/memory/na/" +e.target.value)
    .then(response =>{

      this.setState({
        memory: response.data[0].id
      });
    })
  };

  handleImage = e => {
    alert(e.target.value)
    let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];

        this.setState({
            image_preview: image_as_base64,
            image_file: image_as_files,
        })
  };

  handleSubmit = async () => {
    const pc = {id_math: this.state.math, id_fast_memory: this.state.memory}
    const im = {id_math: this.state.math, id_fast_memory: this.state.memory}
    alert(this.state.math)
    console.log(pc)
    try {
      const response = await axios.post('/add/pc', {id_math: this.state.math, id_fast_memory: this.state.memory});
      console.log(response.data);
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
            <th>id_math</th>
            <th>id_fast_memory</th>
          </tr>
          </thead>
          <tbody>
          {this.state.data.map(item => (
            <tr>
              <td key={item.id}>{item.id}</td>
              <td key={item.id}>{item.id_math}</td>
              <td key={item.id}>{item.id_fast_memory}</td>
            </tr>
          )
          )}
          </tbody>
          </Table>
        {/* мать */}
        <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3">
        <Form.Text className="text-muted">
          Matherboard
        </Form.Text>
        <Form.Select onChange={this.handleInputMath} name="math">
          {this.state.maths.map(item => (
            <option key={item.id}>{item.name}</option>
          )
          )}
        </Form.Select>
        </Form.Group>

        {/* оперативка */}
        <Form.Group className="mb-3">
        <Form.Text className="text-muted">
          Matherboard
        </Form.Text>
        <Form.Select onChange={this.handleInputMemory} name="memory">
          {this.state.memories.map(item => (
            <option key={item.id}>{item.name}</option>
          )
          )}
        </Form.Select>
        </Form.Group>
        <Form.Group onChange={this.handleImage} name="image">
          <Form.Control type="file" label="select photo"/>
        </Form.Group>

        <Button variant="primary" type="submit">
          add
        </Button>
      </Form>
      </div>
    );
  }
}