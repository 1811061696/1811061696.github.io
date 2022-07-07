import React from "react";
import'./TrendCard.css'
import {TrendData} from '../../Data/TrendData'

function TrendCard() {
    return (
        <div className="trendCard">

            <h3>Nổi bật</h3>

            {TrendData.map((trend) => {
                return (
                    <div key={trend.id} className="trend">
                        <span>#{trend.name}</span>
                        <span> {trend.share} Lượt chia sẻ</span>
                    </div>
                )
            })}
        </div>
     );
}

export default TrendCard;