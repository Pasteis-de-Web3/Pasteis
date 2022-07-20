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

        const imageStyle = {
            width: '300px',
            maxHeight: '100%',
            margin: 'auto',
            display: 'block',
        };

        const titleStyle = {
            fontSize: '20px',
            fontWeight: 'bold',
            margin: '10px',
        };

        const descriptionStyle = {
            fontSize: '15px',
            margin: '10px',
        };

        return (
            <div
                style={{
                    margin: '10px',
                    backgroundColor: 'lightgrey',
                    borderRadius: '10px',
                    boxShadow: this.state.isHovering ? '3px 3px  #484848' : '',
                }}
                onMouseEnter={() => this.setHovering(true)}
                onMouseLeave={() => this.setHovering(false)}
            >
                <img
                    src={hackathon.image}
                    alt="hackathon-image"
                    style={{
                        ...imageStyle,
                        float: 'left',
                        borderRadius: '10px',
                    }}
                />
                <div style={{ float: 'right', width: '500px' }}>
                    <p style={titleStyle}>{hackathon.title}</p>
                    <p style={descriptionStyle}>{hackathon.description}</p>
                </div>
            </div>
        );
    }
}
