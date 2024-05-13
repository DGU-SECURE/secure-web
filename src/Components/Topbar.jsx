import React from "react";
import styled from "styled-components";
import { TiShoppingCart } from "react-icons/ti";
import { Link,useLocation,useNavigate } from "react-router-dom";

const BOX = styled.div`
  height:80px;
  background-color:white;
  display :flex;
  text-align:center;
  justify-content: space-between;
  align-items: center;
`;
const LEFT = styled.div`
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left:40px;
  h1{
    font-size: 50px;
    color: black;
  }
  div{
    width: 160px;
    font-size: 13px;
    margin-left: 10px;
    margin-top: 30px;
    color: darkgreen;
    font-weight: bold;
  }
`;
const RIGHT = styled.div`
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top:15px;
  h3{
    font-size: 20px;
  }
  span{
    font-size: 15px;
    margin-top:5px;
    margin-left: 3px;
  }
  div{
    width: 60px;
    margin-right: 40px;
  }
`;
const IconWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const NAVI = styled.div`
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  border-bottom:2px solid #F0F1F3;
  height:40px;
`
const UL = styled.div`
    display: flex;        /* Makes the list horizontal */
    flex-direction: row;  /* List items in a row */
    list-style: none;     /* Removes default list styling */
    padding: 0;           /* Removes default padding */
    margin: 0;            /* Removes default margin */
    align-items: center;  /* Centers items vertically */
    justify-content: space-around; /* Evenly spaces the items along the line */
`

const LI = styled.div`
  margin-right: 20px;
  span{
  &:hover {
    cursor: pointer;
    color: black;
    font-weight: bold;
  }}
`

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 18px;
  font-weight: ${props => props.isActive ? 'bold' : 'normal'};
  color: ${props => props.isActive ? 'black' : '#747679'};
`
function Topbar(){
    const navigate = useNavigate();
    const location = useLocation();
    return(
        <>
        <BOX>
            <LEFT>
                <h1>NUSINSA</h1>
            </LEFT>
            <RIGHT>
                <h3>김태욱</h3>
                <span>님 반갑습니다</span>
                <IconWrapper>
                    <TiShoppingCart onClick={() => navigate(`/customer/shoppingcart`)}
                                    size="45" color="#5D6679"/>
                </IconWrapper>
            </RIGHT>
        </BOX>
        <NAVI>
            <div>
                <UL>
                    <LI>
                        <StyledLink to={'/brandselect'} isActive={location.pathname === `/brandselect`}>
                            <span> 브랜드선택</span>
                        </StyledLink>
                    </LI>
                    <LI>
                        <StyledLink to={`/selectItems`} isActive={location.pathname === `/selectItems`}>
                            <span> 상품목록</span>
                        </StyledLink>
                    </LI>
                    <LI>
                        <StyledLink to={'/shoppingcart'} isActive={location.pathname === `/shoppingcart`}>
                            <span> 장바구니</span>
                        </StyledLink>
                    </LI>
                    <LI>
                        <StyledLink to={'/paymentlist'} isActive={location.pathname === `/paymentlist`}>
                            <span> 구매내역</span>
                        </StyledLink>
                    </LI>
                </UL>
            </div>
        </NAVI>
        </>
    )
}

export default Topbar;