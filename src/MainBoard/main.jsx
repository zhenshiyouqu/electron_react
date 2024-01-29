import React, {useEffect, useRef, useState} from 'react';
import Word from "../WordBoard/Word";
import initsave from "../source/initsave.json";
import config from "../source/config.json";
import dictJson from "../source/dict.json";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const remote = window.remote;
const electron = window.electron;
const Store = window.Store;
const userconfig = new Store({"name": "userconfig"});
const usersave = new Store({"name": "usersave"});
const dict = new Store({"name": "dict"});

const DataContainer = styled.div`
    flex: 1 1 100px;
    display: flex;
    justify-items: center;
    align-items: center;
    justify-content: space-between;
`;

const HandContainer = styled.div`
    flex: 0 0 30px;
    display: flex;
    background-color: greenyellow;
//    悬浮
    &:hover{
        background-color: #00FF00;
        flex-basis: 80px;
    }
`;

const MainBoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;


const TitleContainer = styled.div`
    flex: 1 1 100px;
    display: flex;
    justify-self: center;
    align-self: center;
`;

const Title = styled.h1`
    display: flex;
    justify-self: center;
    align-self: center;
`;
const MainBoard = props => {
    const navigate = useNavigate();
    const [save, setSave] = useState({});
    const dictRef = useRef({});

    useEffect(() => {
        //初始化
        if (usersave.get("dict") === undefined) {
            usersave.set(initsave)
            console.log("111")
        }
        if (userconfig.get("username") === undefined) {
            console.log("config")
            userconfig.set(config)
        }
        if (dict.get("CET4") === undefined) {
            dict.set(dictJson)
        }
        //将持久化数据加载到内存
        setSave(usersave.get());
        dictRef.current = dict.get(save.dict);
    }, []);


    return (
        <MainBoardContainer>
            <TitleContainer>
                <Title>
                    {userconfig.get("username")}，欢迎回来！
                </Title>
            </TitleContainer>
            <DataContainer>
                <div>
                    <h3>总共已学习</h3>
                    <h2>{save.learnedNum}</h2>
                </div>
                <div>
                    <h3>今日已学</h3>
                    <h2>{save.learnedTodayNum}</h2>
                </div>
                <div>
                    <h3>今日需要学</h3>
                    <h2>{save.todayWordsNum}</h2>
                </div>
                <div>
                    <h3>当前词典</h3>
                    <h2>{save.dict}</h2>
                </div>
            </DataContainer>
            <HandContainer>
                <HandItem>
                    <h4>切换词典</h4>
                </HandItem>
                {/*<Button type="primary" onClick={() => {*/}
                {/*}}>切换词典</Button>*/}
                {/*{*/}
                {/*    save.learnedNum === 0 ?*/}
                {/*        <Button type="primary" onClick={() => {*/}
                {/*            navigate("/wordboard")*/}
                {/*        }}>开始学习</Button>*/}
                {/*        :*/}
                {/*        <Button type="primary" onClick={() => {*/}
                {/*            navigate("/wordboard")*/}
                {/*        }}>继续学习</Button>*/}
                {/*}*/}
                {/*<Button type="primary" onClick={() => {*/}
                {/*    console.log("dictRef.current", dictRef.current)*/}
                {/*}}>设置\测试</Button>*/}
            </HandContainer>
        </MainBoardContainer>
    );
};

const HandItem = styled.div`
    display: flex;
    justify-items: center;
    align-items: center;
    justify-content: center;
    background-color: inherit;
    //默认隐藏
    visibility: hidden;
    
    //当HandContainer悬浮时显示
    ${HandContainer}:hover &{
        visibility: visible;
    }
    &:hover{
        background-color: yellow;
    }
`;

MainBoard.propTypes = {};

export default MainBoard;
