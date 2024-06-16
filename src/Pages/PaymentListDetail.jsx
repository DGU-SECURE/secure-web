import React, {useEffect, useState} from "react";
import { useNavigate,useParams } from 'react-router-dom';
import styled from "styled-components";
import api from "../Axios";

const Receipt = styled.div`
  width: 900px;
  height: 545px;
  border: 2px solid rgba(150,150,150,0.1);;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
`
const Content = styled.div`
  display:flex;
  justify-content: center;
  margin-top: 15px;
`
const Title = styled.div`
  text-align: center;
  margin-top: 30px;
  font-size: 25px;
  margin-bottom: 20px;
`
const Text = styled.div`
width:800px;
  margin-left: 50px;
`
const CONTENTS = styled.div`
  margin-left: 15px;
  width: 800px;
  height: 247px;
  div {
    margin-top: 23px;
  }
  span{
    margin-right:60px;
  }
`
const PAY = styled.div`
  margin-left:16px;
  margin-top:15px;
  font-size: 17px;
  div{
    display: flex;
    justify-content: flex-end;
    font-size: 20px;
  }
`
const Button = styled.div`
  margin-top:60px;
  display:flex;
  justify-content: center;

  button{
    margin-left: 10px;
    width:80px;
    height:40px;
    font-size:15px;
    border-radius: 5px;
    border-color: white;
    color:white;

    &:first-child{
      background-color: ${props => (props.orderStatus === "배송 완료" || props.orderStatus === "환불 처리") ? 'gray' : '#397CA8'};
      cursor: ${props => (props.orderStatus === "배송 완료" || props.orderStatus === "환불 처리") ? 'not-allowed' : 'pointer'};
      &:hover{
        background-color: ${props => (props.orderStatus === "배송 완료" || props.orderStatus === "환불 처리") ? 'gray' : 'darkblue'};
      }
    }
    &:last-child{
      background-color: #397CA8;
      cursor: pointer;

      &:hover{
        background-color: darkblue;
      }
    }
    &:disabled {
      cursor: not-allowed;
    }
  }
`
function PaymentListDetail(){
    const [content,setContent]=useState({});
    const navigate = useNavigate();
    const {order_id} = useParams();
    const getContent = async () => {
        try {
            const resp = await api.get(`/customers/histories/${order_id}`);
            if(resp && resp.data && resp.data.data) {
                setContent(resp.data.data);
            } else {
                console.error('No data received');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const moveToList =()=>{
        navigate(`/paymentlist`);
    }
    const refund = async()=>{
        try {
            await api.post(`/customers/histories/${order_id}`);
            alert('환불되었습니다.');
            navigate(`/paymentlist`);
        } catch (error) {
            console.error('Error updating the board: ', error);
        }
    }

    useEffect(() => {
        getContent();
    }, [order_id]);
    return(<>
            <Content>
                <Receipt>
                    <Title><span>구매 내역 조회</span></Title>
                    <Text>
                        <div style={{width:"800px", height:"36px",borderBottom:"3px solid lightgrey"}}>
                            <span style={{marginLeft:"8px",fontSize:"18px"}}>구매정보</span>
                        </div>
                        <CONTENTS>
                            <div>
                                <span style={{marginRight: "74px"}}>상품명</span>
                                <span>
                                    {content.item_name}
                                    {content.item_count > 1 && ` 외 ${content.item_count - 1}개`}
                                </span>
                            </div>

                            <div><span>배달장소</span><span style={{marginRight: "20px"}}>서울특별시 중구 충무로2길 1층</span></div>
                            <div><span>주문번호</span><span>{content.order_code}</span></div>
                            <div><span>주문일자</span>
                                <span>{new Date(content.order_date).toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                }).replace(/\./g, "").replace(/ /g, ".")}</span>
                            </div>
                            <div><span>결제수단</span><span>{content.payment_type}</span></div>
                            <div><span>주문상태</span><span style={{fontWeight: "bold"}}>{content.order_status}</span></div>
                        </CONTENTS>
                        <div style={{width: "800px", height: "36px", borderTop: "3px solid lightgrey"}}>
                        <PAY>
                                <span style={{marginRight:"30px"}}>결제정보</span>
                                <span style={{marginRight:"5px"}}>총 결제금액 {content.total_price-content.used_point} 원</span> +
                                <span style={{marginLeft:"6px"}}>포인트 사용 {content.used_point} P</span>
                                <div>
                                    <span style={{marginRight:"10px"}}>총 주문금액</span><span>{content.total_price}원</span>
                                </div>
                            </PAY>
                        </div>
                        <Button order_status={content.order_status}>
                            <button onClick={refund} disabled={content.order_status === "환불 처리"}>
                                환불하기
                            </button>
                            <button onClick={moveToList}>돌아가기</button>
                        </Button>
                    </Text>
                </Receipt>
            </Content>
        </>
    )
}

export default PaymentListDetail;