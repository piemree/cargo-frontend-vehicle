import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CRow,
  CFormCheck,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import request from 'src/request';

const AddPersonelsToBranch = () => {
  const [state, setState] = useState({
    branchId: '',
    personelIds: [],
  });

  const [personelList, setPersonelList] = useState([]);
  const [branchList, setBranchList] = useState([]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state.branchId === '') {
        alert('Lütfen şube seçiniz');
        return;
      }
      if (state.personelIds.length === 0) {
        alert('Lütfen personel seçiniz');
        return;
      }
      const result = await request.post('/branch/addPersonels', state);
      if (result.data.success) {
        alert('Personeller başarıyla eklendi');
        setState({
          branchId: '',
          personelIds: [],
        });
        request
          .get('/personel/getAllPersonels?role=branchPersonel')
          .then((response) => {
            setPersonelList(response.data.data);
          })
          .catch(console.log);
      }
    } catch (error) {
      alert(error.response?.data?.error?.message);
      console.log(error);
    }
  };

  useEffect(() => {
    request
      .get('/personel/getAllPersonels?role=branchPersonel')
      .then((response) => {
        setPersonelList(response.data.data);
      })
      .catch(console.log);
    request
      .get('/branch/getAllBranches')
      .then((response) => {
        setBranchList(response.data.data);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12} lg={9} xl={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h3>Şube Personel Ekle</h3>
              </CCardHeader>
              <CCardBody>
                <CForm onSubmit={onFormSubmit}>
                  <h5>Şubeler</h5>

                  <CInputGroup className="mb-3">
                    <CFormSelect
                      onChange={(e) =>
                        setState({ ...state, branchId: e.target.value })
                      }
                      value={state.branchId}
                    >
                      <option value={null}>Şube Seçiniz</option>
                      {branchList?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </CFormSelect>
                  </CInputGroup>

                  <h5>Eklenecek Personeller</h5>
                  <CTable
                    align="middle"
                    className="mb-3 border"
                    hover
                    responsive
                  >
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell>
                          <CFormCheck
                            type="checkbox"
                            id="flexCheckDefault"
                            label=""
                            checked={
                              state.personelIds.length === personelList.length
                            }
                            onChange={(e) => {
                              if (e.target.checked) {
                                setState({
                                  ...state,
                                  personelIds: personelList.map(
                                    (item) => item._id
                                  ),
                                });
                              } else {
                                setState({
                                  ...state,
                                  personelIds: [],
                                });
                              }
                            }}
                          />
                        </CTableHeaderCell>
                        <CTableHeaderCell>Tam Ad</CTableHeaderCell>
                        <CTableHeaderCell>Şube</CTableHeaderCell>
                        <CTableHeaderCell>Tc</CTableHeaderCell>
                        <CTableHeaderCell>Email</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {personelList.map((item, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell>
                            <CFormCheck
                              type="checkbox"
                              id="flexCheckDefault"
                              label=""
                              checked={state.personelIds.includes(item._id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setState({
                                    ...state,
                                    personelIds: [
                                      ...state.personelIds,
                                      item._id,
                                    ],
                                  });
                                } else {
                                  setState({
                                    ...state,
                                    personelIds: state.personelIds.filter(
                                      (id) => id !== item._id
                                    ),
                                  });
                                }
                              }}
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>
                              {item?.name} {item?.surname}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>
                            {item?.branch?.name
                              ? item?.branch?.name
                              : 'Şube Yok'}
                          </CTableDataCell>
                          <CTableDataCell>{item?.tcNo}</CTableDataCell>
                          <CTableDataCell>{item?.email}</CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>

                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Ekle
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default AddPersonelsToBranch;
