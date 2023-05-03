import React from "react";

class Register extends React.Component {
  constructor(props){
    super(); 
    this.state={
      email: '', 
      password: '', 
      name: '',
      error: false
    }

  }

  onEmailChange= (event) => {
    this.setState({email: event.target.value}); 
  }

  onPasswordChange= (event) => {
    this.setState({password: event.target.value}); 
  }

  onNameChange= (event) => {
    this.setState({name: event.target.value}); 
  }

  onSubmitSignIn= () =>{
    fetch('http://localhost:3000/register', {
      method: 'post', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    }).then(response => response.json()).then(user => {
      if(user.id){
        this.props.loadUser(user); 
        this.props.onRouteChange('home'); 
      }
      return; 
    }).catch((err)=> {
      console.log(err)
      this.setState({error: true})
    });
  }
  render(){
    const {onRouteChange}= this.props; 
    return (
      <article className="br3 ba b--black-130 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="mt4 mb4 black-80 w5">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bw1 b--black bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange= {this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bw1 b--black bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange= {this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bw1 b--black bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange= {this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="lh-copy mt3">
              <a href="#0" className="f6 link dim black db fw7"
              onClick={this.onSubmitSignIn}>
                Register
              </a>
            </div>
            {this.state.error ? (
                <div className=''>  
                <p className="red">There was an error registering. Please try again.</p>
                </div>
              ): (
                <div />
              )}
        </main>
      </article>
    );
  }
}

export default Register;