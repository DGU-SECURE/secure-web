import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const CONTAINER = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  flex-direction: column;
`
const SPAN =styled.div`
  font-weight: bold;
    display: flex;
    flex-direction: column;
  font-size: 70px;
  color: black;
    width: 600px;
  margin-top: 40px;
    border-bottom: 2px solid rgba(150,150,150,0.5);
    span{
     font-size:25px;
    }
    div1{
        display: flex;
        justify-content: center; /* 가로 중앙 정렬 */ 
    }
`
const BUTTON = styled.div`
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center; /* 세로 중앙 정렬 */
    width: 700px;
    height: 450px;

    input {
        width: 585px;
        height: 40px;
        font-size: 14px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        border: 1px solid rgba(150,150,150,0.5);
        padding-left: 10px; /* placeholder를 왼쪽에서 10px 띄움 */
    }
    button{
        width:600px;
        height:50px;
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
        margin-right:560px;
    }
    div2{
        margin-bottom:20px;
    }
    div3{
        margin-top:20px;
        span{
            font-weight: bold;
            cursor:pointer;
            font-size:15px;
            &:hover{
                color:darkred;
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
function SignUp() {
    const navigate = useNavigate();
    const SignUp = () => {
        navigate('/');
    };
    const handleSignup = () => {
        navigate('/login');
    };

    return(
        <>
            <CONTAINER>
                <SPAN>
                    <div1>NUSINSA</div1>
                    <div><span>회원가입</span></div>
                </SPAN>
                <BUTTON>
                    <div>ID</div>
                    <div2><input type="text" name="name" id="ID" placeholder="아이디는 6글자 이상 15글자 이하, 영어, 숫자 포함입니다."/></div2>
                    <div>PW</div>
                    <div2><input type="text" name="name" id="PW" placeholder="비밀번호 8글자 이상 15글자 이하, 영어, 숫자, 특수문자 포함입니다."/></div2>
                    <div>이름</div>
                    <div2><input type="text" name="name" id="NAME"/></div2>
                    <div>주소</div>
                    <div2><input type="text" name="name" id="ADDRESS"/></div2>
                    <div3>
                        <button>회원가입</button>
                    </div3>
                    <div3>
                        <span onClick={handleSignup}>로그인으로 돌아가기</span>
                    </div3>
                </BUTTON>
            </CONTAINER>
        </>
    )
}

export default SignUp;