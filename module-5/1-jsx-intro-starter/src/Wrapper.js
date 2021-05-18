const Wrapper = (props) => {
    return (
        <div className='composition'>
            <h1>Wrapper Component</h1>
            {props.children}
        </div>
    );
};

export default Wrapper;