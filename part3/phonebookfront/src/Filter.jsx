const Filter = ({filter, setFilter}) => {
    const handleFilterChange = e => setFilter(e.target.value)
    return (
        <div>
            filter shown with
            <input type="search" value={filter} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter