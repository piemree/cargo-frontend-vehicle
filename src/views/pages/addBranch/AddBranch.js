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

const AddBranch = () => {
  const [state, setState] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const [branchPersonelList, setBranchPersonelList] = useState([]);

  const [error, setError] = useState('');

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await request.post('/branch/create', state);
      if (result.data.success) {
        alert('Şube başarıyla eklendi');

        setState({
          name: '',
          address: '',
          phone: '',
        });
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
                  <h1>Şube Ekle</h1>
                  <p className="text-medium-emphasis">
                    Yeni şube eklemek için bilgileri giriniz
                  </p>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Ad"
                      valid={state.name.length > 0}
                      value={state.name}
                      onChange={(e) =>
                        setState({ ...state, name: e.target.value })
                      }
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    {/* create textbox  for address*/}
                    <CFormInput
                      placeholder="Adres"
                      valid={state.address.length > 0}
                      value={state.address}
                      onChange={(e) =>
                        setState({ ...state, address: e.target.value })
                      }
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>+90</CInputGroupText>
                    <CFormInput
                      placeholder="Telefon Numarası"
                      valid={state.phone.length === 10}
                      value={state.phone}
                      onChange={(e) =>
                        setState({ ...state, phone: e.target.value })
                      }
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Şube Ekle
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

export default AddBranch;
