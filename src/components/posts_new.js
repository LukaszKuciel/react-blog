import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { createPost } from '../actions';

class PostsNew extends Component {
    renderField(field){
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label className="col-xs-6">{field.label}</label>
                <div className="text-help col-xs-6 text-xs-right">
                    {touched ? error : ''}
                </div>
                <input type="text" className="form-control" {...field.input} />
            </div>
        );
    }

    onSubmit(values){
        this.props.createPost(values).then(() => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form className="container" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h1 className="col-xs-12">Create Post</h1>
                <div className="col-xs-12">
                    <Field
                        label="Title"
                        name="title" 
                        component={this.renderField}
                    />
                    <Field 
                        label="Categories"
                        name="categories" 
                        component={this.renderField}
                    />
                    <Field 
                        label="Content"
                        name="content" 
                        component={this.renderField}
                    />
                </div>
                <div className="col-xs-6 text-xs-left">
                    <Link className="btn btn-danger" to="/">Cancel</Link>
                </div>
                <div className="col-xs-6 text-xs-right">
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </div>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if(!values.title){
        errors.title = "Enter a title!";
    }

    if(!values.categories){
        errors.categories = "Enter some categories!";
    }

    if(!values.content){
        errors.content = "Enter some content!";
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);