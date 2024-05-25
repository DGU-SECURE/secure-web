import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import { IoIosSearch} from "react-icons/io";
import api from "../Axios";
import { useRecoilState } from 'recoil';
import { selectedBrandIdState, brandNameState} from '../state';

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
const BUTTON = styled.div`
  display: flex;
  justify-content: center;
  margin-top:30px;
  button{
    cursor: pointer;
    width:80px;
    height:40px;
    font-size:15px;
    background-color: #397CA8;
    border-radius: 5px;
    border-color: white;
    color:white;
    &:hover{
      background-color: darkblue;
    }
  }
`

function BrandSelect() {
    const navigate = useNavigate();
    const [search, setSearch] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [tempBrandName, setTempBrandName] = useState(''); // 임시 상점 이름 상태
    const [tempBrandId, setTempBrandId] = useState(null); // 임시 상점 ID 상태
    const [brandName, setBrandName] = useRecoilState(brandNameState);
    const [selectedBrandId, setSelectedBrandId] = useRecoilState(selectedBrandIdState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const getSearch = async () => {
        setIsLoading(true);
        setError('');
        try {
            const resp = await api.get(`/customers/store?name=${encodeURIComponent(searchText)}`);
            if (resp && resp.data && resp.data.data) {
                setSearch(Array.isArray(resp.data.data) ? resp.data.data : [resp.data.data]);
            } else {
                console.error('No data received');
                setError('데이터를 받지 못했습니다.');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
            setError('데이터를 가져오는 중 오류가 발생했습니다.');
        }
        setIsLoading(false);
    };

    const selectBrand = (brandId, brandName) => {
        setTempBrandId(brandId);
        setTempBrandName(brandName);
    };

    const moveToItems = () => {
        if (tempBrandId) {
            // 선택된 브랜드명과 ID를 Recoil 상태에 저장
            setBrandName(tempBrandName);
            setSelectedBrandId(tempBrandId);
            // localStorage에 선택된 brandId 저장
            localStorage.setItem('brandId', tempBrandId);
            alert(`선택된 브랜드: ${tempBrandName}로 이동합니다.`);
            navigate(`/${tempBrandId}/selectitem`);
        } else {
            alert('브랜드가 선택되지 않았습니다.');
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
                    {isLoading ? (
                        <p>로딩 중...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <RESULT>
                            <table>
                                <tbody>
                                {search&&search.map((brand)=> (
                                    <tr key={brand.id}  onClick={() => selectBrand(brand.store_id, brand.store_name)}
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: tempBrandId === brand.store_id ? '#F5FCFF' : '#fff',
                                            fontWeight: tempBrandId === brand.store_id ? 'bold' : 'normal'
                                        }}
                                    >
                                        <td>{brand.store_name}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </RESULT>
                    )}
                </LIST>
                <BUTTON>
                    <button onClick={moveToItems}>선택</button>
                </BUTTON>
            </div>
        </>
    );
}

export default BrandSelect;
