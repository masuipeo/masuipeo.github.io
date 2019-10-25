String.prototype.bytes = function() {
    let size = 0;
    for (let char of this)
        size += 1 + (encodeURIComponent(char).length > 3);
    return size;
}

function countChars(ele) {
    document.getElementById("count").innerText = "文字数: " + ele.value.length + ", バイト数： " + ele.value.bytes();
}
