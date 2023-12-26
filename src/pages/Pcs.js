import React, {Component} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class Pcs extends Component {

  constructor(){
    super();
    this.state = {
      data : [],
      maths : [],
      memories : [],
      math : 0,
      memory : 0,
      image : {},
      video : 0, 
      videos : [],
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
    axios.get("/all/video").then(response => {
      this.setState({
        videos: response.data
      });
    });
  };

  handleInputMath = e => {
    axios.get("/get/math/na/" +e.target.value)
    .then(response =>{
      this.setState({
        math: response.data
      });}
    )
    // this.forceUpdate();
  };

  handleInputMemory = e => {
    axios.get("/get/memory/na/" +e.target.value)
    .then(response =>{
      this.setState({
        memory: response.data
      });
    })
  };

  handleInputVideo = e => {
    axios.get("/get/video/na/" +e.target.value)
    .then(response =>{
      this.setState({
        video: response.data
      });
    })
  };

  handleSubmit = () => {
    const pc = {id_math: this.state.math, id_fast_memory: this.state.memory, id_graphics: this.state.video};
    axios.post('/add/pc', pc).then((response) => {
      console.log(response.status, response.data.token);
    });
    alert("успех");
    // this.forceUpdate();
    // this.forceUpdate();
      // Handle success, update state, or notify the user
    // } catch (error) {
    //   // Handle error, show an error message to the user
    // }
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
            <th>id_graphics</th>
          </tr>
          </thead>
          <tbody>
          {this.state.data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.id_math}</td>
              <td>{item.id_fast_memory}</td>
              <td>{item.id_graphics}</td>
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
          Memory
        </Form.Text>
        <Form.Select onChange={this.handleInputMemory} name="memory">
          {this.state.memories.map(item => (
            <option key={item.id}>{item.name}</option>
          )
          )}
        </Form.Select>
        </Form.Group>
        <Form.Group>
        <Form.Text className="text-muted">
          Videocard
        </Form.Text>
        <Form.Select onChange={this.handleInputVideo} name="video">
          {this.state.videos.map(item => (
            <option key={item.id}>{item.name}</option>
          )
          )}
        </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          add
        </Button>
      </Form>
      </div>
    );
  }
}