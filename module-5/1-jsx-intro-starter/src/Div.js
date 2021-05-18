import Thread from './Thread';

const Div = (props) => {
    return (
        <div style={{
            color: props.color,
            background: '#C70039',
            padding: '10px',
            margin: '10px',
            border: '5px solid black'
        }}>
            <h1>Div Component</h1>
            {/* {props.name ? <Thread /> : null} */}
            <Thread namer={props.name}/>
            <Thread />
        </div>
    );
};

export default Div;