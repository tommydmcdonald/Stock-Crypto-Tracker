import React from 'react';
import { Col } from 'react-materialize';

const Landing = () => {
   return ([
     <header className="masthead">
       <div className="intro-body">
         <div className="container">
           <div className="row">
             <div className="">
               <h1 className="brand-heading">Cryptofluence</h1>
                  <p className="intro-text">A Free, Realtime, Stock and Cryptocurrency Portfolio Tracker.
                    <br/>Created by Florida State University Students.<br/>
                    <a href="/auth/google"><img className="googleSignInLanding" src={require('../img/google.png')} /></a>
                 </p>
              </div>
           </div>
         </div>
       </div>
     </header>,

     <section id="contact" className="content-section text-center">
         <div className="container">
           <div className="row">
             <div className="center mx-auto">
               <h2>Contact Cryptofluence Developers</h2>
               <p>Feel free to leave us a comment</p>
               <ul className="list-inline banner-social-buttons">
                 <li className="list-inline-item">
                   <a href="" className="btn btn-default btn-lg">
                     <i className="fa fa-twitter fa-fw"></i>
                     <span className="network-name">Twitter</span>
                   </a>
                 </li>
                 <li className="list-inline-item">
                   <a href="" className="btn btn-default btn-lg">
                     <i className="fa fa-github fa-fw"></i>
                     <span className="network-name">Github</span>
                   </a>
                 </li>
                 <li className="list-inline-item">
                   <a href="" className="btn btn-default btn-lg">
                     <i className="fa fa-google-plus fa-fw"></i>
                     <span className="network-name">Google+</span>
                   </a>
                 </li>
               </ul>
             </div>
           </div>
         </div>
       </section>,

       <footer>
        <div className="copyRight">
          <p>Copyright &copy; Cryptofluence 2018</p>
        </div>
      </footer>

   ])
}

export default Landing;
