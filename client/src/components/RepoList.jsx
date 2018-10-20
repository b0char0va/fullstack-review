import React from 'react';
import Repos from './Repos.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.

      {
          props.repos.map((el)=>{
              return (
              <Repos repo={el}/>
             )
          })
      }

  </div>
)

export default RepoList;