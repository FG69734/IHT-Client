import React from 'react'
import { Link, withRouter } from 'react-router-dom/cjs/react-router-dom.min'

class Header extends React.Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount(){
        
    }

    render(){
        const {isAuthenticated, currentUser} = this.props;

        return(
           <>
            <div className="site-mobile-menu site-navbar-target">
            <div className="site-mobile-menu-header">
                <div className="site-mobile-menu-close mt-3">
                <span className="icon-close2 js-menu-toggle"></span>
                </div>
            </div>
            <div className="site-mobile-menu-body"></div>
            </div>

            <div className="header-top">
            <div className="container">
                <div className="row align-items-center">
                <div className="col-12 col-lg-6 d-flex">
                    <Link to="/">
                        <img height={"100px"} width={"120px"} className="site-logo" src="images/logo.JPG" alt="Logo IHT" />
                    </Link>

                    <a href="#" className="ml-auto d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black"><span
                        className="icon-menu h3"></span></a>
                </div>
                <div className="col-12 col-lg-6 ml-auto d-flex">
                    <div className="ml-md-auto top-social d-none d-lg-inline-block">
                        <a href="https://www.facebook.com/panessiht/" target="_blank" className="d-inline-block p-3">
                            <span style={{color: '#03224c'}} className="icon-facebook"></span>
                        </a>
                        <a href="#" className="d-inline-block p-3">
                            <span style={{color: '#03224c'}} className="icon-twitter"></span>
                        </a>
                        <a href="#" className="d-inline-block p-3">
                            <span style={{color: '#03224c'}} className="icon-instagram"></span>
                        </a>
                    </div>
                    <form action="#" className="search-form d-inline-block">

                    <div className="d-flex">
                        <input type="email" className="form-control" placeholder="Rechercher..." />
                        <button style={{backgroundColor: '#03224c'}} type="submit" className="btn" ><span className="icon-search"></span></button>
                    </div>
                    </form>

                </div>
                </div>
            </div>
            
            <div className="site-navbar py-2 js-sticky-header site-navbar-target d-none pl-0 d-lg-block" role="banner">

            <div className="container">
                <div className="d-flex align-items-center">
                
                <div className="mr-auto">
                    <nav className="site-navigation position-relative text-right" role="navigation">
                    <ul className="site-menu main-menu js-clone-nav mr-auto d-none pl-0 d-lg-block">
                        <li className="active">
                        <Link to="/" className="nav-link text-left">Accueil</Link>
                        </li>
                        <li>
                        <Link to="/posts" className="nav-link text-left">Posts</Link>
                        </li>
                        {isAuthenticated ? <li><Link to="/categories" className="nav-link text-left">Catégories</Link></li> : ""} 
                        <li>
                        <Link to="/preinscription" className="nav-link text-left">Se préinscrire</Link>
                        </li>
                        <li>
                        <Link to="/about" className="nav-link text-left">A propos</Link>
                        </li>
                        <li>
                        <Link to="/contact" className="nav-link text-left">Contact</Link> 
                        </li>
                        {isAuthenticated ? <li><a href="#logout" onClick={(e) => {e.preventDefault(); this.props.logout();}} style={{color: "red"}} className="nav-link text-left">Se deconnecter</a></li> : <li><Link to="/login" className="nav-link text-left">Se connecter</Link></li>}
                        
                    </ul>                                                                                                                                                                                                                                                                                         
                    </nav>

                </div>
                
                </div>
            </div>

            </div>
            
            </div>
           </> 
        );
    }
}

export default withRouter(Header);