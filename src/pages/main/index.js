import React, { Component } from "react";
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component {
    constructor(props) {
        super(props);
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.loadFollowers(this.state.value);
        this.loadFollowing(this.state.value);
        this.loadUser(this.state.value);

        event.preventDefault();
    }

    state = {
        followers: [],
        following: [],
        user: [],
    };

    componentDidMount(){
        this.loadFollowers();
        this.loadFollowing();
        this.loadUser();
    };

    loadFollowers = async (user = 'valdeirch') => {
        const responseFollowers = await api.get(`/users/${user}/followers`);

        this.setState( { followers: responseFollowers.data });
    };

    loadFollowing = async (user = 'valdeirch') => {
        const responseFollowing = await api.get(`/users/${user}/following`);

        this.setState( { following: responseFollowing.data});
    };

    loadUser = async (user = 'valdeirch') => {
        const resposneUser = await api.get(`/users/${user}`);

        this.setState( { user: resposneUser.data});
    };

    render(){
        const { followers, following, user } = this.state;
        
        return (
            <div className="github-list">
                <div className='form-div'>
                    <form onSubmit={this.handleSubmit}>
                        <input placeholder="Digite o usuario" type="text" value={this.state.value} onChange={this.handleChange} />
                        <input type="submit" value="Procurar" />
                    </form>
                </div>
                <div className="user-div">
                    <article key={user.id}>
                        <strong>{user.login}</strong>
                        <img src={user.avatar_url}/>
                        <a href={user.html_url} target="_BLANK">{user.html_url}</a>
                    </article>
                </div>
                <div className="follow-container">
                    <div className="following">
                        <p>Seguindo: {user.following}</p>
                        {following.map(follow => (
                            <article key={follow.id}>
                                <strong>{follow.login}</strong>
                                <img src={follow.avatar_url}/>
                                <a href={follow.html_url} target="_BLANK">{follow.html_url}</a>
                            </article>
                        ))}
                    </div>
                    <div className="followers">
                        <p>Seguidores: {user.followers}</p>
                        {followers.map(follower => (
                            <article key={follower.id}>
                                <strong>{follower.login}</strong>
                                <img src={follower.avatar_url}/>
                                <a href={follower.html_url} target="_BLANK">{follower.html_url}</a>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}