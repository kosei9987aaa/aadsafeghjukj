const form = document.querySelectorAll("form");
const input = document.querySelector("input");
let iframe = document.getElementById("iframe");
let urlbarhomepage = document.querySelector('#urlbarhomepage input');
let urlbartop = document.querySelector('#searchbar');

let userKey = new URLSearchParams(window.location.search).get("userKey")

form.forEach(item => {
  item.addEventListener("submit", async (event) => {
    event.preventDefault();

  });
})

function go(value) {
  let iframe = document.querySelector(".iframe.active");
  window.navigator.serviceWorker
    .register("./sw.js?userkey=" + userKey, {
      scope: __uv$config.prefix,
    })
    .then(() => {
      let url = value.trim();
      if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
      else if (!(url.startsWith("https://") || url.startsWith("http://")))
        url = "https://" + url;
      iframe.style.display = "block"
      iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);
      //var iframeurl = __uv$config.decodeUrl(iframe.src)
      var iframeurl = iframe.src.substring(iframe.src.indexOf("/service/") + 9);
      //document.querySelector("#urlbartop input").value = iframeurl.substring(iframeurl.indexOf("/service/") + 0);
      document.querySelector("#urlbartop input").value = __uv$config.decodeUrl(iframeurl)

      //getIframeFavicon(iframeurl.substring(iframeurl.indexOf("/service/") + 0))
      getIframeFavicon(__uv$config.decodeUrl(iframeurl))
    });
}

async function getIframeFavicon(value) {

  document.querySelector(".tab.active .tabfavicon").src = "https://s2.googleusercontent.com/s2/favicons?domain_url=" + value

}

urlbarhomepage.onkeydown = function (event) {
  if (event.key === 'Enter') {
    event.preventDefault
    go(urlbarhomepage.value.replace("http://", "https://"));
  }
}

urlbartop.onkeydown = function (event) {
  if (event.key === 'Enter') {
    event.preventDefault
    go(urlbartop.value.replace("http://", "https://"));
  }
}


function isUrl(val = "") {
  if (
    /^http(s?):\/\//.test(val) ||
    (val.includes(".") && val.substr(0, 1) !== " ")
  )
    return true;
  return false;
}
