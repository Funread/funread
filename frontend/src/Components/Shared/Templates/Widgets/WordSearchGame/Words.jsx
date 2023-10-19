import './Words.css'

const Words = ({ value, onChange }) => {
    return(
            <div id='words'>
                <input type='text' id='wordsInput' value={value} onChange={(e) => onChange(e.target.value)}></input>
            </div>
    );
}

export default Words;