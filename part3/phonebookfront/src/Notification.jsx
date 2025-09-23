const Notification = ({message, condition}) => {
    if (!message) return null;
    const footerStyle = {
        color: condition ? 'green' : 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    return (
        <div style={footerStyle}>
            {message}
        </div>
    );
}

export default Notification;