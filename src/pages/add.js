import React, {Component} from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';
import global from './global';
import { post } from './api';

export default class AddPage extends Component {

    state = {
        redirect: false,
        toDashboard: false,
        isLoading: false
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const url = global.BASE_URL+global.SINGLE_USER_URL;
        
        const first_name = document.getElementById('inputFirstName').value;
        const last_name = document.getElementById('inputLastName').value;
        const email = document.getElementById('inputEmail').value;

        var data = JSON.stringify({
            "first_name": first_name,
            "last_name": last_name,
            "email": email
          });

        // var config = {
        //     method: 'put',
        //     url: url,
        //     headers: { 
        //       'Content-Type': 'application/json'
        //     },
        //     data : data
        //   };
          
        // axios(config)
        //   .then(response => {
        //     console.log(response.data);
        //     if (response.status === 200) {
        //         this.setState({redirect: true, isLoading: false})
        //     }
        // })
        // .catch(error => {
        //     this.setState({ toDashboard: true });
        //     console.log(error);
        // });

        post(global.SINGLE_USER_URL, data).then(response => {
            if (response.status === 200) {
                this.setState({redirect: true, isLoading: false})
            }
        }).catch(error => {
            this.setState({ toDashboard: true });
            console.log(error);
        });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/dashboard' />
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        if (this.state.toDashboard === true) {
            return <Redirect to='/index' />
        }
        return (
            <div>
                <Header/>
                <div id="wrapper">
                    <Sidebar></Sidebar>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'} >Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Add</li>
                            </ol>
                        </div>
                        <div className="container-fluid">
                            <div className="card mx-auto">
                                <div className="card-header">Employee Add</div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputFirstName" className="form-control" placeholder="Enter First Name" required="required" autoFocus="autofocus" />
                                                        <label htmlFor="inputFirstName">Enter First Name</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputLastName" className="form-control" placeholder="Enter Last Name" required="required" />
                                                        <label htmlFor="inputLastName">Enter Last Name</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="email" id="inputEmail" className="form-control" placeholder="Enter Email" required="required" autoFocus="autofocus" />
                                                        <label htmlFor="inputEmail">Enter Email</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Add Employee &nbsp;&nbsp;&nbsp;
                                            {isLoading ? (
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                             ) : (
                                                 <span></span>
                                             )}
                                        </button>
                                    </form>
                                    {this.renderRedirect()}
                                </div>
                            </div>
                        </div>

                        <footer className="sticky-footer">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright © Your Website <div>{(new Date().getFullYear())}</div></span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}
