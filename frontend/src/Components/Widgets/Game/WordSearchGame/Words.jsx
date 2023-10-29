import './Words.css';

const Words = ({ value, onChange, isWordFound }) => {
    return (
      <div id='words'>
        <input
          type='text'
          id='wordsInput'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={isWordFound ? 'green-background' : ''} // Aplica estilo si isWordFound es true
        ></input>
      </div>
    );
  }
  
  export default Words;
