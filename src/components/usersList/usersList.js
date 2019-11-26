import React from "react";
import TriggerPath from '../link/link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import './usersList.css';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  {id: "avatar_url", label: "Avatar"},
  {id: "name", label: "Go To Name"},
  {id: "location", label: "Location"},
  {id: "bio", label: "Bio"},
  {id: "followers", label: "Followers"},
  {id: "public_repos", label: "Public Repos"}
];

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function UsersList(props) {
  console.log('UsersList ************************************** props',props);
  const {usersList, userCard} = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("followers");

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  return (
    <div>
      <Paper>
        <div>
          <Table
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(usersList, getSorting(order, orderBy)).map(
                (row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.name}
                    >

                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <img src={row.avatar_url} alt={row.login}/>
                      </TableCell>
                      <TableCell align="left">
                        <div onClick={()=> userCard(row)} >
                          <TriggerPath path={{url: `/user/${row.login}`, name: row.name}}>
                          </TriggerPath>
                        </div>

                      </TableCell>
                      <TableCell align="left">{row.location}</TableCell>
                      <TableCell align="left">{row.bio ? row.bio : "No Bio"}</TableCell>
                      <TableCell align="right">{row.followers}</TableCell>
                      <TableCell align="right">{row.public_repos}</TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  );
}

export default UsersList;
