(String.prototype.replaceAt = function (e, t) {
    return this.substring(0, e) + t + this.substring(e + 1, this.length);
}),
    (String.prototype.middleAdd = function (e, t) {
        return this.substring(0, e) + t + this.substring(e, this.length);
    }),
    (String.prototype.replaceAll = function (e, t, l) {
        return this.replace(new RegExp(e.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), l ? "gi" : "g"), "string" == typeof t ? t.replace(/\$/g, "$$$$") : t);
    }),
    fetch("./key.json")
        .then((e) => e.json())
        .then((e) => {
            asyncCall(e);
        });
function getTextOfDiv(element) {
  let text = '';

  for (const node of element.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const tag = node.tagName.toLowerCase();

      // If it's a line-breaking tag
      const isBlock = ['div', 'p', 'br', 'section', 'article'].includes(tag);
      if (isBlock) text += '\n';

      text += getTextWithLineBreaks(node);
     if (tag !== 'br' && isBlock) text += '\n';


    }
  }

  return text;
}
var timer = "";
function asyncCall(e) {
    const t = $('[name="Unicode"]'),
        s = document.getElementsByName("Unicode")[0],
        a = $('[name="Classic"]'),
        n = document.getElementsByName("Classic")[0];
    a.focus();
    let r = "",
        i = 0,
        o = "";
    function c() {
        value = t.val();
        var s = "",
            n = [];
        new Promise((t) => {
            if (value) {
                var l = e[0][1];
                for (var s of l) (value = value.replaceAll(s.out, s.seq)), s == l[l.length - 1] && t(value);
            }
        })
            .then(
                (t) =>
                    new Promise((a) => {
                        var r = "";
                        for (l of t) {
                            var i = transform(!1, l, e[0][0]);
                            if (i) {
                                var o = transform(parseInt(i[0]), !1, e[1][0]),
                                    c = "";
                                if (o) c = i[3] ? o[2] : o[1];
                                else {
                                    var f = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "!", "@", "#", "$", "%", "^", "*", "(", ")", "?", ",", "<", ".", ">", "=", "+", ":", ";", "/"],
                                        d = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "!", "@", "#", "৳", "%", "ৰ", "*", "(", ")", "?", ",", "<", ".", ">", "=", "+", ":", ";", "/"];
                                    for (var u of d)
                                        if (l == u) {
                                            c = f[d.indexOf(u)];
                                            break;
                                        }
                                }
                                "©" != r || ("‰" != c && "w" != c && "‡" != c && "v" != c && "x" != c && "y" != c && "~" != c && "Š" != c && "„" != c) ? (c += r) : (c = "i&" + c),
                                    (r = ""),
                                    "‰" == c || "w" == c || "‡" == c
                                        ? "‍" == s[s.length - 2] && "&" == s[s.length - 3]
                                            ? ((s = s.middleAdd(s.length - 4, c)), (c = ""))
                                            : "&" == s[s.length - 2]
                                            ? ((s = "&" == s[s.length - 4] ? s.middleAdd(s.length - 5, c) : s.middleAdd(s.length - 3, c)), (c = ""))
                                            : "©" == s[s.length - 1]
                                            ? ((s = s.middleAdd(s.length - 2, c)), (c = ""))
                                            : "&" != s[s.length - 1] && ((s = s.middleAdd(s.length - 1, c)), (c = ""))
                                        : "&" == c && "i" == s[s.length - 1] && ("‍" != r ? ((c = ""), (s = s.replaceAt(s.length - 1, "")), (r = "©")) : (r = "")),
                                    (s += c);
                            } else if ("়" == l) {
                                switch (s[s.length - 1]) {
                                    case "h":
                                        s += "q";
                                        break;
                                    case "W":
                                        s += "o";
                                        break;
                                    case "X":
                                        s += "p";
                                }
                                s = s.replaceAt(s.length - 2, "");
                            } else if ("‍" == l) r = l;
                            else if (l.match(/[^a-zA-Z]/)) s += l;
                            else {
                                var g;
                                n.length && (g = n[n.length - 1]), g && g[g.length - 1] == s[s.length - 1] ? ((n[n.length - 1] += l), (s += l)) : (n.push(l), (s += l));
                            }
                            l == t[t.length - 1] && a();
                        }
                    })
            )
            .then(() => {
                if (s.length >= 2) {
                    let l = e[1][1];
                    for (var t of ((s = s.replaceAll("y&i", "&iy")), l)) s = s.replaceAll(t.seq, t.out);
                    for (var t of [
                        { seq: "b&Î", out: "š¿" },
                        { seq: "m&Î", out: "¯¿" },
                        { seq: "&‍h", out: "¨" },
                        { seq: "m&µ", out: "¯Œ" },
                        { seq: "y‍&h", out: "y¨" },
                    ])
                        s = s.replaceAll(t.seq, t.out);
                }
                for (var l of n) s = s.replace(l, "<span>" + l + "</span>");
                a.innerHTML=s;
            });
    }
    function f() {
        (value = getTextOfDiv(a[0])), (r = "");
        var s = "";
        new Promise((t) => {
            if (value) {
                let s = e[1][1];
                for (var l of [
                    { seq: "†", out: "‡" },
                    { seq: "¡", out: "&e" },
                    { seq: "¯Œ", out: "m&K&i" },
                ])
                    value = value.replaceAll(l.seq, l.out);
                for (var l of s) (value = value.replaceAll(l.out, l.seq)), l == s[s.length - 1] && t(value);
            }
        })
            .then(
                (t) =>
                    new Promise((a) => {
                        for (l of t) {
                            var n = transform(!1, l, e[1][0]);
                            if (n) {
                                var c = transform(parseInt(n[0]), !1, e[0][0]),
                                    f = (n[3] ? c[2] : c[1]) + r,
                                    u = s[s.length - 1];
                                if ("্" != u)
                                    switch (f) {
                                        case "ে":
                                        case "ৈ":
                                        case "ি":
                                            (r = f), (f = "");
                                            break;
                                        case "র্":
                                            (s = "ে" == u || "ৈ" == u || "ি" == u ? s.middleAdd(s.length - 2, f) : s.middleAdd(s.length - 1, f)), (f = "");
                                            break;
                                        case "‍্য":
                                            ("ে" != u && "ৈ" != u && "ি" != u) || ((f += u), (s = s.replaceAt(s.length - 1, "")));
                                            break;
                                        case "্":
                                            ("ে" != u && "ৈ" != u && "ি" != u) || ((o = u), (i = s.length + 1), (s = s.replaceAt(s.length - 1, "")));
                                            break;
                                        default:
                                            r = "";
                                    }
                                else
                                    switch (f) {
                                        case "ে":
                                        case "ৈ":
                                        case "ি":
                                        case "ী":
                                        case "ু":
                                        case "ূ":
                                        case "ৃ":
                                        case "া":
                                        case "ৃ":
                                        case "ৗ":
                                            (s = s.middleAdd(s.length - 1, o)), (o = ""), (i = void 0);
                                    }
                                (s += f), i && s.length === i && ((s += o), (o = ""), (r = ""), (i = void 0));
                            } else {
                                var g = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "$", "^", "š", "¯", "z", "æ", "¤"],
                                    h = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "৳", "ৰ", "ন", "স", "ু", "ু", "ম"];
                                for (var m of g) {
                                    if (l == m) {
                                        (s += h[g.indexOf(m)] + r), (r = "");
                                        break;
                                    }
                                    m == g[g.length - 1] && (s += l);
                                }
                            }
                            let p = e[0][1];
                            (s = d(s, p)), l == t[t.length - 1] && a();
                        }
                    })
            )
            .then(() => {
                t.val(s);
            });
    }
    function d(e, t, l = !1) {
        var s;
        for (var a of ((s = e.length >= 5 ? (l ? e.substring(l > 3 ? l - 3 : 0, l + 3 < e.length ? l + 3 : e.length) : e.substring(e.length - 5, e.length)) : e), t)) s = s.replace(a.seq, a.out);
        return l ? e.substring(0, l > 3 ? l - 3 : 0) + s + e.substring(l + 3 < e.length ? l + 3 : e.length, e.length) : e.substring(0, e.length - 5) + s;
    }
    t.on("keydown", (l) => {
        let n = l.keyCode,
            f = l.shiftKey,
            u = l.ctrlKey,
            g = l.altKey,
            h = transform(n, !1, e[0][0]);
        if (h) {
            if (u || g)
                console.warn("Externel..."),
                    u &&
                        86 == n &&
                        setTimeout(() => {
                            t.val(t.val().replace(/(?<![র‍])্য/g, "‍্য"));
                        }, 200);
            else {
                l.preventDefault();
                let a = t.val();
                var m = a.length;
                let n = s.selectionEnd;
                if (s.selectionStart != n) {
                    var p = s.selectionStart;
                    (m -= n - p), (a = a.substring(0, p) + a.substring(n, a.length)), (n = p);
                }
                var v = n > 0 ? a[n - 1] : "";
                let c = (f ? h[2] : h[1]) + r;
                if ((r && ((a = a.replaceAt(n - 1, "")), (n -= 1), (m -= 1)), "্" != v))
                    switch (c) {
                        case "ে":
                        case "ৈ":
                        case "ি":
                            r = c;
                            break;
                        case "র্":
                            (a = "ে" == v || "ৈ" == v || "ি" == v || "ো" == v || "ৌ" == v ? a.middleAdd(n - 2, c) : a.middleAdd(n - 1, c)), (c = "");
                            break;
                        case "্র":
                        case "‍্য":
                        case "্":
                            ("ে" != v && "ৈ" != v && "ি" != v) || ((a = a.replaceAt(n - 1, "")), (n -= 1), (m -= 1), "্" == c ? ((i = a.length + 2), (o = v)) : (c += v));
                            break;
                        default:
                            r = "";
                    }
                else
                    switch (c) {
                        case "ে":
                        case "ৈ":
                        case "ি":
                        case "ী":
                        case "ু":
                        case "ূ":
                        case "ৃ":
                        case "া":
                        case "ৃ":
                        case "ৗ":
                            (i = void 0), (a = a.middleAdd(n - 1, o)), (n += 1), (m += 1), (o = "");
                    }
                (a = a.middleAdd(n, c)), i && a.length === i && ((a = a.middleAdd(n + 1, o)), (i = 0), (r = ""));
                var y = d(a, e[0][1], n);
                t.val(y), c && ((n += y.length - m), (s.selectionEnd = n));
            }
            clearTimeout(timer), (timer = setTimeout(c, 1e3));
        } else 8 == n ? ((m -= 1), clearTimeout(timer), (timer = setTimeout(c, 1e3))) : 9 == n && (l.preventDefault(), "none" == a.css("display") ? document.getElementById("Classic2").focus() : a.focus(), (r = ""), (i = ""), (o = ""));
    }),
        a.on("keydown", (l) => {
            let s = l.keyCode,
                c = l.shiftKey,
                u = l.ctrlKey,
                g = l.altKey,
                h = transform(s, !1, e[1][0]),
                m = "";
            if (h)
                if (u || g)
                    (r = ""),
                        u && 86 == s
                            ? setTimeout(() => {
                                  a.val(a.val().replace(/\u2022(?![LNg\u00ff(\u00ffy)(\u00ffz)(\u00ff~)(\u00ff\u201a)(\u00ff\u201e)(\u00ff\u2026)])/g, "·"));
                              }, 200)
                            : !u || (67 != s && 88 != s) || copyClassic(getSelection().toString());
                else {
                    l.preventDefault();
                    const selection = window.getSelection();

                    if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    range.deleteContents();
                    }
                    m = textBeforeCaret();
                    
                    let s = c ? h[2] : h[1];
                    m = m+s;
                    var v = d(m, e[1][1], m.length);
                    clcInsert(v)
                }
            else 9 == s && (l.preventDefault(), t.focus(), (r = ""), (i = ""), (o = ""));
            clearTimeout(timer), (timer = setTimeout(f, 500));
        }),
        $("#Classic2").on("click keydown", (e) => {
            if (e.ctrlKey) (67 != e.keyCode && 88 != e.keyCode) || copyClassic(e.target.innerHTML);
            else {
                e.preventDefault(), a.css("display", "block");
                var t = e.target.innerHTML;
                a.val(t), $(e.target).css("display", "none"), a.focus();
            }
        }),
        $("#copy1").click(() => {
            var e = $("#Classic2");
            "none" == e.css("display") ? copyClassic(a.val()) : copyClassic(e.html()),
                a.focus(),
                $("#copy1").text("Copied!"),
                setTimeout(() => {     $("#copy1").text("Copy");
                }, 1e3);
        }),
        $("#copy2").click(() => {
            navigator.clipboard.writeText(t.val()),
                t.focus(),
                $("#copy2").text("Copied!"),
                setTimeout(() => {
                    $("#copy2").text("Copy");
                }, 1e3);
        });
}
function transform(e = !1, t = !1, l) {
    var s = e ? "keycode" : "nrml_txt";
    if (t)
        for (var a = 0; a < l.length; a++) {
            if (t == (n = l[a])[s]) return [n.keycode, n.nrml_txt, n.sft_txt, !1];
            if (t == n.sft_txt) return [n.keycode, n.nrml_txt, n.sft_txt, !0];
        }
    else
        for (a = 0; a < l.length; a++) {
            var n;
            if (e == (n = l[a])[s]) return [n.keycode, n.nrml_txt, n.sft_txt, !1];
        }
}
function copyClassic(e) {
    navigator.clipboard.write([
        new ClipboardItem({
            "text/plain": new Blob([e], { type: "text/plain" }),
            "text/html": new Blob(["<style>span{font-family:'SutonnyMJ'} span span{font-family:'Times New Roman'}</style><span style=\"\">" + e.replaceAll("\n", "</br>") + "</span>"], { type: "text/html" }),
        }),
    ]);
}
//prevent spy copy site
document.addEventListener("contextmenu", (e) => e.preventDefault());

function ctrlShiftKey(e, keyCode) {
    return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
    // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
    if (e.keyCode === 123 || ctrlShiftKey(e, "I") || ctrlShiftKey(e, "J") || ctrlShiftKey(e, "C") || (e.ctrlKey && e.keyCode === "U".charCodeAt(0))) return false;
};
