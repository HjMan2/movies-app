const Input = ({name, label, error, value, ...rest}) => {
    console.log(value)
    return (
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <input value={value} {...rest} name={name} id={name} className="form-control" />
                {error && <div className="alert alert-danger">{error}</div>}
            </div>        
    );
}
 
export {Input};