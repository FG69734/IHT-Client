import React from 'react';
import './App.css';
import {Switch, Route, BrowserRouter, withRouter} from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import PostSingle from './Components/Posts/PostSingle';
import Preinscription from './Components/Preinscription/Preinscription';
import Contact from './Components/Contact/Contact';
import { URL } from './Utils/constants';
import axios from 'axios';
import Spinner from './Components/Spinner/Spinner';
import Posts from './Components/Posts/Posts';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import NewPost from './Components/Posts/NewPost';
import Categorie from './Components/Categorie/Categorie';
import NewCategorie from './Components/Categorie/NewCategorie';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      isAuthenticated: false,
      currentUser: null,
      isLoading: true
    }
  }

  componentDidMount(){
    const token = localStorage.getItem('token')
    if(localStorage.getItem('token') != null){
      axios.get(`${URL}/user/me`, {headers: {Authorization: localStorage.getItem('token')}})
        .then(res=>{
          console.log(res.data)  
          this.setState({currentUser: res.data, isAuthenticated: true, isLoading: false})
        })
        .catch(err=>{
          console.log(err);
          this.setState({isLoading: false})
        })
    } else { 
      this.setState({isLoading: false})
    }
  }

  connexionHandler = (currentUser) => {
    this.setState({currentUser: currentUser, isAuthenticated: true});
  }

  logoutHandler = () => {
    this.setState({currentUser: null, isAuthenticated: false});
    localStorage.removeItem("token")
  }

  changeCurentUser = (currentChangedUser) => {
    this.setState({currentUser: currentChangedUser, isAuthenticated: true});
  }
  
  render(){
    if(this.state.isLoading){
      return <Spinner />
    }

    const {currentUser, isAuthenticated} = this.state;
    return (
      <div className="site-wrap">
      <React.Fragment>
        <BrowserRouter>
        <Header logout={this.logoutHandler} currentUser={currentUser} isAuthenticated={isAuthenticated} />
          <Switch>
            <Route exact path="/" render={(props)=> 
              <Home logout={this.logoutHandler} currentUser={currentUser} isAuthenticated={isAuthenticated} {...props} />} />
            <Route exact path="/login" render={(props)=> 
              <Login connexionHandler={this.connexionHandler} currentUser={currentUser} isAuthenticated={isAuthenticated} 
                logout={this.logoutHandler} {...props} />} 
            />
            <Route exact path="/preinscription" render={(props)=> 
              <Preinscription logout={this.logoutHandler} currentUser={currentUser} isAuthenticated={isAuthenticated} {...props} />} 
            />
            <Route exact path="/contact" render={(props)=> 
              <Contact logout={this.logoutHandler} currentUser={currentUser} isAuthenticated={isAuthenticated} {...props} />} 
            />
            <Route exact path="/post-single/:id" render={(props)=> 
              <PostSingle logout={this.logoutHandler} currentUser={currentUser} isAuthenticated={isAuthenticated} {...props} />} 
            />
            <Route exact path="/posts" render={(props)=> 
              <Posts logout={this.logoutHandler} currentUser={currentUser} isAuthenticated={isAuthenticated} {...props} />} 
            />
            <Route exact path="/new-post" render={(props)=> 
              <NewPost logout={this.logoutHandler} currentUser={currentUser} isAuthenticated={isAuthenticated} {...props} />} 
            />
            <Route exact path="/categories" render={(props)=> 
              <Categorie logout={this.logoutHandler} currentUser={currentUser} isAuthenticated={isAuthenticated} {...props} />} 
            />
            <Route exact path="/categories/new" render={(props)=> 
              <NewCategorie logout={this.logoutHandler} currentUser={currentUser} isAuthenticated={isAuthenticated} {...props} />} 
            />
          </Switch>
          <Footer />
        </BrowserRouter>
      </React.Fragment>
      </div> 
    );
  }
  
}

export default App;
