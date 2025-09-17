import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComic } from "../../../redux/actions/admin";

import { useForm } from "react-hook-form";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button';
import "./UploadComic.css";

const UploadComic = () => {
  const dispatch = useDispatch();
  const comic_info = useSelector((state) => state.admin.comic_info);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm();
  // const regex_url = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
 
  const [imagen, setImagen] = useState('');
  const [loading, setLoading] = useState(false);


 const uploadImage = async (e) => {
   const files = e.target.files;
   const data = new FormData();
  data.append("file", files[0]);
  data.append("upload_preset", "comics")
  setLoading(true)
  const res = await fetch (
    "https://api.cloudinary.com/v1_1/det9kofa5/image/upload",
    {
      method: "POST",
      body: data,
    }
  )
  const file = await res.json()
  setImagen(file.secure_url)
  setLoading(false)
  }



  const onSubmit = (values) => {
    setShow(true)
    setValidated(true);

    if (Object.entries(errors).length === 0) {
      const data = {values, imagen}
      dispatch(addComic(data))
    }
  }

  return (
    <div className="mainAdm-users">
      <h2>Upload Issues</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}>
        <Row>
          {/* Name */}
          <Form.Group as={Col} md="4" className="my-2">
            <Form.Label>Comic Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Amazing Spiderman"
              autoComplete="off"
              {...register("name", { required: true })}
            />
            {errors.name && <span className="errors">This field is required</span>}
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          {/* Image */}
          <Form.Group as={Col} md="4" className="my-2">
            <Form.Label>Image</Form.Label>
            <Form.Control
              required
              type="file"
              placeholder="https: ..."
              onChange={uploadImage}
            />
            {loading ? (<h3>Loading image...</h3>) : (<img src={imagen} alt="" style={{width: "100px"}}/>)}
            {errors.image && <span className="errors">{errors.image.message || "This field is required"}</span>}
            < Form.Control.Feedback > Looks good!</Form.Control.Feedback>
          </Form.Group>

          {/*  Description */}
          <Form.Group as={Col} md="4" className="my-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Description"
              autoComplete="off"
              {...register("description")}
              rows={3} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row>
          {/*  Episodes */}
          <Form.Group as={Col} md="4" className="my-2">
            <Form.Label>Episodes</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="No. episodes"
              autoComplete="off"
              {...register("episodes", { required: true, min: { value: 1, message: "Only integers" } })}
            />
            {errors.episodes && <span className="errors">{errors.episodes.message || "This field is required"}</span>}
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          {/*  Released */}
          <Form.Group as={Col} md="4" className="my-2">
            <Form.Label>Release</Form.Label>
            <Form.Control
              required
              type="date"
              placeholder="26 Sep 2020"
              autoComplete="off"
              {...register("release", { required: true })}
            />
            {errors.released && <span className="errors">This field is required</span>}
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          {/*  Publisher */}
          <Form.Group as={Col} md="4" className="my-2">
            <Form.Label>Publisher</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Publisher"
              autoComplete="off"
              {...register("publisher", { required: true })}
            />
            {errors.publisher && <span className="errors">This field is required</span>}
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="d-flex justify-content-end">
          <Button className="mt-3" type="submit">Add comic</Button>
        </Row>
      </Form>
      {
        comic_info.info &&
        <Alert show={show} className="alert-box" key='success' variant='success'>
          <span className="material-symbols-outlined d-flex justify-content-end alert-close" onClick={() => setShow(false)}>
            close
          </span>
          {comic_info.info}
        </Alert>
      }
      {
        comic_info.error &&
        <Alert show={show} className="alert-box" key='danger' variant='danger'>
          <span className="material-symbols-outlined d-flex justify-content-end alert-close" onClick={() => setShow(false)}>
            close
          </span>
          {comic_info.error}
        </Alert>
      }

    </div >
  );
}

export default UploadComic;