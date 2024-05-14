import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import {
  listSatellites,
  deleteSatellite,
  createSatellite,
} from "../actions/satelliteActions";
import { SATELLITE_CREATE_RESET } from "../constants/satelliteConstants";
import axios from "axios";

function SatelliteListScreen() {
  const dispatch = useDispatch();

  const history = useNavigate();
  const location = useLocation();

  const satelliteList = useSelector((state) => state.satelliteList);
  const { loading, error, satellites, page, pages } = satelliteList;

  const satelliteDelete = useSelector((state) => state.satelliteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = satelliteDelete;

  const satelliteCreate = useSelector((state) => state.satelliteCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    satellite: createdSatellite,
  } = satelliteCreate;

  const [planetSatellites, setPlanetSatellites] = useState(null);
  const [inputData, setInputData] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let keyword = location.search;

  useEffect(() => {
    dispatch({ type: SATELLITE_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history(`/login`);
    }

    if (successCreate) {
      history(`/admin/satellite/${createdSatellite.satelliteId}/edit`);
    } else {
      dispatch(listSatellites(keyword));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdSatellite,
    keyword,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this satellite")) {
      dispatch(deleteSatellite(id));
    }
  };
  const createSatelliteHandler = (satellite) => {
    // console.log('U krijua')
    dispatch(createSatellite());
  };

  // Extract the base path from the current URL
  const basePath = location.pathname;
  console.log("Pathi", basePath);

  console.log(satelliteList, "satelliteList");

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Satellites</h1>
        </Col>

        <Col className="text-right">
          <Button
            className="my-3 d-inline-block cpb"
            onClick={createSatelliteHandler}
          >
            <i className="fas fa-plus"></i> Create Satellite
          </Button>
        </Col>
      </Row>

      <input
        type="text"
        placeholder="Search by planets name"
        name="planet_name"
        onChange={async (event) => {
          try {
            if (event.target.value !== "") {
              setInputData(true);
            } else {
              setInputData(false);
            }
            const { data } = await axios.get(
              `/api/planets/get-satellites/?planet_name=${event.target.value}`
            );
            setPlanetSatellites(data);
          } catch (error) {
            console.error(error);
            setPlanetSatellites(null);
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
                <th>NAME</th>
                <th>SATELLITE</th>
                <th>DESCRIPTION</th>
                <th>PLANET</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {inputData
                ? planetSatellites?.map((satellite) => {
                    return (
                      <tr key={satellite.id}>
                        <td>{satellite.satelliteId}</td>
                        <td>{satellite.name}</td>
                        <td>{satellite.planetId}</td>

                        <td>
                          <LinkContainer
                            to={`/admin/satellite/${satellite.satelliteId}/edit`}
                          >
                            <Button variant="light" className="btn-sm">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </LinkContainer>

                          <Button
                            variant="danger"
                            className="btn-sm"
                            onClick={() => deleteHandler(satellite.satelliteId)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                : satellites.map((satellite) => {
                    return (
                      <tr key={satellite.id}>
                        <td>{satellite.satelliteId}</td>
                        <td>{satellite.name}</td>
                        <td>{satellite.planetId?.name}</td>

                        <td>
                          <LinkContainer
                            to={`/admin/satellite/${satellite.satelliteId}/edit`}
                          >
                            <Button variant="light" className="btn-sm">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </LinkContainer>

                          <Button
                            variant="danger"
                            className="btn-sm"
                            onClick={() => deleteHandler(satellite.satelliteId)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </div>
      )}
    </div>
  );
}

export default SatelliteListScreen;
