import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import api from "../Axios";

const SEARCH = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  width: 1000px;
  border: 2px solid lightgrey;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  span{
    font-size:18px;
  }
  input{
    width:500px;
    height:50px;
    padding-left:20px;
    font-size:15px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border: 1px solid rgba(150,150,150,0.1);
  }
  button{
    cursor:pointer;
    height:55px;
    width:80px;
    font-size:16px;
    border-radius: 5px;
    border-color: white;
    background-color: #397CA8;
    color:white;
    &:hover{
      background-color: darkblue;
    }
  }
  & > * {
    margin: 20px;
  }
`
const CONTAINER = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  margin-top:50px;
`
const LIST = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  margin-top:40px;
`
const RESULT =styled.div`
  width: 1000px;
  height: 250px;   
  overflow-y: auto; 
  border-top: 2px solid black;
  td{
    font-weight:bold;
    font-size: 18px;
    padding-left: 30px;
  }
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: lightgrey;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(150,150,150,0.15);
  }
  table {
    width:990px;
    border-collapse: collapse;
    tr{
      height:80px;
      border-bottom: 1px solid lightgrey;
    }
  }
`
function BrandSelect(){
    const navigate = useNavigate();
    const [search, setSearch] = useState([]); // 상태 추가
    const [searchText,setSearchText] = useState('');

    const getSearch = async () => {
        try {
            const resp = await api.post(`/brand/search?brandName=${encodeURIComponent(searchText)}`);
            if(resp && resp.data) {
                setSearch(Array.isArray(resp.data) ? resp.data : [resp.data]);
            }
            else {
                console.error('No data received');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    return (
        <>
            <div>
                <CONTAINER>
                    <SEARCH>
                        <span>브랜드명 검색</span>
                        <input type="text" name="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="브랜드명을 입력해주세요" />
                        <button onClick={getSearch}>
                            <div><IoIosSearch /></div>
                            <div>검색</div>
                        </button>
                    </SEARCH>
                </CONTAINER>
                <LIST>
                    <RESULT>
                        <table>
                            <tbody>
                            {search.map((brand) => (
                                <tr key={brand.id}>
                                    <td>{brand.brand_name}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </RESULT>
                </LIST>
            </div>
        </>
    );
};

export default BrandSelect;