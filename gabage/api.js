import React, { Component } from "react";


export default class extends Component{
    constructor(){
        super()
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        this.callApi
    }


callApi=async()=>{

    let resp = await fetch('htttp/lskjfdl')
let respjson = await resp.json();
this.setState({data:respjson})
}
}