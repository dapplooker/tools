import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

   

    return ( <div style={{width:"100%",display:"flex", justifyContent:"center"}}>
        <div style={{width:"130px",height:'60px', padding:"1rem", boxSizing:"border-box", backgroundColor:"coral", border:"black solid 2px", margin:"1rem"}}>

    <Link to="uniswap/uniswap-v2">Uniswap V2</Link>

        </div>
        <div style={{width:"130px",height:'60px', padding:"1rem", boxSizing:"border-box", backgroundColor:"coral", border:"black solid 2px", margin:"1rem"}}>
    <Link to="livepeer/livepeer">livepeer</Link>

        </div>
    </div> );
}
 
export default Home;