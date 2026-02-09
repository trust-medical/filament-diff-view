var H;
(function(i) {
  i.INSERT = "insert", i.DELETE = "delete", i.CONTEXT = "context";
})(H || (H = {}));
const Ke = {
  LINE_BY_LINE: "line-by-line"
}, et = {
  NONE: "none"
}, tt = {
  WORD: "word"
};
var ee;
(function(i) {
  i.AUTO = "auto", i.DARK = "dark", i.LIGHT = "light";
})(ee || (ee = {}));
const nt = [
  "-",
  "[",
  "]",
  "/",
  "{",
  "}",
  "(",
  ")",
  "*",
  "+",
  "?",
  ".",
  "\\",
  "^",
  "$",
  "|"
], it = RegExp("[" + nt.join("\\") + "]", "g");
function rt(i) {
  return i.replace(it, "\\$&");
}
function He(i) {
  return i && i.replace(/\\/g, "/");
}
function st(i) {
  let t, n, e, r = 0;
  for (t = 0, e = i.length; t < e; t++)
    n = i.charCodeAt(t), r = (r << 5) - r + n, r |= 0;
  return r;
}
function Ve(i) {
  const t = i.length;
  let n = -1 / 0;
  for (let e = 0; e < t; e++)
    n = Math.max(n, i[e]);
  return n;
}
function Fe(i, t) {
  const n = i.split(".");
  return n.length > 1 ? n[n.length - 1] : t;
}
function Ae(i, t) {
  return t.reduce((n, e) => n || i.startsWith(e), !1);
}
const Be = ["a/", "b/", "i/", "w/", "c/", "o/"];
function J(i, t, n) {
  const e = n !== void 0 ? [...Be, n] : Be, r = t ? new RegExp(`^${rt(t)} "?(.+?)"?$`) : new RegExp('^"?(.+?)"?$'), [, s = ""] = r.exec(i) || [], a = e.find((c) => s.indexOf(c) === 0);
  return (a ? s.slice(a.length) : s).replace(/\s+\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:\.\d+)? [+-]\d{4}.*$/, "");
}
function at(i, t) {
  return J(i, "---", t);
}
function lt(i, t) {
  return J(i, "+++", t);
}
function qe(i, t = {}) {
  const n = [];
  let e = null, r = null, s = null, a = null, u = null, c = null, h = null;
  const g = "--- ", y = "+++ ", L = "@@", o = /^old mode (\d{6})/, f = /^new mode (\d{6})/, v = /^deleted file mode (\d{6})/, p = /^new file mode (\d{6})/, T = /^copy from "?(.+)"?/, D = /^copy to "?(.+)"?/, N = /^rename from "?(.+)"?/, x = /^rename to "?(.+)"?/, E = /^similarity index (\d+)%/, O = /^dissimilarity index (\d+)%/, j = /^index ([\da-z]+)\.\.([\da-z]+)\s*(\d{6})?/, l = /^Binary files (.*) and (.*) differ/, d = /^GIT binary patch/, b = /^index ([\da-z]+),([\da-z]+)\.\.([\da-z]+)/, C = /^mode (\d{6}),(\d{6})\.\.(\d{6})/, A = /^new file mode (\d{6})/, z = /^deleted file mode (\d{6}),(\d{6})/, P = i.replace(/\\ No newline at end of file/g, "").replace(/\r\n?/g, `
`).split(`
`);
  function I() {
    r !== null && e !== null && (e.blocks.push(r), r = null);
  }
  function X() {
    e !== null && (!e.oldName && c !== null && (e.oldName = c), !e.newName && h !== null && (e.newName = h), e.newName && (n.push(e), e = null)), c = null, h = null;
  }
  function Y() {
    I(), X(), e = {
      blocks: [],
      deletedLines: 0,
      addedLines: 0
    };
  }
  function k(m) {
    I();
    let S;
    e !== null && ((S = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@.*/.exec(m)) ? (e.isCombined = !1, s = parseInt(S[1], 10), u = parseInt(S[2], 10)) : (S = /^@@@ -(\d+)(?:,\d+)? -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@@.*/.exec(m)) ? (e.isCombined = !0, s = parseInt(S[1], 10), a = parseInt(S[2], 10), u = parseInt(S[3], 10)) : (m.startsWith(L) && console.error("Failed to parse lines, starting in 0!"), s = 0, u = 0, e.isCombined = !1)), r = {
      lines: [],
      oldStartLine: s,
      oldStartLine2: a,
      newStartLine: u,
      header: m
    };
  }
  function B(m) {
    if (e === null || r === null || s === null || u === null)
      return;
    const S = {
      content: m
    }, w = e.isCombined ? ["+ ", " +", "++"] : ["+"], $ = e.isCombined ? ["- ", " -", "--"] : ["-"];
    Ae(m, w) ? (e.addedLines++, S.type = H.INSERT, S.oldNumber = void 0, S.newNumber = u++) : Ae(m, $) ? (e.deletedLines++, S.type = H.DELETE, S.oldNumber = s++, S.newNumber = void 0) : (S.type = H.CONTEXT, S.oldNumber = s++, S.newNumber = u++), r.lines.push(S);
  }
  function Q(m, S) {
    let w = S;
    for (; w < P.length - 3; ) {
      if (m.startsWith("diff"))
        return !1;
      if (P[w].startsWith(g) && P[w + 1].startsWith(y) && P[w + 2].startsWith(L))
        return !0;
      w++;
    }
    return !1;
  }
  return P.forEach((m, S) => {
    if (!m || m.startsWith("*"))
      return;
    let w;
    const $ = P[S - 1], ne = P[S + 1], pe = P[S + 2];
    if (m.startsWith("diff --git") || m.startsWith("diff --combined")) {
      if (Y(), (w = /^diff --git "?([a-ciow]\/.+)"? "?([a-ciow]\/.+)"?/.exec(m)) && (c = J(w[1], void 0, t.dstPrefix), h = J(w[2], void 0, t.srcPrefix)), e === null)
        throw new Error("Where is my file !!!");
      e.isGitDiff = !0;
      return;
    }
    if (m.startsWith("Binary files") && !e?.isGitDiff) {
      if (Y(), (w = /^Binary files "?([a-ciow]\/.+)"? and "?([a-ciow]\/.+)"? differ/.exec(m)) && (c = J(w[1], void 0, t.dstPrefix), h = J(w[2], void 0, t.srcPrefix)), e === null)
        throw new Error("Where is my file !!!");
      e.isBinary = !0;
      return;
    }
    if ((!e || !e.isGitDiff && e && m.startsWith(g) && ne.startsWith(y) && pe.startsWith(L)) && Y(), e?.isTooBig)
      return;
    if (e && (typeof t.diffMaxChanges == "number" && e.addedLines + e.deletedLines > t.diffMaxChanges || typeof t.diffMaxLineLength == "number" && m.length > t.diffMaxLineLength)) {
      e.isTooBig = !0, e.addedLines = 0, e.deletedLines = 0, e.blocks = [], r = null;
      const ie = typeof t.diffTooBigMessage == "function" ? t.diffTooBigMessage(n.length) : "Diff too big to be displayed";
      k(ie);
      return;
    }
    if (m.startsWith(g) && ne.startsWith(y) || m.startsWith(y) && $.startsWith(g)) {
      if (e && !e.oldName && m.startsWith("--- ") && (w = at(m, t.srcPrefix))) {
        e.oldName = w, e.language = Fe(e.oldName, e.language);
        return;
      }
      if (e && !e.newName && m.startsWith("+++ ") && (w = lt(m, t.dstPrefix))) {
        e.newName = w, e.language = Fe(e.newName, e.language);
        return;
      }
    }
    if (e && (m.startsWith(L) || e.isGitDiff && e.oldName && e.newName && !r)) {
      k(m);
      return;
    }
    if (r && (m.startsWith("+") || m.startsWith("-") || m.startsWith(" "))) {
      B(m);
      return;
    }
    const Z = !Q(m, S);
    if (e === null)
      throw new Error("Where is my file !!!");
    (w = o.exec(m)) ? e.oldMode = w[1] : (w = f.exec(m)) ? e.newMode = w[1] : (w = v.exec(m)) ? (e.deletedFileMode = w[1], e.isDeleted = !0) : (w = p.exec(m)) ? (e.newFileMode = w[1], e.isNew = !0) : (w = T.exec(m)) ? (Z && (e.oldName = w[1]), e.isCopy = !0) : (w = D.exec(m)) ? (Z && (e.newName = w[1]), e.isCopy = !0) : (w = N.exec(m)) ? (Z && (e.oldName = w[1]), e.isRename = !0) : (w = x.exec(m)) ? (Z && (e.newName = w[1]), e.isRename = !0) : (w = l.exec(m)) ? (e.isBinary = !0, e.oldName = J(w[1], void 0, t.srcPrefix), e.newName = J(w[2], void 0, t.dstPrefix), k("Binary file")) : d.test(m) ? (e.isBinary = !0, k(m)) : (w = E.exec(m)) ? e.unchangedPercentage = parseInt(w[1], 10) : (w = O.exec(m)) ? e.changedPercentage = parseInt(w[1], 10) : (w = j.exec(m)) ? (e.checksumBefore = w[1], e.checksumAfter = w[2], w[3] && (e.mode = w[3])) : (w = b.exec(m)) ? (e.checksumBefore = [w[2], w[3]], e.checksumAfter = w[1]) : (w = C.exec(m)) ? (e.oldMode = [w[2], w[3]], e.newMode = w[1]) : (w = A.exec(m)) ? (e.newFileMode = w[1], e.isNew = !0) : (w = z.exec(m)) && (e.deletedFileMode = w[1], e.isDeleted = !0);
  }), I(), X(), n;
}
function W() {
}
W.prototype = {
  diff: function(t, n) {
    var e, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = r.callback;
    typeof r == "function" && (s = r, r = {});
    var a = this;
    function u(x) {
      return x = a.postProcess(x, r), s ? (setTimeout(function() {
        s(x);
      }, 0), !0) : x;
    }
    t = this.castInput(t, r), n = this.castInput(n, r), t = this.removeEmpty(this.tokenize(t, r)), n = this.removeEmpty(this.tokenize(n, r));
    var c = n.length, h = t.length, g = 1, y = c + h;
    r.maxEditLength != null && (y = Math.min(y, r.maxEditLength));
    var L = (e = r.timeout) !== null && e !== void 0 ? e : 1 / 0, o = Date.now() + L, f = [{
      oldPos: -1,
      lastComponent: void 0
    }], v = this.extractCommon(f[0], n, t, 0, r);
    if (f[0].oldPos + 1 >= h && v + 1 >= c)
      return u(Re(a, f[0].lastComponent, n, t, a.useLongestToken));
    var p = -1 / 0, T = 1 / 0;
    function D() {
      for (var x = Math.max(p, -g); x <= Math.min(T, g); x += 2) {
        var E = void 0, O = f[x - 1], j = f[x + 1];
        O && (f[x - 1] = void 0);
        var l = !1;
        if (j) {
          var d = j.oldPos - x;
          l = j && 0 <= d && d < c;
        }
        var b = O && O.oldPos + 1 < h;
        if (!l && !b) {
          f[x] = void 0;
          continue;
        }
        if (!b || l && O.oldPos < j.oldPos ? E = a.addToPath(j, !0, !1, 0, r) : E = a.addToPath(O, !1, !0, 1, r), v = a.extractCommon(E, n, t, x, r), E.oldPos + 1 >= h && v + 1 >= c)
          return u(Re(a, E.lastComponent, n, t, a.useLongestToken));
        f[x] = E, E.oldPos + 1 >= h && (T = Math.min(T, x - 1)), v + 1 >= c && (p = Math.max(p, x + 1));
      }
      g++;
    }
    if (s)
      (function x() {
        setTimeout(function() {
          if (g > y || Date.now() > o)
            return s();
          D() || x();
        }, 0);
      })();
    else
      for (; g <= y && Date.now() <= o; ) {
        var N = D();
        if (N)
          return N;
      }
  },
  addToPath: function(t, n, e, r, s) {
    var a = t.lastComponent;
    return a && !s.oneChangePerToken && a.added === n && a.removed === e ? {
      oldPos: t.oldPos + r,
      lastComponent: {
        count: a.count + 1,
        added: n,
        removed: e,
        previousComponent: a.previousComponent
      }
    } : {
      oldPos: t.oldPos + r,
      lastComponent: {
        count: 1,
        added: n,
        removed: e,
        previousComponent: a
      }
    };
  },
  extractCommon: function(t, n, e, r, s) {
    for (var a = n.length, u = e.length, c = t.oldPos, h = c - r, g = 0; h + 1 < a && c + 1 < u && this.equals(e[c + 1], n[h + 1], s); )
      h++, c++, g++, s.oneChangePerToken && (t.lastComponent = {
        count: 1,
        previousComponent: t.lastComponent,
        added: !1,
        removed: !1
      });
    return g && !s.oneChangePerToken && (t.lastComponent = {
      count: g,
      previousComponent: t.lastComponent,
      added: !1,
      removed: !1
    }), t.oldPos = c, h;
  },
  equals: function(t, n, e) {
    return e.comparator ? e.comparator(t, n) : t === n || e.ignoreCase && t.toLowerCase() === n.toLowerCase();
  },
  removeEmpty: function(t) {
    for (var n = [], e = 0; e < t.length; e++)
      t[e] && n.push(t[e]);
    return n;
  },
  castInput: function(t) {
    return t;
  },
  tokenize: function(t) {
    return Array.from(t);
  },
  join: function(t) {
    return t.join("");
  },
  postProcess: function(t) {
    return t;
  }
};
function Re(i, t, n, e, r) {
  for (var s = [], a; t; )
    s.push(t), a = t.previousComponent, delete t.previousComponent, t = a;
  s.reverse();
  for (var u = 0, c = s.length, h = 0, g = 0; u < c; u++) {
    var y = s[u];
    if (y.removed)
      y.value = i.join(e.slice(g, g + y.count)), g += y.count;
    else {
      if (!y.added && r) {
        var L = n.slice(h, h + y.count);
        L = L.map(function(o, f) {
          var v = e[g + f];
          return v.length > o.length ? v : o;
        }), y.value = i.join(L);
      } else
        y.value = i.join(n.slice(h, h + y.count));
      h += y.count, y.added || (g += y.count);
    }
  }
  return s;
}
var ot = new W();
function ft(i, t, n) {
  return ot.diff(i, t, n);
}
function Pe(i, t) {
  var n;
  for (n = 0; n < i.length && n < t.length; n++)
    if (i[n] != t[n])
      return i.slice(0, n);
  return i.slice(0, n);
}
function ze(i, t) {
  var n;
  if (!i || !t || i[i.length - 1] != t[t.length - 1])
    return "";
  for (n = 0; n < i.length && n < t.length; n++)
    if (i[i.length - (n + 1)] != t[t.length - (n + 1)])
      return i.slice(-n);
  return i.slice(-n);
}
function ye(i, t, n) {
  if (i.slice(0, t.length) != t)
    throw Error("string ".concat(JSON.stringify(i), " doesn't start with prefix ").concat(JSON.stringify(t), "; this is a bug"));
  return n + i.slice(t.length);
}
function Te(i, t, n) {
  if (!t)
    return i + n;
  if (i.slice(-t.length) != t)
    throw Error("string ".concat(JSON.stringify(i), " doesn't end with suffix ").concat(JSON.stringify(t), "; this is a bug"));
  return i.slice(0, -t.length) + n;
}
function re(i, t) {
  return ye(i, t, "");
}
function oe(i, t) {
  return Te(i, t, "");
}
function ke(i, t) {
  return t.slice(0, ct(i, t));
}
function ct(i, t) {
  var n = 0;
  i.length > t.length && (n = i.length - t.length);
  var e = t.length;
  i.length < t.length && (e = i.length);
  var r = Array(e), s = 0;
  r[0] = 0;
  for (var a = 1; a < e; a++) {
    for (t[a] == t[s] ? r[a] = r[s] : r[a] = s; s > 0 && t[a] != t[s]; )
      s = r[s];
    t[a] == t[s] && s++;
  }
  s = 0;
  for (var u = n; u < i.length; u++) {
    for (; s > 0 && i[u] != t[s]; )
      s = r[s];
    i[u] == t[s] && s++;
  }
  return s;
}
var fe = "a-zA-Z0-9_\\u{C0}-\\u{FF}\\u{D8}-\\u{F6}\\u{F8}-\\u{2C6}\\u{2C8}-\\u{2D7}\\u{2DE}-\\u{2FF}\\u{1E00}-\\u{1EFF}", ut = new RegExp("[".concat(fe, "]+|\\s+|[^").concat(fe, "]"), "ug"), ue = new W();
ue.equals = function(i, t, n) {
  return n.ignoreCase && (i = i.toLowerCase(), t = t.toLowerCase()), i.trim() === t.trim();
};
ue.tokenize = function(i) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n;
  if (t.intlSegmenter) {
    if (t.intlSegmenter.resolvedOptions().granularity != "word")
      throw new Error('The segmenter passed must have a granularity of "word"');
    n = Array.from(t.intlSegmenter.segment(i), function(s) {
      return s.segment;
    });
  } else
    n = i.match(ut) || [];
  var e = [], r = null;
  return n.forEach(function(s) {
    /\s/.test(s) ? r == null ? e.push(s) : e.push(e.pop() + s) : /\s/.test(r) ? e[e.length - 1] == r ? e.push(e.pop() + s) : e.push(r + s) : e.push(s), r = s;
  }), e;
};
ue.join = function(i) {
  return i.map(function(t, n) {
    return n == 0 ? t : t.replace(/^\s+/, "");
  }).join("");
};
ue.postProcess = function(i, t) {
  if (!i || t.oneChangePerToken)
    return i;
  var n = null, e = null, r = null;
  return i.forEach(function(s) {
    s.added ? e = s : s.removed ? r = s : ((e || r) && $e(n, r, e, s), n = s, e = null, r = null);
  }), (e || r) && $e(n, r, e, null), i;
};
function $e(i, t, n, e) {
  if (t && n) {
    var r = t.value.match(/^\s*/)[0], s = t.value.match(/\s*$/)[0], a = n.value.match(/^\s*/)[0], u = n.value.match(/\s*$/)[0];
    if (i) {
      var c = Pe(r, a);
      i.value = Te(i.value, a, c), t.value = re(t.value, c), n.value = re(n.value, c);
    }
    if (e) {
      var h = ze(s, u);
      e.value = ye(e.value, u, h), t.value = oe(t.value, h), n.value = oe(n.value, h);
    }
  } else if (n)
    i && (n.value = n.value.replace(/^\s*/, "")), e && (e.value = e.value.replace(/^\s*/, ""));
  else if (i && e) {
    var g = e.value.match(/^\s*/)[0], y = t.value.match(/^\s*/)[0], L = t.value.match(/\s*$/)[0], o = Pe(g, y);
    t.value = re(t.value, o);
    var f = ze(re(g, o), L);
    t.value = oe(t.value, f), e.value = ye(e.value, g, f), i.value = Te(i.value, g, g.slice(0, g.length - f.length));
  } else if (e) {
    var v = e.value.match(/^\s*/)[0], p = t.value.match(/\s*$/)[0], T = ke(p, v);
    t.value = oe(t.value, T);
  } else if (i) {
    var D = i.value.match(/\s*$/)[0], N = t.value.match(/^\s*/)[0], x = ke(D, N);
    t.value = re(t.value, x);
  }
}
var Xe = new W();
Xe.tokenize = function(i) {
  var t = new RegExp("(\\r?\\n)|[".concat(fe, "]+|[^\\S\\n\\r]+|[^").concat(fe, "]"), "ug");
  return i.match(t) || [];
};
function dt(i, t, n) {
  return Xe.diff(i, t, n);
}
var Ee = new W();
Ee.tokenize = function(i, t) {
  t.stripTrailingCr && (i = i.replace(/\r\n/g, `
`));
  var n = [], e = i.split(/(\n|\r\n)/);
  e[e.length - 1] || e.pop();
  for (var r = 0; r < e.length; r++) {
    var s = e[r];
    r % 2 && !t.newlineIsToken ? n[n.length - 1] += s : n.push(s);
  }
  return n;
};
Ee.equals = function(i, t, n) {
  return n.ignoreWhitespace ? ((!n.newlineIsToken || !i.includes(`
`)) && (i = i.trim()), (!n.newlineIsToken || !t.includes(`
`)) && (t = t.trim())) : n.ignoreNewlineAtEof && !n.newlineIsToken && (i.endsWith(`
`) && (i = i.slice(0, -1)), t.endsWith(`
`) && (t = t.slice(0, -1))), W.prototype.equals.call(this, i, t, n);
};
var ht = new W();
ht.tokenize = function(i) {
  return i.split(/(\S.+?[.!?])(?=\s+|$)/);
};
var pt = new W();
pt.tokenize = function(i) {
  return i.split(/([{}:;,]|\s+)/);
};
function Ne(i) {
  "@babel/helpers - typeof";
  return Ne = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ne(i);
}
var le = new W();
le.useLongestToken = !0;
le.tokenize = Ee.tokenize;
le.castInput = function(i, t) {
  var n = t.undefinedReplacement, e = t.stringifyReplacer, r = e === void 0 ? function(s, a) {
    return typeof a > "u" ? n : a;
  } : e;
  return typeof i == "string" ? i : JSON.stringify(Ce(i, null, null, r), r, "  ");
};
le.equals = function(i, t, n) {
  return W.prototype.equals.call(le, i.replace(/,([\r\n])/g, "$1"), t.replace(/,([\r\n])/g, "$1"), n);
};
function Ce(i, t, n, e, r) {
  t = t || [], n = n || [], e && (i = e(r, i));
  var s;
  for (s = 0; s < t.length; s += 1)
    if (t[s] === i)
      return n[s];
  var a;
  if (Object.prototype.toString.call(i) === "[object Array]") {
    for (t.push(i), a = new Array(i.length), n.push(a), s = 0; s < i.length; s += 1)
      a[s] = Ce(i[s], t, n, e, r);
    return t.pop(), n.pop(), a;
  }
  if (i && i.toJSON && (i = i.toJSON()), Ne(i) === "object" && i !== null) {
    t.push(i), a = {}, n.push(a);
    var u = [], c;
    for (c in i)
      Object.prototype.hasOwnProperty.call(i, c) && u.push(c);
    for (u.sort(), s = 0; s < u.length; s += 1)
      c = u[s], a[c] = Ce(i[c], t, n, e, c);
    t.pop(), n.pop();
  } else
    a = i;
  return a;
}
var xe = new W();
xe.tokenize = function(i) {
  return i.slice();
};
xe.join = xe.removeEmpty = function(i) {
  return i;
};
function mt(i, t) {
  if (i.length === 0)
    return t.length;
  if (t.length === 0)
    return i.length;
  const n = [];
  let e;
  for (e = 0; e <= t.length; e++)
    n[e] = [e];
  let r;
  for (r = 0; r <= i.length; r++)
    n[0][r] = r;
  for (e = 1; e <= t.length; e++)
    for (r = 1; r <= i.length; r++)
      t.charAt(e - 1) === i.charAt(r - 1) ? n[e][r] = n[e - 1][r - 1] : n[e][r] = Math.min(n[e - 1][r - 1] + 1, Math.min(n[e][r - 1] + 1, n[e - 1][r] + 1));
  return n[t.length][i.length];
}
function Le(i) {
  return (t, n) => {
    const e = i(t).trim(), r = i(n).trim();
    return mt(e, r) / (e.length + r.length);
  };
}
function Se(i) {
  function t(e, r, s = /* @__PURE__ */ new Map()) {
    let a = 1 / 0, u;
    for (let c = 0; c < e.length; ++c)
      for (let h = 0; h < r.length; ++h) {
        const g = JSON.stringify([e[c], r[h]]);
        let y;
        s.has(g) && (y = s.get(g)) || (y = i(e[c], r[h]), s.set(g, y)), y < a && (a = y, u = { indexA: c, indexB: h, score: a });
      }
    return u;
  }
  function n(e, r, s = 0, a = /* @__PURE__ */ new Map()) {
    const u = t(e, r, a);
    if (!u || e.length + r.length < 3)
      return [[e, r]];
    const c = e.slice(0, u.indexA), h = r.slice(0, u.indexB), g = [e[u.indexA]], y = [r[u.indexB]], L = u.indexA + 1, o = u.indexB + 1, f = e.slice(L), v = r.slice(o), p = n(c, h, s + 1, a), T = n(g, y, s + 1, a), D = n(f, v, s + 1, a);
    let N = T;
    return (u.indexA > 0 || u.indexB > 0) && (N = p.concat(N)), (e.length > L || r.length > o) && (N = N.concat(D)), N;
  }
  return n;
}
const R = {
  INSERTS: "d2h-ins",
  DELETES: "d2h-del",
  CONTEXT: "d2h-cntx",
  INFO: "d2h-info",
  INSERT_CHANGES: "d2h-ins d2h-change",
  DELETE_CHANGES: "d2h-del d2h-change"
}, de = {
  matching: et.NONE,
  matchWordsThreshold: 0.25,
  maxLineLengthHighlight: 1e4,
  diffStyle: tt.WORD,
  colorScheme: ee.LIGHT
}, U = "/", Je = Le((i) => i.value), bt = Se(Je);
function be(i) {
  return i.indexOf("dev/null") !== -1;
}
function gt(i) {
  return i.replace(/(<ins[^>]*>((.|\n)*?)<\/ins>)/g, "");
}
function vt(i) {
  return i.replace(/(<del[^>]*>((.|\n)*?)<\/del>)/g, "");
}
function ce(i) {
  switch (i) {
    case H.CONTEXT:
      return R.CONTEXT;
    case H.INSERT:
      return R.INSERTS;
    case H.DELETE:
      return R.DELETES;
  }
}
function Oe(i) {
  switch (i) {
    case ee.DARK:
      return "d2h-dark-color-scheme";
    case ee.AUTO:
      return "d2h-auto-color-scheme";
    case ee.LIGHT:
    default:
      return "d2h-light-color-scheme";
  }
}
function wt(i) {
  return i ? 2 : 1;
}
function te(i) {
  return i.slice(0).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
}
function _(i, t, n = !0) {
  const e = wt(t);
  return {
    prefix: i.substring(0, e),
    content: n ? te(i.substring(e)) : i.substring(e)
  };
}
function he(i) {
  const t = He(i.oldName), n = He(i.newName);
  if (t !== n && !be(t) && !be(n)) {
    const e = [], r = [], s = t.split(U), a = n.split(U), u = s.length, c = a.length;
    let h = 0, g = u - 1, y = c - 1;
    for (; h < g && h < y && s[h] === a[h]; )
      e.push(a[h]), h += 1;
    for (; g > h && y > h && s[g] === a[y]; )
      r.unshift(a[y]), g -= 1, y -= 1;
    const L = e.join(U), o = r.join(U), f = s.slice(h, g + 1).join(U), v = a.slice(h, y + 1).join(U);
    return L.length && o.length ? L + U + "{" + f + " → " + v + "}" + U + o : L.length ? L + U + "{" + f + " → " + v + "}" : o.length ? "{" + f + " → " + v + "}" + U + o : t + " → " + n;
  } else return be(n) ? t : n;
}
function Ie(i) {
  return `d2h-${st(he(i)).toString().slice(-6)}`;
}
function De(i) {
  let t = "file-changed";
  return i.isRename || i.isCopy ? t = "file-renamed" : i.isNew ? t = "file-added" : i.isDeleted ? t = "file-deleted" : i.newName !== i.oldName && (t = "file-renamed"), t;
}
function Ye(i, t, n, e = {}) {
  const { matching: r, maxLineLengthHighlight: s, matchWordsThreshold: a, diffStyle: u } = Object.assign(Object.assign({}, de), e), c = _(i, n, !1), h = _(t, n, !1);
  if (c.content.length > s || h.content.length > s)
    return {
      oldLine: {
        prefix: c.prefix,
        content: te(c.content)
      },
      newLine: {
        prefix: h.prefix,
        content: te(h.content)
      }
    };
  const g = u === "char" ? ft(c.content, h.content) : dt(c.content, h.content), y = [];
  if (u === "word" && r === "words") {
    const o = g.filter((p) => p.removed), f = g.filter((p) => p.added);
    bt(f, o).forEach((p) => {
      p[0].length === 1 && p[1].length === 1 && Je(p[0][0], p[1][0]) < a && (y.push(p[0][0]), y.push(p[1][0]));
    });
  }
  const L = g.reduce((o, f) => {
    const v = f.added ? "ins" : f.removed ? "del" : null, p = y.indexOf(f) > -1 ? ' class="d2h-change"' : "", T = te(f.value);
    return v !== null ? `${o}<${v}${p}>${T}</${v}>` : `${o}${T}`;
  }, "");
  return {
    oldLine: {
      prefix: c.prefix,
      content: gt(L)
    },
    newLine: {
      prefix: h.prefix,
      content: vt(L)
    }
  };
}
const We = "file-summary", yt = "icon", Tt = {
  colorScheme: de.colorScheme
};
class Nt {
  constructor(t, n = {}) {
    this.hoganUtils = t, this.config = Object.assign(Object.assign({}, Tt), n);
  }
  render(t) {
    const n = t.map((e) => this.hoganUtils.render(We, "line", {
      fileHtmlId: Ie(e),
      oldName: e.oldName,
      newName: e.newName,
      fileName: he(e),
      deletedLines: "-" + e.deletedLines,
      addedLines: "+" + e.addedLines
    }, {
      fileIcon: this.hoganUtils.template(yt, De(e))
    })).join(`
`);
    return this.hoganUtils.render(We, "wrapper", {
      colorScheme: Oe(this.config.colorScheme),
      filesNumber: t.length,
      files: n
    });
  }
}
const Qe = Object.assign(Object.assign({}, de), { renderNothingWhenEmpty: !1, matchingMaxComparisons: 2500, maxLineSizeInBlockForComparison: 200 }), se = "generic", je = "line-by-line", Ct = "icon", xt = "tag";
class Et {
  constructor(t, n = {}) {
    this.hoganUtils = t, this.config = Object.assign(Object.assign({}, Qe), n);
  }
  render(t) {
    const n = t.map((e) => {
      let r;
      return e.blocks.length ? r = this.generateFileHtml(e) : r = this.generateEmptyDiff(), this.makeFileDiffHtml(e, r);
    }).join(`
`);
    return this.hoganUtils.render(se, "wrapper", {
      colorScheme: Oe(this.config.colorScheme),
      content: n
    });
  }
  makeFileDiffHtml(t, n) {
    if (this.config.renderNothingWhenEmpty && Array.isArray(t.blocks) && t.blocks.length === 0)
      return "";
    const e = this.hoganUtils.template(je, "file-diff"), r = this.hoganUtils.template(se, "file-path"), s = this.hoganUtils.template(Ct, "file"), a = this.hoganUtils.template(xt, De(t));
    return e.render({
      file: t,
      fileHtmlId: Ie(t),
      diffs: n,
      filePath: r.render({
        fileDiffName: he(t)
      }, {
        fileIcon: s,
        fileTag: a
      })
    });
  }
  generateEmptyDiff() {
    return this.hoganUtils.render(se, "empty-diff", {
      contentClass: "d2h-code-line",
      CSSLineClass: R
    });
  }
  generateFileHtml(t) {
    const n = Se(Le((e) => _(e.content, t.isCombined).content));
    return t.blocks.map((e) => {
      let r = this.hoganUtils.render(se, "block-header", {
        CSSLineClass: R,
        blockHeader: t.isTooBig ? e.header : te(e.header),
        lineClass: "d2h-code-linenumber",
        contentClass: "d2h-code-line"
      });
      return this.applyLineGroupping(e).forEach(([s, a, u]) => {
        if (a.length && u.length && !s.length)
          this.applyRematchMatching(a, u, n).map(([c, h]) => {
            const { left: g, right: y } = this.processChangedLines(t, t.isCombined, c, h);
            r += g, r += y;
          });
        else if (s.length)
          s.forEach((c) => {
            const { prefix: h, content: g } = _(c.content, t.isCombined);
            r += this.generateSingleLineHtml(t, {
              type: R.CONTEXT,
              prefix: h,
              content: g,
              oldNumber: c.oldNumber,
              newNumber: c.newNumber
            });
          });
        else if (a.length || u.length) {
          const { left: c, right: h } = this.processChangedLines(t, t.isCombined, a, u);
          r += c, r += h;
        } else
          console.error("Unknown state reached while processing groups of lines", s, a, u);
      }), r;
    }).join(`
`);
  }
  applyLineGroupping(t) {
    const n = [];
    let e = [], r = [];
    for (let s = 0; s < t.lines.length; s++) {
      const a = t.lines[s];
      (a.type !== H.INSERT && r.length || a.type === H.CONTEXT && e.length > 0) && (n.push([[], e, r]), e = [], r = []), a.type === H.CONTEXT ? n.push([[a], [], []]) : a.type === H.INSERT && e.length === 0 ? n.push([[], [], [a]]) : a.type === H.INSERT && e.length > 0 ? r.push(a) : a.type === H.DELETE && e.push(a);
    }
    return (e.length || r.length) && (n.push([[], e, r]), e = [], r = []), n;
  }
  applyRematchMatching(t, n, e) {
    const r = t.length * n.length, s = Ve(t.concat(n).map((u) => u.content.length));
    return r < this.config.matchingMaxComparisons && s < this.config.maxLineSizeInBlockForComparison && (this.config.matching === "lines" || this.config.matching === "words") ? e(t, n) : [[t, n]];
  }
  processChangedLines(t, n, e, r) {
    const s = {
      right: "",
      left: ""
    }, a = Math.max(e.length, r.length);
    for (let u = 0; u < a; u++) {
      const c = e[u], h = r[u], g = c !== void 0 && h !== void 0 ? Ye(c.content, h.content, n, this.config) : void 0, y = c !== void 0 && c.oldNumber !== void 0 ? Object.assign(Object.assign({}, g !== void 0 ? {
        prefix: g.oldLine.prefix,
        content: g.oldLine.content,
        type: R.DELETE_CHANGES
      } : Object.assign(Object.assign({}, _(c.content, n)), { type: ce(c.type) })), { oldNumber: c.oldNumber, newNumber: c.newNumber }) : void 0, L = h !== void 0 && h.newNumber !== void 0 ? Object.assign(Object.assign({}, g !== void 0 ? {
        prefix: g.newLine.prefix,
        content: g.newLine.content,
        type: R.INSERT_CHANGES
      } : Object.assign(Object.assign({}, _(h.content, n)), { type: ce(h.type) })), { oldNumber: h.oldNumber, newNumber: h.newNumber }) : void 0, { left: o, right: f } = this.generateLineHtml(t, y, L);
      s.left += o, s.right += f;
    }
    return s;
  }
  generateLineHtml(t, n, e) {
    return {
      left: this.generateSingleLineHtml(t, n),
      right: this.generateSingleLineHtml(t, e)
    };
  }
  generateSingleLineHtml(t, n) {
    if (n === void 0)
      return "";
    const e = this.hoganUtils.render(je, "numbers", {
      oldNumber: n.oldNumber || "",
      newNumber: n.newNumber || ""
    });
    return this.hoganUtils.render(se, "line", {
      type: n.type,
      lineClass: "d2h-code-linenumber",
      contentClass: "d2h-code-line",
      prefix: n.prefix === " " ? "&nbsp;" : n.prefix,
      content: n.content,
      lineNumber: e,
      line: n,
      file: t
    });
  }
}
const Ze = Object.assign(Object.assign({}, de), { renderNothingWhenEmpty: !1, matchingMaxComparisons: 2500, maxLineSizeInBlockForComparison: 200 }), ae = "generic", Lt = "side-by-side", St = "icon", Ot = "tag";
class It {
  constructor(t, n = {}) {
    this.hoganUtils = t, this.config = Object.assign(Object.assign({}, Ze), n);
  }
  render(t) {
    const n = t.map((e) => {
      let r;
      return e.blocks.length ? r = this.generateFileHtml(e) : r = this.generateEmptyDiff(), this.makeFileDiffHtml(e, r);
    }).join(`
`);
    return this.hoganUtils.render(ae, "wrapper", {
      colorScheme: Oe(this.config.colorScheme),
      content: n
    });
  }
  makeFileDiffHtml(t, n) {
    if (this.config.renderNothingWhenEmpty && Array.isArray(t.blocks) && t.blocks.length === 0)
      return "";
    const e = this.hoganUtils.template(Lt, "file-diff"), r = this.hoganUtils.template(ae, "file-path"), s = this.hoganUtils.template(St, "file"), a = this.hoganUtils.template(Ot, De(t));
    return e.render({
      file: t,
      fileHtmlId: Ie(t),
      diffs: n,
      filePath: r.render({
        fileDiffName: he(t)
      }, {
        fileIcon: s,
        fileTag: a
      })
    });
  }
  generateEmptyDiff() {
    return {
      right: "",
      left: this.hoganUtils.render(ae, "empty-diff", {
        contentClass: "d2h-code-side-line",
        CSSLineClass: R
      })
    };
  }
  generateFileHtml(t) {
    const n = Se(Le((e) => _(e.content, t.isCombined).content));
    return t.blocks.map((e) => {
      const r = {
        left: this.makeHeaderHtml(e.header, t),
        right: this.makeHeaderHtml("")
      };
      return this.applyLineGroupping(e).forEach(([s, a, u]) => {
        if (a.length && u.length && !s.length)
          this.applyRematchMatching(a, u, n).map(([c, h]) => {
            const { left: g, right: y } = this.processChangedLines(t.isCombined, c, h);
            r.left += g, r.right += y;
          });
        else if (s.length)
          s.forEach((c) => {
            const { prefix: h, content: g } = _(c.content, t.isCombined), { left: y, right: L } = this.generateLineHtml({
              type: R.CONTEXT,
              prefix: h,
              content: g,
              number: c.oldNumber
            }, {
              type: R.CONTEXT,
              prefix: h,
              content: g,
              number: c.newNumber
            });
            r.left += y, r.right += L;
          });
        else if (a.length || u.length) {
          const { left: c, right: h } = this.processChangedLines(t.isCombined, a, u);
          r.left += c, r.right += h;
        } else
          console.error("Unknown state reached while processing groups of lines", s, a, u);
      }), r;
    }).reduce((e, r) => ({ left: e.left + r.left, right: e.right + r.right }), { left: "", right: "" });
  }
  applyLineGroupping(t) {
    const n = [];
    let e = [], r = [];
    for (let s = 0; s < t.lines.length; s++) {
      const a = t.lines[s];
      (a.type !== H.INSERT && r.length || a.type === H.CONTEXT && e.length > 0) && (n.push([[], e, r]), e = [], r = []), a.type === H.CONTEXT ? n.push([[a], [], []]) : a.type === H.INSERT && e.length === 0 ? n.push([[], [], [a]]) : a.type === H.INSERT && e.length > 0 ? r.push(a) : a.type === H.DELETE && e.push(a);
    }
    return (e.length || r.length) && (n.push([[], e, r]), e = [], r = []), n;
  }
  applyRematchMatching(t, n, e) {
    const r = t.length * n.length, s = Ve(t.concat(n).map((u) => u.content.length));
    return r < this.config.matchingMaxComparisons && s < this.config.maxLineSizeInBlockForComparison && (this.config.matching === "lines" || this.config.matching === "words") ? e(t, n) : [[t, n]];
  }
  makeHeaderHtml(t, n) {
    return this.hoganUtils.render(ae, "block-header", {
      CSSLineClass: R,
      blockHeader: n?.isTooBig ? t : te(t),
      lineClass: "d2h-code-side-linenumber",
      contentClass: "d2h-code-side-line"
    });
  }
  processChangedLines(t, n, e) {
    const r = {
      right: "",
      left: ""
    }, s = Math.max(n.length, e.length);
    for (let a = 0; a < s; a++) {
      const u = n[a], c = e[a], h = u !== void 0 && c !== void 0 ? Ye(u.content, c.content, t, this.config) : void 0, g = u !== void 0 && u.oldNumber !== void 0 ? Object.assign(Object.assign({}, h !== void 0 ? {
        prefix: h.oldLine.prefix,
        content: h.oldLine.content,
        type: R.DELETE_CHANGES
      } : Object.assign(Object.assign({}, _(u.content, t)), { type: ce(u.type) })), { number: u.oldNumber }) : void 0, y = c !== void 0 && c.newNumber !== void 0 ? Object.assign(Object.assign({}, h !== void 0 ? {
        prefix: h.newLine.prefix,
        content: h.newLine.content,
        type: R.INSERT_CHANGES
      } : Object.assign(Object.assign({}, _(c.content, t)), { type: ce(c.type) })), { number: c.newNumber }) : void 0, { left: L, right: o } = this.generateLineHtml(g, y);
      r.left += L, r.right += o;
    }
    return r;
  }
  generateLineHtml(t, n) {
    return {
      left: this.generateSingleHtml(t),
      right: this.generateSingleHtml(n)
    };
  }
  generateSingleHtml(t) {
    const n = "d2h-code-side-linenumber", e = "d2h-code-side-line";
    return this.hoganUtils.render(ae, "line", {
      type: t?.type || `${R.CONTEXT} d2h-emptyplaceholder`,
      lineClass: t !== void 0 ? n : `${n} d2h-code-side-emptyplaceholder`,
      contentClass: t !== void 0 ? e : `${e} d2h-code-side-emptyplaceholder`,
      prefix: t?.prefix === " " ? "&nbsp;" : t?.prefix,
      content: t?.content,
      lineNumber: t?.number
    });
  }
}
var ge = {}, Ge;
function Dt() {
  return Ge || (Ge = 1, (function(i) {
    (function(t) {
      var n = /\S/, e = /\"/g, r = /\n/g, s = /\r/g, a = /\\/g, u = /\u2028/, c = /\u2029/;
      t.tags = {
        "#": 1,
        "^": 2,
        "<": 3,
        $: 4,
        "/": 5,
        "!": 6,
        ">": 7,
        "=": 8,
        _v: 9,
        "{": 10,
        "&": 11,
        _t: 12
      }, t.scan = function(d, b) {
        var C = d.length, A = 0, z = 1, P = 2, I = A, X = null, Y = null, k = "", B = [], Q = !1, m = 0, S = 0, w = "{{", $ = "}}";
        function ne() {
          k.length > 0 && (B.push({ tag: "_t", text: new String(k) }), k = "");
        }
        function pe() {
          for (var V = !0, G = S; G < B.length; G++)
            if (V = t.tags[B[G].tag] < t.tags._v || B[G].tag == "_t" && B[G].text.match(n) === null, !V)
              return !1;
          return V;
        }
        function Z(V, G) {
          if (ne(), V && pe())
            for (var q = S, K; q < B.length; q++)
              B[q].text && ((K = B[q + 1]) && K.tag == ">" && (K.indent = B[q].text.toString()), B.splice(q, 1));
          else G || B.push({ tag: `
` });
          Q = !1, S = B.length;
        }
        function ie(V, G) {
          var q = "=" + $, K = V.indexOf(q, G), me = g(
            V.substring(V.indexOf("=", G) + 1, K)
          ).split(" ");
          return w = me[0], $ = me[me.length - 1], K + q.length - 1;
        }
        for (b && (b = b.split(" "), w = b[0], $ = b[1]), m = 0; m < C; m++)
          I == A ? y(w, d, m) ? (--m, ne(), I = z) : d.charAt(m) == `
` ? Z(Q) : k += d.charAt(m) : I == z ? (m += w.length - 1, Y = t.tags[d.charAt(m + 1)], X = Y ? d.charAt(m + 1) : "_v", X == "=" ? (m = ie(d, m), I = A) : (Y && m++, I = P), Q = m) : y($, d, m) ? (B.push({
            tag: X,
            n: g(k),
            otag: w,
            ctag: $,
            i: X == "/" ? Q - w.length : m + $.length
          }), k = "", m += $.length - 1, I = A, X == "{" && ($ == "}}" ? m++ : h(B[B.length - 1]))) : k += d.charAt(m);
        return Z(Q, !0), B;
      };
      function h(l) {
        l.n.substr(l.n.length - 1) === "}" && (l.n = l.n.substring(0, l.n.length - 1));
      }
      function g(l) {
        return l.trim ? l.trim() : l.replace(/^\s*|\s*$/g, "");
      }
      function y(l, d, b) {
        if (d.charAt(b) != l.charAt(0))
          return !1;
        for (var C = 1, A = l.length; C < A; C++)
          if (d.charAt(b + C) != l.charAt(C))
            return !1;
        return !0;
      }
      var L = { _t: !0, "\n": !0, $: !0, "/": !0 };
      function o(l, d, b, C) {
        var A = [], z = null, P = null, I = null;
        for (P = b[b.length - 1]; l.length > 0; ) {
          if (I = l.shift(), P && P.tag == "<" && !(I.tag in L))
            throw new Error("Illegal content in < super tag.");
          if (t.tags[I.tag] <= t.tags.$ || f(I, C))
            b.push(I), I.nodes = o(l, I.tag, b, C);
          else if (I.tag == "/") {
            if (b.length === 0)
              throw new Error("Closing tag without opener: /" + I.n);
            if (z = b.pop(), I.n != z.n && !v(I.n, z.n, C))
              throw new Error("Nesting error: " + z.n + " vs. " + I.n);
            return z.end = I.i, A;
          } else I.tag == `
` && (I.last = l.length == 0 || l[0].tag == `
`);
          A.push(I);
        }
        if (b.length > 0)
          throw new Error("missing closing tag: " + b.pop().n);
        return A;
      }
      function f(l, d) {
        for (var b = 0, C = d.length; b < C; b++)
          if (d[b].o == l.n)
            return l.tag = "#", !0;
      }
      function v(l, d, b) {
        for (var C = 0, A = b.length; C < A; C++)
          if (b[C].c == l && b[C].o == d)
            return !0;
      }
      function p(l) {
        var d = [];
        for (var b in l)
          d.push('"' + N(b) + '": function(c,p,t,i) {' + l[b] + "}");
        return "{ " + d.join(",") + " }";
      }
      function T(l) {
        var d = [];
        for (var b in l.partials)
          d.push('"' + N(b) + '":{name:"' + N(l.partials[b].name) + '", ' + T(l.partials[b]) + "}");
        return "partials: {" + d.join(",") + "}, subs: " + p(l.subs);
      }
      t.stringify = function(l, d, b) {
        return "{code: function (c,p,i) { " + t.wrapMain(l.code) + " }," + T(l) + "}";
      };
      var D = 0;
      t.generate = function(l, d, b) {
        D = 0;
        var C = { code: "", subs: {}, partials: {} };
        return t.walk(l, C), b.asString ? this.stringify(C, d, b) : this.makeTemplate(C, d, b);
      }, t.wrapMain = function(l) {
        return 'var t=this;t.b(i=i||"");' + l + "return t.fl();";
      }, t.template = t.Template, t.makeTemplate = function(l, d, b) {
        var C = this.makePartials(l);
        return C.code = new Function("c", "p", "i", this.wrapMain(l.code)), new this.template(C, d, this, b);
      }, t.makePartials = function(l) {
        var d, b = { subs: {}, partials: l.partials, name: l.name };
        for (d in b.partials)
          b.partials[d] = this.makePartials(b.partials[d]);
        for (d in l.subs)
          b.subs[d] = new Function("c", "p", "t", "i", l.subs[d]);
        return b;
      };
      function N(l) {
        return l.replace(a, "\\\\").replace(e, '\\"').replace(r, "\\n").replace(s, "\\r").replace(u, "\\u2028").replace(c, "\\u2029");
      }
      function x(l) {
        return ~l.indexOf(".") ? "d" : "f";
      }
      function E(l, d) {
        var b = "<" + (d.prefix || ""), C = b + l.n + D++;
        return d.partials[C] = { name: l.n, partials: {} }, d.code += 't.b(t.rp("' + N(C) + '",c,p,"' + (l.indent || "") + '"));', C;
      }
      t.codegen = {
        "#": function(l, d) {
          d.code += "if(t.s(t." + x(l.n) + '("' + N(l.n) + '",c,p,1),c,p,0,' + l.i + "," + l.end + ',"' + l.otag + " " + l.ctag + '")){t.rs(c,p,function(c,p,t){', t.walk(l.nodes, d), d.code += "});c.pop();}";
        },
        "^": function(l, d) {
          d.code += "if(!t.s(t." + x(l.n) + '("' + N(l.n) + '",c,p,1),c,p,1,0,0,"")){', t.walk(l.nodes, d), d.code += "};";
        },
        ">": E,
        "<": function(l, d) {
          var b = { partials: {}, code: "", subs: {}, inPartial: !0 };
          t.walk(l.nodes, b);
          var C = d.partials[E(l, d)];
          C.subs = b.subs, C.partials = b.partials;
        },
        $: function(l, d) {
          var b = { subs: {}, code: "", partials: d.partials, prefix: l.n };
          t.walk(l.nodes, b), d.subs[l.n] = b.code, d.inPartial || (d.code += 't.sub("' + N(l.n) + '",c,p,i);');
        },
        "\n": function(l, d) {
          d.code += j('"\\n"' + (l.last ? "" : " + i"));
        },
        _v: function(l, d) {
          d.code += "t.b(t.v(t." + x(l.n) + '("' + N(l.n) + '",c,p,0)));';
        },
        _t: function(l, d) {
          d.code += j('"' + N(l.text) + '"');
        },
        "{": O,
        "&": O
      };
      function O(l, d) {
        d.code += "t.b(t.t(t." + x(l.n) + '("' + N(l.n) + '",c,p,0)));';
      }
      function j(l) {
        return "t.b(" + l + ");";
      }
      t.walk = function(l, d) {
        for (var b, C = 0, A = l.length; C < A; C++)
          b = t.codegen[l[C].tag], b && b(l[C], d);
        return d;
      }, t.parse = function(l, d, b) {
        return b = b || {}, o(l, "", [], b.sectionTags || []);
      }, t.cache = {}, t.cacheKey = function(l, d) {
        return [l, !!d.asString, !!d.disableLambda, d.delimiters, !!d.modelGet].join("||");
      }, t.compile = function(l, d) {
        d = d || {};
        var b = t.cacheKey(l, d), C = this.cache[b];
        if (C) {
          var A = C.partials;
          for (var z in A)
            delete A[z].instance;
          return C;
        }
        return C = this.generate(this.parse(this.scan(l, d.delimiters), l, d), l, d), this.cache[b] = C;
      };
    })(i);
  })(ge)), ge;
}
var ve = {}, Ue;
function Mt() {
  return Ue || (Ue = 1, (function(i) {
    (function(t) {
      t.Template = function(o, f, v, p) {
        o = o || {}, this.r = o.code || this.r, this.c = v, this.options = p || {}, this.text = f || "", this.partials = o.partials || {}, this.subs = o.subs || {}, this.buf = "";
      }, t.Template.prototype = {
        // render: replaced by generated code.
        r: function(o, f, v) {
          return "";
        },
        // variable escaping
        v: y,
        // triple stache
        t: g,
        render: function(f, v, p) {
          return this.ri([f], v || {}, p);
        },
        // render internal -- a hook for overrides that catches partials too
        ri: function(o, f, v) {
          return this.r(o, f, v);
        },
        // ensurePartial
        ep: function(o, f) {
          var v = this.partials[o], p = f[v.name];
          if (v.instance && v.base == p)
            return v.instance;
          if (typeof p == "string") {
            if (!this.c)
              throw new Error("No compiler available.");
            p = this.c.compile(p, this.options);
          }
          if (!p)
            return null;
          if (this.partials[o].base = p, v.subs) {
            f.stackText || (f.stackText = {});
            for (key in v.subs)
              f.stackText[key] || (f.stackText[key] = this.activeSub !== void 0 && f.stackText[this.activeSub] ? f.stackText[this.activeSub] : this.text);
            p = e(
              p,
              v.subs,
              v.partials,
              this.stackSubs,
              this.stackPartials,
              f.stackText
            );
          }
          return this.partials[o].instance = p, p;
        },
        // tries to find a partial in the current scope and render it
        rp: function(o, f, v, p) {
          var T = this.ep(o, v);
          return T ? T.ri(f, v, p) : "";
        },
        // render a section
        rs: function(o, f, v) {
          var p = o[o.length - 1];
          if (!L(p)) {
            v(o, f, this);
            return;
          }
          for (var T = 0; T < p.length; T++)
            o.push(p[T]), v(o, f, this), o.pop();
        },
        // maybe start a section
        s: function(o, f, v, p, T, D, N) {
          var x;
          return L(o) && o.length === 0 ? !1 : (typeof o == "function" && (o = this.ms(o, f, v, p, T, D, N)), x = !!o, !p && x && f && f.push(typeof o == "object" ? o : f[f.length - 1]), x);
        },
        // find values with dotted names
        d: function(o, f, v, p) {
          var T, D = o.split("."), N = this.f(D[0], f, v, p), x = this.options.modelGet, E = null;
          if (o === "." && L(f[f.length - 2]))
            N = f[f.length - 1];
          else
            for (var O = 1; O < D.length; O++)
              T = n(D[O], N, x), T !== void 0 ? (E = N, N = T) : N = "";
          return p && !N ? !1 : (!p && typeof N == "function" && (f.push(E), N = this.mv(N, f, v), f.pop()), N);
        },
        // find values with normal names
        f: function(o, f, v, p) {
          for (var T = !1, D = null, N = !1, x = this.options.modelGet, E = f.length - 1; E >= 0; E--)
            if (D = f[E], T = n(o, D, x), T !== void 0) {
              N = !0;
              break;
            }
          return N ? (!p && typeof T == "function" && (T = this.mv(T, f, v)), T) : p ? !1 : "";
        },
        // higher order templates
        ls: function(o, f, v, p, T, D) {
          var N = this.options.delimiters;
          return this.options.delimiters = D, this.b(this.ct(g(o.call(f, T, v)), f, p)), this.options.delimiters = N, !1;
        },
        // compile text
        ct: function(o, f, v) {
          if (this.options.disableLambda)
            throw new Error("Lambda features disabled.");
          return this.c.compile(o, this.options).render(f, v);
        },
        // template result buffering
        b: function(o) {
          this.buf += o;
        },
        fl: function() {
          var o = this.buf;
          return this.buf = "", o;
        },
        // method replace section
        ms: function(o, f, v, p, T, D, N) {
          var x, E = f[f.length - 1], O = o.call(E);
          return typeof O == "function" ? p ? !0 : (x = this.activeSub && this.subsText && this.subsText[this.activeSub] ? this.subsText[this.activeSub] : this.text, this.ls(O, E, f, v, x.substring(T, D), N)) : O;
        },
        // method replace variable
        mv: function(o, f, v) {
          var p = f[f.length - 1], T = o.call(p);
          return typeof T == "function" ? this.ct(g(T.call(p)), p, v) : T;
        },
        sub: function(o, f, v, p) {
          var T = this.subs[o];
          T && (this.activeSub = o, T(f, v, this, p), this.activeSub = !1);
        }
      };
      function n(o, f, v) {
        var p;
        return f && typeof f == "object" && (f[o] !== void 0 ? p = f[o] : v && f.get && typeof f.get == "function" && (p = f.get(o))), p;
      }
      function e(o, f, v, p, T, D) {
        function N() {
        }
        N.prototype = o;
        function x() {
        }
        x.prototype = o.subs;
        var E, O = new N();
        O.subs = new x(), O.subsText = {}, O.buf = "", p = p || {}, O.stackSubs = p, O.subsText = D;
        for (E in f)
          p[E] || (p[E] = f[E]);
        for (E in p)
          O.subs[E] = p[E];
        T = T || {}, O.stackPartials = T;
        for (E in v)
          T[E] || (T[E] = v[E]);
        for (E in T)
          O.partials[E] = T[E];
        return O;
      }
      var r = /&/g, s = /</g, a = />/g, u = /\'/g, c = /\"/g, h = /[&<>\"\']/;
      function g(o) {
        return String(o ?? "");
      }
      function y(o) {
        return o = g(o), h.test(o) ? o.replace(r, "&amp;").replace(s, "&lt;").replace(a, "&gt;").replace(u, "&#39;").replace(c, "&quot;") : o;
      }
      var L = Array.isArray || function(o) {
        return Object.prototype.toString.call(o) === "[object Array]";
      };
    })(i);
  })(ve)), ve;
}
var we, _e;
function Ht() {
  if (_e) return we;
  _e = 1;
  var i = Dt();
  return i.Template = Mt().Template, i.template = i.Template, we = i, we;
}
var M = Ht();
const F = {};
F["file-summary-line"] = new M.Template({ code: function(i, t, n) {
  var e = this;
  return e.b(n = n || ""), e.b('<li class="d2h-file-list-line">'), e.b(`
` + n), e.b('    <span class="d2h-file-name-wrapper">'), e.b(`
` + n), e.b(e.rp("<fileIcon0", i, t, "      ")), e.b('      <a href="#'), e.b(e.v(e.f("fileHtmlId", i, t, 0))), e.b('" class="d2h-file-name">'), e.b(e.v(e.f("fileName", i, t, 0))), e.b("</a>"), e.b(`
` + n), e.b('      <span class="d2h-file-stats">'), e.b(`
` + n), e.b('          <span class="d2h-lines-added">'), e.b(e.v(e.f("addedLines", i, t, 0))), e.b("</span>"), e.b(`
` + n), e.b('          <span class="d2h-lines-deleted">'), e.b(e.v(e.f("deletedLines", i, t, 0))), e.b("</span>"), e.b(`
` + n), e.b("      </span>"), e.b(`
` + n), e.b("    </span>"), e.b(`
` + n), e.b("</li>"), e.fl();
}, partials: { "<fileIcon0": { name: "fileIcon", partials: {}, subs: {} } }, subs: {} });
F["file-summary-wrapper"] = new M.Template({ code: function(i, t, n) {
  var e = this;
  return e.b(n = n || ""), e.b('<div class="d2h-file-list-wrapper '), e.b(e.v(e.f("colorScheme", i, t, 0))), e.b('">'), e.b(`
` + n), e.b('    <div class="d2h-file-list-header">'), e.b(`
` + n), e.b('        <span class="d2h-file-list-title">Files changed ('), e.b(e.v(e.f("filesNumber", i, t, 0))), e.b(")</span>"), e.b(`
` + n), e.b('        <a class="d2h-file-switch d2h-hide">hide</a>'), e.b(`
` + n), e.b('        <a class="d2h-file-switch d2h-show">show</a>'), e.b(`
` + n), e.b("    </div>"), e.b(`
` + n), e.b('    <ol class="d2h-file-list">'), e.b(`
` + n), e.b("    "), e.b(e.t(e.f("files", i, t, 0))), e.b(`
` + n), e.b("    </ol>"), e.b(`
` + n), e.b("</div>"), e.fl();
}, partials: {}, subs: {} });
F["generic-block-header"] = new M.Template({ code: function(i, t, n) {
  var e = this;
  return e.b(n = n || ""), e.b("<tr>"), e.b(`
` + n), e.b('    <td class="'), e.b(e.v(e.f("lineClass", i, t, 0))), e.b(" "), e.b(e.v(e.d("CSSLineClass.INFO", i, t, 0))), e.b('"></td>'), e.b(`
` + n), e.b('    <td class="'), e.b(e.v(e.d("CSSLineClass.INFO", i, t, 0))), e.b('">'), e.b(`
` + n), e.b('        <div class="'), e.b(e.v(e.f("contentClass", i, t, 0))), e.b('">'), e.s(e.f("blockHeader", i, t, 1), i, t, 0, 156, 173, "{{ }}") && (e.rs(i, t, function(r, s, a) {
    a.b(a.t(a.f("blockHeader", r, s, 0)));
  }), i.pop()), e.s(e.f("blockHeader", i, t, 1), i, t, 1, 0, 0, "") || e.b("&nbsp;"), e.b("</div>"), e.b(`
` + n), e.b("    </td>"), e.b(`
` + n), e.b("</tr>"), e.fl();
}, partials: {}, subs: {} });
F["generic-empty-diff"] = new M.Template({ code: function(i, t, n) {
  var e = this;
  return e.b(n = n || ""), e.b("<tr>"), e.b(`
` + n), e.b('    <td class="'), e.b(e.v(e.d("CSSLineClass.INFO", i, t, 0))), e.b('">'), e.b(`
` + n), e.b('        <div class="'), e.b(e.v(e.f("contentClass", i, t, 0))), e.b('">'), e.b(`
` + n), e.b("            File without changes"), e.b(`
` + n), e.b("        </div>"), e.b(`
` + n), e.b("    </td>"), e.b(`
` + n), e.b("</tr>"), e.fl();
}, partials: {}, subs: {} });
F["generic-file-path"] = new M.Template({ code: function(i, t, n) {
  var e = this;
  return e.b(n = n || ""), e.b('<span class="d2h-file-name-wrapper">'), e.b(`
` + n), e.b(e.rp("<fileIcon0", i, t, "    ")), e.b('    <span class="d2h-file-name">'), e.b(e.v(e.f("fileDiffName", i, t, 0))), e.b("</span>"), e.b(`
` + n), e.b(e.rp("<fileTag1", i, t, "    ")), e.b("</span>"), e.b(`
` + n), e.b('<label class="d2h-file-collapse">'), e.b(`
` + n), e.b('    <input class="d2h-file-collapse-input" type="checkbox" name="viewed" value="viewed">'), e.b(`
` + n), e.b("    Viewed"), e.b(`
` + n), e.b("</label>"), e.fl();
}, partials: { "<fileIcon0": { name: "fileIcon", partials: {}, subs: {} }, "<fileTag1": { name: "fileTag", partials: {}, subs: {} } }, subs: {} });
F["generic-line"] = new M.Template({ code: function(i, t, n) {
  var e = this;
  return e.b(n = n || ""), e.b("<tr>"), e.b(`
` + n), e.b('    <td class="'), e.b(e.v(e.f("lineClass", i, t, 0))), e.b(" "), e.b(e.v(e.f("type", i, t, 0))), e.b('">'), e.b(`
` + n), e.b("      "), e.b(e.t(e.f("lineNumber", i, t, 0))), e.b(`
` + n), e.b("    </td>"), e.b(`
` + n), e.b('    <td class="'), e.b(e.v(e.f("type", i, t, 0))), e.b('">'), e.b(`
` + n), e.b('        <div class="'), e.b(e.v(e.f("contentClass", i, t, 0))), e.b('">'), e.b(`
` + n), e.s(e.f("prefix", i, t, 1), i, t, 0, 162, 238, "{{ }}") && (e.rs(i, t, function(r, s, a) {
    a.b('            <span class="d2h-code-line-prefix">'), a.b(a.t(a.f("prefix", r, s, 0))), a.b("</span>"), a.b(`
` + n);
  }), i.pop()), e.s(e.f("prefix", i, t, 1), i, t, 1, 0, 0, "") || (e.b('            <span class="d2h-code-line-prefix">&nbsp;</span>'), e.b(`
` + n)), e.s(e.f("content", i, t, 1), i, t, 0, 371, 445, "{{ }}") && (e.rs(i, t, function(r, s, a) {
    a.b('            <span class="d2h-code-line-ctn">'), a.b(a.t(a.f("content", r, s, 0))), a.b("</span>"), a.b(`
` + n);
  }), i.pop()), e.s(e.f("content", i, t, 1), i, t, 1, 0, 0, "") || (e.b('            <span class="d2h-code-line-ctn"><br></span>'), e.b(`
` + n)), e.b("        </div>"), e.b(`
` + n), e.b("    </td>"), e.b(`
` + n), e.b("</tr>"), e.fl();
}, partials: {}, subs: {} });
F["generic-wrapper"] = new M.Template({ code: function(i, t, n) {
  var e = this;
  return e.b(n = n || ""), e.b('<div class="d2h-wrapper '), e.b(e.v(e.f("colorScheme", i, t, 0))), e.b('">'), e.b(`
` + n), e.b("    "), e.b(e.t(e.f("content", i, t, 0))), e.b(`
` + n), e.b("</div>"), e.fl();
}, partials: {}, subs: {} });
F["icon-file-added"] = new M.Template({ code: function(i, t, n) {
  var e = this;
  return e.b(n = n || ""), e.b('<svg aria-hidden="true" class="d2h-icon d2h-added" height="16" title="added" version="1.1" viewBox="0 0 14 16"'), e.b(`
` + n), e.b('     width="14">'), e.b(`
` + n), e.b('    <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path>'), e.b(`
` + n), e.b("</svg>"), e.fl();
}, partials: {}, subs: {} });
F["icon-file-changed"] = new M.Template({ code: function(i, t, n) {
  var e = this;
  return e.b(n = n || ""), e.b('<svg aria-hidden="true" class="d2h-icon d2h-changed" height="16" title="modified" version="1.1"'), e.b(`
` + n), e.b('     viewBox="0 0 14 16" width="14">'), e.b(`
` + n), e.b('    <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path>'), e.b(`
` + n), e.b("</svg>"), e.fl();
}, partials: {}, subs: {} });
F["icon-file-deleted"] = new M.Template({ code: function(i, t, n) {
  var e = this;
  return e.b(n = n || ""), e.b('<svg aria-hidden="true" class="d2h-icon d2h-deleted" height="16" title="removed" version="1.1"'), e.b(`
` + n), e.b('     viewBox="0 0 14 16" width="14">'), e.b(`
` + n), e.b('    <path d="M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM11 9H3V7h8v2z"></path>'), e.b(`
` + n), e.b("</svg>"), e.fl();
}, partials: {}, subs: {} });
F["icon-file-renamed"] = new M.Template({ code: function(i, t, n) {
  var e = this;
  return e.b(n = n || ""), e.b('<svg aria-hidden="true" class="d2h-icon d2h-moved" height="16" title="renamed" version="1.1"'), e.b(`
` + n), e.b('     viewBox="0 0 14 16" width="14">'), e.b(`
` + n), e.b('    <path d="M6 9H3V7h3V4l5 4-5 4V9z m8-7v12c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h12c0.55 0 1 0.45 1 1z m-1 0H1v12h12V2z"></path>'), e.b(`
` + n), e.b("</svg>"), e.fl();
}, partials: {}, subs: {} });
F["icon-file"] = new M.Template({ code: function(i, t, n) {
  var e = this;
  return e.b(n = n || ""), e.b('<svg aria-hidden="true" class="d2h-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12">'), e.b(`
` + n), e.b('    <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>'), e.b(`
` + n), e.b("</svg>"), e.fl();
}, partials: {}, subs: {} });
F["line-by-line-file-diff"] = new M.Template({ code: function(i, t, n) {
  var e = this;
  return e.b(n = n || ""), e.b('<div id="'), e.b(e.v(e.f("fileHtmlId", i, t, 0))), e.b('" class="d2h-file-wrapper" data-lang="'), e.b(e.v(e.d("file.language", i, t, 0))), e.b('">'), e.b(`
` + n), e.b('    <div class="d2h-file-header">'), e.b(`
` + n), e.b("    "), e.b(e.t(e.f("filePath", i, t, 0))), e.b(`
` + n), e.b("    </div>"), e.b(`
` + n), e.b('    <div class="d2h-file-diff">'), e.b(`
` + n), e.b('        <div class="d2h-code-wrapper">'), e.b(`
` + n), e.b('            <table class="d2h-diff-table">'), e.b(`
` + n), e.b('                <tbody class="d2h-diff-tbody">'), e.b(`
` + n), e.b("                "), e.b(e.t(e.f("diffs", i, t, 0))), e.b(`
` + n), e.b("                </tbody>"), e.b(`
` + n), e.b("            </table>"), e.b(`
` + n), e.b("        </div>"), e.b(`
` + n), e.b("    </div>"), e.b(`
` + n), e.b("</div>"), e.fl();
}, partials: {}, subs: {} });
F["line-by-line-numbers"] = new M.Template({ code: function(i, t, n) {
  var e = this;
  return e.b(n = n || ""), e.b('<div class="line-num1">'), e.b(e.v(e.f("oldNumber", i, t, 0))), e.b("</div>"), e.b(`
` + n), e.b('<div class="line-num2">'), e.b(e.v(e.f("newNumber", i, t, 0))), e.b("</div>"), e.fl();
}, partials: {}, subs: {} });
F["side-by-side-file-diff"] = new M.Template({ code: function(i, t, n) {
  var e = this;
  return e.b(n = n || ""), e.b('<div id="'), e.b(e.v(e.f("fileHtmlId", i, t, 0))), e.b('" class="d2h-file-wrapper" data-lang="'), e.b(e.v(e.d("file.language", i, t, 0))), e.b('">'), e.b(`
` + n), e.b('    <div class="d2h-file-header">'), e.b(`
` + n), e.b("      "), e.b(e.t(e.f("filePath", i, t, 0))), e.b(`
` + n), e.b("    </div>"), e.b(`
` + n), e.b('    <div class="d2h-files-diff">'), e.b(`
` + n), e.b('        <div class="d2h-file-side-diff">'), e.b(`
` + n), e.b('            <div class="d2h-code-wrapper">'), e.b(`
` + n), e.b('                <table class="d2h-diff-table">'), e.b(`
` + n), e.b('                    <tbody class="d2h-diff-tbody">'), e.b(`
` + n), e.b("                    "), e.b(e.t(e.d("diffs.left", i, t, 0))), e.b(`
` + n), e.b("                    </tbody>"), e.b(`
` + n), e.b("                </table>"), e.b(`
` + n), e.b("            </div>"), e.b(`
` + n), e.b("        </div>"), e.b(`
` + n), e.b('        <div class="d2h-file-side-diff">'), e.b(`
` + n), e.b('            <div class="d2h-code-wrapper">'), e.b(`
` + n), e.b('                <table class="d2h-diff-table">'), e.b(`
` + n), e.b('                    <tbody class="d2h-diff-tbody">'), e.b(`
` + n), e.b("                    "), e.b(e.t(e.d("diffs.right", i, t, 0))), e.b(`
` + n), e.b("                    </tbody>"), e.b(`
` + n), e.b("                </table>"), e.b(`
` + n), e.b("            </div>"), e.b(`
` + n), e.b("        </div>"), e.b(`
` + n), e.b("    </div>"), e.b(`
` + n), e.b("</div>"), e.fl();
}, partials: {}, subs: {} });
F["tag-file-added"] = new M.Template({ code: function(i, t, n) {
  var e = this;
  return e.b(n = n || ""), e.b('<span class="d2h-tag d2h-added d2h-added-tag">ADDED</span>'), e.fl();
}, partials: {}, subs: {} });
F["tag-file-changed"] = new M.Template({ code: function(i, t, n) {
  var e = this;
  return e.b(n = n || ""), e.b('<span class="d2h-tag d2h-changed d2h-changed-tag">CHANGED</span>'), e.fl();
}, partials: {}, subs: {} });
F["tag-file-deleted"] = new M.Template({ code: function(i, t, n) {
  var e = this;
  return e.b(n = n || ""), e.b('<span class="d2h-tag d2h-deleted d2h-deleted-tag">DELETED</span>'), e.fl();
}, partials: {}, subs: {} });
F["tag-file-renamed"] = new M.Template({ code: function(i, t, n) {
  var e = this;
  return e.b(n = n || ""), e.b('<span class="d2h-tag d2h-moved d2h-moved-tag">RENAMED</span>'), e.fl();
}, partials: {}, subs: {} });
class Ft {
  constructor({ compiledTemplates: t = {}, rawTemplates: n = {} }) {
    const e = Object.entries(n).reduce((r, [s, a]) => {
      const u = M.compile(a, { asString: !1 });
      return Object.assign(Object.assign({}, r), { [s]: u });
    }, {});
    this.preCompiledTemplates = Object.assign(Object.assign(Object.assign({}, F), t), e);
  }
  static compile(t) {
    return M.compile(t, { asString: !1 });
  }
  render(t, n, e, r, s) {
    const a = this.templateKey(t, n);
    try {
      return this.preCompiledTemplates[a].render(e, r, s);
    } catch {
      throw new Error(`Could not find template to render '${a}'`);
    }
  }
  template(t, n) {
    return this.preCompiledTemplates[this.templateKey(t, n)];
  }
  templateKey(t, n) {
    return `${t}-${n}`;
  }
}
const Me = Object.assign(Object.assign(Object.assign({}, Qe), Ze), { outputFormat: Ke.LINE_BY_LINE, drawFileList: !0 });
function At(i, t = {}) {
  return qe(i, Object.assign(Object.assign({}, Me), t));
}
function Bt(i, t = {}) {
  const n = Object.assign(Object.assign({}, Me), t), e = typeof i == "string" ? qe(i, n) : i, r = new Ft(n), { colorScheme: s } = n, a = { colorScheme: s }, u = n.drawFileList ? new Nt(r, a).render(e) : "", c = n.outputFormat === "side-by-side" ? new It(r, n).render(e) : new Et(r, n).render(e);
  return u + c;
}
const Rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  defaultDiff2HtmlConfig: Me,
  html: Bt,
  parse: At
}, Symbol.toStringTag, { value: "Module" }));
window.Diff2Html = Rt;
