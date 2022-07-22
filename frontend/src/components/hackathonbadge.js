import React from "react";

export default class HackathonBadge extends React.Component {


    render() {
        const imageStyle = {
            width: '100%',
            height: 'auto',
            borderRadius: "10px" 
        }

        return (
            <div>
                <img src={this.props.hackathon.image} alt="hackathon" style={imageStyle} />
            </div>
        );
    }
}