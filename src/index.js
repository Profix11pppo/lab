import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

//ReactDOM.render(<App />, document.getElementById('root'));

function UserAvatar(props) {
  return <img src={props.src} width={props.width} height={props.height} />;
}

function UserCard(props) {
  const avatar_width = "auto";
  const avatar_height = "auto";
  return (
    <div class="card">
      <UserAvatar
        src={props.user.picture.large}
        width={avatar_width}
        height={avatar_height}
      />
      <div className="userprop_wrap">Имя: {props.user.name.first}</div>
      <div className="userprop_wrap">Фамилия: {props.user.name.last}</div>
      <div className="userprop_wrap">Пол: {props.user.gender}</div>
      <div className="userprop_wrap">
        Город проживания: {props.user.location.city}
      </div>
      <div className="userprop_wrap">Телефон: {props.user.phone}</div>
    </div>
  );
}

function UserList(props) {
  return (
    <div>
      {props.users.map(user => (
        <UserCard user={user} />
      ))}
    </div>
  );
}

function Preloader(props) {
  const preloader_width = "60";
  const preloader_src =
    "https://upload.wikimedia.org/wikipedia/commons/2/28/InternetSlowdown_Day.gif";
  return (
    <div class="preloader_wrap">
      <img src={preloader_src} width={preloader_width} />
    </div>
  );
}

function Button(props) {
  return (
    <div class="button_wrap">
      <button onClick={props.onClick}>{props.label}</button>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "Получить",
      pushed: false
    };

    this.state.users = [];
    this.loadInfo = this.loadInfo.bind(this);
  }

  loadInfo() {
    this.setState({ pushed: true });
    let url = "https://randomuser.me/api/?results=10";
    fetch(url)
      .then(response => response.json())
      .then(jsonData => {
        this.setState({
          users: jsonData.results,
          pushed: false
        });
      })
      .catch(error => {
        this.setState({ pushed: false });
        alert("HTTP error: " + error);
      });
  }

  render() {
    const pushed = this.state.pushed;
    return (
      <div>
        <h3>Лабораторная работа №5</h3>
        <Button label={this.state.label} onClick={this.loadInfo} />
        {pushed && <Preloader />}
        <UserList users={this.state.users} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
