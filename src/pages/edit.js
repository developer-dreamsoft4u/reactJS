import React, { Component } from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import global from './global';

export default class EditPage extends Component {

    constructor(props) {
        super(props);
        this.url = global.BASE_URL+global.SINGLE_USER_URL;
        this.token = localStorage.getItem('token');
    }

    state = {
        id: '',
        redirect: false,
        isLoading: false
    };

    componentDidMount() {
        const id = this.props.location.search[4];
        var config = {
            method: 'get',
            url: this.url+ '/'  + id,
            };
            
        axios(config)
            .then(response => {
            const employees = response.data.data;
            console.log(employees);
            document.getElementById('inputFirstName').value = employees.first_name;
            document.getElementById('inputLastName').value = employees.last_name;
            document.getElementById('inputEmail').value = employees.email;
            this.setState({ employees });            
        })
        .catch(error => {
            console.log(error);
            
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const url = global.BASE_URL+global.SINGLE_USER_URL+ '/' +  this.state.id;
        
        const first_name = document.getElementById('inputFirstName').value;
        const last_name = document.getElementById('inputLastName').value;
        const email = document.getElementById('inputEmail').value;
        
        var data = JSON.stringify({
            "first_name": first_name,
            "last_name": last_name,
            "email": email
          });

        var config = {
            method: 'put',
            url: url,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
        axios(config)
          .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                this.setState({redirect: true, isLoading: false})
            }
        })
        .catch(error => {
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
                                <li className="breadcrumb-item active">Edit</li>
                            </ol>
                        </div>
                        <div className="container-fluid">
                            <div className="card mx-auto">
                                <div className="card-header">Employee Edit</div>
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
                                        <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Update Employee &nbsp;&nbsp;&nbsp;
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
                                    <span>Copyright © Your Website 2019</span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}


