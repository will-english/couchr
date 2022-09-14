import React, { Component } from 'react'
import { AuthContext } from '../auth/auth_provider';
import "../CSSfile/CreateNewListForm.css";

export default class NewList extends Component {
  static contextType = AuthContext

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ [event.target.name]: value })
    console.log("this.props: ", this.props)
  }

  async handleSubmit(event) {
    event.preventDefault();
    let data = {
      ...this.state,
    };

    const url = `http://localhost:8000/api/lists/user/${this.context.userName}/`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.context.token}`
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newList = await response.json();
      console.log("newList: ", newList)
      this.props.afterSubmit(newList);
      const cleared = {
        name: '',
        description: '',
      };
      this.setState(cleared);


      // if list successfully created with POST, then call PUT and add movie to list

      // get new list ID
      const new_list_id = newList.id

      // get URL
      const url_put = `http://localhost:8000/api/lists/user/${this.context.userName}/${new_list_id}/movies/`

      // get movie details
      const movie = this.props.movie

      // setup JSON
      const fetchConfig = {
        method: "PUT",
        body: JSON.stringify(movie),
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.context.token}`
        },
      };

      // call PUT method
      const response_put = await fetch(url_put, fetchConfig)

      if (response_put.ok) {
        console.log("response ok~~~~~~~~~~~~~~~")
        document.getElementById("popup_message_id").className = "alert alert-success popup_message"
        setTimeout(function () {
          document.getElementById("popup_message_id").className = "d-none";
        }, 5000);
      } else {
        document.getElementById("popup_error_message_id").className = "alert alert-danger popup_message"
        setTimeout(function () {
          document.getElementById("popup_error_message_id").className = "d-none";
        }, 3000);
      }
    }
  }

  render() {
    return (
      <div className="modal fade create_list_form" id="listForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">New List</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Name</label>
                  <input value={this.state.name} onChange={this.handleChange} type="text" className="form-control" id="recipient-name" name="name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label" >Description</label>
                  <textarea value={this.state.description} onChange={this.handleChange} type="text" className="form-control" id="message-text" name="description"></textarea>
                </div>

                <button type="button" className="btn btn-danger create_list_form_close_button" data-bs-dismiss="modal">Close</button>
                <button className="btn btn-primary create_list_form_create_button" data-bs-dismiss="modal">Create</button>

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}