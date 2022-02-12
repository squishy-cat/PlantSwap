import { React, useState, useEffect } from "react";

import { Form, Button, Alert } from "react-bootstrap"

function EditProfile({ currentUser }) {
    
    const [formData, setFormData] = useState({})
    const [showAlert, setShowAlert] = useState(false)
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    function handleSubmit(e){
        e.preventDefault();

        const userParams = { ...formData }

        fetch(`../api/users/${currentUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(userParams),
        }).then((res) => {
            if (res.ok) {
                res.json()
                .then((data) => setFormData(data))
                .then(setShowAlert(true))
            } else {
                res.json().then((errors) => {
                    console.error(errors);
                })
            }
        })
    }
    
    useEffect(() => {
        if(currentUser) {
            setFormData({
            ...FormData,
                name: `${currentUser.name}`,
                bio: `${currentUser.bio}`,
                photo: `${currentUser.photo}`,
                address: `${currentUser.address}`,
                fav_plant: `${currentUser.fav_plant}`,
                interested_in: `${currentUser.interested_in}`,
            })
        }
    }, [currentUser])

    if (!currentUser) {
        return(
            <div>Loading...</div>
        )
    }

    return (
        <div>
            <Form onSubmit={handleSubmit} className="mx-2">
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        id="name" 
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control 
                        id="bio"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control 
                        id="photo"
                        value={formData.photo}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        id="address" 
                        value={formData.address}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Favorite Plant</Form.Label>
                    <Form.Control 
                        id="fav_plant" 
                        value={formData.fav_plant}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Interested In</Form.Label>
                    <Form.Control 
                        id="interested_in"
                        value={formData.interested_in}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Submit
                </Button>
            </Form>
            <br />
            <Alert show={showAlert} variant="success" className="mx-2">
                <Alert.Heading>Congrats!</Alert.Heading>
                <p>
                Your details have been successfully updated.
                </p>
                <hr />
                <div className="d-flex justify-content-end mx-2">
                <Button onClick={() => setShowAlert(false)} variant="outline-success">
                    Dismiss
                </Button>
                </div>
            </Alert>
        </div>
    )
}

export default EditProfile;