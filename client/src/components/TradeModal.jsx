import { React, useState, useEffect } from "react";

import { Modal, Button } from "react-bootstrap";

import ViewPlants from "./ViewPlants";

function TradeModal(props) {
    const { show, ...rest } = props;
    const [trading, setTrading] = useState()
    
    useEffect(() => {
        setTrading(true)
    }, [])

    if (rest.tradePlant===null) {
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
                Start new trade for {rest.tradePlant.common_name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Select a plant to offer:</h3>
                <ViewPlants 
                    allPlants={rest.filteredUserPlants}
                    trading={trading}
                    tradePlant={rest.tradePlant}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="success" 
                    onClick={rest.onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TradeModal;