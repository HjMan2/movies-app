import { Component } from 'react';
import { Input } from './input'
import { Select } from './select'
import Joi from 'joi-browser'

class Form extends Component {
    state = { 
        data: {},
        errors: {}
    }

     validate = () => {
        const options = {abortEarly: false}
        const result = Joi.validate(this.state.data, this.schema, options)
        const { error } = result;
        if(!error) return null
        const errors = {}
        for(let item of error.details)
            errors[item.path[0]] = item.message;
        return errors
    }

    
    validateProperty = ({name, value}) => {
        const obj  = { [name]: value }
        const schema = { [name]: this.schema[name] }
        const { error } = Joi.validate(obj, schema)
        return error ? error.details[0].message : null;
    }

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate()
        this.setState({errors:errors || {}})
        if(errors) return;
        this.doSubmit()
    }

    handleChange = ({currentTarget: input}) => {
        const data = {...this.state.data}
        const errors = {...this.state.errors }
        const errroMessage = this.validateProperty(input)
        if(errroMessage) errors[input.name] = errroMessage
        else delete errors[input.name];
        data[input.name] = input.value;
        this.setState({errors, data})
    }

    renderSelect(name, label, options) {
        const {data, errors} = this.state;
        return(
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange}
                error={errors[name]}
            />
        )
    }

    renderInput = (name, label, type='text') =>{
        const {data, errors} = this.state;
        return (
            <Input type={type} value={data[name]} error={errors[name]} onChange={this.handleChange} label={label} name={name}/>
        )
    }

    renderButton = (label) => {
        return (
            <button disabled={this.validate()} className="btn btn-primary">{label}</button>
        )
    }

}
 
export default Form;