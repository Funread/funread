import { Container, Box, Paper } from "@mui/material";
import React from "react";


class Meme extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //ListHere
            img1: this.props.img1 || "/img/empty.jpeg",
            text1: this.props.text1 || "insert text",
               
        }
    }

    render() {
        //Pre  
        return (
            //Return Here component or html code
            <div className="Meme">
                <Container fixed>
                <Box sx={{ bgcolor: 'lightgrey', height: 730, width: 1180, textAlign:"center", fontSize:"20pt"}}>
                    <Paper>
                    <div  style={{ 
                                    backgroundImage: `url("/img/empty.jpeg")`,
                                    backgroundSize:  'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    width: 1180,
                                    height: 730
                                    }}>
                                    <p style={{
                                        margin: 0,
                                    }} >Text here</p>
                                </div>
                        {/* <img height={730} width={1180} src="/img/empty.jpeg" /> */}
                    </Paper>
                </Box>
                </Container>
            </div>
            )
    }
}

export default Meme



