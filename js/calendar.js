/* ===== 営業日カレンダー設定（ここだけ編集すればOK） ===== */
var WEEKLY_CLOSED = [1, 2]; // 定休曜日：0=日 1=月 2=火 3=水 4=木 5=金 6=土
var EXTRA_CLOSED = ["2026-12-31", "2027-01-01", "2027-01-02", "2027-01-03"]; // 臨時休業日 "YYYY-MM-DD"
var EXTRA_OPEN = []; // 定休日だが営業する日
/* ========================================================= */
(function () {
  var now = new Date(),
    y = now.getFullYear(),
    m = now.getMonth();
  var body = document.getElementById("body"),
    ttl = document.getElementById("ttl");
  function p(n) {
    return n < 10 ? "0" + n : "" + n;
  }
  function draw() {
    ttl.textContent = y + "年" + (m + 1) + "月";
    var first = new Date(y, m, 1).getDay(),
      days = new Date(y, m + 1, 0).getDate(),
      h = "<tr>",
      i,
      d;
    for (i = 0; i < first; i++) h += "<td></td>";
    for (d = 1; d <= days; d++) {
      var dow = (first + d - 1) % 7,
        key = y + "-" + p(m + 1) + "-" + p(d);
      var off =
        (WEEKLY_CLOSED.indexOf(dow) > -1 && EXTRA_OPEN.indexOf(key) < 0) ||
        EXTRA_CLOSED.indexOf(key) > -1;
      var tod =
        y == now.getFullYear() && m == now.getMonth() && d == now.getDate();
      h +=
        '<td class="' +
        (off ? "off " : "") +
        (tod ? "today" : "") +
        '">' +
        d +
        (off ? "<i>休</i>" : "") +
        "</td>";
      if (dow == 6 && d < days) h += "</tr><tr>";
    }
    body.innerHTML = h + "</tr>";
  }
  document.getElementById("prev").onclick = function () {
    m--;
    if (m < 0) {
      m = 11;
      y--;
    }
    draw();
  };
  document.getElementById("next").onclick = function () {
    m++;
    if (m > 11) {
      m = 0;
      y++;
    }
    draw();
  };
  draw();
})();
