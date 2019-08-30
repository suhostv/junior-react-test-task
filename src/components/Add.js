import React from 'react'
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';

function Add(props) {
  const [sendRequest, setSendRequest] = React.useState(false);
  const [isValidationError, setValidationError] = React.useState(true);
  const [values, setValues] = React.useState({
    name: '',
    position: '',
    birthdate: null,
    description: '',
    worksRemotely: false
  });

  React.useEffect(() => {
    const { name, birthdate, position } = values;
    name && birthdate && position && birthdate !== 'Invalid Date' ? setValidationError(false) : setValidationError(true)

      return () => setValidationError(false)
    }, [values]
  );

  React.useEffect(() => {
      if (sendRequest) {
        fetch(`https://node-user-service.herokuapp.com/users`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
          .then(() => {
            setSendRequest(false)
          })
          .then(() => {
            props.history.push('/')
          })
          .catch((err) => console.log(err));
      }

      return () => setSendRequest(false);
    }
  );

  const onAddUser = () => {
    setSendRequest(true)
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCheckboxChange = name => event => {
    setValues({ ...values, [name]: event.target.checked });
  };

  const handleBirthdayChange = prop => event => {
    setValues({ ...values, [prop]: event ? event.toLocaleString([], { year: "numeric", month: "2-digit", day: "2-digit" }) : event });
  };

  return (
    <div>
      <h1>Add User</h1>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <span>* - required fields</span>
        <form className='form' autoComplete="off">
          <FormGroup>
          <TextField
            id="outlined-name"
            label="*Name"
            className='name'
            value={values.name}
            onChange={handleChange('name')}
            margin="normal"
            variant="outlined"
          />

          <InputLabel htmlFor="position">*Position</InputLabel>
          <Select
            value={values.position}
            onChange={handleChange('position')}
            inputProps={{
              name: 'position',
              id: 'position',
            }}
          >
            <MenuItem value={'Manager'}>Manager</MenuItem>
            <MenuItem value={'Developer'}>Developer</MenuItem>
            <MenuItem value={'QA'}>QA</MenuItem>
          </Select>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="*Birthday(MM/DD/YYYY)"
              value={values.birthdate}
              onChange={handleBirthdayChange('birthdate')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>

          <TextField
            id="outlined-dense-multiline"
            label="Description"
            className='description'
            value={values.description}
            onChange={handleChange('description')}
            margin="dense"
            variant="outlined"
            multiline
            rowsMax="4"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={values.worksRemotely}
                onChange={handleCheckboxChange('worksRemotely')}
                value='worksRemotely'
                color="primary"
              />
            }
            label="Works Remotely"
          />
          </FormGroup>
        </form>
        <div className='footer-buttons-container'>
          <Button variant="contained" color="primary">
            <Link to='/'>Back</Link>
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onAddUser}
            disabled={isValidationError}
          >
            Add
          </Button>
        </div>
      </Grid>
    </div>
  )
}

export default Add