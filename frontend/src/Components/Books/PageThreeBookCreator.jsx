import {Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper} from '@mui/material'
import React from 'react'

function createData(template, title, unitname, grade) {
    return { template, title, unitname, grade};
  }
const rows = [
    createData('Template', 0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
class PageThreeBookCreator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //ListHere
            template: "Template 1",
            title: "Title of Book",
            unitname: "Unit 1",
            grade: "4"
        }
    }
    

    render() {
        //Pre  
        return (
            <Box textAlign="center" display={'flex'} justifyContent={'center'} height={400}>
                <div textAlign='center'>
                    <h1>Summary</h1>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="center">Template</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Unit Name</TableCell>
                                <TableCell align="center">Grade</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableCell align="center">{this.state.template}</TableCell>
                                <TableCell align="center">{this.state.title}</TableCell>
                                <TableCell align="center">{this.state.unitname}</TableCell>
                                <TableCell align="center">{this.state.grade}</TableCell>

                            {/* {rows.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">template</TableCell>
                                <TableCell align="center">{this.props.title}</TableCell>
                                <TableCell align="center">{this.props.unitname}</TableCell>
                                <TableCell align="center">{this.props.grade}</TableCell>
                                </TableRow>
                            ))} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                
            </Box>

        )
        }
}

export default PageThreeBookCreator
