import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import { URL } from '../../Utils/constants';
import { withRouter } from 'react-router-dom';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            usernameOrEmail: "",
            password: "",
            error:{
                usernameOrEmail: "",
                password: "",
                server: ""
            }
        }
    }

    componentDidMount(){
        this.setState({isLoading: false})
    }

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        let error = this.state.error;
        switch (name) {
            case 'usernameOrEmail':
                error.usernameOrEmail = (value.length === 0)?"Vous devez remplir ce champ":"";
                break;
            case 'password':
                error.password = (value.length === 0)?"Vous devez remplir ce champ":"";
                break;
            default:
                break;
        }

        this.setState({[name]: value, error});
    }

    handleSubmit = (e) => {
      e.preventDefault();
      if(this.state.usernameOrEmail && this.state.password){
        this.setState({isLoading: true})
        let {usernameOrEmail, password} = this.state;
        axios.post(`${URL}/signin`,{ usernameOrEmail: usernameOrEmail, password: password })
            .then(res=>{
                const token = res.data.tokenType + " " + res.data.accessToken;
                localStorage.setItem("token", token);
            axios.get(`${URL}/users/${usernameOrEmail}`, {headers: {Authorization: token}})
                .then(res=>{
                    this.props.connexionHandler(res.data);
                    this.props.history.push("/");
                })
                .catch(err=>{
                    this.setState({isLoading: false})
                    console.log(err.response);
                })
        })
            .catch(err =>{
                let erreur = "";
                if(err.response){
                   erreur = err.response.data.message;
                   this.setState({error: {server: erreur}, isLoading: false})
                } else{
                   this.setState({error: {server: "Impossible de joindre les serveurs pour le moment"}, isLoading: false}) 
                }
            })
      } else{
          let error = this.state.error;
          if(this.state.usernameOrEmail.length === 0 || !(this.state.usernameOrEmail)){ 
            error.usernameOrEmail = "Vous devez remplir ce champ";
          }
          if(this.state.password.length === 0 || !(this.state.password)){ 
            error.password = "Vous devez remplir ce champ"; 
          }
          this.setState({ error });
      }
        
    }

    render(){
        if(this.state.isLoading){
            return <Spinner />
        }
        const {usernameOrEmail, password, error} = this.state;
        let usernameOrEmailError = error.usernameOrEmail ? error.usernameOrEmail : null;
        let passwordError = error.password ? error.password : null;
        
        return(

        <div className="site-section bg-light">
        <div className="container align-items-center">
            <div className="row">

            <div className="col-lg-12 col-sm-10 offset-sm-3">
                <div className="section-title mb-10 col-md-6 text-center">
                <h2>Se connecter</h2>
                </div>
                <form onSubmit={this.handleSubmit} className="justify-content-center" method="post">
                
                    <div className="row">
                        <div className="col-md-6 form-group">
                        { error.server  && <h4><strong style={{color: 'red'}} >{error.server}</strong></h4>  }
                            <label htmlFor="fusername">Nom d'utilisateur ou Email</label>
                            { usernameOrEmailError  && <div><strong align="center" style={{color: 'red'}} >{usernameOrEmailError}</strong></div>  }
                            <input type="text" id="fusername" name="usernameOrEmail" className="form-control form-control-lg"
                            onChange={(event) => this.handleInputChange(event)} value={usernameOrEmail} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 form-group">
                            <label htmlFor="epassword">Mot de passe</label>
                            { passwordError && <div><strong align="center" style={{color: 'red'}} >{passwordError}</strong></div> } 
                            <input type="password" id="epassword" name="password" className="form-control form-control-lg"
                            onChange={(event) => this.handleInputChange(event)} value={password} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <input style={{backgroundColor: '#03224c'}} type="submit" value="Se connecter" 
                                className="btn btn-primary py-3 px-5" />
                        </div>
                    </div>
                
                </form>
            </div>
            
            </div>
        </div>
        </div>
        );
    }

}

export default withRouter(Login);