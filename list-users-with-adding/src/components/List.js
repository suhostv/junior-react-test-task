import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function List () {
  const [users, setUsers] = React.useState([]);
  const [isDeleteAll, deleteAll] = React.useState(false);
  const [deleteId, deleteById] = React.useState(null);

  const fetchUsers = () => {
    fetch('https://node-user-service.herokuapp.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
      fetchUsers();

      return () => setUsers([]);
    }, []
  );

  React.useEffect(() => {
      if (isDeleteAll) {
        fetch(`https://node-user-service.herokuapp.com/users`, {
          method: 'DELETE'
        })
          .then(() => {
            deleteAll(false)
          })
          .then(() => fetchUsers())
          .catch((err) => console.log(err));
      }

      return () => deleteAll(false);
    }, [isDeleteAll]
  );

  React.useEffect(() => {
      if (deleteId) {
        fetch(`https://node-user-service.herokuapp.com/users/${deleteId}`, {
          method: 'DELETE'
        })
          .then(() => {
            deleteById(null)
          })
          .then(() => fetchUsers())
          .catch((err) => console.log(err));
      }

      return () => deleteById(false);
    }, [deleteId]
  );

  const onDeleteUser = (id) => {
    deleteById(id);
  };

  const onDeleteAll = () => {
    deleteAll(true);
  };


  return (
    <div>
      <h1>Welcome to the List Page!</h1>
      <Paper className='paper'>
        <Table className='table' size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Position</TableCell>
              <TableCell align="center">Birthday</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Works Remotely</TableCell>
              <TableCell align="center">Delete User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(row => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.position}</TableCell>
                <TableCell align="center">{row.birthdate}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.worksRemotely ? 'yes' : 'no'}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => onDeleteUser(row._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <div className='footer-buttons-container'>
        <Button variant="contained" color="primary">
          <Link to='/add'>Add User</Link>
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onDeleteAll}
        >
          Delete All
        </Button>
      </div>
    </div>
  )
}

export default List