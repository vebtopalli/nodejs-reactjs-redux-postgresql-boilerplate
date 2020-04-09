import React, { Component } from 'react';

class LoadingComponent extends Component {
    render() {
        return (
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        );
    }
}

export default LoadingComponent;