import React, { useState,useEffect } from "react";
import windowDimention from "../../hooks/WindowDimension";
import enviroment from "../../environment";
import CoreModules from "../../shared/CoreModules";
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import { UploadAreaService } from "../../api/CreateProjectService";
import { useNavigate } from 'react-router-dom';
import { CreateProjectActions } from '../../store/slices/CreateProjectSlice';
import Input from '@mui/material/Input';

const UploadArea = () => {
    const [fileUpload,setFileUpload]= useState(null);
    const navigate = useNavigate();
    const defaultTheme = CoreModules.useSelector(state => state.theme.hotTheme)
    // // const state:any = useSelector<any>(state=>state.project.projectData)
    // // console.log('state main :',state)

    // const { type } = windowDimention();
    // //get window dimension
    
    const dispatch = CoreModules.useDispatch()
    // //dispatch function to perform redux state mutation
    
    const projectArea = CoreModules.useSelector((state) => state.createproject.projectArea);
    // //we use use selector from redux to get all state of projectDetails from createProject slice
    
    const projectDetailsResponse = CoreModules.useSelector((state) => state.createproject.projectDetailsResponse);
    // //we use use selector from redux to get all state of projectDetails from createProject slice

    const { id:projectId }= projectDetailsResponse;
    useEffect(() => {
        if(projectArea !== null){
            navigate('/');
            dispatch(CreateProjectActions.ClearCreateProjectFormData())
            
        }
        return ()=>{
            dispatch(CreateProjectActions.ClearCreateProjectFormData())
        }

    }, [projectArea])

    return (
        <CoreModules.Stack>
        <FormGroup >
            {/* Form Geojson File Upload For Create Project */}
            <FormControl sx={{mb:3}}>
                <CoreModules.FormLabel>Upload GEOJSON of Area</CoreModules.FormLabel>
                <CoreModules.Button
                    variant="contained"
                    component="label"
                >   
                    <CoreModules.Input
                        type="file"
                        onChange={(e)=>{  
                            setFileUpload(e.target.files)}
                        }
                    />
                </CoreModules.Button>
                {!fileUpload  &&<CoreModules.FormLabel component="h3" sx={{mt:2,color: defaultTheme.palette.error.main}}>Geojson file is required.</CoreModules.FormLabel>}
            </FormControl>
            {/* END */}

            {/* Submit Button For Create Project on Area Upload */}
            <CoreModules.Button 
                variant="contained"
                color="error"
                disabled={!fileUpload?true:false}
                onClick={()=> {
                    if(fileUpload){
                        dispatch(UploadAreaService(`${enviroment.baseApiUrl}/projects/${projectId}/upload`,fileUpload))
                    }
                }}
            >
                Submit
            </CoreModules.Button>
            {/* END */}
        </FormGroup>
        </CoreModules.Stack>
    )
};
export default UploadArea;
