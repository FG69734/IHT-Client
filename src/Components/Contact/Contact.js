import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

class Contact extends React.Component{

    render(){
        return(
            <div className="site-section bg-light">
            <div className="container">
                <div className="row">

                <div className="col-lg-12">
                    <div className="section-title mb-5">
                    <h2>Contactez nous</h2>
                    </div>
                    <form method="post">
                    
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label for="fname">First Name</label>
                                <input type="text" id="fname" className="form-control form-control-lg" />
                            </div>
                            <div className="col-md-6 form-group">
                                <label for="lname">Last Name</label>
                                <input type="text" id="lname" className="form-control form-control-lg" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label for="eaddress">Email Address</label>
                                <input type="text" id="eaddress" className="form-control form-control-lg" />
                            </div>
                            <div className="col-md-6 form-group">
                                <label for="tel">Tel. Number</label>
                                <input type="text" id="tel" className="form-control form-control-lg" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 form-group">
                                <label for="message">Message</label>
                                <textarea name="" id="message" cols="30" rows="10" className="form-control"></textarea>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <input style={{backgroundColor: '#03224c'}} type="submit" value="Send Message" className="btn btn-primary py-3 px-5" />
                            </div>
                        </div>
                    
                    </form>
                </div>
                
                </div>
            </div>
            </div>
        );
    }
}

export default Contact;