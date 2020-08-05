import React from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Spinner/Spinner';
import { URL, getHeaderConfig } from '../../Utils/constants';

class Categorie extends React.Component{

    constructor(props){
        super(props);
        this.state={
            categories : [],
            isLoading: false
        }
    }

    componentDidMount(){
        axios.get(`${URL}/categories/getAll`, getHeaderConfig())
            .then(res=>{
                this.setState({categories: res.data})
            })
            .catch(err=>{
                console.log(err.response)
            })
    }

    handleDelete = (categorie) =>{
        if(window.confirm(`Voulez vous vraiment définitivement supprimer la catégorie ${categorie.categorie}`)){
            this.setState({isLoading: true})
            axios.delete(`${URL}/categories/delete/${categorie.id}`, getHeaderConfig())
                .then(res=>{
                    const categories = this.state.categories.filter(i=> i.id !== categorie.id);
                    this.setState({categories, isLoading: false })
                })
                .catch(err=>{
                    console.log(err.response)
                    this.setState({isLoading: false})
                })
        }
        
    }

    render(){
        if(this.state.isLoading){
          return <Spinner />
        }
        const {categories} = this.state;
        let tBodyCategorie = categories.map((categorie, index)=>{
            return(
                <tbody key={index}>
                    <tr>
                        <td>
                           <strong> {categorie.categorie} </strong> 
                        </td>
                        <td>
                        <Link to="#update" style={{fontSize: "20px", color: "#03224c"}} className="icon-edit"></Link>|
                        <span style={{fontSize: "20px", color: "red"}} onClick={(e)=> this.handleDelete(categorie)} className="icon-trash"></span>
                        </td>
                    </tr>
                </tbody>
            )
        })
        return(
            <div className="main-content">    
            <div className="separator-breadcrumb border-top"></div>

             <div className="row">
                        
                    <div className="col-md-12">
                    <div className="card o-hidden mb-4">

                        <div className="card-header d-flex align-items-center border-0">
                            <Link to="/categories/new" style={{backgroundColor: '#03224c'}} className="btn btn-primary py-3 px-5">
                                Nouvelle catégorie
                            </Link>
                        </div>
                            <div className="justify-content" >
                                <div className="table-responsive">
                                    <table id="user_table" className="table  text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col">Catégorie</th>
                                                <th scope="col">Actions</th>
                                                
                                            </tr>
                                        </thead>

                                        {tBodyCategorie}
                                        
                                    </table>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>

                </div>
        )
    }

}

export default Categorie;