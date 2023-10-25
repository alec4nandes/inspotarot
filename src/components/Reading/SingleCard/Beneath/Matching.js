export default function Matching({ matching }) {
    return Object.entries(matching).map(([words, cards]) => (
        <table key={words + cards}>
            <tbody>
                <tr>
                    <td>{words}</td>
                    <td>{cards.join(", ")}</td>
                </tr>
            </tbody>
        </table>
    ));
}
