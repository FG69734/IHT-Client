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
            isSearching: false,
            totalPages: 0,
            pageNumber: 0,
            isLastElt: false,
            searchEmpty:'' 
        }
    }

    componentDidMount(){
        axios.get(`${URL}/posts/getAll`, getHeaderConfig())
            .then(res=>{
                this.setState({posts: res.data.content,totalPages: res.data.totalPages,pageNumber: res.data.pageable.pageNumber+1})
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
        this.setState({
            [name] : value, isSearching: true
        })
        axios.get(`${URL}/posts/search`, {params: {value: value }}, getHeaderConfig())
            .then(res=>{
                let posts = [...this.state.posts]
                posts = res.data.content
                let searchEmpty = [...this.state.searchEmpty];
                if(res.data.length < 1){
                    searchEmpty =  "Aucun article trouvé";
                }
                if(res.data.length >= 1){
                    searchEmpty =  '';
                }
                this.setState({isSearching: false, posts,totalPages: res.data.totalPages,pageNumber: res.data.pageable.pageNumber+1, 
                    searchEmpty})
            })
            .catch(err=>{
                this.setState({ isSearching: false })
            })
    }

    handlePage = (number) =>{
        axios.get(`${URL}/posts/getAll?page=${number}`, getHeaderConfig())
        .then(res=> {
            this.setState({posts: res.data.content, pageNumber: number+1, 
                isLastElt: res.data.last})
        })
        .catch(error=>{
        })
    }

    handleNext = (event,number) => {
        event.preventDefault();
        axios.get(`${URL}/posts/getAll?page=${number}`, getHeaderConfig())
        .then(res=> {
            this.setState({posts: res.data.content, pageNumber: number+1, 
                isLastElt: res.data.last })
        })
        .catch(error=>{
            console.log(error.response)
        })
    }

    handlePrevious = (event,number) =>{
        event.preventDefault();
        axios.get(`${URL}/posts/getAll?page=${number-2}`, getHeaderConfig())
        .then(res=> {
            this.setState({ posts: res.data.content, pageNumber: number-1, 
                isLastElt: res.data.last })
        })
        .catch(error=>{
            console.log(error.response)
        })
        
    }

    render(){
        if(this.state.isSearching){
            return <SpinnerSearch />
        }
        let img = ""
        let classPrevious = ""; 
        let classNext= "";

        const tabTotal= [];
        for(let i=1; i<=this.state.totalPages; i++){
            tabTotal.push(i);
        }
        let activeClass = "paginate_button page-item active";

        let pagination = tabTotal.map(j=> {
            if(j!==this.state.pageNumber){
                activeClass = "paginate_button page-item"
            }
            else{
                activeClass = "paginate_button page-item active"
            }

           return <li key={j} className={activeClass}>
            <a onClick={()=>this.handlePage(j-1)} aria-controls="dataTable" data-dt-idx="1" tabIndex="0" 
            className="page-link">{j}</a>
            </li>
        })

        if(this.state.pageNumber == 1){
                classPrevious = "paginate_button page-item previous disabled";
        }
        else{ 
            classPrevious="paginate_button page-item previous";
        }

        if(this.state.isLastElt){
            classNext = "paginate_button page-item next disabled";
        }
        else{
            classNext = "paginate_button page-item next";
        }
        

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
                        <button onChange={this.onChangeSearch} style={{backgroundColor: '#03224c'}} type="button" className="btn btn-secondary" >
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
                    
                    {!this.state.isSearching ? 
                        this.state.posts.map((post, index)=>{
                        img = 'data:image/png;base64,'+post.viewPicture;
                          return(
                              <div key={index} className="post-entry-2 d-flex">
                                  <div className="thumbnail" style={{backgroundImage: `url(${img})`}}></div>
                                  <div className="contents">
                                  <h2><Link to={"/post-single/"+post.id}>{post.titre}</Link></h2>
                                  <p className="mb-3">{post.contenu}</p>
                                  <div className="post-meta">
                                      <span className="d-block"><strong>{post.user.noms +" "+ post.user.prenoms}</strong>  à la rédaction </span>
                                      <span className="date-read"> Date du post: {post.date} <span className="icon-eye"></span></span>
                                      {this.props.isAuthenticated && <Link to="/posts/update">Modifier</Link> |
                                                                  <Link style={{color: 'red'}} to="/posts/delete">Supprimer</Link>}
                                  </div>
                                  </div>
                              </div>
                            )
                        })
                       :
                       <SpinnerSearch />
                    }


                    </div>
                    
                </div>
                </div>
                { this.state.totalPages > 1 && <div className="container">
                        <div className="row offset-sm-8">
                            <div className="col-lg-6">
                            <ul className="pagination">
                                <li className={classPrevious} id="dataTable_previous">
                                <a onClick={(e)=>this.handlePrevious(e,this.state.pageNumber)} aria-controls="dataTable" 
                                data-dt-idx="0" tabIndex="0" className="page-link">Précedent
                                </a>
                                </li>
                                
                                {pagination}

                                <li className={classNext} id="dataTable_next">
                                <a onClick={(e)=>this.handleNext(e,this.state.pageNumber)} aria-controls="dataTable"
                                 data-dt-idx="0" tabIndex="0" className="page-link">Suivant
                                </a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </div>
                }
            </div>

        );
    }
}

export default Posts;