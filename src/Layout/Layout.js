import React from 'react';

import NavBar from './Navigation/NavBar.js';
import Footer from './Footer.js';


 const Layout = (props) =>
 {
   return(
     <>
     <NavBar />
     {props.children}
     <Footer />
     </>
   );
 }


export default Layout;
