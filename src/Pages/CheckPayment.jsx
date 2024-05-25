import React,{useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import api from "../Axios";
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
    const [listItem, setListItem] = useState({ data_list: [], total_price: 0, used_point: 0, saved_point: 0, order_date: '', payment_type: '' });
    const navigate = useNavigate();
    const getItem = async (page = 0) => {
        try {
            const resp = await api.post(`/customers/payment`);
            if (resp && resp.data && resp.data.data) {
                setListItem(resp.data.data);
            } else {
                console.error('데이터를 받지 못했습니다');
            }
        } catch (error) {
            console.error('데이터 가져오기 오류: ', error);
        }
    };
    const moveToItems = () => {
        navigate(`/brandselect`);
    };
    const moveToList = () => {
        navigate(`/paymentlist`);
    };
    useEffect(() => {
        getItem();
    }, );
    return(
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
                            <tr>
                                <th style={{width: "150px"}}>상품사진</th>
                                <th style={{width: "150px"}}>상품명</th>
                                <th style={{width: "100px"}}>수량</th>
                                <th style={{width: "150px"}}>주문일자</th>
                                <th style={{width: "150px"}}>주문번호</th>
                                <th style={{width: "150px"}}>주문금액</th>
                                <th style={{width: "150px"}}>주문상태</th>
                            </tr>
                            {listItem.data_list.map((list) => (
                                <tr style={{height: "90px"}} key={list.id}
                                    onClick={() => navigate(`/paymentlist/${list.id}`)}>
                                    <td><img style={{width: "70px", height: "80px"}} src={list.thumbnail}
                                             alt="상품사진"></img></td>
                                    <td>{list.name}</td>
                                    <td>{list.item_quantity}</td>
                                    <td>{listItem.order_date}</td>
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
                                <th style={{width: "150px"}}>이름</th>
                                <th style={{width: "400px"}}>배송지</th>
                            </tr>
                            <tr>
                                <td>김태욱</td>
                                <td>서울특별시 중구 충무로2길 1층</td>
                            </tr>
                            </tbody>
                        </Table>
                        <h2 style={{marginLeft: "20px"}}>최종 결제 정보</h2>
                        <Table>
                            <tbody>
                            <tr>
                                <th style={{width: "150px"}}>결제수단</th>
                                <th style={{width: "400px"}}>총 결제 금액</th>
                            </tr>
                            <tr>
                                <td>{listItem.payment_type}</td>
                                <td>{listItem.total_price}원 ( 포인트 사용: -{listItem.used_point} / 포인트 적립: +{listItem.saved_point} )</td>
                            </tr>
                            </tbody>
                        </Table>
                        <Button>
                            <button onClick={moveToItems}>추가구매</button>
                            <button style={{marginLeft: "15px", marginRight: "55px"}} onClick={moveToList}>구매내역</button>
                        </Button>
                    </div>
                </CONTAINER>
            </div>
        </>
    )
}

export default CheckPayment;
