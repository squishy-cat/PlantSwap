import { React, useState, useEffect } from "react";

import { Modal, Button } from "react-bootstrap";

import ViewPlants from "./ViewPlants";

function TradeModal({ show, onHide, tradePlant, filteredUserPlants, currentUser, filterListedPlantsForUser }) {
    const [trading, setTrading] = useState()
    
    useEffect(() => {
        setTrading(true)
    }, [])

    if (tradePlant===null) {
        return(
            <Modal 
                show = {show}
            />
        )
    }

    return (
        <Modal
            show = {show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                Start new trade for {tradePlant.common_name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Select a plant to offer:</h3>
                <ViewPlants 
                    allPlants={filterListedPlantsForUser(currentUser)}
                    filteredUserPlants={filteredUserPlants}
                    trading={trading}
                    tradePlant={tradePlant}
                    currentUser={currentUser}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="success" 
                    onClick={onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TradeModal;