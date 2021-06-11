import React from 'react';

const Loader = props => {
    return(
        <div className="col s12">
            <div className="preloader-wrapper big active loader">
            <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
                <div className="circle"></div>
            </div><div className="gap-patch">
                <div className="circle"></div>
            </div><div className="circle-clipper right">
                <div className="circle"></div>
            </div>
            </div>
            </div>
        </div>
        )
}
//onClick = {"update("+props.car._id+");"}
export default Loader;