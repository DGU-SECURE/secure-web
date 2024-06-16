import React, {useState} from "react";
import styled from "styled-components";
import api from "../Axios";
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { isLoggedInState } from '../state.js';

const CONTAINER = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  flex-direction: column;
`
const SPAN =styled.div`
  font-weight: bold;
  font-size: 100px;
  color: black;
  margin-top: 100px;
`
const BUTTON=styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 세로 중앙 정렬 */
  width:700px;
  height:450px;
    input{
        width:450px;
        height:50px;
        font-size:14px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        border: 1px solid rgba(150,150,150,0.5);
    }
    button{
        width:450px;
        height:55px;
        font-size:16px;
        font-weight:bold;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        border: 1px solid rgba(150,150,150,0.5);
        background-color:black;
        color:white;
        cursor:pointer;
        &:hover{
            background-color: #333; /* 약간 밝은 회색 */
            color: white;
        }
    }
    div{
        margin-bottom:6px;
        margin-right:415px;
    }
    div2{
        margin-bottom:20px;
    }
    div3{
        margin-top:20px;
        span{
            font-weight: bold;
            cursor:pointer;
            &:hover{
                color:darkblue;
                font-weight:bold;
            }
        }
    }
    div4 {
        margin-top:30px;
        display: flex;
        align-items: center;
        width: 60%;
    }

    .line {
        flex-grow: 1;
        height: 1px;
        background-color: rgba(150,150,150,0.5);
        margin: 0 10px;
    }

    .text {
        white-space: nowrap;
        font-size: 14px;
        color: black;
    }


`

function Login() {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
    const navigate = useNavigate();
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const requestBody = {
            login_id: loginId,
            password: password,
        };

        try {
            const response = await api.post('/auth/login', requestBody);

            if (response.data.success) {
                // 성공적으로 로그인한 경우
                const { name, address, access_token, refresh_token } = response.data.data;

                // 토큰을 localStorage에 저장
                localStorage.setItem('user_name', name);
                localStorage.setItem('address', address);
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);

                setIsLoggedIn(true);
                navigate('/brandselect');
            } else {
                // 로그인 실패 시 에러 처리
                alert(`로그인 실패: ${response.data.error.message}`);
            }
        } catch (error) {
            // 네트워크 오류 등 처리
            console.error('로그인 요청 실패', error);
            alert('로그인 요청에 실패했습니다.');
        }
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return(
        <>
            <CONTAINER>
                <SPAN>NUSINSA</SPAN>
                <BUTTON>
                    <div>ID</div>
                    <div2>
                        <input
                            type="text"
                            name="name"
                            id="ID"
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                        />
                    </div2>
                    <div>PW</div>
                    <div2>
                        <input
                            type="password"
                            name="password"
                            id="PW"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div2>
                    <div3>
                        <button onClick={handleLogin}>로그인</button>
                    </div3>
                    <div4>
                        <div className="line"></div>
                        <span className="text">또는</span>
                        <div className="line"></div>
                    </div4>
                    <div3>
                        <span onClick={handleSignup}>회원가입</span>
                    </div3>
                </BUTTON>
            </CONTAINER>
        </>
    )
}

export default Login;