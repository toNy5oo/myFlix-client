import React from 'react';
import {connect} from 'react-redux';
import {setVisibilityFilter} from '../../redux/filterSlice';
import {FormControl} from "react-bootstrap";

function VisibilityFilterInput (props){
    return (<>
                <FormControl
                    type="text"
                    onChange={e=>props.setVisibilityFilter(e.target.value)}
                    value={props.visibilityFilter}
                    placeholder="Search a movie..."
                />
            </>)
}

export default connect(
    null,
    {setVisibilityFilter}
)(VisibilityFilterInput);