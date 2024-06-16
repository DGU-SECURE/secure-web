import React,{useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import api from "../Axios";

const H2 = styled.h2`
  margin-left: 5%;
  margin-top:2%;
`;
const LIST = styled.div`
margin-left:70px;
`
const Table =styled.table`
  width:1400px;
  max-height:480px;
  border-top: 3px solid black;
  border-collapse: collapse;
  th{
    border-bottom: 1px solid lightgrey;
    height:50px;
  }
`
const Tr = styled.tr`
  height:70px;
  :hover {
    cursor: pointer;
  }
`;
const Td = styled.td`
  text-align: center;
  border-bottom: 1px solid lightgrey;
  ${Tr}:hover & {
    background-color: #F5FBEF;
    font-weight: bold;
  }
`;
const PAGEBUTTON = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  button {
    border: none;
    font-size: 15px;
    margin-right: 5px;
    background-color: white;
    color: ${props => props.current ? 'red' : 'black'};
    &:hover {
      font-weight:bold;
      cursor: pointer;
    }
  }
`;

function PaymentList(){
    const [listItem,setListItem]= useState({data_list:[],page_info:{}});
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);

    const getItem = async (page=0) => {
        try {
            const resp = await api.get(`/customers/histories?page=${page}&size=5`);
            if(resp && resp.data && resp.data.data) {
                setListItem(resp.data.data);
            } else {
                console.error('No data received');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    const moveToPage = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        getItem(currentPage);
    }, [currentPage]);
    return(<>
        <div>
            <H2>구매내역 조회</H2>
            <LIST>
                <Table>
                    <tbody>
                    <tr>
                        <th style={{width:"300px"}}>상품명</th>
                        <th style={{width:"170px"}}>주문일자</th>
                        <th style={{width:"280px"}}>주문번호</th>
                        <th style={{width:"210px"}}>주문금액</th>
                        <th style={{width:"210px"}}>주문상태</th>
                    </tr>
                    {listItem.data_list.map((list)=> (
                        <Tr key={list.order_id} onClick={() => navigate(`/paymentlist/${list.order_id}`)}>
                            <Td>{list.item_name}
                                {list.item_count > 1 && ` 외 ${list.item_count - 1}개`}</Td>
                            <Td>{list.order_date}</Td>
                            <Td>{list.order_code}</Td>
                            <Td>{list.total_price}원</Td>
                            <Td style={{
                                color: list.order_status === "환불 처리" ? "red" :
                                    list.order_status === "주문 확인" ? "green" :
                                        list.order_status === "배송 완료" ? "blue" : "initial"
                            }}>
                                {list.order_status}
                            </Td>
                        </Tr>
                    ))}
                    </tbody>
                </Table>
                <PAGEBUTTON>
                    {[...Array(listItem.page_info.total_pages)].map((_, index) => (
                        <button onClick={() => moveToPage(index)}
                                style={{
                                    color: currentPage === index ? 'darkblue' : 'black',
                                    fontWeight: currentPage === index ? 'bold' : 'normal', // 현재 페이지이면 굵게
                                    textDecoration: currentPage === index ? 'underline' : 'none' // 현재 페이지이면 밑줄
                                }}
                        >{index + 1}</button>
                    ))}
                </PAGEBUTTON>
            </LIST>
        </div>
    </>)
}

export default PaymentList;