String.prototype.bytes = function() {
    let size = 0;
    for (let char of this)
        size += 1 + (encodeURIComponent(char).length > 3);
    return size;
}

function countChars(ele) {
    document.getElementById("count").innerText = "文字数: " + ele.value.length + ", バイト数： " + ele.value.bytes();
}

function ime(ele) {
    url = "https://www.google.com/transliterate?langpair=ja-Hira|ja&text=";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', encodeURI(url + ele.value));
    xhr.send();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            let result = JSON.parse(xhr.responseText);
            let ime = "";
            for (let i of result) {
                if ((i.length > 0) && (i[1].length > 0)) {
                    ime += i[1][0];
                }
            }
            document.getElementById("ime").innerText = ime;
            document.getElementById("ime_result").innerText = JSON.stringify(result, null, 2);
        }
    }
}

function bookmarklet(ele) {
    document.getElementById("bookmarklet").href = ele.value;
}

//デフォルトの図書館ID(sysytemid)
var systemid_list = ['Tokyo_Chofu'];
var isbn_list = [
    '4798141771', '479814245X', '4802610335', '4798148563',
    '4802611080', '4798153613', '4798157201', '480261179X',
    '4297105144', '4798160016', '4798163236', '4798163287',
    '4802612486', '4297117207', '4863543301', '4798163821',
    '4274227057', '4798169102', '4798171603', '4297129078',
    '4798175803', '4798171549', '4798179590', '4798180262',
    '4295016802', '4297137194', '4798183938'
];
//市町村選択時に実行される関数
function on_select_city(systemid, pref){
    systemid_list = systemid;
    log(systemid_list);
    //選択市町村の表示
    $('#pref').show();
    $('#pref_name').html(pref);
    apishow();
}
var city_selector = {};
$(function(){
    //市町村選択ダイアログ
    city_selector = new CalilCitySelectDlg({
        'appkey' : 'faf189d7e5379382ec450a34f9240912',
        'select_func' : on_select_city
    });
    apishow();
});
//図書館APIの検索結果の表示
function apishow(){
    $('#calil_booklist').html('');
    $(isbn_list).each(function(i, isbn){
        //Amazonの書影
        var thumbnail = '<a href="http://www.amazon.co.jp/exec/obidos/ASIN/' + isbn + '" target="_blank"><img border="0" src="https://images-na.ssl-images-amazon.com/images/P/' + isbn +'.09.MZZZZZZ.jpg" style="" alt="" onload="if(this.width==\'1\') this.src=\'/public/img/no-image/middle.gif\'"></a>';
        //検索結果表示場所の追加
        $('#calil_booklist').append('<div class="calil_book">'+ thumbnail + '<div id="'+isbn+'"></div></div>');
    });
    //検索表示用のインスタンス作成
    var calil = new Calil({
        'appkey' : 'faf189d7e5379382ec450a34f9240912',
        'render': new CalilRender(),
        'isbn' : isbn_list,
        'systemid' : systemid_list
    });
    calil.search();
}
//デバッグ用関数
function log(text){
    try{
        console.log(text);
    }catch( e ){}
}