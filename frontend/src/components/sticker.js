import React from "react";

export default class Sticker extends React.Component {
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
            backgroundColor: "#30323D",
            color: "white",
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
                </div>

            </div>
        );

        // const titleStyle = {
        //     fontSize: "24px",
        //     fontWeight: "bold",
        //     borderBottom: "1px solid #ccc",
        //     paddingBottom: "10px",
        //     marginBottom: "10px",
        // }

        // const descriptionStyle = {
        //     fontSize: "16px",
        //     marginTop: "5px",
        //     textAlign: "justify",
        // }

        // const layoutStyle = {
        //     border: "1px solid #ccc",
        //     borderRadius: "10px",
        //     textAlign: "left",
        //     paddingLeft: "20px",
        //     paddingRight: "20px",
        //     margin: "10px 0 10px 0",
        //     ...this.props.style,
        // }

        // return (
        //     <div style={layoutStyle}>
        //         <p style={titleStyle}>{this.props.title}</p>
        //         <p style={descriptionStyle}>{this.props.description}</p>
        //         {
        //             this.props.date &&
        //             <p style={{ ...descriptionStyle, textAlign: "right" }}>{parse_date(this.props.date)}</p>
        //         }
        //     </div>
        // )
    }
}