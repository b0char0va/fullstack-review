import React from 'react';

const Repos = (props) => (
    <div>
        {props.repo.username}
        <a href={props.repo.repo_url}>{props.repo.repo_name}</a>
    </div>
)

export default Repos;