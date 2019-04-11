import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import SignupPage from './pages/SignupPage/SignupPage'
import LoginPage from './pages/LoginPage/LoginPage'
import NewsfeedPage from './pages/NewsfeedPage/NewsfeedPage'
import AboutPage from './pages/AboutPage/AboutPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import NavBar from './components/NavBar/NavBar'

import userService from './services/userService'

class App extends Component {
  state = {
    user: null,
    triggerWords: ['depression', 'anxiety', 'sexual violence', 'rape', 'sexual harassment', 'domestic violence', 'self-harm', 'suicide', 'relationships', 'breakups', 'work', 'loss', 'loneliness', 'stress', 'addiction', 'eating disorder']
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleSignuporLogin = () => {
    this.setState({user: userService.getUser()});
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleUpdateUser = user => {
    this.setState({user: user})
  }

  async componentDidMount() {
    const user = userService.getUser();
    // const posts = await postsService.index();
    this.setState({ user:user });
  }

  render() {
    return (
      <div className="App">
        <NavBar 
          user={this.state.user}
          handleLogout={this.handleLogout}
        />
        <Switch>
          <Route exact path='/' render={()=> 
            this.state.user ?
            <NewsfeedPage 
              user={this.state.user}
              triggerWords={this.state.triggerWords}
              handleUpdateUser={this.handleUpdateUser}
            />
            :
            <Redirect to='/about' />
          }/>
          <Route exact path='/user' render={() => 
            <ProfilePage 
              user={this.state.user}
              handleUpdateUser={this.handleUpdateUser}
              triggerWords={this.state.triggerWords}
            />
          }
          />
          <Route exact path='/about' render={() => 
            <AboutPage />
            }/>
          <Route exact path='/signup' render={({ history })=> 
            <SignupPage 
            history={history}
            handleSignuporLogin={this.handleSignuporLogin}
            />
          }/>
          <Route exact path='/login' render={({ history })=>
            <LoginPage 
            history={history}
            handleSignuporLogin={this.handleSignuporLogin}
            />
          }/>
        </Switch>
      </div>
    );
  }
}

export default App;
