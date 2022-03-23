const getCSRFToken = () => {
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      let [cookieName, cookieValue] = cookie.split("=");
      if (cookieName == "csrftoken") return cookieValue;
    }
  }
  return null;
};

const response = fetch("/test", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRFToken": getCSRFToken()
  },
  body: JSON.stringify({ Hello: "World" })
});
