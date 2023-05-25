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
  CFormLabel,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCardHeader,
} from '@coreui/react';
import request from 'src/request';
import { useNavigate, useParams } from 'react-router-dom';

const BranchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState(null);

  const onBasicInfoFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await request.put(`/branch/updateBranch/${id}`, {
        name: state.name,
        address: state.address,
        phone: state.phone,
      });
      if (result.data.success) {
        setState(result.data.data);
        alert('Şube bilgileri güncellendi');
      }
    } catch (error) {
      alert('Şube bilgileri güncellenemedi');
      console.log(error);
    }
  };
  const personelDelete = async (personelId) => {
    // create a confirmation dialog
    if (!window.confirm('Personeli silmek istediğinize emin misiniz?')) {
      return;
    }
    try {
      const result = await request.delete(
        `/personel/deletePersonel/${personelId}`
      );
      if (result.data.success) {
        alert('Personel silindi');
        setState({
          ...state,
          personels: state.personels.filter((item) => item._id !== personelId),
        });
      }
    } catch (error) {
      alert('Personel silinemedi');
      console.log(error);
    }
  };

  // get branch detail on page load
  useEffect(() => {
    request
      .get(`/branch/getBranchById/${id}`)
      .then((response) => {
        setState(response.data.data);
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          navigate('/404');
        }
        navigate('/404');
      });
  }, []);

  if (!state) {
    return <div>Yükleniyor...</div>;
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol xl={12}>
            <CCard className="mx-4 mb-4">
              <CCardHeader>
                <h5>Temel Bilgiler</h5>
              </CCardHeader>
              <CCardBody className="p-4">
                <CForm onSubmit={onBasicInfoFormSubmit}>
                  <CFormLabel>Şube Adı</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Şube Adı"
                      valid={state.name?.length > 0}
                      value={state.name}
                      onChange={(e) =>
                        setState({ ...state, name: e.target.value })
                      }
                    />
                  </CInputGroup>

                  <CFormLabel>Adres</CFormLabel>
                  <CInputGroup className="mb-3">
                    {/* create textbox  for address*/}
                    <CFormInput
                      placeholder="Adres"
                      valid={state.address?.length > 0}
                      value={state.address}
                      onChange={(e) =>
                        setState({ ...state, address: e.target.value })
                      }
                    />
                  </CInputGroup>

                  <CFormLabel>Telefon Numarası</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>+90</CInputGroupText>
                    <CFormInput
                      placeholder="Telefon Numarası"
                      valid={state.phone?.length === 10}
                      value={state.phone}
                      onChange={(e) =>
                        setState({ ...state, phone: e.target.value })
                      }
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Güncelle
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard className="mx-4 mb-4">
              <CCardHeader>
                <h5>Şube Personelleri</h5>
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
                      <CTableHeaderCell>Tam Ad</CTableHeaderCell>
                      <CTableHeaderCell>Rol</CTableHeaderCell>
                      <CTableHeaderCell>TC</CTableHeaderCell>
                      <CTableHeaderCell>E-Posta</CTableHeaderCell>
                      {/* actions column */}
                      <CTableHeaderCell></CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {state?.personels?.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>
                          <div>
                            {item?.name} {item?.surname}
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          {item?.role === 'transportPersonel' && (
                            <div>Nakliye Personeli</div>
                          )}
                          {item?.role === 'branchPersonel' && (
                            <div>Şube Personeli</div>
                          )}
                          {item?.role === 'admin' && <div>Admin</div>}
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item?.tcNo}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item?.email}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color="danger"
                            className="py-0 w-100 text-white"
                            onClick={() => personelDelete(item._id)}
                          >
                            Sil
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
            <CCard className="mx-4 mb-4">
              <CCardHeader>
                <h5>Kargolar</h5>
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
                      <CTableHeaderCell>Gönderici</CTableHeaderCell>
                      <CTableHeaderCell>Alıcı</CTableHeaderCell>
                      <CTableHeaderCell>Kargo içeriği</CTableHeaderCell>
                      <CTableHeaderCell>Durum</CTableHeaderCell>
                      <CTableHeaderCell>Toplam Fiyat</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {state?.cargos?.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>
                          <div>
                            {item?.sender?.name} {item?.sender?.surname}
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>
                            {item?.receiver?.name} {item?.receiver?.surname}
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item?.content}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item?.status}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item?.totalPrice} TL</div>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
            <CCard className="mx-4 mb-4">
              <CCardHeader>
                <h5>Beklenen Kargolar</h5>
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
                      <CTableHeaderCell>Gönderici</CTableHeaderCell>
                      <CTableHeaderCell>Alıcı</CTableHeaderCell>
                      <CTableHeaderCell>Kargo içeriği</CTableHeaderCell>
                      <CTableHeaderCell>Durum</CTableHeaderCell>
                      <CTableHeaderCell>Toplam Fiyat</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {state?.waitingCargos?.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>
                          <div>
                            {item?.sender?.name} {item?.sender?.surname}
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>
                            {item?.receiver?.name} {item?.receiver?.surname}
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item?.content}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item?.status}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item?.totalPrice} TL</div>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default BranchDetail;
