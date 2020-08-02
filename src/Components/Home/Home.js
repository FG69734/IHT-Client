import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import Slider from '../Slider/Slider';
import Posts from './Posts';
import Spinner from '../Spinner/Spinner';
import { withRouter } from 'react-router-dom';

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isLoading: true
        }
    }

    componentDidMount(){
        this.setState({isLoading: false})
    }

    render(){
        if(this.state.isLoading){
            return <Spinner />
        }
        return(
        <>
            <Slider />
            <Posts isAuthenticated={this.props.isAuthenticated} currentUser={this.props.currentUser} />

        <div className="py-0">
        <div className="container">
            <div className="half-post-entry d-block d-lg-flex bg-light">
            <div className="img-bg" style={{backgroundImage: "url('images/special_covid.jpg')"}}></div>
            <div className="contents">
                <span className="caption">Paness-IHT</span>
                <h2><a href="#">Offres de formations certifiantes et diplômantes</a></h2>
                <p className="mb-3">PANESS-IHT, pôle d'excellence en technologie digitale, vous offre des formations certifiantes et diplômantes.
                Profitez de la réduction de plus de 70% sur nos tarifs de formation pour vous préparer à l’obtention d’une certification internationale.</p>
                
                <div className="post-meta">
                <span className="d-block"><a href="#">Dave Rogers</a> in <a href="#">Food</a></span>
                <span className="date-read">Jun 14 <span className="mx-1">&bullet;</span> 3 min read <span className="icon-star2"></span></span>
                </div>

            </div>
            </div>
        </div>
        </div>
        </>
        );
    }
}

export default withRouter(Home);