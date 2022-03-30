import React, { Component } from "react";
import config from "../../setup/config";

export default class Searchbar extends Component {
  state = {
    text: "",
  };

  handleInput(e) {
    this.setState({ text: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { text } = this.state;

    var requestOptions = {
      headers: {
        Authorization: "Bearer " + this.props.accessToken,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        `${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`,
        requestOptions
      ).then((data) => data.json());

      const tracks = response.tracks.items;
      this.props.onSuccess(tracks);
    } catch (e) {
      alert(e);
    }
  }

  render() {
    return (
      <form className="form-search" onSubmit={(e) => this.handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            name="query"
            placeholder="Search..."
            onChange={(e) => this.handleInput(e)}
            required
          />
          <input type="submit" className="btn-primary" value="Search" />
        </div>
      </form>
    );
  }
}

export { Searchbar };