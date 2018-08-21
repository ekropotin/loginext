import "../../css/popup.css";

function showError(msg) {
  //TODO:
}

function openPartnerPage(url, token) {
  //const url = "https://mypartner.test.env/?action=login";

  chrome.runtime.sendMessage({ url, token }, function(response) {});

  //chrome.tabs.create({ url: fullUrl });
}

function loadPaToken(uuid, cookie, urlToOpen) {
  const tokenUrl = `https://int-v2-04.test.env/api/user/${uuid}/partner_area_token/`;
  document.cookie = cookie;
  $.get(tokenUrl).done(data => {
    const token = data.auth_token;
    openPartnerPage(urlToOpen, token);
  });
}

function startTokenLoad(uuid, url) {
  chrome.storage.sync.get(["cookie"], data => {
    if (!data && !data["cookie"]) {
      return showError("No cookie avaliable");
    }
    loadPaToken(uuid, data["cookie"], url);
  });
}

$("button").click(e => {
  const url = `${e.currentTarget.dataset.url}/?action=login`;
  const uuid = $("input#uuid")
    .val()
    .trim()
    .replace("-", "");
  startTokenLoad(uuid, url);
});
