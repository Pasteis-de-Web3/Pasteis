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
            width: '60%',
            justifyContent: 'flex-start',
            borderRadius: 10,
            border: '2px solid rgba(0, 0, 0, 0.05)',
            margin: 10
        };

        const hoverStyle = {
            boxShadow: '1px 3px 10px #aba79d',
            transition: 'box-shadow 0.3s',
            cursor: 'pointer',
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

        const dateStyle = {
            backgroundColor: '#23A196',
            color: 'white',
            borderRadius: '50px',
            padding: '5px 15px 5px 15px',
        }

        const metadataStyle = {
            fontSize: '12px'
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
                    <p style={titleStyle}>{hackathon.title}</p>
                    <p style={descriptionStyle}>{hackathon.description}</p>
                </div>
                <div style={metadataStyle}>
                    <p style={dateStyle}>{parse_date(hackathon.start_date)} - {parse_date(hackathon.end_date)}</p>
                    <p>{hackathon.prizeSum} in prizes</p>
                </div>
                {/* </Link> */}
            </div>
        );
    }
}
