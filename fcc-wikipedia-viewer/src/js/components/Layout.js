/*jshint esversion: 6 */

import React from "React";
import Viewer from "./Viewer";

export default class Layout extends React.Component {
    constructor(){
        super();
        this.state = {input: ""};
    }

    handleChange(e) {
        const searchTerm = e.target.value;
        this.setState({input :  searchTerm});
    }

    render(){
        return (
            <div>
                <link rel="stylesheet" type="text/css" href={"style.css"} />
                <div class="row">
                    <div class="col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1 text-center title">
                        <h2> Wikipedia Viewer</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 col-md-offset-3  col-xs-10 col-xs-offset-1 box">
                        <div class="row">
                        <div class="col-md-4 col-md-offset-2">
                            <input onChange={this.handleChange.bind(this)} class="form-control" id="input" placeholder="Search" />
                        </div>
                        <div class="col-md-4">
                            <a href="https://en.wikipedia.org/wiki/Special:Random" target="_blank" class="btn btn-default">Random Article</a></div>
                        </div>
                    </div>
                </div>
                    <Viewer input = {this.state.input}/>
                    <div class="row">
                        <div class="col-md-2 col-md-offset-5 col-xs-10  col-xs-offset-1 col-md-offset-5 text-center footer text-center">
                            <footer class="signature">
                            Made by <a href="https://s.codepen.io/collinstommy/debug/qNbLBz" target="_blank"> Tom Collins </a> 
                            </footer>
                        </div>  
                    </div>
            </div>
        );
    }
}