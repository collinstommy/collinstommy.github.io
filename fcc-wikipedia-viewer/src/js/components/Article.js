/*jshint esversion: 6 */

import React from "React";

export default class Article extends React.Component {
    render(){
        const {title, link, body} = this.props;
        return (
            <div>
                <a href="link"><article><h4>{title}</h4><p>{body}</p></article></a>
            </div>
        );
    }
}