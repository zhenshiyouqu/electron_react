import React, {useEffect, useRef, useState} from 'react';
import Word from "./Word";
import output from "../source/output.json";
import save from "../source/save.json";
import {Button} from "antd";

const remote = window.remote;
const electron = window.electron;
const Store = window.Store;
const store =new Store({"name":"test"});
const Main = props => {
    const todayWords=[];
    const timeId = useRef(0);
    const [word, setWord] = useState(output[0]);
    //获取单词
    const getWord = () => {
        timeId.current = timeId.current + 1;
        todayWords.push(output[timeId.current]);
        setWord(output[timeId.current]);
    }
    //设置定时触发器
    useEffect(() => {
        const id = setInterval(getWord, 10000);
        return () => {
            clearInterval(id);
        };
    }, []);
    return (
        <>
            {/*<Word word={word}/>*/}
            <div>
                <h3>已学习</h3>
                <span>{save.learnedNum}</span>
            </div>
            <div>
                <h3>今日已学</h3>
                <span>{save.learnedTodayNum}</span>
            </div>
            <div>
                <h3>今日需要学</h3>
                <span>{save.todayWordsNum}</span>
            </div>
            <div>
                {
                    save.learnedNum === 0 ?<Button type="primary">开始学习</Button> : <Button type="primary">继续学习</Button>
                }
                <Button type="primary" onClick={()=>{
                    console.log(remote);
                    console.log(electron);
                    store.set("test","test");
                }}>Test</Button>
            </div>
        </>
    );
};

Main.propTypes = {

};

export default Main;
