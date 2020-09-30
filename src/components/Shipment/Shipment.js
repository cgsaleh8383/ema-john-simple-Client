import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
    table: {
        minWidth: 400,
    },
});

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => {
        console.log('from submitted', data)
    };

    console.log(watch("example"));
    const classes = useStyles();

    return (
        < form  onSubmit = { handleSubmit(onSubmit) } >
            <div className="ship-from">
                < input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
                {errors.name && <span className="error">Name is required</span>}

                < input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='Your Email' />
                {errors.email && <span className="error">Email is required</span>}

                < input name="address" ref={register({ required: true })} placeholder='Your Address' />
                {errors.address && <span className="error">Address is required</span>}

                < input name="phone" ref={register({ required: true })} placeholder='Your Phone Number' />
                {errors.phone && <span className="error">Phone Number is required</span>}

                < input name="country" ref={register({ required: true })} placeholder='Your Country Name' />
                {errors.country && <span className="error">Country Name is required</span>}

                < input name="ZipCode" ref={register({ required: true })} placeholder='Your Country Zip Code' />
                {errors.zipCode && <span className="error">Zip Code is required</span>}

                <input type="submit" />
         </div>

            <div style={{ width: '600px', margin: '-340px 40px 0 0', float: 'right'}}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                                <StyledTableCell align="right">Calories</StyledTableCell>
                                <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                                <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                    <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                    <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>  
           </div>
        </form >

      
  );

};

export default Shipment;