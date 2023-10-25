import {
    getSummaryBeneathPrompt,
    getSummarySurfacePrompt,
} from "../../scripts/prompts.js";
import { getPatterns } from "../../scripts/patterns.js";
import CardImage from "../CardImage";

export default function Summary({ cards, vibe, question }) {
    const patterns = getPatterns(cards);

    return (
        <div className="reading-section summary">
            <div className="surface" style={{ minHeight: "auto" }}>
                <p>On the Surface: A Summary</p>
                <div id="all-card-images">
                    {cards.map((card, i) => (
                        <div className="card-wrapper" key={`${card}-${i}`}>
                            <CardImage {...{ card }} />
                            <p>{card.picked.join(", ")}</p>
                        </div>
                    ))}
                </div>
                <p>{getSummarySurfacePrompt({ cards, vibe, question })}</p>
            </div>
            <div className="beneath">
                <p>Beneath the Surface: A Summary</p>
                <PatternsTable {...{ patterns }} />
                <p>{getSummaryBeneathPrompt(patterns)}</p>
            </div>
        </div>
    );
}

function PatternsTable({ patterns }) {
    const { majors, reversed, size, ranks, suits } = patterns;

    return (
        <table id="patterns-table">
            <thead>
                <tr>
                    <th>major arcana</th>
                    <th>reversed</th>
                    {Object.keys(ranks).map((rank) => (
                        <th key={rank}>{rank}</th>
                    ))}
                    {Object.keys(suits).map((suit) => (
                        <th key={suit}>{suit}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {majors} / {size}
                    </td>
                    <td>
                        {reversed} / {size}
                    </td>
                    {Object.values(ranks).map((num, i) => (
                        <td key={`rank-${i}`}>{num}</td>
                    ))}
                    {Object.values(suits).map((num, i) => (
                        <td key={`suit-${i}`}>{num}</td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
}
