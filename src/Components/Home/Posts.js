import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'
import { URL, getHeaderConfig } from '../../Utils/constants';

class Posts extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            posts: []
        }
    }

    componentDidMount(){
      axios.get(`${URL}/posts/getLastFivePosts`, getHeaderConfig())
        .then(res=>{
            this.setState({posts: res.data.content})
        })
        .catch(err=>{
            console.log(err);
        })
    }


    render(){
      const {isAuthenticated, currentUser} = this.props;
      const posts = this.state.posts.map((post, index)=>{
      let img= 'data:image/png;base64,'+post.viewPicture;
        return(
          <div key={index} className="post-entry-2 d-flex">
              <div className="thumbnail" style={{backgroundImage: `url(${img})`}}></div>
              <div className="contents">
              <h2><Link to="/post-single">{post.titre}</Link></h2>
              <p className="mb-3">{post.contenu}</p>
              <div className="post-meta">
                  <span className="d-block"><strong>{post.user.noms +" "+ post.user.prenoms}</strong>  à la rédaction </span>
                  <span className="date-read"> Date du post: {post.date} <span className="icon-eye"></span></span>
                  {isAuthenticated ? <Link to="#/posts/update">Modifier</Link> | <Link style={{color: 'red'}} to="#/posts/delete">Supprimer</Link> : "" } 
              </div>
              </div>
          </div>
        )
      })
        return(
            <div className="site-section">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <div className="section-title">
                        <h2>Posts les plus recents</h2>
                    </div>
                    
                    {posts}
                    
                    </div>
                    
                </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <Link to="/posts" className="btn btn-primary py-3 px-5 offset-sm-10" > Voir plus... </Link>
                    </div>
                </div>
          </div> 
        );
    }
}

export default Posts;