import { useHistory } from 'react-router-dom';

export default function History() {
    // history object is returned from useHistory hook and has various methods
    const history = useHistory();

    // Pushing a new URL (and adding to the end of history stack):
    const handleClick = () => history.push('/some/url');

    // Replacing the current URL (won't be tracked in history stack):
    const redirect = () => history.replace('/some/other/url');
    // ...
    return (
        <div>
            <div onClick={handleClick}>
                history.push
            </div>
            <div onClick={redirect}>
                history.replace
            </div>
        </div>
    )
}