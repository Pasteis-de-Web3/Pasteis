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
            width: '60%',
            justifyContent: 'flex-start',
            borderRadius: 10,
            border: '2px solid rgba(0, 0, 0, 0.05)',
            margin: 10
        };

        const imageStyle = {
            height: 'auto',
            width: '300px',
            borderRadius: "10px 0px 0px 10px"  /* top left, top right, bottom right, bottom left */
        };

        const textDivStyle = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            alignSelf: 'flex-start',
            flexGrow: 1, // fill the remaining space
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
                    alt=""
                    style={imageStyle}
                />
                <div style={textDivStyle}>
                    <p style={titleStyle}>{hackathon.title}</p>
                    <p style={descriptionStyle}>{hackathon.description}</p>
                </div>
            </div>
        );
    }
}
