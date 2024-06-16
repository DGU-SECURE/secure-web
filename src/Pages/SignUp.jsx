import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import api from '../Axios';

const CONTAINER = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SPAN = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: column;
  font-size: 70px;
  color: black;
  width: 600px;
  margin-top: 40px;
  border-bottom: 2px solid rgba(150,150,150,0.5);
    div1{
        margin-left:150px;
    }
  span {
    font-size: 25px;
  }
`;

const BUTTON = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  height: 450px;
  input {
    width: 585px;
    height: 40px;
    font-size: 14px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border: 1px solid rgba(150,150,150,0.5);
    padding-left: 10px;
  }
  button {
    width: 600px;
    height: 50px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    background-color: black;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #333;
    }
  }
  .label {
    margin-bottom: 6px;
      margin-right: 560px;
  }
  .input-box {
    margin-bottom: 20px;
  }
  .button-box {
    margin-top: 20px;
    span {
      font-weight: bold;
      cursor: pointer;
      font-size: 15px;
      &:hover {
        color: darkred;
      }
    }
  }
`;

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        login_id: "",
        password: "",
        name: "",
        address: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = async () => {
        try {
            const response = await api.post('/auth/join', formData);
            if (response.data.success) {
                alert('회원가입이 완료되었습니다');
                navigate('/login');
            } else {
                alert(`오류: ${response.data.error.message}`);
            }
        } catch (error) {
            alert('회원가입에 실패했습니다. 서버 오류입니다.');
            console.error('Signup Error:', error);
        }
    };

    return(
        <>
            <CONTAINER>
                <SPAN>
                    <div1>NUSINSA</div1>
                    <div><span>회원가입</span></div>
                </SPAN>
                <BUTTON>
                    <div className="label">ID</div>
                    <div className="input-box"><input type="text" name="login_id" id="ID" placeholder="아이디는 6글자 이상 15글자 이하, 영어, 숫자 포함입니다." value={formData.login_id} onChange={handleChange}/></div>
                    <div className="label">PW</div>
                    <div className="input-box"><input type="password" name="password" id="PW" placeholder="비밀번호 8글자 이상 15글자 이하, 영어, 숫자, 특수문자 포함입니다." value={formData.password} onChange={handleChange}/></div>
                    <div className="label">이름</div>
                    <div className="input-box"><input type="text" name="name" id="NAME" value={formData.name} onChange={handleChange}/></div>
                    <div className="label">주소</div>
                    <div className="input-box"><input type="text" name="address" id="ADDRESS" value={formData.address} onChange={handleChange}/></div>
                    <div className="button-box">
                        <button onClick={handleSignup}>회원가입</button>
                    </div>
                    <div className="button-box">
                        <span onClick={() => navigate('/login')}>로그인으로 돌아가기</span>
                    </div>
                </BUTTON>
            </CONTAINER>
        </>
    );
}

export default SignUp;