import './Words.css'

const Words = ({ value, onChange, isWordFound, isSavedWord }) => {
  return (
    <div id='words'>
      <input
        type='text'
        id='wordsInput'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={isWordFound ? 'found-word' : (isSavedWord ? 'saved-word' : '')}
      ></input>
    </div>
  );
}

export default Words;