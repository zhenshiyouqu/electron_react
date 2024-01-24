import React from 'react';
import PropTypes from 'prop-types';

const Word = ({key,word}) => {
    return (
        <div>
            <h1>{word.word}</h1>
            <h4>{word.phonetic}</h4>
            <h4>{word.definition}</h4>
        </div>
    );
};

Word.propTypes = {};

export default Word;
