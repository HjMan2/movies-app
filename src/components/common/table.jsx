import {TableHeader} from './tableHeader'
import {TableBody} from './tableBody'

const Table = ({onSort, columns, data, sortColumn}) => {
    return (
        <table className="table">
          <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort}/>
          <TableBody data={data} columns={columns} />
        </table>
    );
}
 
export  {Table};