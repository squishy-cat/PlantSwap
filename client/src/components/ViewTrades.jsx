import { React, useState, useEffect } from "react";
import { CardGroup } from "react-bootstrap";
import { useParams, Outlet } from "react-router-dom";

import TradeCard from "./TradeCard";

function ViewTrades({ currentUser }) {
    let params = useParams();
    const [pendingFeedback, setPendingFeedback] = useState([]);
    const [pendingOffers, setPendingOffers] = useState([]);

    const fetchData = () => {
        fetch(`/api/user-trades/${params.userId}`)
        .then ((res) => res.json())
        .then ((trades) => setPendingFeedback(trades))
        fetch(`/api/user-pending/${params.userId}`)
        .then ((res) => res.json())
        .then ((trades) => setPendingOffers(trades))
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <br />
            <h2>Incoming Offers</h2>
            <br />
            <CardGroup
                className="card-deck"
            >
                {pendingFeedback.map((trade) => {
                    return (
                        <TradeCard 
                            key={trade.id}
                            tradeId={trade.id}
                            plantOffered={trade.plant_offered_id}
                            plantWanted={trade.plant_wanted_id}
                            userFrom={trade.offer_from_id}
                            userTo={trade.offer_to_id}
                            currentUser={currentUser}
                            fetchData={fetchData}
                            pending="user"
                        />
                    )
                })}
            </CardGroup>
            <br />
            <h2>Outgoing Offers</h2>
            <br />
            <CardGroup
                className="card-deck"
            >
                {pendingOffers.map((trade) => {
                    return (
                        <TradeCard 
                            key={trade.id}
                            tradeId={trade.id}
                            plantOffered={trade.plant_offered_id}
                            plantWanted={trade.plant_wanted_id}
                            userTo={trade.offer_to_id}
                            userFrom={trade.offer_from_id}
                            currentUser={currentUser}
                            fetchData={fetchData}
                            pending="acceptance"
                        />
                    )
                })}
            </CardGroup>
            <Outlet />
        </div>
    )
}

export default ViewTrades;