import React from 'react'
import {withRouter} from 'react-router-dom'
import Spinner from '../Spinner/Spinner';
import axios from 'axios'
import { URL, getHeaderConfig } from '../../Utils/constants';

class NewCategorie extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            categorie: '',
            error: ''
        }
    }

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        let error = value.length===0 ?  'Vous devez remplir ce champ' : ''

        this.setState({[name]: value, error})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.categorie){
            this.setState({isLoading: true})
            const cr = { categorie: this.state.categorie }
            axios.post(`${URL}/categories/new`, cr, getHeaderConfig())
                .then(res=>{
                    this.setState({isLoading: false})
                    this.props.history.push('/categories');
                })
                .catch(err=>{
                    this.setState({isLoading: false, error: err.response.data.message})
                })
        } else{
            if(this.state.categorie.length === 0 || !(this.state.categorie)){
               let error = 'Vous devez remplir ce champ'
               this.setState({error})
            }
        }
    }

    render(){
        if(this.state.isLoading){
            return <Spinner />
        }
        let {error} = this.state;

        return(
            <div className="site-section bg-light">
            <div className="container">
                <div className="row">

                <div className="col-lg-12">
                    <div className="section-title mb-5">
                    <h2>Nouvelle Catégorie</h2>
                    </div>
                    <form onSubmit={this.handleSubmit} method="post"> 
                        <div className="row">
                            <div className="col-md-12 form-group">
                                <label htmlFor="fname">Titre de la catégorie</label>
                                { error  && <div><strong align="center" style={{color: 'red'}} >{error}</strong></div>  }
                                <input type="text" name="categorie" value={this.state.categorie} onChange={(e) => this.handleInputChange(e)} 
                                id="fname" className="form-control form-control-lg" autoComplete="off" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <input style={{backgroundColor: '#03224c'}} type="submit" value="Enregistrer" className="btn btn-primary py-3 px-5" />
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

export default withRouter(NewCategorie);