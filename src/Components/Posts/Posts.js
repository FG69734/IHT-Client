import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { URL, getHeaderConfig } from '../../Utils/constants';
import SpinnerSearch from '../Spinner/SpinnerSearch'

class Posts extends React.Component {

    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            posts: [],
            value: '',
            isSearching: false
        }
    }

    componentDidMount(){
        axios.get(`${URL}/posts/getAll`, getHeaderConfig())
            .then(res=>{
                this.setState({posts: res.data.content})
            })
            .catch(err=>{
                console.log(err);
            })
    }

    onChangeSearch = (e) => {
        e.preventDefault();
        const target = e.target;
        let value = target.value;
        const name = target.name;
        console.log(value)
        this.setState({
            [name] : value
        })
        axios.get(`${URL}/posts/search`, {params: {value: value }}, getHeaderConfig())
            .then(res=>{
                let posts = [...this.state.posts]
                posts = res.data.content
                this.setState({posts})
            })
            .catch(err=>{
                console.log(err.response)
            })
    }

    render(){
        if(this.state.isSearching){
            return <SpinnerSearch />
        }
        const posts = this.state.posts.map((post, index)=>{
        let img= 'data:image/png;base64,'+post.viewPicture;
          return(
              <div key={index} className="post-entry-2 d-flex">
                  <div className="thumbnail" style={{backgroundImage: `url(${img})`}}></div>
                  <div className="contents">
                  <h2><Link to="/post-single">{post.titre}</Link></h2>
                  <p className="mb-3">{post.contenu}</p>
                  <div className="post-meta">
                      <span className="d-block">Dave Rogers in News</span>
                      <span className="date-read">Jun 14 <span className="mx-1">&bullet;</span> 3 min read <span className="icon-star2"></span></span>
                      {this.props.isAuthenticated && <Link to="/posts/update">Modifier</Link> |
                                                  <Link style={{color: 'red'}} to="/posts/delete">Supprimer</Link>}
                  </div>
                  </div>
              </div>
            )
        })

        return(
                <div className="site-section">
                <div className="container">
                <div className="d-flex align-items-center">
                    <div className="d-inline-block">
                    {this.props.isAuthenticated &&  <Link to="/new-post" className="btn btn-primary py-3 px-5" style={{backgroundColor: '#03224c'}}> Nouveau post</Link>}
                        
                    </div>
                    <div className="d-inline-block offset-sm-4 col-md-6">
                        <div className="d-flex">
                        <input type="text" name="value" value={this.state.value} onChange={this.onChangeSearch} className="form-control" 
                            placeholder="Taper votre recherche..." />
                        <button style={{backgroundColor: '#03224c'}} type="submit" className="btn btn-secondary" >
                            <span className="icon-search"></span>
                        </button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-12">
                    <div className="section-title">
                        <h2>Liste des posts</h2>
                    </div>
                    
                    {posts}

                    </div>
                    
                </div>
                </div>
                <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <ul className="custom-pagination list-unstyled">
                        <li><a href="#">1</a></li>
                        <li className="active">2</li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        </ul>
                    </div>
                </div>
                </div>
            </div>

        );
    }
}

export default Posts;