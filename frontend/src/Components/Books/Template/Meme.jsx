import { Container, Box, Paper } from "@mui/material";
import React from "react";


class Meme extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //ListHere
            label: 'Hello World'
        }
    }

    render() {
        //Pre  
        return (
            //Return Here component or html code
            <div className="Meme">
                <Container fixed>
                <Box sx={{ bgcolor: 'lightgrey', height: '70vh', width: '150vh', textAlign:"center", fontSize:"20pt"}}>
                    <Paper>
                        <img height={730} width={1180} src="/img/empty.jpeg" />
                    </Paper>
                </Box>
                </Container>
            </div>
            )
    }
}

export default Meme



