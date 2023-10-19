import React from 'react';
import "./template2.sass";
import Title from '../Widgets/Title/Title';
import Audio from '../Widgets/Audio/Audio';
import Text from '../Widgets/Text/Text';

function template2(props) {
  return (
    <div className='container-audiotext'>
        <Title />
        <Audio />
        <Text />
    </div>
  )
}

template2.propTypes = {}

export default template2;
