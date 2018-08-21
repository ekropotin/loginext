import { getCookie } from "./utils/cookies";

const csrftoken = getCookie("csrftoken");

chrome.storage.sync.set({ cookie: document.cookie });
