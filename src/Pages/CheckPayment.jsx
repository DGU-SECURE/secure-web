import React, { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";

const CONTAINER = styled.div`
  margin-left:60px;
  margin-top:30px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  width: 92%;
`
const NAME = styled.div`
  width:1050px;
  height:80px;
  padding-top:15px;
  padding-left:15px;
`
const Button = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top:20px;
  padding-bottom:30px;
  button{
    cursor: pointer;
    width:80px;
    height:40px;
    font-size:14px;
    background-color: #397CA8;
    border-radius: 5px;
    border-color: white;
    color:white;
    &:hover{
      background-color: darkblue;
    }
  }
`
const Table = styled.table`
  width: 1398px;
  border-top: 3px solid black;
  border-collapse: collapse;
  th, td {
    border-bottom: 1px solid lightgrey;
    height: 50px;
    text-align: center;
  }
`;

function CheckPayment() {
    const navigate = useNavigate();
    const location = useLocation();
    const listItem = location.state.data; // 데이터를 location.state에서 바로 받아옴

    const userName = localStorage.getItem('user_name');
    const address = localStorage.getItem('address');

    const moveToItems = () => {
        navigate(`/brandselect`);
    };
    const moveToList = () => {
        navigate(`/paymentlist`);
    };

    if (!listItem) {
        return <div>Loading...</div>; // 데이터가 없을 경우 로딩 표시
    }

    return (
        <>
            <div>
                <CONTAINER>
                    <div>
                        <NAME>
                            <span style={{color: '#7D3838', fontSize: "50px"}}>결제가 완료</span>
                            <span style={{fontSize: "50px"}}>되었습니다</span>
                        </NAME>
                        <h2 style={{marginLeft: "20px"}}>주문 상세 내역</h2>
                        <Table>
                            <tbody>
                            {listItem.data_list.map((list) => (
                                <tr style={{height: "90px"}} key={list.id}>
                                    <td><img style={{width: "70px", height: "80px"}} src={list.thumbnail} alt="상품사진"/></td>
                                    <td>{list.name}</td>
                                    <td>{list.item_quantity}</td>
                                    <td>{new Date(listItem.order_date).toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    }).replace(/\./g, "").replace(/ /g, ".")}</td>
                                    <td>{list.item_code}</td>
                                    <td>{list.price}원</td>
                                    <td>{list.order_status}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <h2 style={{marginLeft: "20px"}}>배송 정보</h2>
                        <Table>
                            <tbody>
                            <tr>
                                <td>{userName}</td>
                                <td>{address}</td>
                            </tr>
                            </tbody>
                        </Table>
                        <h2 style={{marginLeft: "20px"}}>최종 결제 정보</h2>
                        <Table>
                            <tbody>
                            <tr>
                                <td>{listItem.payment_type}</td>
                                <td>{listItem.total_price}원 (포인트 사용: -{listItem.used_point} / 포인트 적립: +{listItem.saved_point})</td>
                            </tr>
                            </tbody>
                        </Table>
                        <Button>
                            <button onClick={moveToItems}>추가구매</button>
                            <button onClick={moveToList}>구매내역</button>
                        </Button>
                    </div>
                </CONTAINER>
            </div>
        </>
    );
}

export default CheckPayment;