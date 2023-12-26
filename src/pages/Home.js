import React, {Component} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

export default class Home extends Component {

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
      token : {
        mather: "0",
        fast_Memory: "0",
        video: "0",
        price_1: 0,
        price_2: 999999999
      },
      isGoing : true
    };
  }
  componentDidMount = () => {
    axios.post("/get_pc", this.state.token).then(response => {
      this.setState({
        data: response.data
      });
    });

    // axios.get("/all/math").then(response => {
    //   this.setState({
    //     maths: response.data
    //   });
    // });
    // axios.get("/all/memory").then(response => {
    //   this.setState({
    //     memories: response.data
    //   });
    // });
  };

//   handleInputMath = e => {
//     axios.get("/get/math/na/" +e.target.value)
//     .then(response =>{
//       this.setState({
//         math: response.data[0].id
//       }
//       );
      
//     })
//   };

  handleInputMath = e => {
    const newToken = {fast_Memory: this.state.token.fast_Memory, mather: e.target.value, video: this.state.token.video,
                    price_1: this.state.token.price_1,
                    price_2: this.state.token.price_2
  };
    this.setState({ token: newToken }, () => {
        axios.post("/get_pc", this.state.token).then(response => {
            this.setState({ data: response.data });
        });
    });
  };

  handleInputMemory = e => {
    const newToken = {mather: this.state.token.mather, fast_Memory: e.target.value, video: this.state.token.video,
                    price_1: this.state.token.price_1,
                    price_2: this.state.token.price_2
  };
    this.setState({ token: newToken }, () => {
        axios.post("/get_pc", this.state.token).then(response => {
            this.setState({ data: response.data });
        });
    });
};

handleInputGraphics = e => {
  const newToken = {mather: this.state.token.mather, fast_Memory: this.state.token.fast_Memory, video: e.target.value,
                    price_1: this.state.token.price_1,
                    price_2: this.state.token.price_2
  };
  this.setState({ token: newToken }, () => {
      axios.post("/get_pc", this.state.token).then(response => {
          this.setState({ data: response.data });
      });
  });
  };

  handleInputPrice_1 = e => {
  const newToken = {mather: this.state.token.mather, fast_Memory: this.state.token.fast_Memory, video: this.state.token.video,
                    price_1: e.target.value,
                    price_2: this.state.token.price_2};
  this.setState({ token: newToken }, () => {
      axios.post("/get_pc", this.state.token).then(response => {
          this.setState({ data: response.data });
      });
  });
  };

  handleInputPrice_2 = e => {
    const newToken = {mather: this.state.token.mather, fast_Memory: this.state.token.fast_Memory, video: this.state.token.video,
      price_1: this.state.token.price_1,
      price_2: e.target.value};
    this.setState({ token: newToken }, () => {
        axios.post("/get_pc", this.state.token).then(response => {
            this.setState({ data: response.data });
        });
    });
    };

//   handleImage = e => {
//     alert(e.target.value)
//     let image_as_base64 = URL.createObjectURL(e.target.files[0])
//         let image_as_files = e.target.files[0];

//         this.setState({
//             image_preview: image_as_base64,
//             image_file: image_as_files,
//         })
//   };

//   handleSubmit = async () => {
//     const pc = {id_math: this.state.math, id_fast_memory: this.state.memory}
//     const im = {id_math: this.state.math, id_fast_memory: this.state.memory}
//     console.log(pc)
//     try {
//       const response = await axios.post('/add/pc', {id_math: this.state.math, id_fast_memory: this.state.memory});
//       const response2 = axios.post("/add/image", im)
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

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
                <th style={{width: "90px"}}>
                    <Form.Control style={{width: "100%"}} type="text" />
                </th>
                <th style={{width: "90px"}}>
                    <Form.Control name="a" onChange={this.handleInputMath} style={{width: "100%"}} type="text" />
                </th>

                <th  style={{width: "90px"}}>
                    <Form.Control name="s" onChange={this.handleInputMemory} style={{width: "100%"}} type="text" />
                </th>

                <th  style={{width: "90px"}}>
                    <Form.Control name="s" onChange={this.handleInputGraphics} style={{width: "100%"}} type="text" />
                </th>

                <th  style={{width: "90px"}}>
                    <Form.Control name="s" onChange={this.handleInputPrice_1} style={{width: "100%"}} type="text" />
                    <Form.Control name="s" onChange={this.handleInputPrice_2} style={{width: "100%"}} type="text" />
                </th>
            </tr>
            <tr>
            <th>id</th>
            <th>name math</th>
            <th>name fast_memory</th>
            <th>name video</th>
            <th>price</th>
          </tr>
          </thead>
          <tbody>
          {this.state.data.map(item => (
            <tr>
              <td key={item.id}>{item.id}</td>
              <td key={item.id}>{item.mather}</td>
              <td key={item.id}>{item.fast_Memory}</td>
              <td key={item.id}>{item.video}</td>
              <td key={item.id}>{item.price}</td>
            </tr>
          )
          )}
          </tbody>
          </Table>
        </div>
    );
  }
}