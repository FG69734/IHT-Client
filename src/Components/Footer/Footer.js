import React from 'react'

class Footer extends React.Component{

    render(){
        return(
            <>
            <div className="site-section subscribe bg-light">
            <div className="container">
                <form action="#" className="row align-items-center">
                <div className="col-md-5 mr-auto">
                    <h2>Souscrire à la Newsletter</h2>
                    <p>Souscrivez à cette Newsletter en entrant votre email dans ce formulaire pour recevoir toutes nos dernières informations.</p>
                </div>
                <div className="col-md-6 ml-auto">
                    <div className="d-flex">
                    <input type="email" className="form-control" placeholder="Entrer votre email" />
                    <button style={{backgroundColor: '#03224c'}} type="submit" className="btn btn-secondary" ><span className="icon-paper-plane"></span></button>
                    </div>
                </div>
                </form>
            </div>
            </div>
            <div className="footer">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="copyright">
                      <p>
                          Copyright &copy;<script>document.write(new Date().getFullYear());</script>Tous droits réservés IHT<i className="icon-heart text-danger" aria-hidden="true"></i>
                          </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </> 
        );
    }
}

export default Footer;