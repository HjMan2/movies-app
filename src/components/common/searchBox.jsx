export const SearchBox = ({value, onChange}) => {
    return (
        <input vlaue={value} type="text" name="query" onChange={(e) =>onChange(e.currentTarget.value)} placeholder="Search..." className="form-control mb-3"/>
    )
}
