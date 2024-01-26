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
    display: flex;
    justify-items: center;
    align-items: center;
    justify-content: space-between;
`;

const HandContainer = styled.div`
    display: flex;
    justify-items: center;
    align-items: center;
    justify-content: center;
`;

const MainBoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    
`;


const TitleContainer = styled.h1`
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
                {userconfig.get("username")}，欢迎回来！
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
                <Button type="primary" onClick={() => {
                }}>切换词典</Button>
                {
                    save.learnedNum === 0 ?
                        <Button type="primary" onClick={() => {
                            navigate("/wordboard")
                        }}>开始学习</Button>
                        :
                        <Button type="primary" onClick={() => {
                            navigate("/wordboard")
                        }}>继续学习</Button>
                }
                <Button type="primary" onClick={() => {
                    console.log("dictRef.current", dictRef.current)
                }}>设置\测试</Button>
            </HandContainer>
        </MainBoardContainer>
    );
};

MainBoard.propTypes = {};

export default MainBoard;
