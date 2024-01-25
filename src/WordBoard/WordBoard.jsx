import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import output from "../source/output.json";
import Word from "./Word";
import {Button} from "antd";

const WordBoard = props => {
    const timeId = useRef(0);
    const [word, setWord] = useState(output[0]);
    const todayWords=useRef([]);
    //获取单词
    const getWord = () => {
        timeId.current = timeId.current + 1;
        todayWords.current.push(output[timeId.current]);
        setWord(output[timeId.current]);
    }
    //设置定时触发器
    useEffect(() => {
        const id = setInterval(getWord, 5000);
        return () => {
            clearInterval(id);
        };
    }, []);
    return (
        <>
            <Word word={word}/>
            <Button type="primary" onClick={()=>{
                //保存今日单词到save.json
                console.log(todayWords.current);

            }} >保存</Button>
        </>
    );
};

WordBoard.propTypes = {

};

export default WordBoard;