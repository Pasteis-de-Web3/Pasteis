import React from "react";

export default class Project extends React.Component {
    render() {
        const layoutStyle = {
            width: '500px',
            textAlign: 'left',
            margin: '10px',
            borderRadius: '10px',
            boxShadow: '-5px 5px 8px 0 rgba(0, 0, 0, 0.25)',
            ...this.props.bodyStyle
        }
        
        const headerStyle = {
            backgroundColor: '#ECEAE3',
            color: "black",
            padding: '10px 0 10px 20px',
            borderRadius: '10px 10px 0 0',
            ...this.props.headerStyle
        }
        
        const contentStyle = {
            padding: '10px',
            backgroundColor: '#ECEAE3',
            borderRadius: '0 0 10px 10px',
            ...this.props.contentStyle
        }

        const titleStyle = {
            fontSize: '24px',
            ...this.props.titleStyle
        }

        const smallTextStyle = {
            fontSize: '16px',
            padding: '2%',
            float: 'right',
            ...this.props.smallTextStyle
        }

        const buttonStyle = {
            backgroundColor: '#30323d',
            color: 'white',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer'
        }
        
        const voteStyle = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
        }

        return (
            <div style={layoutStyle} >
                <div style={headerStyle}>
                    <label style={titleStyle}>
                        {this.props.title}
                    </label>
                    <label style={smallTextStyle}>
                        {this.props.smallText}
                    </label>
                </div>
                <div style={contentStyle}>
                    {this.props.content}
                    <div style={voteStyle}>
                        <button style={buttonStyle}>vote</button>
                    </div>
                </div>


            </div>
        );
    }
}