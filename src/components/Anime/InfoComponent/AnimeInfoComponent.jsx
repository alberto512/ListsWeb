import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import "./AnimeInfoComponent.css";

const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    if (userToken) {
      return userToken
    } else {
      return undefined
    }
};

class AnimeInfoComponent extends Component {
  state = {
    anime: [],
  };

  async getData() {
    let data = await axios
      .get(
        "https://lists-backend-web.herokuapp.com/api/anime/" +
          this.props.anime.params.id, {
            headers: {
                "Authorization": "Token " + getToken()
            }
          }
      )
      .then(function (response) {
        return response.data;
      });

    this.setState({ anime: data });
  }

  handleDelete = (e) => {
    axios.delete("https://lists-backend-web.herokuapp.com/api/anime/" + this.state.anime.id + "/", {
        headers: {
          "Authorization": "Token " + getToken()
        }
      }
    ).then(
      function () {
        window.location.href = "https://alberto512.github.io/ListsWeb/anime/"
      }
    )
  };

  componentDidMount() {
    document.body.style.backgroundColor = "#1A43A9"
    this.getData();
  }

  render() {
    let path = "/ListsWeb/anime/info/edit/" +  this.state.anime.id;
    return (
      <React.Fragment>
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Paper className="display-item-anime-paper">TITLE<br />{this.state.anime.title}</Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className="display-item-anime-paper">TYPE<br />{this.state.anime.type}</Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className="display-item-anime-paper">SEASONS<br />{this.state.anime.seasons}</Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className="display-item-anime-paper">STATUS<br />{this.state.anime.status}</Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className="display-item-anime-paper">PERSONAL STATUS<br />{this.state.anime.personal_status}</Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className="display-item-anime-paper">PLATFORM<br />{this.state.anime.platform}</Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className="display-item-anime-paper">NEXT SEASON<br />{this.state.anime.next_season}</Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className="display-item-anime-paper">ADDITIONAL COMMENTS<br />{this.state.anime.additional_comments}</Paper>
            </Grid>
            <Grid item xs={6}>
              <NavLink exact activeClassName="current" to={path}>
                <Button className="button-edit">Edit</Button>
              </NavLink>
            </Grid>
            <Grid item xs={6}>
                <Button className="button-delete" onClick={this.handleDelete}>Delete</Button>
            </Grid>
      </Grid>

      </React.Fragment>
    );
  }
}

export default AnimeInfoComponent;