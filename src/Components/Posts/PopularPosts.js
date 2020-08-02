import React from 'react'

class Login extends React.Component{

    render(){
        return(
            <div className="col-lg-3 ml-auto">
            <div className="section-title">
            <h2>Popular Posts</h2>
            </div>

            <div className="trend-entry d-flex">
            <div className="number align-self-start">01</div>
            <div className="trend-contents">
                <h2><a href="blog-single.html">News Needs to Meet Its Audiences Where They Are</a></h2>
                <div className="post-meta">
                <span className="d-block"><a href="#">Dave Rogers</a> in <a href="#">News</a></span>
                <span className="date-read">Jun 14 <span className="mx-1">&bullet;</span> 3 min read <span className="icon-star2"></span></span>
                </div>
            </div>
            </div>

            <div className="trend-entry d-flex">
            <div className="number align-self-start">02</div>
            <div className="trend-contents">
                <h2><a href="blog-single.html">News Needs to Meet Its Audiences Where They Are</a></h2>
                <div className="post-meta">
                <span className="d-block"><a href="#">Dave Rogers</a> in <a href="#">News</a></span>
                <span className="date-read">Jun 14 <span className="mx-1">&bullet;</span> 3 min read <span className="icon-star2"></span></span>
                </div>
            </div>
            </div>

            <div className="trend-entry d-flex">
            <div className="number align-self-start">03</div>
            <div className="trend-contents">
                <h2><a href="blog-single.html">News Needs to Meet Its Audiences Where They Are</a></h2>
                <div className="post-meta">
                <span className="d-block"><a href="#">Dave Rogers</a> in <a href="#">News</a></span>
                <span className="date-read">Jun 14 <span className="mx-1">&bullet;</span> 3 min read <span className="icon-star2"></span></span>
                </div>
            </div>
            </div>

            <div className="trend-entry d-flex pl-0">
            <div className="number align-self-start">04</div>
            <div className="trend-contents">
                <h2><a href="blog-single.html">News Needs to Meet Its Audiences Where They Are</a></h2>
                <div className="post-meta">
                <span className="d-block"><a href="#">Dave Rogers</a> in <a href="#">News</a></span>
                <span className="date-read">Jun 14 <span className="mx-1">&bullet;</span> 3 min read <span className="icon-star2"></span></span>
                </div>
            </div>
            </div>
            
            <p>
            <a href="#" className="more">See All Popular <span className="icon-keyboard_arrow_right"></span></a>
            </p>
        </div>
        );
    }
}

export default Login;