let csv_file = [];
function getCSV() {
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "./csv/subjects.csv", true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行

    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ
    req.onload = function () {
        convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
    }
}

// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str) { // 読み込んだCSVデータが文字列として渡される
    // csv_file = []; // 最終的な二次元配列を入れるための配列
    var tmp = str.split("\r\n"); // 改行を区切り文字として行を要素とした配列を生成

    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for (var i = 0; i < tmp.length; ++i) {
        csv_file[i] = tmp[i].split(',');
    }
}

function doAdd(i) {
    db.collection("subjects").add({ // データベースにタスクを追加する
        name: csv_file[i][0], // 教科名
        period: csv_file[i][1], // 時限
        teacher: csv_file[i][2], // 教師
        unit: parseInt(csv_file[i][3]) // 単位数
    }).then(function (docRef) { // 成功した場合に実行される箇所

        console.log("Document written with ID: ", docRef.id);
        if (i < csv_file.length - 1) {
            doAdd(i + 1);
        }
    })
        .catch(function (error) { // 失敗した場合に実行される箇所
            console.log(i)
            console.error("Error adding document: ", error);
        });
}

function addSubject() {
    getCSV(); //最初に実行される
    doAdd(1);
}

// subjectsを取得
function getAllSubjects() {
    let collection = db.collection("subjects"); // 作成された順にデータを並べてタスクデータをデータベースから取得する
    collection.get().then((querySnapshot) => { // 取得したデータを読み取る
        // 変数の初期化
        outputAll = [];
        num = 0;

        querySnapshot.forEach((doc) => { // 取得したデータそれぞれ1つづつのデータに対して
            let status = "";
            if (doc.data()['name'] == "情報科学特講") {
                console.log(doc.data())
            }
            num++;
        });
    });
}
