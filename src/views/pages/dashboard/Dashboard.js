import React, { useEffect, useState } from 'react';

import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormSelect,
  CInputGroup,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

import request from 'src/request';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [cargoList, setCargoList] = useState([]);
  const [currentCargoList, setCurrentCargoList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [branchId, setBranchId] = useState(null);

  const giveCargos = async (e) => {
    e.preventDefault();
    const cnfrm = window.confirm(
      'Kargoları teslim etmek istediğinize emin misiniz?'
    );
    if (!cnfrm) return;
    try {
      const result = await request.post('/vehicle/giveCargosToBranch', {
        branchId,
      });
      if (result.data.success) {
        alert('Kargolar başarıyla teslim edildi');
        fetchData();
      }
    } catch (error) {
      alert('Kargolar teslim edilemedi');
      console.log(error);
    }
  };

  function fetchData() {
    request
      .get('/cargo/getMyVehicleCurrentCargos')
      .then((response) => {
        setCurrentCargoList(response.data.data);
      })
      .catch((error) => {
        console.log(error.response?.data?.error?.message);
      });
    request
      .get('/cargo/getMyVehicleCargos')
      .then((response) => {
        setCargoList(response.data.data);
      })
      .catch((error) => {
        console.log(error.response?.data?.error?.message);
      });
    request
      .get('/branch/getMyVehicleCargosBranchList')
      .then((response) => {
        setBranchList(response.data.data);
      })
      .catch((error) => {
        console.log(error.response?.data?.error?.message);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mx-4 mb-4">
            <CCardHeader>
              <h5>Şube Kargo Teslim</h5>
            </CCardHeader>
            <CCardBody className="p-4">
              <CForm onSubmit={giveCargos}>
                <CInputGroup className="mb-3">
                  <CFormSelect onChange={(e) => setBranchId(e.target.value)}>
                    <option value={null}>Şube Seçiniz</option>
                    {branchList?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                        {' - '}
                        {
                          currentCargoList?.filter(
                            (cargo) => cargo.targetBranch?._id === item._id
                          )?.length
                        }{' '}
                        adet kargo
                      </option>
                    ))}
                  </CFormSelect>
                </CInputGroup>

                <div className="d-grid">
                  <CButton type="submit" color="success">
                    Kargoları Teslim Et
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
          <CCard className="mx-4 mb-4">
            <CCardHeader>
              <h5>Araçdaki Kargolar</h5>
            </CCardHeader>
            <CCardBody className="p-4">
              <CTable
                align="middle"
                className="mb-0 border"
                hover
                responsive
                bordered
              >
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Kayıt Şube</CTableHeaderCell>
                    <CTableHeaderCell>Hedef Şube</CTableHeaderCell>
                    <CTableHeaderCell>Kargo içeriği</CTableHeaderCell>
                    <CTableHeaderCell>Durum</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentCargoList?.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <div>{item?.registerBranch?.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item?.targetBranch?.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item?.content}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item?.status}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
          <CCard className="mx-4 mb-4">
            <CCardHeader>
              <h5>Tüm Kargolar</h5>
            </CCardHeader>
            <CCardBody className="p-4">
              <CTable
                align="middle"
                className="mb-0 border"
                hover
                responsive
                bordered
              >
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Kayıt Şube</CTableHeaderCell>
                    <CTableHeaderCell>Hedef Şube</CTableHeaderCell>
                    <CTableHeaderCell>Kargo içeriği</CTableHeaderCell>
                    <CTableHeaderCell>Durum</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {cargoList?.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <div>{item?.registerBranch?.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item?.targetBranch?.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item?.content}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item?.status}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
