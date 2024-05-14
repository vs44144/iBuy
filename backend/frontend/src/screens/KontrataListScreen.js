import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import {
  listKontratas,
  deleteKontrata,
  createKontrata,
} from "../actions/kontrataActions";
import { KONTRATA_CREATE_RESET } from "../constants/kontrataConstants";
import axios from "axios";

function KontrataListScreen() {
  const dispatch = useDispatch();

  const history = useNavigate();
  const location = useLocation();

  const kontrataList = useSelector((state) => state.kontrataList);
  const { loading, error, kontratas, page, pages } = kontrataList;

  const kontrataDelete = useSelector((state) => state.kontrataDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = kontrataDelete;

  const kontrataCreate = useSelector((state) => state.kontrataCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    kontrata: createdKontrata,
  } = kontrataCreate;

  const [puntoriKontratas, setPuntoriKontratas] = useState(null);
  const [inputData, setInputData] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let keyword = location.search;

  useEffect(() => {
    dispatch({ type: KONTRATA_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history(`/login`);
    }

    if (successCreate) {
      history(`/admin/kontrata/${createdKontrata.kontrataId}/edit`);
    } else {
      dispatch(listKontratas(keyword));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdKontrata,
    keyword,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this kontrata")) {
      dispatch(deleteKontrata(id));
    }
  };
  const createKontrataHandler = (kontrata) => {
    // console.log('U krijua')
    dispatch(createKontrata());
  };

  // Extract the base path from the current URL
  const basePath = location.pathname;
  console.log("Pathi", basePath);

  console.log(kontrataList, "kontrataList");

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Kontratas</h1>
        </Col>

        <Col className="text-right">
          <Button
            className="my-3 d-inline-block cpb"
            onClick={createKontrataHandler}
          >
            <i className="fas fa-plus"></i> Create Kontrata
          </Button>
        </Col>
      </Row>

      <input
        type="text"
        placeholder="Search by puntoris name"
        name="puntori_name"
        onChange={async (event) => {
          try {
            if (event.target.value !== "") {
              setInputData(true);
            } else {
              setInputData(false);
            }
            const { data } = await axios.get(
              `/api/puntoris/get-kontratas/?puntori_name=${event.target.value}`
            );
            setPuntoriKontratas(data);
          } catch (error) {
            console.error(error);
            setPuntoriKontratas(null);
            if (event.target.value !== "") {
              setInputData(true);
            } else {
              setInputData(false);
            }
          }
        }}
      />

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
  <Loader />
) : error ? (
  <Message variant="danger">{error}</Message>
) : (
  <div>
    <Table striped bordered hover responsive className="table-sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>Kontrata Name</th>
          <th>Puntori Name</th>
          <th>Start Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {kontratas.map((kontrata) => (
        <tr key={kontrata.kontrataId}>
          <td>{kontrata.kontrataId}</td>
          <td>{kontrata.name}</td>
          <td>{kontrata.puntoriId ? kontrata.puntoriId.name : 'N/A'}</td>
          <td>{kontrata.startData ? new Date(kontrata.startData).toLocaleDateString() : ''}</td>
          
          <td>
            <LinkContainer
              to={`/admin/kontrata/${kontrata.kontrataId}/edit`}
            >
              <Button variant="light" className="btn-sm">
                <i className="fas fa-edit"></i>
              </Button>
            </LinkContainer>
            <Button
              variant="danger"
              className="btn-sm"
              onClick={() => deleteHandler(kontrata.kontrataId)}
            >
              <i className="fas fa-trash"></i>
            </Button>
          </td>
        </tr>
      ))}

      </tbody>
    </Table>
    <Paginate pages={pages} page={page} isAdmin={true} />
  </div>
)}

    </div>
  );
}

export default KontrataListScreen;
