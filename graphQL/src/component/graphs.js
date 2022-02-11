import React, {useEffect} from 'react';
import {useLazyQuery} from '@apollo/client';
import { LIVEPEER_DATA, UNISWAP_DATA } from '../graphql/query';
import { useState } from 'react/cjs/react.development';

const Graph = ({match, setSubgraph}) => {


    useEffect(()=>{

        if(match.params.graph === 'uniswap'){
            setSubgraph('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2');
        }
        else if(match.params.graph === 'livepeer'){
            setSubgraph('https://api.thegraph.com/subgraphs/name/livepeer/livepeer')
        }
        getData();
          },[match.params.graph,]);
          
       const Query = () => {
          if(match.params.graph === 'uniswap')return UNISWAP_DATA;
          else if(match.params.graph === 'livepeer') return LIVEPEER_DATA; 
       }   

const [getData, { data, error, loading }] = useLazyQuery(Query());
    
      if (error){ console.log(error); return <h1> Error found</h1>};
    
      if (data) {
        console.log(data);
      }

   

    return ( <div>
        {
            (!loading)?
            <div>
                {
                    (match.params.graph === 'uniswap')?
                    <div style={{width:"100%", display:"flex", justifyContent:"center", flexWrap:"wrap"}}>
                        <h1 style={{width:"100%", textAlign:"center"}}>Pairs</h1>
                        {
                            data?data.pairs.map((item, i) => (
                                <div key={i} style={{width:"450px", backgroundColor:"skyblue", border:"black solid 2px", margin:".5px", padding:".5rem"}}>
                                    <div>
                                        ID : <b>{item.id}</b>
                                        </div>
                                        <div>reserveUSD :<b>{item.reserveUSD}</b>
                                            </div>
                                    </div>

                            )):null
                        }
                        </div>
                        :
                        <div style={{width:"100%", display:"flex", justifyContent:"center", flexWrap:"wrap"}}>
                             <h1 style={{width:"100%", textAlign:"center"}}>Transcoders</h1>
                     {   data?data.transcoders.map((item, i) => (
                                <div key={i} style={{width:"450px", backgroundColor:"skyblue", border:"black solid 2px", margin:".5px", padding:".5rem"}}>
                                    <div>Total Stake : <b>{item.totalStake}</b>
                                    </div>
                                    <div>
                                    serviceURI :<b>{item.serviceURI}</b>
                                        </div>
                                    </div>
                            )):null
                        }
                            </div>

                }
                </div>:
                <div>
                    Loading....
                    </div>
        }
    </div> );
}
 
export default Graph;