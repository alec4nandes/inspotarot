import { getIsReversed, getUprightCardName } from "../scripts/data";

export default function CardImage({ card }) {
    return (
        <div className="card-image-container">
            <img
                className={getIsReversed(card.name) ? "reversed" : ""}
                src={`https://delfai.web.app/home/assets/cards/${getUprightCardName(
                    card.name
                )}.jpg`}
                alt={`${card.name} Tarot card`}
            />
        </div>
    );
}
