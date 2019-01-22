import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPost() {
        const posts = this.props.posts;
        return Object.keys(posts).map((id, i) => {
            return (
                <li className="list-group-item" key={id}>
                    <h2><Link to={`/posts/${id}`}>{posts[id].title}</Link></h2>
                </li>
            );
        });
    }

    render() {
        return (
            <div className="container">
                <h1 className="col-md-6">Posts</h1>
                <div className="col-md-6 text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">Create new post</Link>
                </div>
                <ul className="list-group col-md-12">
                    {this.renderPost()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { posts : state.posts}
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);