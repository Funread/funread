import { Grid, Box, Card, Button, CardActionArea, CardMedia, CardContent, Typography} from '@mui/material'
import { height } from '@mui/system'
import React from 'react'

class PageOneBookCreator extends React.Component {
    constructor(props) {
        super(props) 
        this.clicked = this.PageOneState.bind(this)
        this.state = {
            //ListHere
            label: 'Hello World'
        }
    }

    // clicked() {
    //     alert("clicked");
    // }
    PageOneState(template) {
        this.setState({
            template: template
        })

    }

    render() {
        //Pre  
        return (
            <Box textAlign="center" marginLeft={30} marginTop={10} sx={{
                width: 800, 
                height: 700, 
                }}>
                <Grid container spacing={30}>
                <Grid item xs={4}>
                    <Card sx={{ width: 300, height:400 }}>
                        <CardActionArea
                            onClick={() => { 
                                alert("clicked")
                            }}>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Comic
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                    <Grid item xs={4}>
                        <Card sx={{ width: 300, height:400 }}>
                        <CardActionArea
                            onClick={() => { 
                                alert("clicked")
                            }}>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Storybook
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    </Grid>
                    <Grid item xs={4}>
                        {/* <Card sx={{ width: 300, height:400}} >
                            <div>style 3</div>
                        </Card> */}
                        <Card sx={{ width: 300, height:400 }}>
                        <CardActionArea
                            onClick={() => { 
                                alert("clicked")
                            }}>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Meme
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    </Grid>
                </Grid>
            </Box>

        )
        }
}

export default PageOneBookCreator
