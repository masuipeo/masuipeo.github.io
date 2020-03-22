document.getElementById("selfile").addEventListener("change",function(e){
    var file = e.target.files;
    var reader = new FileReader();
    reader.readAsText(file[0]);
    reader.onload = function(ev){
        document.getElementById("bookmark").value = reader.result;
    }
},false);

function scrapbox() {
    var bookmark = document.getElementById("bookmark").value;

    var obj = {};

    var div = document.createElement('div');
    div.style.display = 'none';
    div.innerHTML = bookmark;
    document.body.appendChild(div);

    obj.exported = div.getElementsByTagName('H1')[0].getAttribute("LAST_MODIFIED");
    obj.pages = [];
    for (var i = 0; i < div.getElementsByTagName("A").length; i++){
        var link = div.getElementsByTagName("A")[i];
        var dd = div.getElementsByTagName("DD")[i];
        var lines = [link.innerText, dd.innerText.trim(), link.getAttribute("HREF")];
        var tags = link.getAttribute("TAGS");
        if (tags){
            lines.push("");
            tags.split(",").forEach(tag => lines.push("[" + tag + "]"));
        }
        obj.pages.push({
            "title": link.innerText,
            "created": link.getAttribute("ADD_DATE"),
            "updated": link.getAttribute("LAST_VISIT"),
            "lines": lines
        })
    }

    document.body.removeChild(div);

    var jsontext = JSON.stringify(obj);
    var blob = new Blob([ jsontext ], {
        "type" : "text/plain"
    });
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, "scrapbox.json");
        window.navigator.msSaveOrOpenBlob(blob, "scrapbox.json");
    } else {
        document.getElementById("download").href = window.URL.createObjectURL(blob);
    }
}