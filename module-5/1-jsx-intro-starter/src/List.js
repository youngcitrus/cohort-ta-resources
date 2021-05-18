import ListItem from './ListItem';

const List = ({ fruits }) => {
    return (
        <div className='list'>
            <h1>List Component</h1>
            <ol>
                { fruits.map(singleFruit => (
                    <ListItem key={singleFruit} singleFruit={singleFruit}/>
                ))}
            </ol>
        </div>
    );
};

export default List;