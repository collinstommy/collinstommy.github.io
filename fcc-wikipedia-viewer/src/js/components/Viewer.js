/*jshint esversion: 6 */

import React from "React";
import Article from "./Article";
import fetchJsonp from "fetch-jsonp";

export default class Viewer extends React.Component {
    //title link body
    constructor(){
        super();
        this.state = { data: [] };
    }

     makeAPICall(input){
        var apiCall = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + input + "&limit=10&format=json&callback=callback";
        fetchJsonp(apiCall)
        .then((response) => {
            return response.json();
        }).then((json) => {
            this.setArticles(json);
        }).catch(function(ex) {
            console.log('parsing failed', ex);
        });
    }

    componentDidMount(){
       this.makeAPICall(this.props.input);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps != this.props){
            this.makeAPICall(this.props.input);
        }
    }

    setArticles(data){
        console.log(data);
        const results = data[1].map((item, i) => {
           return <Article title = {item} body = {data[2][i]} link = {data[3][i]} />
        }); 
        return this.setState({Articles: results });
    }

    render(){
        return (
            <div class="row">
                <div class="col-md-6 col-xs-10 col-md-offset-3 col-xs-offset-1">
                    <div id="articles">
                        {this.state.Articles}
                    </div>
                </div>
            </div>
        );
    }
}

