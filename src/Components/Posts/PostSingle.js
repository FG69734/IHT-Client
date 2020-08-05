import React from 'react'
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import PopularPosts from './PopularPosts';
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'
import { URL, getHeaderConfig } from '../../Utils/constants';

class PostSingle extends React.Component{


    render(){
        // console.log(this.state.post.categorie.categorie)
        // const {post} = this.state
        // let img = 'data:image/png;base64,'+post.viewPicture;
        //const categorie = this.state.post.categorie.categorie;
        return(
           <>
            <div className="site-section">
            <div className="container">
                <div className="row">
                <div className="col-lg-8 single-content">
                <div class="section-title">
                    <span class="caption d-block small">Categories</span>
                    <h2>Politics</h2>
                </div>
                <p className="mb-5">
                <img src="images/concours_entree_premiere_annee.jpg" alt="Photo concours d'entrée" className="img-fluid" />
                </p>  
                <h1 className="mb-4">
                Concours d'entrée en prémière année
                </h1>
                <div className="post-meta d-flex mb-5">
                <div className="bio-pic mr-3">
                    <img src="images/person_1.jpg" alt="Image" className="img-fluidid" />
                </div>
                <div className="vcard">
                    <span className="d-block"><a href="#">Dave Rogers</a> in <a href="#">News</a></span>
                    <span className="date-read">Jun 14 <span className="mx-1">&bullet;</span> 3 min read <span className="icon-star2"></span></span>
                </div>
                </div>

                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit officia neque beatae at inventore excepturi numquam sint commodi alias, quam consequuntur corporis ex, distinctio eaque sapiente pariatur iure ad necessitatibus in quod obcaecati natus consequatur. Sed dicta maiores, eos culpa.</p>
                <p>Voluptatum animi, voluptate sint aperiam facere a nam, ex reiciendis eum nemo ipsum nobis, rem illum cupiditate at quaerat amet qui recusandae hic, atque laboriosam perspiciatis? Esse quidem minima, voluptas necessitatibus, officia culpa quo nulla, cupiditate iste vel unde magni.</p>
                <p>Nulla nesciunt eligendi ratione, atque, hic, ullam suscipit quos enim vitae fugiat ducimus, dolore delectus iste id culpa. Ducimus, iste magnam sed reprehenderit architecto perferendis odio voluptas molestiae quidem ab numquam debitis, dolorem incidunt, tempore a quod qui nobis. Voluptates!</p>
                <p>Blanditiis, ipsum sed odio reprehenderit sequi ut vitae, dolor minima ab! Architecto nesciunt nemo sint est aspernatur fugit consequatur, magnam suscipit asperiores illo eum repellendus officia dolorem, molestiae commodi nam voluptatem quis quia vel cumque quos, aliquam ex incidunt sapiente!</p>
                <p>Suscipit, officiis, vero! Perferendis accusamus quos voluptatum culpa, provident maiores! Illo itaque ullam fugit molestiae, eaque accusamus impedit autem numquam. Placeat molestias tempore eaque ipsam vel voluptatum velit enim quam iusto maxime delectus, sint sapiente ea, quo excepturi nisi! Quia.</p>
                <p>Dolores debitis excepturi maxime earum sapiente totam, quos dolore inventore tempore illum. Dolores explicabo sed amet aut atque, facere aliquid repudiandae quod possimus quo hic similique et voluptates fugit iure dolore quam ipsa numquam assumenda corporis? Dignissimos expedita fugit sapiente.</p>
                <p>Cupiditate ut, aspernatur labore obcaecati, eveniet aut velit nulla facere suscipit est recusandae vel error itaque earum doloremque hic necessitatibus dignissimos dolores libero laudantium ducimus! Rem dolorem ratione officia et, fugit non, fuga suscipit eos veritatis enim perspiciatis, magni sit!</p>

                <div className="pt-5">
                    <p>Categories:  <a href="#">Design</a>, <a href="#">Events</a>  Tags: <a href="#">#html</a>, <a href="#">#trends</a></p>
                </div>
            
                </div>

                <PopularPosts />

                </div>
            
            </div>
            </div>
                    
           </>
        );
    }
}

// componentDidMount(){
//         console.log("id="+this.props.match.params.id)
//         if(this.props.match.params.id){
//             axios.get(`${}/posts/getById/${this.props.match.params.id}`, getHeaderConfig())
//             .then(res=>{
//                 console.log(res.data)
//                 this.setState({post: res.data})
//             })
//             .catch(err=>{
//                 console.log(err.response);
//             })
//         }
//         axios.get(`${URL}/posts/getLastFivePosts`, getHeaderConfig())
//         .then(res=>{
//             this.setState({posts: res.data.content})
//         })
//         .catch(err=>{
//             console.log(err);
//         })
//     }

//     render(){
//         const post = this.state;
//         console.log(this.state.post)
//         let img= 'data:image/png;base64,'+post.viewPicture;
//         return(
//            <>
//             <div className="site-section">
//             <div className="container">
//                 <div className="row">
//                 <div className="col-lg-8 single-content">
//                 <div className="section-title">
//                     <span className="caption d-block small">Catégorie</span>
//                     <h2>{post.categorie.categorie}</h2>
//                 </div>
//                 <p className="mb-5">
//                 <img src={img} alt={post.titre} className="img-fluid" />
//                 </p>  
//                 <h1 className="mb-4">
//                 {post.titre}
//                 </h1>
//                 <div className="post-meta d-flex mb-5">
//                 <div className="bio-pic mr-3">
//                     <img src="images/person_1.jpg" alt="Image" className="img-fluidid" />
//                 </div>
//                 <div className="vcard">
//                     <span className="d-block"><a href="#">Dave Rogers</a> in <a href="#">News</a></span>
//                     <span className="date-read">Jun 14 <span className="mx-1">&bullet;</span> 3 min read <span className="icon-star2"></span></span>
//                 </div>
//                 </div>

//                 <p>{post.contenu}</p>
                
//                 <div className="pt-5">
//                     <p>Categories:  <a href="#">Design</a>, <a href="#">Events</a>  Tags: <a href="#">#html</a>, <a href="#">#trends</a></p>
//                 </div>
            
//                 </div>

//                 <PopularPosts posts={this.state.posts} />

//                 </div>
            
//             </div>
//             </div>
                    
//            </> 
//         );
//     }

export default withRouter(PostSingle);