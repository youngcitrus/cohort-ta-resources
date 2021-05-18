const Thread = (props) => {
    return (
        <div className="thread">
            <h1>Thread Component</h1>
            {/* {props.namer ? <h2>Hi, {props.namer.fName}</h2> : null} */}
            {props.namer && <h2>Hi {props.namer.fName}</h2>}
        </div>
    );
}

export default Thread;