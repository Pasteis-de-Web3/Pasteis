import React from 'react';
import { parse_date } from '../utils';

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
            width: '80%',
            justifyContent: 'flex-start',
            borderRadius: '10px',
            border: '2px solid rgba(0, 0, 0, 0.05)',
            margin: "15px 0"
        };

        const hoverStyle = {
            boxShadow: '1px 3px 10px #aba79d',
            transition: 'box-shadow 0.3s',
            cursor: 'pointer',
        };

        const imageStyle = {
            maxWidth: '30%',
            borderRadius: "10px 0px 0px 10px"
        };

        const textDivStyle = {
            display: 'flex',
            alignSelf: 'flex-start',
            flexDirection: 'column',
            textAlign: 'left',
            margin: '0 10px'
        };

        const titleStyle = {
            fontSize: '24px',
            margin: '5px 0',
        };

        const descriptionStyle = {
            fontSize: '14px',
            margin: '10px'
        };

        const dateStyle = {
            backgroundColor: '#23A196',
            borderRadius: '10px',
            padding: '5px 10px',
            color: 'white',
            margin: '10px',
        }

        return (
            <div
                style={this.state.isHovering ? { ...parentStyle, ...hoverStyle } : parentStyle}
                onMouseEnter={() => this.setHovering(true)}
                onMouseLeave={() => this.setHovering(false)}
                onClick={() => {
                    window.location.href = `/hackathon/${hackathon.id}`;
                }}
            >
                <img
                    src={hackathon.image}
                    alt=""
                    style={imageStyle}
                />
                <div style={textDivStyle}>
                    <label style={titleStyle}>{hackathon.title}</label>
                    <label style={descriptionStyle}>{hackathon.description}</label>

                    <div style={{
                        margin: '10px',
                        width: '100%'
                    }}>
                        <label style={dateStyle}>
                            {parse_date(hackathon.start_date)} - {parse_date(hackathon.end_date)}
                        </label>
                        <label>{hackathon.prizeSum} in prizes</label>
                    </div>
                </div>
            </div>
        );
    }
}
