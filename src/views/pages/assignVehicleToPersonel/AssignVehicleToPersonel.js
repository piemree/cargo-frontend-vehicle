import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CRow,
} from '@coreui/react';
import request from 'src/request';

const AssignVehicleToPersonel = () => {
  const [state, setState] = useState({
    personelId: '',
    vehicleId: '',
  });

  const [personelList, setPersonelList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await request.put(
        '/personel/assignVehicleToPersonel',
        state
      );
      if (result.data.success) {
        alert('Araç ve personel başarıyla atandı');
      }
    } catch (error) {
      alert(error.response?.data?.error?.message);
      console.log(error);
    }
  };

  useEffect(() => {
    request
      .get('/personel/getAllPersonels?role=transportPersonel')
      .then((response) => {
        setPersonelList(response.data.data);
      })
      .catch(console.log);
    request
      .get('/vehicle/getAllVehicles')
      .then((response) => {
        setVehicleList(response.data.data);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={onFormSubmit}>
                  <h1>Araç ve Personel Atama</h1>

                  <CInputGroup className="mb-3">
                    <CFormSelect
                      onChange={(e) =>
                        setState({ ...state, vehicleId: e.target.value })
                      }
                    >
                      <option value={null}>Araç Seçiniz</option>
                      {vehicleList?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.licensePlate} (Mevcut Şöför:{' '}
                          {item.driver
                            ? item.driver.name + ' ' + item.driver.surname
                            : ''}
                          )
                        </option>
                      ))}
                    </CFormSelect>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CFormSelect
                      onChange={(e) =>
                        setState({ ...state, personelId: e.target.value })
                      }
                    >
                      <option value={null}>Personel Seçiniz</option>
                      {personelList?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name} {item.surname}{' '}
                          {item.vehicle
                            ? `(Mevcut Araç: ${item.vehicle.licensePlate}))`
                            : ''}
                        </option>
                      ))}
                    </CFormSelect>
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Atama Yap
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

export default AssignVehicleToPersonel;
