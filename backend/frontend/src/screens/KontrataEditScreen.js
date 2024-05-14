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
  listKontrataDetails,
  updateKontrata,
} from "../actions/kontrataActions";
import { KONTRATA_UPDATE_RESET } from "../constants/kontrataConstants";

function KontrataEditScreen() {
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const kontrataId = id;

  const [name, setName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [puntoriList, setPuntoriList] = useState(false);
  const [selectedPuntori, setSelectedPuntori] = useState(null);

  const kontrataDetails = useSelector((state) => state.kontrataDetails);
  const { error, loading, kontrata } = kontrataDetails;

  const kontrataUpdate = useSelector((state) => state.kontrataUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = kontrataUpdate;

  const [startData, setStartData] = useState(new Date());

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: KONTRATA_UPDATE_RESET });
      history("/admin/kontratalist");
    } else {
      if (!kontrata || kontrata.kontrataId !== Number(kontrataId)) {
        dispatch(listKontrataDetails(kontrataId));
      } else {
        setName(kontrata?.name);
        setStartData(kontrata?.startData ? kontrata.startData.toString() : ''); 
      }
    }
  }, [dispatch, kontrata, kontrataId, history, successUpdate]);
  
  

  const fetchPuntoris = async () => {
    const { data } = await axios.get("/api/puntoris");
    setPuntoriList(data.puntoris);
  };

  useEffect(() => {
    fetchPuntoris();
  }, []);

  const submitHandler = (e) => {
    // console.log('U perditesua')
    e.preventDefault();
    dispatch(
      updateKontrata({
        kontrataId: kontrataId,
        puntoriId: selectedPuntori,
        name,
      })
    );
  };

  console.log("kontrata", kontrata)
  return (
    <div>
      <Link to="/admin/kontratalist/">Go Back</Link>

      <FormContainer>
        <h1>Edit Kontrata</h1>
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

            {puntoriList && (
              <Form.Group controlId="puntoriId">
                <Form.Label>Puntori</Form.Label>
                <Form.Select
                  defaultValue={
                    kontrata.puntoriId
                      ? kontrata.puntoriId.puntoriId
                      : "Select puntori"
                  }
                  onChange={(e) => setSelectedPuntori(e.target.value)}
                >
                  <option value={"Select puntori"} disabled>
                    Select puntori
                  </option>
                  {puntoriList?.map((puntori, idx) => {
                    return (
                      <option key={idx} value={puntori.puntoriId}>
                        {puntori?.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            )}

            <Form.Group controlId="startData">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startData}
                onChange={(e) => setStartData(e.target.value)}
              ></Form.Control>
            </Form.Group>



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
              Update Kontrata
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default KontrataEditScreen;
