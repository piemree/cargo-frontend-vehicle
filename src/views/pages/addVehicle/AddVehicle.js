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

const AddVehicle = () => {
  const [state, setState] = useState({
    licensePlate: '',
  });

  const [error, setError] = useState('');

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await request.post('/vehicle/createVehicle', state);
      if (result.data.success) {
        alert('Araç başarıyla eklendi');
      }
    } catch (error) {
      alert(error.response?.data?.error?.message);
      console.log(error);
      setError(error.response?.data?.error?.message);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={onFormSubmit}>
                  <h1>Araç Ekle</h1>
                  <p className="text-medium-emphasis">
                    Yeni araç eklemek için bilgileri giriniz
                  </p>
                  <CInputGroup className="mb-3">
                    {/* create textbox  for address*/}
                    <CFormInput
                      placeholder="Plaka"
                      valid={state.licensePlate.length > 0}
                      value={state.licensePlate}
                      onChange={(e) =>
                        setState({ ...state, licensePlate: e.target.value })
                      }
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Araç Ekle
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

export default AddVehicle;
