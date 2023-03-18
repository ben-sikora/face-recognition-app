import './App.css';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from "./components/Rank/Rank";
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ParticlesBg from 'particles-bg';
import { Component } from 'react';

const app = new Clarifai.App({
  apiKey: '208d9f9bcdcb488db579bd94cb05e194'
 });

class App extends Component {

  constructor(){
    super(); 
    this.state={
      input: '',
      imageURL: '', 
      box:{},
      route: 'signin', 
      isSignedin: false, 
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }

    }

  }

  loadUser= (data) =>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joind
    }}); 
  }
  /*
  componentDidMount(){
    fetch('http://localhost:3000').then(response => {return response.json()}).then(data=> console.log(data)); 
  }*/

  onInputChange=(event)=>{
    this.setState({input: event.target.value})
  }

  calculateFaceLocation = (data) =>{
    const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box
    const image= document.getElementById('inputimage');
    const width= Number(image.width)
    const height= Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height, 
      rightCol: width - (clarifaiFace.right_col * width), 
      bottomRow: height- (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox= (box) =>{
    console.log(box);
    this.setState({box: box})
  }



  onSubmit= () =>{
    console.log('click')
    this.setState({imageURL: this.state.input})
    app.models.predict({
      id: 'face-detection',
      name: 'face-detection',
      version: '6dc7e46bc9124c5c8824be4822abe105',
      type: 'visual-detector',
    }, this.state.input).then( response => {
          if(response){
            fetch('http://localhost:3000/image',{
              method: 'put', 
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response=> response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
          }); 
          }
          this.displayFaceBox(this.calculateFaceLocation(response));

        }).catch( err => {
          console.log(err)
        });

    {/*
    app.models
      .predict(
        {
          id: 'face-detection',
          name: 'face-detection',
          version: '6dc7e46bc9124c5c8824be4822abe105',
          type: 'visual-detector',
        }, this.state.input)
      .then(response => {
        console.log('hi', response)
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
    .catch(err => console.log(err));*/}
  }

  onRouteChange= (route) =>{
    if(route=== 'signout'){
      this.setState({isSignedin: false});
    } else if(route=== 'home'){
      this.setState({isSignedin: true});
    }
    this.setState({route: route});
  }

  render(){
  return (
      <div className="App">
          <Navigation isSignedIn= {this.state.isSignedin} 
          onRouteChange={this.onRouteChange}/>
          {this.state.route === 'home' ?
                <div>
                  <Logo />
                  <Rank name= {this.state.user.name} entries= {this.state.user.entries}/>
                  <ImageLinkForm 
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onSubmit}/>
                  <FaceRecognition box={this.state.box} imageURL= {this.state.imageURL}/>
              </div>
            :(this.state.route === 'register' ?
              <Register loadUser= {this.loadUser} onRouteChange={this.onRouteChange}/>
              :
              <SignIn loadUser= {this.loadUser} onRouteChange={this.onRouteChange}/>
            )
          }
          <ParticlesBg type="circle" bg={true} />

      </div>
    );
  }
}

export default App;
