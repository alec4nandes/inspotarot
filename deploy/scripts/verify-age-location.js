const cookieKey = "age_location_verified",
    hideVerifyScreen = () => {
        document.querySelector("#verify-age-location").style.display = "none";
        document.body.style.overflow = "auto";
    };

// handle Enter
document.querySelector("#enter-btn").onclick = () => {
    const IS_DEVELOPMENT = false;
    // add age & location verification cookie
    document.cookie = `${cookieKey}=1;path=/${
        IS_DEVELOPMENT ? "" : ";domain=inspotarot.com"
    }`;
    hideVerifyScreen();
};

// check cookie
const cookieData = parseCookie(document.cookie),
    userVerified = !!+cookieData[cookieKey];
console.log("user verified:", userVerified);

userVerified
    ? hideVerifyScreen()
    : window.scrollY &&
      setTimeout(() => {
          window.scrollTo({ top: 0 });
      }, 200);

// https://www.geekstrick.com/snippets/how-to-parse-cookies-in-javascript/
// cookie in browser: `pkg=math; equation=E%3Dmc%5E2`
// parsed: { pkg: 'math', equation: 'E=mc^2' }
function parseCookie(str) {
    return str
        .split(";")
        .map((v) => v.split("="))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(
                v[1].trim()
            );
            return acc;
        }, {});
}
