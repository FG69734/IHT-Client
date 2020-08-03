import React from 'react'
import {Link, withRouter} from 'react-router-dom'
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
                console.log(res.data)
            })
            .catch(err=>{
                console.log(err);
            })
    }

    handlePostSingle = (postSingle) => {
        this.props.history.push({
            pathname: "/post-single",
            post : {
                post: postSingle
            }
        });
    }

    onChangeSearch = (e) => {
        e.preventDefault();
        const target = e.target;
        let value = target.value;
        const name = target.name;
        this.setState({
            [name] : value
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
                this.setState({posts,totalPages: res.data.totalPages,pageNumber: res.data.pageable.pageNumber+1, searchEmpty})
            })
            .catch(err=>{
                console.log(err.res)
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
                isLastElt: res.data.last})
        })
        .catch(error=>{
            console.log(error.res)
        })
    }

    handlePrevious = (event,number) =>{
        event.preventDefault();
        axios.get(`${URL}/posts/getAll?page=${number-2}`, getHeaderConfig())
        .then(res=> {
            this.setState({posts: res.data.content, pageNumber: number-1, 
                isLastElt: res.data.last})
        })
        .catch(error=>{
            console.log(error.res)
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
                  <h2><Link onClick={()=>this.handlePostSingle(post)} to="#post-single" >{post.titre}</Link></h2>
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

        const tabTotal= [];
        let nbrePage = "";
        for(let i=1; i<=this.state.totalPages; i++){
            tabTotal.push(i);
        }

        let activeClass = "paginate_button page-item active";

        nbrePage = tabTotal.map(j=> {
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
            });
        let classPrevious = ""; 
        if(this.state.pageNumber == 1){
            classPrevious = "paginate_button page-item previous disabled";
        }
        else{
            classPrevious="paginate_button page-item previous";
        }

        let classNext= "";
        if(this.state.isLastElt){
            classNext = "paginate_button page-item next disabled";
        }
        else{
            classNext = "paginate_button page-item next";
        }
        
        let searchEmpty = ""
        searchEmpty = <div style={{color: 'red'}} align="center">
                        <h5 >
                            <em><strong >
                            {this.state.searchEmpty} </strong>
                            </em>
                        </h5>
                    </div>

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

                    {searchEmpty}

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
                                        {nbrePage}
                                        <li className={classNext} id="dataTable_next">
                                        <a onClick={(e)=>this.handleNext(e,this.state.pageNumber)} aria-controls="dataTable"
                                         data-dt-idx="0" tabIndex="0" className="page-link">Suivant
                                        </a>
                                        </li>
                                    </ul>
                                    </div>
                                </div>
                                </div>}
            </div>

        );
    }
}

export default withRouter(Posts);