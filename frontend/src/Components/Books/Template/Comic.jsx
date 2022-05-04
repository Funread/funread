/* explain the states, 
explain technical debt (page is not responsive)
*/

import React from "react";
import { Container, Box, Grid, Paper, Image} from '@mui/material'

class Comic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //ListHere
            img1: this.props.img1 || "/img/empty.jpeg",
            text1: this.props.text1 || "insert text",
            img2: this.props.img2 || "/img/empty.jpeg",
            text2: this.props.text2 || "insert text",
            img3: this.props.img3 || "/img/empty.jpeg",
            text3: this.props.text3 || "insert text",
            img4: this.props.img4 || "/img/empty.jpeg",
            text4: this.props.text4 || "insert text"
               
        }
    }

    render() {
        const styleimage1 = `backgroundImage: url(this.state.img1)`;
        return (
            //Return Here component or html code
            <div className="Comic">
            <Container fixed>
                <Grid container spacing={6} sx={{justifyContent: 'center'}}>
                    <Grid item xs={5}>
                        <Box sx={{ bgcolor: 'lightgrey', height: '40vh', width: '60vh', textAlign:"center"}}>
                            <Paper variant='outlined'>
                                <div  style={{ 
                                                backgroundImage: `url("/img/empty.jpeg")`,
                                                backgroundSize:  'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                                width: '60vh',
                                                height: '40vh'
                                                }}>
                                    <p style={{
                                        margin: 0,
                                    }} >Text here</p>
                                </div>
                                {/* <img height={300} width={300} src={this.state.img1} /> */}

                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item xs={5}>
                        <Box sx={{ bgcolor: 'lightgrey', height: '40vh', width: '60vh', textAlign:"center"}}>
                            <Paper variant='outlined'>
                                <div  style={{ 
                                                backgroundImage: `url("/img/empty.jpeg")`,
                                                backgroundSize:  'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                                width: '60vh',
                                                height: '40vh'
                                                }}>
                                    <p style={{
                                        margin: 0,
                                    }} >Text here</p>
                                </div>
                                {/* <img height={300} width={300} src={this.state.img1} /> */}

                            </Paper>
                        </Box>
                    </Grid>

                    <Grid item xs={5}>
                        <Box sx={{ bgcolor: 'lightgrey', height: '40vh', width: '60vh', textAlign:"center"}}>
                            <Paper variant='outlined'>
                                <div  style={{ 
                                                backgroundImage: `url("/img/empty.jpeg")`,
                                                backgroundSize:  'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                                width: '60vh',
                                                height: '40vh'
                                                }}>
                                    <p style={{
                                        margin: 0,
                                    }} >Text here</p>
                                </div>
                                {/* <img height={300} width={300} src={this.state.img1} /> */}

                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item xs={5}>
                        <Box sx={{ bgcolor: 'lightgrey', height: '40vh', width: '60vh', textAlign:"center"}}>
                            <Paper variant='outlined'>
                                <div  style={{ 
                                                backgroundImage: `url("/img/empty.jpeg")`,
                                                backgroundSize:  'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                                width: '60vh',
                                                height: '40vh'
                                                }}>
                                    <p style={{
                                        margin: 0,
                                    }} >Text here</p>
                                </div>
                                {/* <img height={300} width={300} src={this.state.img1} /> */}

                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
                
            </Container>
            
        </div>
    );
    }
}

export default Comic



