export default function Opposites({ opposites }) {
    return Object.entries(opposites).map(([words, value]) => (
        <table key={words + value.cards}>
            <tbody>
                <tr>
                    <td>{words}</td>
                    <td>{value.cards.join(", ")}</td>
                </tr>
                <tr>
                    <td className="unlike" colSpan={2}>
                        unlike
                    </td>
                </tr>
                {Object.entries(value)
                    .filter(([words]) => words !== "cards")
                    .map(([w, cards]) => (
                        <tr key={w}>
                            <td>{w}</td>
                            <td>{cards.join(", ")}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    ));
}
