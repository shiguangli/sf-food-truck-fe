import { useState, useEffect } from "react"
import axios from "axios";
import { Table, Input } from 'antd';

import './App.css';

const { Search } = Input;

function App() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [searchText, setSearchText] = useState("")
  let [list, setList] = useState([])
  
  const columns = [{"title":"locationid","dataIndex":"locationid","key":"locationid"},{"title":"Applicant","dataIndex":"Applicant","key":"applicant"},{"title":"FacilityType","dataIndex":"FacilityType","key":"facilitytype"},{"title":"cnn","dataIndex":"cnn","key":"cnn"},{"title":"LocationDescription","dataIndex":"LocationDescription","key":"locationdescription"},{"title":"Address","dataIndex":"Address","key":"address"},{"title":"blocklot","dataIndex":"blocklot","key":"blocklot"},{"title":"block","dataIndex":"block","key":"block"},{"title":"lot","dataIndex":"lot","key":"lot"},{"title":"permit","dataIndex":"permit","key":"permit"},{"title":"Status","dataIndex":"Status","key":"status"},{"title":"FoodItems","dataIndex":"FoodItems","key":"fooditems"},{"title":"X","dataIndex":"X","key":"x"},{"title":"Y","dataIndex":"Y","key":"y"},{"title":"Latitude","dataIndex":"Latitude","key":"latitude"},{"title":"Longitude","dataIndex":"Longitude","key":"longitude"},{"title":"Schedule","dataIndex":"Schedule","key":"schedule"},{"title":"dayshours","dataIndex":"dayshours","key":"dayshours"},{"title":"NOISent","dataIndex":"NOISent","key":"noisent"},{"title":"Approved","dataIndex":"Approved","key":"approved"},{"title":"Received","dataIndex":"Received","key":"received"},{"title":"PriorPermit","dataIndex":"PriorPermit","key":"priorpermit"},{"title":"ExpirationDate","dataIndex":"ExpirationDate","key":"expirationdate"},{"title":"Location","dataIndex":"Location","key":"location"},{"title":"Fire Prevention Districts","dataIndex":"Fire Prevention Districts","key":"fire_prevention_districts"},{"title":"Police Districts","dataIndex":"Police Districts","key":"police_districts"},{"title":"Supervisor Districts","dataIndex":"Supervisor Districts","key":"supervisor_districts"},{"title":"Zip Codes","dataIndex":"Zip Codes","key":"zip_codes"},{"title":"Neighborhoods (old)","dataIndex":"Neighborhoods (old)","key":"neighborhoods_old"}]

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let lst = await searchByAPI('')
        setList(lst)
      } catch (error) {
        setErr(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const searchByAPI = async (keyword) => {
    const response = await axios.get(`http://localhost:3001/food-truck/search?input=${keyword}`);
    console.log(`API RESP -- ${response}`)
    // return response
    return response?.data || []
  }

  const searchByKeywords = async (keyword) => {
    let r = await searchByAPI(keyword)
    setList(r)
    // setPageNumber(1)
  }

  return (
    <div className="app-container">
      <div className="app-area">
        <div className="input-area">
          <Search placeholder="Enter Keywords Here" enterButton="Search" value={searchText} onChange={handleSearchTextChange} onSearch={searchByKeywords} size="large" loading={loading} />
        </div>
        <div className="output-area">
          <Table columns={columns} dataSource={list} 
            loading={loading}
            pagination={{
              position: ['topLeft', 'bottomRight'], // 可以是 'topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight'
              // current: pageNumber,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
