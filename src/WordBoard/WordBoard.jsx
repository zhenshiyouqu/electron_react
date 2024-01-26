import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import Word from "./Word";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";

const remote = window.remote;
const electron = window.electron;
const Store = window.Store;

const userconfig = new Store({"name": "userconfig"});
const usersave = new Store({"name": "usersave"});
const dict = new Store({"name": "dict"});
const learnedLog = new Store({"name": "learnedLog"});
const initWord={
    "word": "abandon",
    "phonetic": "əˈbændən",
    "definition": "vt.丢弃；放弃，抛弃"
};
const currentDate = new Date();
const WordBoard = props => {
    const nowDict = useRef(dict.get(usersave.get("dict")));
    const learnedWords = useRef(usersave.get("learnedWords"));
    const todayWords = useRef([]);
    const needReview = useRef(usersave.get("needReview"));
    const isPause = useRef(false);
    const navigate = useNavigate();
    const timeId = useRef(0);
    const [word, setWord] = useState(initWord);
    //获取单词
    const getWord = () => {
        if (isPause.current){
            return;
        }
        //当获取当前单词id
        timeId.current = getWordId();
        setWord(nowDict.current[timeId.current]);
        //删除这个单词，表示今日已学完
        saveChange();
    }
    const getWordId=()=>{
        //每一次都随机获取单词索引，从0-单词总数
        let id = Math.floor(Math.random() * nowDict.current.length);
        return id;
    }
    //保存今日单词
    const saveChange=()=>{
        //保存今日单词内存
        learnedWords.current.push(nowDict.current[timeId.current]);
        todayWords.current.push(nowDict.current[timeId.current]);
        // //删除这个单词，表示今日已学完,不再出现
        nowDict.current.splice(timeId.current,1);
    }

    //设置定时触发器
    useEffect(() => {
        const id = setInterval(getWord, 2000);
        return () => {
            clearInterval(id);
        };
    }, []);
    return (
        <>
            <Word word={word}/>
            <Button type="primary" onClick={()=>{
                needReview.current.push(word);
            }} >不认识</Button>
            <Button type="primary" onClick={()=>{
                //持久化数据
                usersave.set("learnedWords",learnedWords.current);
                usersave.set("todayWordsNum",todayWords.current.length);
                usersave.set("needReview",needReview.current);
                usersave.set("learnedNum",learnedWords.current.length);
                dict.set(usersave.get("dict"),nowDict.current);
            }}>
                保存用户数据
            </Button>
            <Button type="primary" onClick={()=>{
                navigate("/")
            }}>
                返回主页
            </Button>
            <Button type="primary" onClick={()=>{
                isPause.current=!isPause.current;
            }}>
                {isPause.current?"继续":"暂停"}
            </Button>
            <Button type="primary" onClick={()=>{
                //打印当前年-月-日
                console.log(currentDate.toLocaleDateString());
            }}>
                测试
            </Button>
        </>
    );
};

WordBoard.propTypes = {

};

export default WordBoard;