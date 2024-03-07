import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import {
  listSatelliteDetails,
  updateSatellite,
} from "../actions/satelliteActions";
import { SATELLITE_UPDATE_RESET } from "../constants/satelliteConstants";

function SatelliteEditScreen() {
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const satelliteId = id;

  const [name, setName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [planetList, setPlanetList] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const satelliteDetails = useSelector((state) => state.satelliteDetails);
  const { error, loading, satellite } = satelliteDetails;

  const satelliteUpdate = useSelector((state) => state.satelliteUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = satelliteUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SATELLITE_UPDATE_RESET });
      history("/admin/satellitelist");
    } else {
      if (!satellite.name || satellite.satelliteId !== Number(satelliteId)) {
        dispatch(listSatelliteDetails(satelliteId));
      } else {
        setName(satellite?.name);
      }
    }
  }, [dispatch, satellite, satelliteId, history, successUpdate]);

  const fetchPlanets = async () => {
    const { data } = await axios.get("/api/planets");
    setPlanetList(data.planets);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  const submitHandler = (e) => {
    // console.log('U perditesua')
    e.preventDefault();
    dispatch(
      updateSatellite({
        satelliteId: satelliteId,
        planetId: selectedPlanet,
        name,
      })
    );
  };

  console.log("sattelite", satellite)
  return (
    <div>
      <Link to="/admin/satellitelist/">Go Back</Link>

      <FormContainer>
        <h1>Edit Satellite</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {planetList && (
              <Form.Group controlId="planetId">
                <Form.Label>Planet</Form.Label>
                <Form.Select
                  defaultValue={
                    satellite.planetId
                      ? satellite.planetId.planetId
                      : "Select planet"
                  }
                  onChange={(e) => setSelectedPlanet(e.target.value)}
                >
                  <option value={"Select planet"} disabled>
                    Select planet
                  </option>
                  {planetList?.map((planet, idx) => {
                    return (
                      <option key={idx} value={planet.planetId}>
                        {planet?.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            )}

            {/* <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control

                  type="text"
                  placeholder="Enter image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                
              </Form.Group>

              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Control 
                    type="file" 
                    placeholder='Choose File'
                    multiple 
                    onChange={uploadFileHandler}
                />
              </Form.Group> */}

            {uploading && <Loader />}

            <Button type="submit" variant="primary">
              Update Satellite
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default SatelliteEditScreen;
