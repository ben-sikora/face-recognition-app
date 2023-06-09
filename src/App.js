import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import About from "./components/About/About";
import { Component } from "react";

const initialState = {
  input: "",
  imageURL: "",
  box: {},
  route: "about",
  isSignedin: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joind,
      },
    });
  };
  /*
  componentDidMount(){
    fetch('http://localhost:3000').then(response => {return response.json()}).then(data=> console.log(data)); 
  }*/

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  onSubmit = () => {
    this.setState({ imageURL: this.state.input });
    fetch("https://face-rec-backend-s79y.onrender.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response && this.state.route !== 'about') {
          console.log('GOING HERE')
          fetch("https://face-rec-backend-s79y.onrender.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onRouteChange = (route) => {
    if (route !== 'home') {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedin: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Navigation
          isSignedIn={this.state.isSignedin}
          onRouteChange={this.onRouteChange}
        />
        <Logo onRouteChange={this.onRouteChange}/>
        {this.state.route === "home" ? (
          <div>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageURL={this.state.imageURL}
              input={this.state.input}
            />
          </div>
        ) : this.state.route === "register" ? (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        ) : this.state.route === "about" ? (
          <div>
            <About />
            <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onSubmit}
                input={this.state.input}
              />
              <FaceRecognition
                box={this.state.box}
                imageURL={this.state.imageURL}
              />
          </div>
        ) : (
          <div>
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
