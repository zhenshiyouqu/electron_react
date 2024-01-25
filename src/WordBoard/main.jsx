import React, {useEffect, useRef, useState} from 'react';
import Word from "./Word";
import output from "../source/output.json";
import save from "../source/save.json";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";



const Main = props => {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <h3>总共已学习</h3>
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
                    save.learnedNum === 0 ?
                        <Button type="primary" onClick={()=>{
                            navigate("/wordboard")
                        }}>开始学习</Button>
                        :
                        <Button type="primary" onClick={()=>{
                            navigate("/wordboard")
                        }}>继续学习</Button>
                }
            </div>
        </>
    );
};

Main.propTypes = {

};

export default Main;
