import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  componentDidMount(){
      $.ajax({
          url : "http://localhost:1128/repos",
          method : "GET",
          success : (data)=>{
              this.setState({
                  repos : data
              })
          },
          error :(err)=> {
              console.log(err);
          }
      })
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
      var searchObj = {term: term};
      serverMethods.create(searchObj);
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


var serverMethods = {

    create: (obj) => {
      console.log(obj);
        $.ajax({
            url : "http://localhost:1128/repos",
            method : "POST",
            data : JSON.stringify(obj),
            contentType: "application/json",
            success : (data)=>{console.log(data);},
            error :(err)=> {
                console.log(err);
            }
        })
    },
};