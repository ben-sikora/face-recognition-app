import React from "react";

class SignIn extends React.Component{ 
  constructor(props){
    super(); 
    this.state={
      signInEmail: '', 
      signInPassword: '',
      error: false
    }
  }

  onEmailChange= (event) => {
    this.setState({signInEmail: event.target.value}); 
  }

  onPasswordChange= (event) => {
    this.setState({signInPassword: event.target.value}); 
  }

  onSubmitSignIn= () =>{
    fetch('https://face-rec-backend-s79y.onrender.com/signin', {
      method: 'post', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    }).then(response => response.json()).then(user => {
      if(user.id){
        this.props.loadUser(user); 
        this.props.onRouteChange('home'); 
      }
      return; 
    }).catch((err)=>{
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
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={this.onSubmitSignIn}
            />
          </div>
          <div className="lh-copy mt3">
            <a href="#0" className="f6 link dim black db fw7 pointer" 
            onClick={() => onRouteChange('register')}>
              Register
            </a>
          </div>
          {this.state.error ? (
                <div className=''>  
                <p className="red">There was an error signing in. Please try again.</p>
                </div>
              ): (
                <div />
          )}
      </main>
    </article>
  );
  }
}

export default SignIn;
