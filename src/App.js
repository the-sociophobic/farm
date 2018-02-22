import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 0,
      users: [
        {
          id: 0,
          name: "Виктор", surname: "Пчела", middlename: "Олегович", status: "надеюсь мне заплатят",
          img: "users/pelevin.jpg", birthday: "22.10.1965", email: "arbitration@pelevin.nov.ru", phone: "+79217406762", city: "Москва", study: "Литературный институт им. Горького",
          rating: 0, roles: ["Постмодернист", "Каратист", "Пчела"], groups: [], bills: [],
          login: "admin", password: "123",
          invitations: [1], board: [1, 2], bill: [],
        },
      ],
      messages: [
        { from: 1, to: 0, text: "", date: "", unread: true },
        { from: 1, to: 0, text: "", date: "", unread: true },
        { from: 2, to: 0, text: "", date: "", unread: true },
        { from: 3, to: 0, text: "", date: "", unread: true },
      ],
      group: -1,
      groups: [
        { name: "", img: "", cover: "", posts: []},
      ],
      page: "user",
      pages: [
        { id: "messages", label: "Сообщения" },
        { id: "groups", label: "Сообщества" },
        { id: "board", label: "Доска объявлений" },
        { id: "bank", label: "Выписка" },
        { id: "news", label: "Лента" },
        { id: "settings", label: "Настройки" },
      ],

      login: "", password: "", loginError: false,
    };
  }

  setPage(page) {
    this.setState({ page: page });
  }
  tryLogin() {
    var logged = this.state.users.find(user => {
      return user.login === this.state.login && user.password === this.state.password;
    });
    if (logged)
      this.setState({ user: logged.id,
                      loginError: false,
                      page: "news" });
    else
      this.setState({ loginError: true });
  }
  logout() {
    this.setState({
      page: "login",
      user: -1,
    });
  }

  renderUserIcon() {
    var user = this.state.users[this.state.user];

    return (
      <div className="box">
        <div className={this.state.page === "user" ? "crop rectangle" : "crop circle"}>
          <img className="avatar" src={user.img} onClick={() => this.setPage("user")} />
        </div>
        <p className="name">{user.name} {user.surname}</p>
      </div>
    );
  }
  renderMenu() {
    var user = this.state.users[this.state.user];

    return this.state.pages.map(page => {
      return (
        <button className={page.id} onClick={() => this.setPage(page.id)}>
          <p>{page.label}</p>{this.renderNumberOf(page.id)}
        </button>
      );
    });
  }
  renderNumberOf(page) {
    var number = 0;

    switch (page) {
      case "messages":
        var messages = this.state.messages.filter(message => {
          return message.to === this.state.user && message.unread;
        });
        number = messages.filter((message, index, self) => {
          return self.indexOf(self.find(msg => { return msg.from === message.from; })) === index;
        }).length;
        break;
      case "groups":
        number = this.state.users[this.state.user].invitations.length;
        break;
      case "board":
        number = this.state.users[this.state.user].board.length;
    }
    if (number > 0)
      return (<p className="number">{number}</p>);
    return "";
  }
  renderPage() {
    switch (this.state.page) {
      case "user":
        return this.renderUserPage();
      case "messages":
        return this.renderMessagesPage();
      case "groups":
        return this.renderGroupsPage();
      case "board":
        return this.renderBoardPage();
      case "bank":
        return this.renderBankPage();
      case "news":
        return this.renderNewsPage();
      case "settings":
        return this.renderSettingsPage();
    }
  }

  render() {
    if (this.state.user == -1) {
      var login = "";
      var password = "";

      return(
        <div className="main-container">
          <div className="auth-container">
            <h3>Авторизация</h3>
            <div className="container">
              {this.state.loginError ? (<p className="error">Неверный логин/пароль</p>) : ""}
              <input type="text" value={this.state.login} onChange={(event) => this.setState({ login: event.target.value })} className="login" placeholder="Логин" />
              <input type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} className="login" placeholder="Пароль" />
              {/* <button className="forget">Забыли пароль?</button> */}
              <button className="login" onClick={() => this.tryLogin()}>Войти</button>
              {/* У вас ещё нет аккаунта? <button className="forget right">Регистрация</button> */}
            </div>
          </div>
        </div>
      );
    }

    return (
      <section className="content">
        <div className="main-container">
          <div className="menu-container">
            {this.renderUserIcon()}
            {this.renderMenu()}
          </div>
          <div className="content-container">
            {this.renderPage()}
          </div>
        </div>
      </section>
    );
  }

  /* PAGES FOR DIFFERENT FILES MAY BE LATER I GUESS...... */
  renderUserPage() {
    var user = this.state.users[this.state.user];
    return (
      <div>
        <div className="box">
          <h3>{user.name} {user.surname}</h3>
          <p>{user.status}</p>
          <div className="half">
            <div className="container">{user.phone}</div>
            <div className="container">{user.birthday}</div>
          </div>
          <div className="half">
            <div className="container">{user.email}</div>
            <div className="container">{user.city}</div>
          </div>
          <div className="container"><p className="grey">Образование</p><p>{user.study}</p></div>
        </div>
        <div className="box">
          <h3>Мои роли</h3>
          <div className="role-crop">
            <div className="role-line">
            {
              user.roles.map(role => {
                return (<div className="role">{role}</div>);
              })
            }
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderMessagesPage() {
    return (
      <div>
        Messages
      </div>
    );
  }

  renderGroupsPage() {
    return (
      <div>
        Groups
      </div>
    );
  }

  renderBoardPage() {
    return (
      <div>
        Board
      </div>
    );
  }

  renderBankPage() {
    return (
      <div>
        Bank
      </div>
    );
  }

  renderNewsPage() {
    return (
      <div>
        News
      </div>
    );
  }

  renderSettingsPage() {
    return (
      <div>
        Settings
      </div>
    );
  }
}

export default App;
