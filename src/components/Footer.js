export default function Footer() {
    return (
        <footer>
            <Social />
            <p id="contact">
                For any questions or concerns, please contact{" "}
                <a href="mailto:al@fern.haus">
                    al@fern.haus
                </a>
            </p>
            <p id="copyright">&copy; InspoTarot 2023</p>
        </footer>
    );
}

function Social() {
    return (
        <div className="social">
            <a
                href="https://tiktok.com/@inspotarot"
                target="_blank"
                rel="noopener"
            >
                <img
                    src="/app/assets/icons/social/tiktok.png"
                    alt="TikTok logo"
                />
            </a>
            <a
                href="https://instagram.com/inspotarot"
                target="_blank"
                rel="noopener"
            >
                <img
                    src="/app/assets/icons/social/instagram.png"
                    alt="Instagram logo"
                />
            </a>
            <a
                href="https://x.com/inspotarotapp"
                target="_blank"
                rel="noopener"
            >
                <img src="/app/assets/icons/social/x.png" alt="X logo" />
            </a>
        </div>
    );
}
