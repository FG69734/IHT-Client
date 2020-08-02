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
      console.log(this.state.posts)
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
                <div className="row">
                    <div className="col-lg-12">
                    <div className="section-title">
                        <h2>Posts les plus recents</h2>
                    </div>
                    
                    {posts}
                    
                    </div>
                    
                </div>
                </div>
          </div> 
        );
    }
}

export default Posts;