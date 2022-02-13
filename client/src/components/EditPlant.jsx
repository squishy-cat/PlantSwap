import { useEffect } from "react";
import { React, useState } from "react";

import { Modal, Form, FormGroup, Button } from "react-bootstrap";

function EditPlant({ show, onHide, editPlant, getPlants, currentUser }) {

    const [checked, setChecked] = useState()
    const [formData, setFormData] = useState({
        common_name: "",
        latin_name: "",
        picture: "",
        phase: "",
        care_instructions: "",
        pet_safe: "",
        listed: "",
    })



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    function handleSubmit(e){
        e.preventDefault();

        const plantParams = { ...formData }

        fetch(`../api/plants/${editPlant.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(plantParams),
        }).then((res) => {
            if (res.ok) {
                res.json()
                .then((plant) => {
                    if (plant.listed===true) {
                        fetch(`../api/trade_listings`, {
                            method: "POST",
                            headers: {
                                "Content-Type" : "application/json"
                            },
                            body: JSON.stringify({
                                location: `${currentUser.address}`,
                                plant_id: `${plant.id}`,
                                user_id: `${currentUser}`
                            })
                        })
                    } else if (plant.listed===false) {
                        fetch(`../api/plant-listing/${editPlant.id}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type" : "application/json"
                            }
                        })
                    }
                })
                .then(onHide)
                .then(getPlants)
            } else {
                res.json().then((errors) => {
                    console.error(errors);
                })
            }
        })
    }

    function handleCheck() {
        setFormData({
            ...formData,
            listed: `${!checked}`
        })
        setChecked(!checked)
    }

    useEffect(() => {
        if(editPlant) {
            setChecked(editPlant.listed)
            setFormData({
            ...FormData,
                common_name: `${editPlant.common_name}`,
                latin_name: `${editPlant.latin_name}`,
                picture: `${editPlant.picture}`,
                phase: `${editPlant.phase}`,
                care_instructions: `${editPlant.care_instructions}`,
                pet_safe: `${editPlant.pet_safe}`,
                listed: `${editPlant.listed}`,
            })
        }
    }, [editPlant])

    return(
        <Modal
            show = {show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Plant
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Common name</Form.Label>
                        <Form.Control 
                            id="common_name" 
                            placeholder="Enter common name" 
                            type="text"
                            value={formData.common_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <FormGroup className="mb-3">
                        <Form.Label>Latin name</Form.Label>
                        <Form.Control 
                            id="latin_name" 
                            placeholder="Enter latin name" 
                            type="text"
                            value={formData.latin_name}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Photo</Form.Label>
                        <Form.Control
                            id="picture" 
                            type="url" 
                            placeholder="Enter photo URL" 
                            value={formData.picture}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Growth phase</Form.Label>
                        <Form.Control 
                            id="phase"
                            type="text" 
                            placeholder="Describe plant's growth phase (seedling, cutting, etc)"
                            value={formData.phase}
                            onChange={handleChange} 
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Care Instructions</Form.Label>
                        <Form.Control
                            id="care_instructions" 
                            type="text" 
                            placeholder="Describe plant's care needs"
                            value={formData.care_instructions}
                            onChange={handleChange} 
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label>Is it pet safe?</Form.Label>
                        <Form.Control 
                            id="pet_safe" 
                            type="text"
                            placeholder="Dogs? Cats? Other?" 
                            value={formData.pet_safe}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>List for trade?</Form.Label>
                        <Form.Check 
                            type="checkbox"
                            id="listed"
                            checked={checked}
                            onChange={handleCheck}
                            label="Check if you'd like for this plant to be available to trade"
                        />
                    </Form.Group>
                    <Button
                        type="submit"
                        variant="success"
                        className="my-2"
                    >
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    onClick={onHide}
                    variant="warning"
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditPlant;