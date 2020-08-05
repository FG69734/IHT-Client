import React from 'react'
import axios from 'axios'
import Spinner from '../Spinner/Spinner';
import { URL, getHeaderConfig } from '../../Utils/constants';

class NewPost extends React.Component{


    constructor(props){
        super(props);
        this.state={
            isLoading: false,
            categories: [],
            titre: '',
            contenu: '',
            picture: null,
            categorie: '',
            error:{
                titre: '',
                categorie: '',
                picture: ''
            } 
        }
    }

    componentDidMount(){
        axios.get(`${URL}/categories/getAll`, getHeaderConfig())
            .then(res=>{
                this.setState({categories: res.data, categorie: res.data[0].id})
            })
            .catch(err=>{
                console.log(err.response)
            })
    }

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        let error = this.state.error;
        switch (name) {
            case 'titre':
                error.titre = (value.length === 0)?"Vous devez donner un titre à votre post":"";
                break;
            case 'categorie':
                error.categorie = (value.length === 0)?"Vous devez choisir une catégorie":"";
                break;
            default:
                break;
        }

        this.setState({[name]: value, error})
    }

    handleFileChange = (e) =>{
        e.preventDefault();
        this.setState({picture: e.target.files[0]});
    }

    isPictureValid = (picture) => {
         let {error} = this.state;
         if(picture){
            if(picture.size <= 5000000 && picture.name.includes('.jpg') || picture.name.includes('.JPG') || picture.name.includes('.jpeg') ||
                picture.name.includes('.JPEG') || picture.name.includes('.bmp') || picture.name.includes('.PMB') ||
                picture.name.includes('.tiff') || picture.name.includes('.TIFF') || picture.name.includes('.jfif') ||
                picture.name.includes('.JFIF') || picture.name.includes('.png') || picture.name.includes('.PNG')) {
            
            return true
            }  
            else if(!picture.name.includes('.jpg') && !picture.name.includes('.JPG') && !picture.name.includes('.jpeg') &&
                !picture.name.includes('.JPEG') && !picture.name.includes('.bmp') && !picture.name.includes('.PMB') &&
                !picture.name.includes('.tiff') && !picture.name.includes('.TIFF') && !picture.name.includes('.jfif') &&
                !picture.name.includes('.JFIF') && !picture.name.includes('.png') && !picture.name.includes('.PNG')) {
                
                error.picture = "Veuillez choisir une image";
                this.setState({error})
                return false
             }
            else if (picture.size > 5000000) {
                error.picture = "Image d'article de taille trop grande ( 5Mo maximum requis.)";
                this.setState({error})
                 return false
             } 
            else{
                error.picture = "Image réquise pour le post";
                this.setState({error})
                return false
             }
        } 
        else{
            error.picture = "Image réquise pour le post";
            this.setState({error})
            return false
          }
         
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        if(this.isPictureValid(this.state.picture) && this.state.titre && this.state.categorie){
            this.setState({isLoading: true})
            let formData = new FormData();
            formData.append('file', this.state.picture); 
            formData.append('titre', this.state.titre);
            formData.append('contenu', this.state.contenu);
            formData.append('username', this.props.currentUser.username);
            formData.append('categorie', this.state.categorie);

            axios.post(`${URL}/posts/new`, formData )
                .then(res=>{
                    this.setState({isLoading: false})
                    this.props.history.push('/posts');
                })
                .catch(err=>{
                    console.log(err.response) 
                    this.setState({isLoading: false})
                })
        }
        else{
            let {error} = this.state;
            if(this.state.titre.length === 0 ){
               error.titre = 'Vous devez donner un titre à votre post';   
            }
            if(!this.state.categorie){
               error.categorie = 'Vous devez choisir une catégorie';   
            } 
            if(error.picture){
                error.picture = error.picture
            }
            this.setState({error})
        }
        
    }

    render(){
        const {categories, error} = this.state;
        if(this.state.isLoading){
          return <Spinner />
        }
            return(
            <div className="site-section bg-light">
            <div className="container">
                <div className="row">

                <div className="col-lg-12">
                    <div className="section-title mb-5">
                    <h2>Nouveau post</h2>
                    </div>
                    <form onSubmit={this.handleSubmit} method="post"> 
                    
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label htmlFor="fname">Titre</label>
                                { error.titre  && <div><strong align="center" style={{color: 'red'}} >{error.titre}</strong></div>  }
                                <input type="text" id="fname" name="titre" className="form-control form-control-lg" 
                                onChange={(e)=>this.handleInputChange(e)} value={this.state.titre}/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label htmlFor="lname">Catégorie</label>
                                { error.categorie  && <div><strong align="center" style={{color: 'red'}} >{error.categorie}</strong></div>  }
                                <select type="text" id="lname" className="form-control form-control-lg" onChange={(e)=>this.handleInputChange(e)}
                                    value={this.state.categorie} name="categorie">
                                {categories.map((categorie, index)=>{
                                    return(
                                        <option key={index} className="option-group" value={categorie.categorie}> {categorie.categorie} </option>
                                    )
                                })}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 form-group">
                                <label htmlFor="eaddress">Photo</label>
                                { error.picture  && <div><strong align="center" style={{color: 'red'}} >{error.picture}</strong></div>  }
                                <input type="file" name="picture" id="eaddress" className="form-control form-control-lg"
                                onChange={(e)=>this.handleFileChange(e)}  />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 form-group">
                                <label htmlFor="econtenu">Contenu</label>
                                <textarea name="contenu" id="econtenu" cols="30" rows="10" className="form-control"
                                onChange={(e)=>this.handleInputChange(e)} value={this.state.contenu}></textarea>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <input type="submit" value="Publier" className="btn btn-primary py-3 px-5" />
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

export default NewPost;