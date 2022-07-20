import React from 'react';

export default class HackathonCard extends React.Component {
    constructor() {
        super();
        this.state = {
            isHovering: false,
        };
        this.setHovering = this.setHovering.bind(this);
    }

    setHovering(isHovering) {
        this.setState({ isHovering });
    }

    render() {
        const { hackathon } = this.props;

        const parentStyle = {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            margin: 'auto',
        };

        const imageStyle = {
            maxWidth: '40%',
            height: '300px',
            float: 'left',
        };

        const textDivStyle = {
            width: '50%',
            float: 'right',
        };

        const titleStyle = {
            fontSize: '20px',
            fontWeight: 'bold',
        };
        const descriptionStyle = {
            fontSize: '15px',
            marginTop: '5px',
        };

        return (
            <div
                style={parentStyle}
                onMouseEnter={() => this.setHovering(true)}
                onMouseLeave={() => this.setHovering(false)}
            >
                <img
                    src={hackathon.image}
                    alt="hackathon-image"
                    style={imageStyle}
                />
                <div style={{ textDivStyle }}>
                    <p style={titleStyle}>{hackathon.title}</p>
                    <p style={descriptionStyle}>{hackathon.description}</p>
                </div>
            </div>
        );
    }
}
