import React from 'react'  
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
class Wizard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //ListHere
            stepsTitleList: this.props.stepsTitleList,
            activeStep: 0,
            skipped: new Set(),
            stepList: this.props.stepList
        }
    }

    setActiveStep(newValue) {
        console.log(newValue)
        this.setState({ activeStep: newValue })
       
    }
    setSkipped(newValue) {
        console.log(newValue)
        this.setState({ skipped: newValue })
    }
    render() {

        const isStepOptional = (step) => {
            return step === 1;
        };

        const isStepSkipped = (step) => {
            return this.state.skipped.has(step);
        };

        const handleNext = () => {
            let newSkipped = this.state.skipped;
            if (isStepSkipped(this.state.activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(this.state.activeStep);
            }

            this.setActiveStep(this.state.activeStep+ 1);
            this.setSkipped(newSkipped);
        };

        const handleBack = () => {
            this.setActiveStep(this.state.activeStep - 1);
        };

        const handleSkip = () => {
            if (!isStepOptional(this.state.activeStep)) {
                throw new Error("You can't skip a step that isn't optional.");
            }

            this.setActiveStep(this.state.activeStep+ 1);
            this.setSkipped((prevSkipped) => {
                const newSkipped = new Set(prevSkipped.values());
                newSkipped.add(this.state.activeStep);
                return newSkipped;
            });
        };

        const handleReset = () => {
            this.setActiveStep(0);
        };

        return (
            <Box sx={{ width: '60%', display: 'inline'  }}>
                <Stepper activeStep={this.state.activeStep}>
                    {this.state.stepsTitleList.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Optional</Typography>
                            );
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}> {label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {this.state.activeStep === this.state.stepsTitleList.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                        <React.Fragment>
                            <div>
                                {this.state.stepList[this.state.activeStep]}
                             </div>
                            <Typography sx={{ mt: 2, mb: 1 }}>Step {this.state.activeStep + 1}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                    disabled={this.state.activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                                {isStepOptional(this.state.activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}

                            <Button onClick={handleNext}>
                                    {this.state.activeStep === this.state.stepsTitleList.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        );
            
    }
}

export default Wizard