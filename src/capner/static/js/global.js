(function (p, w) {
    "object" === typeof exports ? module.exports = w(require("./punycode"), require("./IPv6"), require("./SecondLevelDomains")) : "function" === typeof define && define.amd ? define(["./punycode", "./IPv6", "./SecondLevelDomains"], w) : p.URI = w(p.punycode, p.IPv6, p.SecondLevelDomains, p)
})(this, function (p, w, u, m) {
    function d(a, b) {
        var c = 1 <= arguments.length, f = 2 <= arguments.length;
        if (!(this instanceof d))return c ? f ? new d(a, b) : new d(a) : new d;
        if (void 0 === a) {
            if (c)throw new TypeError("undefined is not a valid argument for URI");
            a = "undefined" !== typeof location ? location.href + "" : ""
        }
        this.href(a);
        return void 0 !== b ? this.absoluteTo(b) : this
    }

    function r(a) {
        return a.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
    }

    function v(a) {
        return void 0 === a ? "Undefined" : String(Object.prototype.toString.call(a)).slice(8, -1)
    }

    function h(a) {
        return "Array" === v(a)
    }

    function D(a, b) {
        var c = {}, d, g;
        if ("RegExp" === v(b))c = null; else if (h(b))for (d = 0, g = b.length; d < g; d++)c[b[d]] = !0; else c[b] = !0;
        d = 0;
        for (g = a.length; d < g; d++)if (c && void 0 !== c[a[d]] || !c && b.test(a[d]))a.splice(d,
            1), g--, d--;
        return a
    }

    function z(a, b) {
        var c, d;
        if (h(b)) {
            c = 0;
            for (d = b.length; c < d; c++)if (!z(a, b[c]))return !1;
            return !0
        }
        var g = v(b);
        c = 0;
        for (d = a.length; c < d; c++)if ("RegExp" === g) {
            if ("string" === typeof a[c] && a[c].match(b))return !0
        } else if (a[c] === b)return !0;
        return !1
    }

    function E(a, b) {
        if (!h(a) || !h(b) || a.length !== b.length)return !1;
        a.sort();
        b.sort();
        for (var c = 0, d = a.length; c < d; c++)if (a[c] !== b[c])return !1;
        return !0
    }

    function A(a) {
        return a.replace(/^\/+|\/+$/g, "")
    }

    function G(a) {
        return escape(a)
    }

    function B(a) {
        return encodeURIComponent(a).replace(/[!'()*]/g,
            G).replace(/\*/g, "%2A")
    }

    function x(a) {
        return function (b, c) {
            if (void 0 === b)return this._parts[a] || "";
            this._parts[a] = b || null;
            this.build(!c);
            return this
        }
    }

    function F(a, b) {
        return function (c, d) {
            if (void 0 === c)return this._parts[a] || "";
            null !== c && (c += "", c.charAt(0) === b && (c = c.substring(1)));
            this._parts[a] = c;
            this.build(!d);
            return this
        }
    }

    var H = m && m.URI;
    d.version = "1.17.1";
    var e = d.prototype, q = Object.prototype.hasOwnProperty;
    d._parts = function () {
        return {
            protocol: null,
            username: null,
            password: null,
            hostname: null,
            urn: null,
            port: null,
            path: null,
            query: null,
            fragment: null,
            duplicateQueryParameters: d.duplicateQueryParameters,
            escapeQuerySpace: d.escapeQuerySpace
        }
    };
    d.duplicateQueryParameters = !1;
    d.escapeQuerySpace = !0;
    d.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
    d.idn_expression = /[^a-z0-9\.-]/i;
    d.punycode_expression = /(xn--)/i;
    d.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    d.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
    d.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u2018\u2019]))/ig;
    d.findUri = {
        start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
        end: /[\s\r\n]|$/,
        trim: /[`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u201e\u2018\u2019]+$/
    };
    d.defaultPorts = {http: "80", https: "443", ftp: "21", gopher: "70", ws: "80", wss: "443"};
    d.invalid_hostname_characters =
        /[^a-zA-Z0-9\.-]/;
    d.domAttributes = {
        a: "href",
        blockquote: "cite",
        link: "href",
        base: "href",
        script: "src",
        form: "action",
        img: "src",
        area: "href",
        iframe: "src",
        embed: "src",
        source: "src",
        track: "src",
        input: "src",
        audio: "src",
        video: "src"
    };
    d.getDomAttribute = function (a) {
        if (a && a.nodeName) {
            var b = a.nodeName.toLowerCase();
            return "input" === b && "image" !== a.type ? void 0 : d.domAttributes[b]
        }
    };
    d.encode = B;
    d.decode = decodeURIComponent;
    d.iso8859 = function () {
        d.encode = escape;
        d.decode = unescape
    };
    d.unicode = function () {
        d.encode = B;
        d.decode =
            decodeURIComponent
    };
    d.characters = {
        pathname: {
            encode: {
                expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
                map: {"%24": "$", "%26": "&", "%2B": "+", "%2C": ",", "%3B": ";", "%3D": "=", "%3A": ":", "%40": "@"}
            }, decode: {expression: /[\/\?#]/g, map: {"/": "%2F", "?": "%3F", "#": "%23"}}
        },
        reserved: {
            encode: {
                expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig, map: {
                    "%3A": ":",
                    "%2F": "/",
                    "%3F": "?",
                    "%23": "#",
                    "%5B": "[",
                    "%5D": "]",
                    "%40": "@",
                    "%21": "!",
                    "%24": "$",
                    "%26": "&",
                    "%27": "'",
                    "%28": "(",
                    "%29": ")",
                    "%2A": "*",
                    "%2B": "+",
                    "%2C": ",",
                    "%3B": ";",
                    "%3D": "="
                }
            }
        },
        urnpath: {
            encode: {
                expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig,
                map: {
                    "%21": "!",
                    "%24": "$",
                    "%27": "'",
                    "%28": "(",
                    "%29": ")",
                    "%2A": "*",
                    "%2B": "+",
                    "%2C": ",",
                    "%3B": ";",
                    "%3D": "=",
                    "%40": "@"
                }
            }, decode: {expression: /[\/\?#:]/g, map: {"/": "%2F", "?": "%3F", "#": "%23", ":": "%3A"}}
        }
    };
    d.encodeQuery = function (a, b) {
        var c = d.encode(a + "");
        void 0 === b && (b = d.escapeQuerySpace);
        return b ? c.replace(/%20/g, "+") : c
    };
    d.decodeQuery = function (a, b) {
        a += "";
        void 0 === b && (b = d.escapeQuerySpace);
        try {
            return d.decode(b ? a.replace(/\+/g,
                "%20") : a)
        } catch (c) {
            return a
        }
    };
    var t = {encode: "encode", decode: "decode"}, y, C = function (a, b) {
        return function (c) {
            try {
                return d[b](c + "").replace(d.characters[a][b].expression, function (c) {
                    return d.characters[a][b].map[c]
                })
            } catch (f) {
                return c
            }
        }
    };
    for (y in t)d[y + "PathSegment"] = C("pathname", t[y]), d[y + "UrnPathSegment"] = C("urnpath", t[y]);
    t = function (a, b, c) {
        return function (f) {
            var g;
            g = c ? function (a) {
                return d[b](d[c](a))
            } : d[b];
            f = (f + "").split(a);
            for (var e = 0, l = f.length; e < l; e++)f[e] = g(f[e]);
            return f.join(a)
        }
    };
    d.decodePath =
        t("/", "decodePathSegment");
    d.decodeUrnPath = t(":", "decodeUrnPathSegment");
    d.recodePath = t("/", "encodePathSegment", "decode");
    d.recodeUrnPath = t(":", "encodeUrnPathSegment", "decode");
    d.encodeReserved = C("reserved", "encode");
    d.parse = function (a, b) {
        var c;
        b || (b = {});
        c = a.indexOf("#");
        -1 < c && (b.fragment = a.substring(c + 1) || null, a = a.substring(0, c));
        c = a.indexOf("?");
        -1 < c && (b.query = a.substring(c + 1) || null, a = a.substring(0, c));
        "//" === a.substring(0, 2) ? (b.protocol = null, a = a.substring(2), a = d.parseAuthority(a, b)) : (c = a.indexOf(":"),
        -1 < c && (b.protocol = a.substring(0, c) || null, b.protocol && !b.protocol.match(d.protocol_expression) ? b.protocol = void 0 : "//" === a.substring(c + 1, c + 3) ? (a = a.substring(c + 3), a = d.parseAuthority(a, b)) : (a = a.substring(c + 1), b.urn = !0)));
        b.path = a;
        return b
    };
    d.parseHost = function (a, b) {
        a = a.replace(/\\/g, "/");
        var c = a.indexOf("/"), d;
        -1 === c && (c = a.length);
        if ("[" === a.charAt(0))d = a.indexOf("]"), b.hostname = a.substring(1, d) || null, b.port = a.substring(d + 2, c) || null, "/" === b.port && (b.port = null); else {
            var g = a.indexOf(":");
            d = a.indexOf("/");
            g = a.indexOf(":", g + 1);
            -1 !== g && (-1 === d || g < d) ? (b.hostname = a.substring(0, c) || null, b.port = null) : (d = a.substring(0, c).split(":"), b.hostname = d[0] || null, b.port = d[1] || null)
        }
        b.hostname && "/" !== a.substring(c).charAt(0) && (c++, a = "/" + a);
        return a.substring(c) || "/"
    };
    d.parseAuthority = function (a, b) {
        a = d.parseUserinfo(a, b);
        return d.parseHost(a, b)
    };
    d.parseUserinfo = function (a, b) {
        var c = a.indexOf("/"), f = a.lastIndexOf("@", -1 < c ? c : a.length - 1);
        -1 < f && (-1 === c || f < c) ? (c = a.substring(0, f).split(":"), b.username = c[0] ? d.decode(c[0]) : null,
            c.shift(), b.password = c[0] ? d.decode(c.join(":")) : null, a = a.substring(f + 1)) : (b.username = null, b.password = null);
        return a
    };
    d.parseQuery = function (a, b) {
        if (!a)return {};
        a = a.replace(/&+/g, "&").replace(/^\?*&*|&+$/g, "");
        if (!a)return {};
        for (var c = {}, f = a.split("&"), g = f.length, e, l, n = 0; n < g; n++)if (e = f[n].split("="), l = d.decodeQuery(e.shift(), b), e = e.length ? d.decodeQuery(e.join("="), b) : null, q.call(c, l)) {
            if ("string" === typeof c[l] || null === c[l])c[l] = [c[l]];
            c[l].push(e)
        } else c[l] = e;
        return c
    };
    d.build = function (a) {
        var b = "";
        a.protocol && (b += a.protocol + ":");
        a.urn || !b && !a.hostname || (b += "//");
        b += d.buildAuthority(a) || "";
        "string" === typeof a.path && ("/" !== a.path.charAt(0) && "string" === typeof a.hostname && (b += "/"), b += a.path);
        "string" === typeof a.query && a.query && (b += "?" + a.query);
        "string" === typeof a.fragment && a.fragment && (b += "#" + a.fragment);
        return b
    };
    d.buildHost = function (a) {
        var b = "";
        if (a.hostname)b = d.ip6_expression.test(a.hostname) ? b + ("[" + a.hostname + "]") : b + a.hostname; else return "";
        a.port && (b += ":" + a.port);
        return b
    };
    d.buildAuthority =
        function (a) {
            return d.buildUserinfo(a) + d.buildHost(a)
        };
    d.buildUserinfo = function (a) {
        var b = "";
        a.username && (b += d.encode(a.username), a.password && (b += ":" + d.encode(a.password)), b += "@");
        return b
    };
    d.buildQuery = function (a, b, c) {
        var f = "", g, e, l, n;
        for (e in a)if (q.call(a, e) && e)if (h(a[e]))for (g = {}, l = 0, n = a[e].length; l < n; l++)void 0 !== a[e][l] && void 0 === g[a[e][l] + ""] && (f += "&" + d.buildQueryParameter(e, a[e][l], c), !0 !== b && (g[a[e][l] + ""] = !0)); else void 0 !== a[e] && (f += "&" + d.buildQueryParameter(e, a[e], c));
        return f.substring(1)
    };
    d.buildQueryParameter = function (a, b, c) {
        return d.encodeQuery(a, c) + (null !== b ? "=" + d.encodeQuery(b, c) : "")
    };
    d.addQuery = function (a, b, c) {
        if ("object" === typeof b)for (var f in b)q.call(b, f) && d.addQuery(a, f, b[f]); else if ("string" === typeof b)void 0 === a[b] ? a[b] = c : ("string" === typeof a[b] && (a[b] = [a[b]]), h(c) || (c = [c]), a[b] = (a[b] || []).concat(c)); else throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");
    };
    d.removeQuery = function (a, b, c) {
        var f;
        if (h(b))for (c = 0, f = b.length; c < f; c++)a[b[c]] = void 0; else if ("RegExp" === v(b))for (f in a)b.test(f) && (a[f] = void 0); else if ("object" === typeof b)for (f in b)q.call(b, f) && d.removeQuery(a, f, b[f]); else if ("string" === typeof b)void 0 !== c ? "RegExp" === v(c) ? !h(a[b]) && c.test(a[b]) ? a[b] = void 0 : a[b] = D(a[b], c) : a[b] !== String(c) || h(c) && 1 !== c.length ? h(a[b]) && (a[b] = D(a[b], c)) : a[b] = void 0 : a[b] = void 0; else throw new TypeError("URI.removeQuery() accepts an object, string, RegExp as the first parameter");
    };
    d.hasQuery = function (a, b, c, f) {
        switch (v(b)) {
            case "String":
                break;
            case "RegExp":
                for (var e in a)if (q.call(a, e) && b.test(e) && (void 0 === c || d.hasQuery(a, e, c)))return !0;
                return !1;
            case "Object":
                for (var k in b)if (q.call(b, k) && !d.hasQuery(a, k, b[k]))return !1;
                return !0;
            default:
                throw new TypeError("URI.hasQuery() accepts a string, regular expression or object as the name parameter");
        }
        switch (v(c)) {
            case "Undefined":
                return b in a;
            case "Boolean":
                return a = !(h(a[b]) ? !a[b].length : !a[b]), c === a;
            case "Function":
                return !!c(a[b], b, a);
            case "Array":
                return h(a[b]) ? (f ? z : E)(a[b], c) : !1;
            case "RegExp":
                return h(a[b]) ?
                    f ? z(a[b], c) : !1 : !(!a[b] || !a[b].match(c));
            case "Number":
                c = String(c);
            case "String":
                return h(a[b]) ? f ? z(a[b], c) : !1 : a[b] === c;
            default:
                throw new TypeError("URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter");
        }
    };
    d.commonPath = function (a, b) {
        var c = Math.min(a.length, b.length), d;
        for (d = 0; d < c; d++)if (a.charAt(d) !== b.charAt(d)) {
            d--;
            break
        }
        if (1 > d)return a.charAt(0) === b.charAt(0) && "/" === a.charAt(0) ? "/" : "";
        if ("/" !== a.charAt(d) || "/" !== b.charAt(d))d = a.substring(0, d).lastIndexOf("/");
        return a.substring(0, d + 1)
    };
    d.withinString = function (a, b, c) {
        c || (c = {});
        var f = c.start || d.findUri.start, e = c.end || d.findUri.end, k = c.trim || d.findUri.trim, l = /[a-z0-9-]=["']?$/i;
        for (f.lastIndex = 0; ;) {
            var n = f.exec(a);
            if (!n)break;
            n = n.index;
            if (c.ignoreHtml) {
                var h = a.slice(Math.max(n - 3, 0), n);
                if (h && l.test(h))continue
            }
            var h = n + a.slice(n).search(e), m = a.slice(n, h).replace(k, "");
            c.ignore && c.ignore.test(m) || (h = n + m.length, m = b(m, n, h, a), a = a.slice(0, n) + m + a.slice(h), f.lastIndex = n + m.length)
        }
        f.lastIndex = 0;
        return a
    };
    d.ensureValidHostname =
        function (a) {
            if (a.match(d.invalid_hostname_characters)) {
                if (!p)throw new TypeError('Hostname "' + a + '" contains characters other than [A-Z0-9.-] and Punycode.js is not available');
                if (p.toASCII(a).match(d.invalid_hostname_characters))throw new TypeError('Hostname "' + a + '" contains characters other than [A-Z0-9.-]');
            }
        };
    d.noConflict = function (a) {
        if (a)return a = {URI: this.noConflict()}, m.URITemplate && "function" === typeof m.URITemplate.noConflict && (a.URITemplate = m.URITemplate.noConflict()), m.IPv6 && "function" === typeof m.IPv6.noConflict && (a.IPv6 = m.IPv6.noConflict()), m.SecondLevelDomains && "function" === typeof m.SecondLevelDomains.noConflict && (a.SecondLevelDomains = m.SecondLevelDomains.noConflict()), a;
        m.URI === this && (m.URI = H);
        return this
    };
    e.build = function (a) {
        if (!0 === a)this._deferred_build = !0; else if (void 0 === a || this._deferred_build)this._string = d.build(this._parts), this._deferred_build = !1;
        return this
    };
    e.clone = function () {
        return new d(this)
    };
    e.valueOf = e.toString = function () {
        return this.build(!1)._string
    };
    e.protocol =
        x("protocol");
    e.username = x("username");
    e.password = x("password");
    e.hostname = x("hostname");
    e.port = x("port");
    e.query = F("query", "?");
    e.fragment = F("fragment", "#");
    e.search = function (a, b) {
        var c = this.query(a, b);
        return "string" === typeof c && c.length ? "?" + c : c
    };
    e.hash = function (a, b) {
        var c = this.fragment(a, b);
        return "string" === typeof c && c.length ? "#" + c : c
    };
    e.pathname = function (a, b) {
        if (void 0 === a || !0 === a) {
            var c = this._parts.path || (this._parts.hostname ? "/" : "");
            return a ? (this._parts.urn ? d.decodeUrnPath : d.decodePath)(c) : c
        }
        this._parts.path =
            this._parts.urn ? a ? d.recodeUrnPath(a) : "" : a ? d.recodePath(a) : "/";
        this.build(!b);
        return this
    };
    e.path = e.pathname;
    e.href = function (a, b) {
        var c;
        if (void 0 === a)return this.toString();
        this._string = "";
        this._parts = d._parts();
        var f = a instanceof d, e = "object" === typeof a && (a.hostname || a.path || a.pathname);
        a.nodeName && (e = d.getDomAttribute(a), a = a[e] || "", e = !1);
        !f && e && void 0 !== a.pathname && (a = a.toString());
        if ("string" === typeof a || a instanceof String)this._parts = d.parse(String(a), this._parts); else if (f || e)for (c in f = f ? a._parts :
            a, f)q.call(this._parts, c) && (this._parts[c] = f[c]); else throw new TypeError("invalid input");
        this.build(!b);
        return this
    };
    e.is = function (a) {
        var b = !1, c = !1, f = !1, e = !1, k = !1, l = !1, h = !1, m = !this._parts.urn;
        this._parts.hostname && (m = !1, c = d.ip4_expression.test(this._parts.hostname), f = d.ip6_expression.test(this._parts.hostname), b = c || f, k = (e = !b) && u && u.has(this._parts.hostname), l = e && d.idn_expression.test(this._parts.hostname), h = e && d.punycode_expression.test(this._parts.hostname));
        switch (a.toLowerCase()) {
            case "relative":
                return m;
            case "absolute":
                return !m;
            case "domain":
            case "name":
                return e;
            case "sld":
                return k;
            case "ip":
                return b;
            case "ip4":
            case "ipv4":
            case "inet4":
                return c;
            case "ip6":
            case "ipv6":
            case "inet6":
                return f;
            case "idn":
                return l;
            case "url":
                return !this._parts.urn;
            case "urn":
                return !!this._parts.urn;
            case "punycode":
                return h
        }
        return null
    };
    var I = e.protocol, J = e.port, K = e.hostname;
    e.protocol = function (a, b) {
        if (void 0 !== a && a && (a = a.replace(/:(\/\/)?$/, ""), !a.match(d.protocol_expression)))throw new TypeError('Protocol "' + a + "\" contains characters other than [A-Z0-9.+-] or doesn't start with [A-Z]");
        return I.call(this, a, b)
    };
    e.scheme = e.protocol;
    e.port = function (a, b) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        if (void 0 !== a && (0 === a && (a = null), a && (a += "", ":" === a.charAt(0) && (a = a.substring(1)), a.match(/[^0-9]/))))throw new TypeError('Port "' + a + '" contains characters other than [0-9]');
        return J.call(this, a, b)
    };
    e.hostname = function (a, b) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        if (void 0 !== a) {
            var c = {};
            if ("/" !== d.parseHost(a, c))throw new TypeError('Hostname "' + a + '" contains characters other than [A-Z0-9.-]');
            a = c.hostname
        }
        return K.call(this, a, b)
    };
    e.origin = function (a, b) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        if (void 0 === a) {
            var c = this.protocol();
            return this.authority() ? (c ? c + "://" : "") + this.authority() : ""
        }
        c = d(a);
        this.protocol(c.protocol()).authority(c.authority()).build(!b);
        return this
    };
    e.host = function (a, b) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        if (void 0 === a)return this._parts.hostname ? d.buildHost(this._parts) : "";
        if ("/" !== d.parseHost(a, this._parts))throw new TypeError('Hostname "' + a + '" contains characters other than [A-Z0-9.-]');
        this.build(!b);
        return this
    };
    e.authority = function (a, b) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        if (void 0 === a)return this._parts.hostname ? d.buildAuthority(this._parts) : "";
        if ("/" !== d.parseAuthority(a, this._parts))throw new TypeError('Hostname "' + a + '" contains characters other than [A-Z0-9.-]');
        this.build(!b);
        return this
    };
    e.userinfo = function (a, b) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        if (void 0 === a) {
            if (!this._parts.username)return "";
            var c = d.buildUserinfo(this._parts);
            return c.substring(0, c.length -
                1)
        }
        "@" !== a[a.length - 1] && (a += "@");
        d.parseUserinfo(a, this._parts);
        this.build(!b);
        return this
    };
    e.resource = function (a, b) {
        var c;
        if (void 0 === a)return this.path() + this.search() + this.hash();
        c = d.parse(a);
        this._parts.path = c.path;
        this._parts.query = c.query;
        this._parts.fragment = c.fragment;
        this.build(!b);
        return this
    };
    e.subdomain = function (a, b) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        if (void 0 === a) {
            if (!this._parts.hostname || this.is("IP"))return "";
            var c = this._parts.hostname.length - this.domain().length - 1;
            return this._parts.hostname.substring(0,
                    c) || ""
        }
        c = this._parts.hostname.length - this.domain().length;
        c = this._parts.hostname.substring(0, c);
        c = new RegExp("^" + r(c));
        a && "." !== a.charAt(a.length - 1) && (a += ".");
        a && d.ensureValidHostname(a);
        this._parts.hostname = this._parts.hostname.replace(c, a);
        this.build(!b);
        return this
    };
    e.domain = function (a, b) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        "boolean" === typeof a && (b = a, a = void 0);
        if (void 0 === a) {
            if (!this._parts.hostname || this.is("IP"))return "";
            var c = this._parts.hostname.match(/\./g);
            if (c && 2 > c.length)return this._parts.hostname;
            c = this._parts.hostname.length - this.tld(b).length - 1;
            c = this._parts.hostname.lastIndexOf(".", c - 1) + 1;
            return this._parts.hostname.substring(c) || ""
        }
        if (!a)throw new TypeError("cannot set domain empty");
        d.ensureValidHostname(a);
        !this._parts.hostname || this.is("IP") ? this._parts.hostname = a : (c = new RegExp(r(this.domain()) + "$"), this._parts.hostname = this._parts.hostname.replace(c, a));
        this.build(!b);
        return this
    };
    e.tld = function (a, b) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        "boolean" === typeof a && (b = a, a = void 0);
        if (void 0 === a) {
            if (!this._parts.hostname || this.is("IP"))return "";
            var c = this._parts.hostname.lastIndexOf("."), c = this._parts.hostname.substring(c + 1);
            return !0 !== b && u && u.list[c.toLowerCase()] ? u.get(this._parts.hostname) || c : c
        }
        if (a)if (a.match(/[^a-zA-Z0-9-]/))if (u && u.is(a))c = new RegExp(r(this.tld()) + "$"), this._parts.hostname = this._parts.hostname.replace(c, a); else throw new TypeError('TLD "' + a + '" contains characters other than [A-Z0-9]'); else {
            if (!this._parts.hostname || this.is("IP"))throw new ReferenceError("cannot set TLD on non-domain host");
            c = new RegExp(r(this.tld()) + "$");
            this._parts.hostname = this._parts.hostname.replace(c, a)
        } else throw new TypeError("cannot set TLD empty");
        this.build(!b);
        return this
    };
    e.directory = function (a, b) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        if (void 0 === a || !0 === a) {
            if (!this._parts.path && !this._parts.hostname)return "";
            if ("/" === this._parts.path)return "/";
            var c = this._parts.path.length - this.filename().length - 1, c = this._parts.path.substring(0, c) || (this._parts.hostname ? "/" : "");
            return a ? d.decodePath(c) : c
        }
        c = this._parts.path.length -
            this.filename().length;
        c = this._parts.path.substring(0, c);
        c = new RegExp("^" + r(c));
        this.is("relative") || (a || (a = "/"), "/" !== a.charAt(0) && (a = "/" + a));
        a && "/" !== a.charAt(a.length - 1) && (a += "/");
        a = d.recodePath(a);
        this._parts.path = this._parts.path.replace(c, a);
        this.build(!b);
        return this
    };
    e.filename = function (a, b) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        if (void 0 === a || !0 === a) {
            if (!this._parts.path || "/" === this._parts.path)return "";
            var c = this._parts.path.lastIndexOf("/"), c = this._parts.path.substring(c + 1);
            return a ?
                d.decodePathSegment(c) : c
        }
        c = !1;
        "/" === a.charAt(0) && (a = a.substring(1));
        a.match(/\.?\//) && (c = !0);
        var f = new RegExp(r(this.filename()) + "$");
        a = d.recodePath(a);
        this._parts.path = this._parts.path.replace(f, a);
        c ? this.normalizePath(b) : this.build(!b);
        return this
    };
    e.suffix = function (a, b) {
        if (this._parts.urn)return void 0 === a ? "" : this;
        if (void 0 === a || !0 === a) {
            if (!this._parts.path || "/" === this._parts.path)return "";
            var c = this.filename(), f = c.lastIndexOf(".");
            if (-1 === f)return "";
            c = c.substring(f + 1);
            c = /^[a-z0-9%]+$/i.test(c) ?
                c : "";
            return a ? d.decodePathSegment(c) : c
        }
        "." === a.charAt(0) && (a = a.substring(1));
        if (c = this.suffix())f = a ? new RegExp(r(c) + "$") : new RegExp(r("." + c) + "$"); else {
            if (!a)return this;
            this._parts.path += "." + d.recodePath(a)
        }
        f && (a = d.recodePath(a), this._parts.path = this._parts.path.replace(f, a));
        this.build(!b);
        return this
    };
    e.segment = function (a, b, c) {
        var d = this._parts.urn ? ":" : "/", e = this.path(), k = "/" === e.substring(0, 1), e = e.split(d);
        void 0 !== a && "number" !== typeof a && (c = b, b = a, a = void 0);
        if (void 0 !== a && "number" !== typeof a)throw Error('Bad segment "' +
            a + '", must be 0-based integer');
        k && e.shift();
        0 > a && (a = Math.max(e.length + a, 0));
        if (void 0 === b)return void 0 === a ? e : e[a];
        if (null === a || void 0 === e[a])if (h(b)) {
            e = [];
            a = 0;
            for (var l = b.length; a < l; a++)if (b[a].length || e.length && e[e.length - 1].length)e.length && !e[e.length - 1].length && e.pop(), e.push(A(b[a]))
        } else {
            if (b || "string" === typeof b)b = A(b), "" === e[e.length - 1] ? e[e.length - 1] = b : e.push(b)
        } else b ? e[a] = A(b) : e.splice(a, 1);
        k && e.unshift("");
        return this.path(e.join(d), c)
    };
    e.segmentCoded = function (a, b, c) {
        var e, g;
        "number" !== typeof a && (c = b, b = a, a = void 0);
        if (void 0 === b) {
            a = this.segment(a, b, c);
            if (h(a))for (e = 0, g = a.length; e < g; e++)a[e] = d.decode(a[e]); else a = void 0 !== a ? d.decode(a) : void 0;
            return a
        }
        if (h(b))for (e = 0, g = b.length; e < g; e++)b[e] = d.encode(b[e]); else b = "string" === typeof b || b instanceof String ? d.encode(b) : b;
        return this.segment(a, b, c)
    };
    var L = e.query;
    e.query = function (a, b) {
        if (!0 === a)return d.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        if ("function" === typeof a) {
            var c = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace),
                e = a.call(this, c);
            this._parts.query = d.buildQuery(e || c, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
            this.build(!b);
            return this
        }
        return void 0 !== a && "string" !== typeof a ? (this._parts.query = d.buildQuery(a, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace), this.build(!b), this) : L.call(this, a, b)
    };
    e.setQuery = function (a, b, c) {
        var e = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        if ("string" === typeof a || a instanceof String)e[a] = void 0 !== b ? b : null; else if ("object" === typeof a)for (var g in a)q.call(a, g) && (e[g] = a[g]); else throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");
        this._parts.query = d.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        "string" !== typeof a && (c = b);
        this.build(!c);
        return this
    };
    e.addQuery = function (a, b, c) {
        var e = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        d.addQuery(e, a, void 0 === b ? null : b);
        this._parts.query = d.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        "string" !== typeof a && (c = b);
        this.build(!c);
        return this
    };
    e.removeQuery = function (a, b, c) {
        var e = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        d.removeQuery(e, a, b);
        this._parts.query = d.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        "string" !== typeof a && (c = b);
        this.build(!c);
        return this
    };
    e.hasQuery = function (a, b, c) {
        var e = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        return d.hasQuery(e, a, b, c)
    };
    e.setSearch = e.setQuery;
    e.addSearch = e.addQuery;
    e.removeSearch =
        e.removeQuery;
    e.hasSearch = e.hasQuery;
    e.normalize = function () {
        return this._parts.urn ? this.normalizeProtocol(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build() : this.normalizeProtocol(!1).normalizeHostname(!1).normalizePort(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build()
    };
    e.normalizeProtocol = function (a) {
        "string" === typeof this._parts.protocol && (this._parts.protocol = this._parts.protocol.toLowerCase(), this.build(!a));
        return this
    };
    e.normalizeHostname = function (a) {
        this._parts.hostname &&
        (this.is("IDN") && p ? this._parts.hostname = p.toASCII(this._parts.hostname) : this.is("IPv6") && w && (this._parts.hostname = w.best(this._parts.hostname)), this._parts.hostname = this._parts.hostname.toLowerCase(), this.build(!a));
        return this
    };
    e.normalizePort = function (a) {
        "string" === typeof this._parts.protocol && this._parts.port === d.defaultPorts[this._parts.protocol] && (this._parts.port = null, this.build(!a));
        return this
    };
    e.normalizePath = function (a) {
        var b = this._parts.path;
        if (!b)return this;
        if (this._parts.urn)return this._parts.path =
            d.recodeUrnPath(this._parts.path), this.build(!a), this;
        if ("/" === this._parts.path)return this;
        var b = d.recodePath(b), c, e = "", g, k;
        "/" !== b.charAt(0) && (c = !0, b = "/" + b);
        if ("/.." === b.slice(-3) || "/." === b.slice(-2))b += "/";
        b = b.replace(/(\/(\.\/)+)|(\/\.$)/g, "/").replace(/\/{2,}/g, "/");
        c && (e = b.substring(1).match(/^(\.\.\/)+/) || "") && (e = e[0]);
        for (; ;) {
            g = b.search(/\/\.\.(\/|$)/);
            if (-1 === g)break; else if (0 === g) {
                b = b.substring(3);
                continue
            }
            k = b.substring(0, g).lastIndexOf("/");
            -1 === k && (k = g);
            b = b.substring(0, k) + b.substring(g +
                    3)
        }
        c && this.is("relative") && (b = e + b.substring(1));
        this._parts.path = b;
        this.build(!a);
        return this
    };
    e.normalizePathname = e.normalizePath;
    e.normalizeQuery = function (a) {
        "string" === typeof this._parts.query && (this._parts.query.length ? this.query(d.parseQuery(this._parts.query, this._parts.escapeQuerySpace)) : this._parts.query = null, this.build(!a));
        return this
    };
    e.normalizeFragment = function (a) {
        this._parts.fragment || (this._parts.fragment = null, this.build(!a));
        return this
    };
    e.normalizeSearch = e.normalizeQuery;
    e.normalizeHash =
        e.normalizeFragment;
    e.iso8859 = function () {
        var a = d.encode, b = d.decode;
        d.encode = escape;
        d.decode = decodeURIComponent;
        try {
            this.normalize()
        } finally {
            d.encode = a, d.decode = b
        }
        return this
    };
    e.unicode = function () {
        var a = d.encode, b = d.decode;
        d.encode = B;
        d.decode = unescape;
        try {
            this.normalize()
        } finally {
            d.encode = a, d.decode = b
        }
        return this
    };
    e.readable = function () {
        var a = this.clone();
        a.username("").password("").normalize();
        var b = "";
        a._parts.protocol && (b += a._parts.protocol + "://");
        a._parts.hostname && (a.is("punycode") && p ? (b += p.toUnicode(a._parts.hostname),
        a._parts.port && (b += ":" + a._parts.port)) : b += a.host());
        a._parts.hostname && a._parts.path && "/" !== a._parts.path.charAt(0) && (b += "/");
        b += a.path(!0);
        if (a._parts.query) {
            for (var c = "", e = 0, g = a._parts.query.split("&"), k = g.length; e < k; e++) {
                var h = (g[e] || "").split("="), c = c + ("&" + d.decodeQuery(h[0], this._parts.escapeQuerySpace).replace(/&/g, "%26"));
                void 0 !== h[1] && (c += "=" + d.decodeQuery(h[1], this._parts.escapeQuerySpace).replace(/&/g, "%26"))
            }
            b += "?" + c.substring(1)
        }
        return b += d.decodeQuery(a.hash(), !0)
    };
    e.absoluteTo = function (a) {
        var b =
            this.clone(), c = ["protocol", "username", "password", "hostname", "port"], e, g;
        if (this._parts.urn)throw Error("URNs do not have any generally defined hierarchical components");
        a instanceof d || (a = new d(a));
        b._parts.protocol || (b._parts.protocol = a._parts.protocol);
        if (this._parts.hostname)return b;
        for (e = 0; g = c[e]; e++)b._parts[g] = a._parts[g];
        b._parts.path ? ".." === b._parts.path.substring(-2) && (b._parts.path += "/") : (b._parts.path = a._parts.path, b._parts.query || (b._parts.query = a._parts.query));
        "/" !== b.path().charAt(0) &&
        (c = (c = a.directory()) ? c : 0 === a.path().indexOf("/") ? "/" : "", b._parts.path = (c ? c + "/" : "") + b._parts.path, b.normalizePath());
        b.build();
        return b
    };
    e.relativeTo = function (a) {
        var b = this.clone().normalize(), c, e, g;
        if (b._parts.urn)throw Error("URNs do not have any generally defined hierarchical components");
        a = (new d(a)).normalize();
        c = b._parts;
        e = a._parts;
        g = b.path();
        a = a.path();
        if ("/" !== g.charAt(0))throw Error("URI is already relative");
        if ("/" !== a.charAt(0))throw Error("Cannot calculate a URI relative to another relative URI");
        c.protocol === e.protocol && (c.protocol = null);
        if (c.username === e.username && c.password === e.password && null === c.protocol && null === c.username && null === c.password && c.hostname === e.hostname && c.port === e.port)c.hostname = null, c.port = null; else return b.build();
        if (g === a)return c.path = "", b.build();
        g = d.commonPath(g, a);
        if (!g)return b.build();
        e = e.path.substring(g.length).replace(/[^\/]*$/, "").replace(/.*?\//g, "../");
        c.path = e + c.path.substring(g.length) || "./";
        return b.build()
    };
    e.equals = function (a) {
        var b = this.clone();
        a = new d(a);
        var c = {}, e = {}, g = {}, k;
        b.normalize();
        a.normalize();
        if (b.toString() === a.toString())return !0;
        c = b.query();
        e = a.query();
        b.query("");
        a.query("");
        if (b.toString() !== a.toString() || c.length !== e.length)return !1;
        c = d.parseQuery(c, this._parts.escapeQuerySpace);
        e = d.parseQuery(e, this._parts.escapeQuerySpace);
        for (k in c)if (q.call(c, k)) {
            if (!h(c[k])) {
                if (c[k] !== e[k])return !1
            } else if (!E(c[k], e[k]))return !1;
            g[k] = !0
        }
        for (k in e)if (q.call(e, k) && !g[k])return !1;
        return !0
    };
    e.duplicateQueryParameters = function (a) {
        this._parts.duplicateQueryParameters = !!a;
        return this
    };
    e.escapeQuerySpace = function (a) {
        this._parts.escapeQuerySpace = !!a;
        return this
    };
    return d
});

/*!
 * @copyright &copy; Kartik Visweswaran, Krajee.com, 2013 - 2016
 * @version 4.0.1
 *
 * A simple yet powerful JQuery star rating plugin that allows rendering fractional star ratings and supports
 * Right to Left (RTL) input.
 *
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
(function (factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) { // jshint ignore:line
        // AMD. Register as an anonymous module.
        define(['jquery'], factory); // jshint ignore:line
    } else { // noinspection JSUnresolvedVariable
        if (typeof module === 'object' && module.exports) { // jshint ignore:line
            // Node/CommonJS
            // noinspection JSUnresolvedVariable
            module.exports = factory(require('jquery')); // jshint ignore:line
        } else {
            // Browser globals
            factory(window.jQuery);
        }
    }
}(function ($) {
    "use strict";

    $.fn.ratingLocales = {};

    var NAMESPACE, DEFAULT_MIN, DEFAULT_MAX, DEFAULT_STEP, isEmpty, getCss, addCss, getDecimalPlaces, applyPrecision,
        handler, Rating;
    NAMESPACE = '.rating';
    DEFAULT_MIN = 0;
    DEFAULT_MAX = 5;
    DEFAULT_STEP = 0.5;
    isEmpty = function (value, trim) {
        return value === null || value === undefined || value.length === 0 || (trim && $.trim(value) === '');
    };
    getCss = function (condition, css) {
        return condition ? ' ' + css : '';
    };
    addCss = function ($el, css) {
        $el.removeClass(css).addClass(css);
    };
    getDecimalPlaces = function (num) {
        var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        return !match ? 0 : Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
    };
    applyPrecision = function (val, precision) {
        return parseFloat(val.toFixed(precision));
    };
    handler = function ($el, event, callback, skipNS) {
        var ev = skipNS ? event : event.split(' ').join(NAMESPACE + ' ') + NAMESPACE;
        $el.off(ev).on(ev, callback);
    };
    Rating = function (element, options) {
        var self = this;
        self.$element = $(element);
        self._init(options);
    };
    Rating.prototype = {
        constructor: Rating,
        _parseAttr: function (vattr, options) {
            var self = this, $el = self.$element, elType = $el.attr('type'), finalVal, val, chk, out;
            if (elType === 'range' || elType === 'number') {
                val = options[vattr] || $el.data(vattr) || $el.attr(vattr);
                switch (vattr) {
                    case 'min':
                        chk = DEFAULT_MIN;
                        break;
                    case 'max':
                        chk = DEFAULT_MAX;
                        break;
                    default:
                        chk = DEFAULT_STEP;
                }
                finalVal = isEmpty(val) ? chk : val;
                out = parseFloat(finalVal);
            } else {
                out = parseFloat(options[vattr]);
            }
            return isNaN(out) ? chk : out;
        },
        _setDefault: function (key, val) {
            var self = this;
            if (isEmpty(self[key])) {
                self[key] = val;
            }
        },
        _listenClick: function (e, callback) {
            e.stopPropagation();
            e.preventDefault();
            if (e.handled !== true) {
                callback(e);
                e.handled = true;
            } else {
                return false;
            }
        },
        _starClick: function (e) {
            var self = this, pos;
            self._listenClick(e, function (ev) {
                if (self.inactive) {
                    return false;
                }
                pos = self._getTouchPosition(ev);
                self._setStars(pos);
                self.$element.trigger('change').trigger('rating.change', [self.$element.val(), self._getCaption()]);
                self.starClicked = true;
            });
        },
        _starMouseMove: function (e) {
            var self = this, pos, out;
            if (!self.hoverEnabled || self.inactive || (e && e.isDefaultPrevented())) {
                return;
            }
            self.starClicked = false;
            pos = self._getTouchPosition(e);
            out = self.calculate(pos);
            self._toggleHover(out);
            self.$element.trigger('rating.hover', [out.val, out.caption, 'stars']);
        },
        _starMouseLeave: function (e) {
            var self = this, out;
            if (!self.hoverEnabled || self.inactive || self.starClicked || (e && e.isDefaultPrevented())) {
                return;
            }
            out = self.cache;
            self._toggleHover(out);
            self.$element.trigger('rating.hoverleave', ['stars']);
        },
        _clearClick: function (e) {
            var self = this;
            self._listenClick(e, function () {
                if (!self.inactive) {
                    self.clear();
                    self.clearClicked = true;
                }
            });
        },
        _clearMouseMove: function (e) {
            var self = this, caption, val, width, out;
            if (!self.hoverEnabled || self.inactive || !self.hoverOnClear || (e && e.isDefaultPrevented())) {
                return;
            }
            self.clearClicked = false;
            caption = '<span class="' + self.clearCaptionClass + '">' + self.clearCaption + '</span>';
            val = self.clearValue;
            width = self.getWidthFromValue(val) || 0;
            out = {caption: caption, width: width, val: val};
            self._toggleHover(out);
            self.$element.trigger('rating.hover', [val, caption, 'clear']);
        },
        _clearMouseLeave: function (e) {
            var self = this, out;
            if (!self.hoverEnabled || self.inactive || self.clearClicked || !self.hoverOnClear || (e && e.isDefaultPrevented())) {
                return;
            }
            out = self.cache;
            self._toggleHover(out);
            self.$element.trigger('rating.hoverleave', ['clear']);
        },
        _resetForm: function (e) {
            var self = this;
            if (e && e.isDefaultPrevented()) {
                return;
            }
            if (!self.inactive) {
                self.reset();
            }
        },
        _setTouch: function (e, flag) {
            //noinspection JSUnresolvedVariable
            var self = this, ev, touches, pos, out, caption, w, width, isTouchCapable = 'ontouchstart' in window ||
                (window.DocumentTouch && document instanceof window.DocumentTouch);
            if (!isTouchCapable || self.inactive) {
                return;
            }
            ev = e.originalEvent;
            //noinspection JSUnresolvedVariable
            touches = !isEmpty(ev.touches) ? ev.touches : ev.changedTouches;
            pos = self._getTouchPosition(touches[0]);
            if (flag) {
                self._setStars(pos);
                self.$element.trigger('change').trigger('rating.change', [self.$element.val(), self._getCaption()]);
                self.starClicked = true;
            } else {
                out = self.calculate(pos);
                caption = out.val <= self.clearValue ? self.fetchCaption(self.clearValue) : out.caption;
                w = self.getWidthFromValue(self.clearValue);
                width = out.val <= self.clearValue ? w + '%' : out.width;
                self._setCaption(caption);
                self.$filledStars.css('width', width);
            }
        },
        _initTouch: function (e) {
            var self = this, flag = (e.type === "touchend");
            self._setTouch(e, flag);
        },
        _initSlider: function (options) {
            var self = this;
            if (isEmpty(self.$element.val())) {
                self.$element.val(0);
            }
            self.initialValue = self.$element.val();
            self._setDefault('min', self._parseAttr('min', options));
            self._setDefault('max', self._parseAttr('max', options));
            self._setDefault('step', self._parseAttr('step', options));
            if (isNaN(self.min) || isEmpty(self.min)) {
                self.min = DEFAULT_MIN;
            }
            if (isNaN(self.max) || isEmpty(self.max)) {
                self.max = DEFAULT_MAX;
            }
            if (isNaN(self.step) || isEmpty(self.step) || self.step === 0) {
                self.step = DEFAULT_STEP;
            }
            self.diff = self.max - self.min;
        },
        _initHighlight: function (v) {
            var self = this, w, cap = self._getCaption();
            if (!v) {
                v = self.$element.val();
            }
            w = self.getWidthFromValue(v) + '%';
            self.$filledStars.width(w);
            self.cache = {caption: cap, width: w, val: v};
        },
        _getContainerCss: function () {
            var self = this;
            return 'rating-container' +
                getCss(self.theme, 'theme-' + self.theme) +
                getCss(self.rtl, 'rating-rtl') +
                getCss(self.size, 'rating-' + self.size) +
                getCss(self.animate, 'rating-animate') +
                getCss(self.disabled || self.readonly, 'rating-disabled') +
                getCss(self.containerClass, self.containerClass);
        },
        _checkDisabled: function () {
            var self = this, $el = self.$element, opts = self.options;
            self.disabled = opts.disabled === undefined ? $el.attr('disabled') || false : opts.disabled;
            self.readonly = opts.readonly === undefined ? $el.attr('readonly') || false : opts.readonly;
            self.inactive = (self.disabled || self.readonly);
            $el.attr({disabled: self.disabled, readonly: self.readonly});
        },
        _addContent: function (type, content) {
            var self = this, $container = self.$container, isClear = type === 'clear';
            if (self.rtl) {
                return isClear ? $container.append(content) : $container.prepend(content);
            } else {
                return isClear ? $container.prepend(content) : $container.append(content);
            }
        },
        _generateRating: function () {
            var self = this, $el = self.$element, $rating, $container, w;
            $container = self.$container = $(document.createElement("div")).insertBefore($el);
            addCss($container, self._getContainerCss());
            self.$rating = $rating = $(document.createElement("div")).attr('class', 'rating').appendTo($container)
                .append(self._getStars('empty')).append(self._getStars('filled'));
            self.$emptyStars = $rating.find('.empty-stars');
            self.$filledStars = $rating.find('.filled-stars');
            self._renderCaption();
            self._renderClear();
            self._initHighlight();
            $container.append($el);
            if (self.rtl) {
                w = Math.max(self.$emptyStars.outerWidth(), self.$filledStars.outerWidth());
                self.$emptyStars.width(w);
            }
        },
        _getCaption: function () {
            var self = this;
            return self.$caption && self.$caption.length ? self.$caption.html() : self.defaultCaption;
        },
        _setCaption: function (content) {
            var self = this;
            if (self.$caption && self.$caption.length) {
                self.$caption.html(content);
            }
        },
        _renderCaption: function () {
            var self = this, val = self.$element.val(), html, $cap = self.captionElement ? $(self.captionElement) : '';
            if (!self.showCaption) {
                return;
            }
            html = self.fetchCaption(val);
            if ($cap && $cap.length) {
                addCss($cap, 'caption');
                $cap.html(html);
                self.$caption = $cap;
                return;
            }
            self._addContent('caption', '<div class="caption">' + html + '</div>');
            self.$caption = self.$container.find(".caption");
        },
        _renderClear: function () {
            var self = this, css, $clr = self.clearElement ? $(self.clearElement) : '';
            if (!self.showClear) {
                return;
            }
            css = self._getClearClass();
            if ($clr.length) {
                addCss($clr, css);
                $clr.attr({"title": self.clearButtonTitle}).html(self.clearButton);
                self.$clear = $clr;
                return;
            }
            self._addContent('clear',
                '<div class="' + css + '" title="' + self.clearButtonTitle + '">' + self.clearButton + '</div>');
            self.$clear = self.$container.find('.' + self.clearButtonBaseClass);
        },
        _getClearClass: function () {
            return this.clearButtonBaseClass + ' ' + ((this.inactive) ? '' : this.clearButtonActiveClass);
        },
        _getTouchPosition: function (e) {
            var pageX = isEmpty(e.pageX) ? e.originalEvent.touches[0].pageX : e.pageX;
            return pageX - this.$rating.offset().left;
        },
        _toggleHover: function (out) {
            var self = this, w, width, caption;
            if (!out) {
                return;
            }
            if (self.hoverChangeStars) {
                w = self.getWidthFromValue(self.clearValue);
                width = out.val <= self.clearValue ? w + '%' : out.width;
                self.$filledStars.css('width', width);
            }
            if (self.hoverChangeCaption) {
                caption = out.val <= self.clearValue ? self.fetchCaption(self.clearValue) : out.caption;
                if (caption) {
                    self._setCaption(caption + '');
                }
            }
        },
        _init: function (options) {
            var self = this, $el = self.$element.addClass('hide');
            self.options = options;
            $.each(options, function (key, value) {
                self[key] = value;
            });
            if (self.rtl || $el.attr('dir') === 'rtl') {
                self.rtl = true;
                $el.attr('dir', 'rtl');
            }
            self.starClicked = false;
            self.clearClicked = false;
            self._initSlider(options);
            self._checkDisabled();
            if (self.displayOnly) {
                self.inactive = true;
                self.showClear = false;
                self.showCaption = false;
            }
            self._generateRating();
            self._listen();
            return $el.removeClass('rating-loading');
        },
        _listen: function () {
            var self = this, $el = self.$element, $form = $el.closest('form'), $rating = self.$rating,
                $clear = self.$clear;
            handler($rating, 'touchstart touchmove touchend', $.proxy(self._initTouch, self));
            handler($rating, 'click touchstart', $.proxy(self._starClick, self));
            handler($rating, 'mousemove', $.proxy(self._starMouseMove, self));
            handler($rating, 'mouseleave', $.proxy(self._starMouseLeave, self));
            if (self.showClear && $clear.length) {
                handler($clear, 'click touchstart', $.proxy(self._clearClick, self));
                handler($clear, 'mousemove', $.proxy(self._clearMouseMove, self));
                handler($clear, 'mouseleave', $.proxy(self._clearMouseLeave, self));
            }
            if ($form.length) {
                handler($form, 'reset', $.proxy(self._resetForm, self));
            }
            return $el;
        },
        _getStars: function (type) {
            var self = this, stars = '<span class="' + type + '-stars">', i;
            for (i = 1; i <= self.stars; i++) {
                stars += '<span class="star">' + self[type + 'Star'] + '</span>';
            }
            return stars + '</span>';
        },
        _setStars: function (pos) {
            var self = this, out = arguments.length ? self.calculate(pos) : self.calculate(), $el = self.$element;
            $el.val(out.val);
            self.$filledStars.css('width', out.width);
            self._setCaption(out.caption);
            self.cache = out;
            return $el;
        },
        showStars: function (val) {
            var self = this, v = parseFloat(val);
            self.$element.val(isNaN(v) ? self.clearValue : v);
            return self._setStars();
        },
        calculate: function (pos) {
            var self = this, defaultVal = isEmpty(self.$element.val()) ? 0 : self.$element.val(),
                val = arguments.length ? self.getValueFromPosition(pos) : defaultVal,
                caption = self.fetchCaption(val), width = self.getWidthFromValue(val);
            width += '%';
            return {caption: caption, width: width, val: val};
        },
        getValueFromPosition: function (pos) {
            var self = this, precision = getDecimalPlaces(self.step), val, factor, maxWidth = self.$rating.width();
            factor = (self.diff * pos) / (maxWidth * self.step);
            factor = self.rtl ? Math.floor(factor) : Math.ceil(factor);
            val = applyPrecision(parseFloat(self.min + factor * self.step), precision);
            val = Math.max(Math.min(val, self.max), self.min);
            return self.rtl ? (self.max - val) : val;
        },
        getWidthFromValue: function (val) {
            var self = this, min = self.min, max = self.max, factor, $r = self.$emptyStars, w;
            if (!val || val <= min || min === max) {
                return 0;
            }
            w = $r.outerWidth();
            factor = w ? $r.width() / w : 1;
            if (val >= max) {
                return 100;
            }
            return (val - min) * factor * 100 / (max - min);
        },
        fetchCaption: function (rating) {
            var self = this, val = parseFloat(rating) || self.clearValue, css, cap, capVal, cssVal, caption,
                vCap = self.starCaptions, vCss = self.starCaptionClasses;
            if (val && val !== self.clearValue) {
                val = applyPrecision(val, getDecimalPlaces(self.step));
            }
            cssVal = typeof vCss === "function" ? vCss(val) : vCss[val];
            capVal = typeof vCap === "function" ? vCap(val) : vCap[val];
            cap = isEmpty(capVal) ? self.defaultCaption.replace(/\{rating}/g, val) : capVal;
            css = isEmpty(cssVal) ? self.clearCaptionClass : cssVal;
            caption = (val === self.clearValue) ? self.clearCaption : cap;
            return '<span class="' + css + '">' + caption + '</span>';
        },
        destroy: function () {
            var self = this, $el = self.$element;
            if (!isEmpty(self.$container)) {
                self.$container.before($el).remove();
            }
            $.removeData($el.get(0));
            return $el.off('rating').removeClass('hide');
        },
        create: function (options) {
            var self = this, opts = options || self.options || {};
            return self.destroy().rating(opts);
        },
        clear: function () {
            var self = this, title = '<span class="' + self.clearCaptionClass + '">' + self.clearCaption + '</span>';
            if (!self.inactive) {
                self._setCaption(title);
            }
            return self.showStars(self.clearValue).trigger('change').trigger('rating.clear');
        },
        reset: function () {
            var self = this;
            return self.showStars(self.initialValue).trigger('rating.reset');
        },
        update: function (val) {
            var self = this;
            return arguments.length ? self.showStars(val) : self.$element;
        },
        refresh: function (options) {
            var self = this, $el = self.$element;
            if (!options) {
                return $el;
            }
            return self.destroy().rating($.extend(true, self.options, options)).trigger('rating.refresh');
        }
    };

    $.fn.rating = function (option) {
        var args = Array.apply(null, arguments), retvals = [];
        args.shift();
        this.each(function () {
            var self = $(this), data = self.data('rating'), options = typeof option === 'object' && option,
                lang = options.language || self.data('language') || 'en', loc = {}, opts;

            if (!data) {
                if (lang !== 'en' && !isEmpty($.fn.ratingLocales[lang])) {
                    loc = $.fn.ratingLocales[lang];
                }
                opts = $.extend(true, {}, $.fn.rating.defaults, $.fn.ratingLocales.en, loc, options, self.data());
                data = new Rating(this, opts);
                self.data('rating', data);
            }

            if (typeof option === 'string') {
                retvals.push(data[option].apply(data, args));
            }
        });
        switch (retvals.length) {
            case 0:
                return this;
            case 1:
                return retvals[0] === undefined ? this : retvals[0];
            default:
                return retvals;
        }
    };

    $.fn.rating.defaults = {
        theme: '',
        language: 'en',
        stars: 5,
        filledStar: '<i class="glyphicon glyphicon-star"></i>',
        emptyStar: '<i class="glyphicon glyphicon-star-empty"></i>',
        containerClass: '',
        size: 'md',
        animate: true,
        displayOnly: false,
        rtl: false,
        showClear: true,
        showCaption: true,
        starCaptionClasses: {
            0.5: 'label label-danger',
            1: 'label label-danger',
            1.5: 'label label-warning',
            2: 'label label-warning',
            2.5: 'label label-info',
            3: 'label label-info',
            3.5: 'label label-primary',
            4: 'label label-primary',
            4.5: 'label label-success',
            5: 'label label-success'
        },
        clearButton: '<i class="glyphicon glyphicon-minus-sign"></i>',
        clearButtonBaseClass: 'clear-rating',
        clearButtonActiveClass: 'clear-rating-active',
        clearCaptionClass: 'label label-default',
        clearValue: null,
        captionElement: null,
        clearElement: null,
        hoverEnabled: true,
        hoverChangeCaption: true,
        hoverChangeStars: true,
        hoverOnClear: true
    };

    $.fn.ratingLocales.en = {
        defaultCaption: '{rating} Stars',
        starCaptions: {
            0.5: 'Half Star',
            1: 'One Star',
            1.5: 'One & Half Star',
            2: 'Two Stars',
            2.5: 'Two & Half Stars',
            3: 'Three Stars',
            3.5: 'Three & Half Stars',
            4: 'Four Stars',
            4.5: 'Four & Half Stars',
            5: 'Five Stars'
        },
        clearButtonTitle: 'Clear',
        clearCaption: 'Not Rated'
    };

    $.fn.rating.Constructor = Rating;

    /**
     * Convert automatically inputs with class 'rating' into Krajee's star rating control.
     */
    $(document).ready(function () {
        var $input = $('input.rating');
        if ($input.length) {
            $input.removeClass('rating-loading').addClass('rating-loading').rating();
        }
    });
}));
//     jquery-comments.js 1.1.1

//     (c) 2016 Joona Tykkyläinen, Viima Solutions Oy
//     jquery-comments may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://viima.github.io/jquery-comments/

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {

    var Comments = {

        // Instance variables
        // ==================

        $el: null,
        commentsById: {},
        currentSortKey: '',

        options: {

            // User
            profilePictureURL: '',
            currentUserIsAdmin: false,

            // Font awesome icon overrides
            spinnerIconURL: '',
            upvoteIconURL: '',
            replyIconURL: '',
            uploadIconURL: '',
            attachmentIconURL: '',
            fileIconURL: '',
            noCommentsIconURL: '',

            // Strings to be formatted (for example localization)
            textareaPlaceholderText: 'Add a comment',
            newestText: 'Newest',
            oldestText: 'Oldest',
            popularText: 'Popular',
            attachmentsText: 'Attachments',
            sendText: 'Send',
            replyText: 'Reply',
            editText: 'Edit',
            editedText: 'Edited',
            youText: 'You',
            saveText: 'Save',
            deleteText: 'Delete',
            viewAllRepliesText: 'View all __replyCount__ replies',
            hideRepliesText: 'Hide replies',
            noCommentsText: 'No comments',
            noAttachmentsText: 'No attachments',
            attachmentDropText: 'Drop files here',
            textFormatter: function(text) {
                return text;
            },

            // Functionalities
            enableReplying: true,
            enableEditing: true,
            enableUpvoting: true,
            enableDeleting: true,
            enableAttachments: false,
            enableDeletingCommentWithReplies: false,
            enableNavigation: true,
            postCommentOnEnter: false,
            forceResponsive: false,
            readOnly: false,
            defaultNavigationSortKey: 'newest',

            // Colors
            highlightColor: '#2793e6',
            deleteButtonColor: '#C9302C',

            roundProfilePictures: false,
            textareaRows: 2,
            textareaRowsOnFocus: 2,
            textareaMaxRows: 5,
            maxRepliesVisible: 2,

            fieldMappings: {
                id: 'id',
                parent: 'parent',
                created: 'created',
                modified: 'modified',
                content: 'content',
                file: 'file',
                fileURL: 'file_url',
                fileMimeType: 'file_mime_type',
                fullname: 'fullname',
                profileURL: 'profile_url',
                profilePictureURL: 'profile_picture_url',
                createdByAdmin: 'created_by_admin',
                createdByCurrentUser: 'created_by_current_user',
                upvoteCount: 'upvote_count',
                userHasUpvoted: 'user_has_upvoted'
            },

            getComments: function(success, error) {success([])},
            postComment: function(commentJSON, success, error) {success(commentJSON)},
            putComment: function(commentJSON, success, error) {success(commentJSON)},
            deleteComment: function(commentJSON, success, error) {success()},
            upvoteComment: function(commentJSON, success, error) {success(commentJSON)},
            uploadAttachments: function(commentArray, success, error) {success(commentArray)},
            refresh: function() {},
            timeFormatter: function(time) {
                return new Date(time).toLocaleDateString();
            }
        },

        events: {
            // Close dropdowns
            'click': 'closeDropdowns',

            // Save comment on keydown
            'keydown [contenteditable]' : 'saveOnKeydown',

            // Listening changes in contenteditable fields (due to input event not working with IE)
            'focus [contenteditable]' : 'saveEditableContent',
            'keyup [contenteditable]' : 'checkEditableContentForChange',
            'paste [contenteditable]' : 'checkEditableContentForChange',
            'input [contenteditable]' : 'checkEditableContentForChange',
            'blur [contenteditable]' : 'checkEditableContentForChange',

            // Navigation
            'click .navigation li[data-sort-key]' : 'navigationElementClicked',
            'click .navigation li.title' : 'toggleNavigationDropdown',

            // Main comenting field
            'click .commenting-field.main .textarea': 'showMainCommentingField',
            'click .commenting-field.main .close' : 'hideMainCommentingField',

            // All commenting fields
            'click .commenting-field .textarea' : 'increaseTextareaHeight',
            'change .commenting-field .textarea' : 'increaseTextareaHeight textareaContentChanged',
            'click .commenting-field:not(.main) .close' : 'removeCommentingField',

            // Edit mode actions
            'click .commenting-field .send.enabled' : 'postComment',
            'click .commenting-field .update.enabled' : 'putComment',
            'click .commenting-field .delete.enabled' : 'deleteComment',
            'change .commenting-field .upload.enabled input[type="file"]' : 'fileInputChanged',

            // Other actions
            'click li.comment button.upvote' : 'upvoteComment',
            'click li.comment button.delete.enabled' : 'deleteComment',

            // Other
            'click li.comment ul.child-comments .toggle-all': 'toggleReplies',
            'click li.comment button.reply': 'replyButtonClicked',
            'click li.comment button.edit': 'editButtonClicked',

            // Drag & dropping attachments
            'dragenter' : 'showDroppableOverlay',

            'dragenter .droppable-overlay' : 'handleDragEnter',
            'dragleave .droppable-overlay' : 'handleDragLeaveForOverlay',
            'dragenter .droppable-overlay .droppable' : 'handleDragEnter',
            'dragleave .droppable-overlay .droppable' : 'handleDragLeaveForDroppable',

            'dragover .droppable-overlay' : 'handleDragOverForOverlay',
            'drop .droppable-overlay' : 'handleDrop'
        },


        // Initialization
        // ==============

        init: function(options, el) {
            this.$el = $(el);
            this.$el.addClass('jquery-comments');
            this.undelegateEvents();
            this.delegateEvents();

            // Detect mobile devices
            (function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
            if($.browser.mobile) this.$el.addClass('mobile');

            // Init options
            if(options.fieldMappings) {
                options = $.extend({}, options);
                $.extend(this.options.fieldMappings, options.fieldMappings);

                // Field mappings needs to be deleted so that the field won't get overidden
                delete options['fieldMappings'];
            }
            $.extend(this.options, options);

            // Read-only mode
            if(this.options.readOnly) this.$el.addClass('read-only');

            // Set initial sort key
            this.currentSortKey = this.options.defaultNavigationSortKey;

            // Create CSS declarations for highlight color
            this.createCssDeclarations();

            // Fetching data and rendering
            this.fetchDataAndRender();
        },

        delegateEvents: function() {
            this.bindEvents(false);
        },

        undelegateEvents: function() {
            this.bindEvents(true);
        },

        bindEvents: function(unbind) {
            var bindFunction = unbind ? 'off' : 'on';
            for (var key in this.events) {
                var eventName = key.split(' ')[0];
                var selector = key.split(' ').slice(1).join(' ');
                var methodNames = this.events[key].split(' ');

                for(var index in methodNames) {
                    if(methodNames.hasOwnProperty(index)) {
                        var method = this[methodNames[index]];

                        // Keep the context
                        method = $.proxy(method, this);

                        if (selector == '') {
                            this.$el[bindFunction](eventName, method);
                        } else {
                            this.$el[bindFunction](eventName, selector, method);
                        }
                    }
                }
            }
        },


        // Basic functionalities
        // =====================

        fetchDataAndRender: function () {
            var self = this;

            this.$el.empty();
            this.createHTML();

            // Get comments
            this.commentsById = {};

            var success = function(commentsArray) {
                // Convert comments to custom data model
                var commentModels = commentsArray.map(function(commentsJSON){
                    return self.createCommentModel(commentsJSON)
                });

                // Sort comments by date (oldest first so that they can be appended to the data model
                // without caring dependencies)
                self.sortComments(commentModels, 'oldest');

                $(commentModels).each(function(index, commentModel) {
                    self.addCommentToDataModel(commentModel);
                });

                self.render();
            };

            var error = function() {
                success([]);
            };

            this.options.getComments(success, error);
        },

        fetchNext: function() {
            var self = this;

            // Loading indicator
            var spinner = this.createSpinner();
            this.$el.find('ul#comment-list').append(spinner);

            var success = function (commentModels) {
                $(commentModels).each(function(index, commentModel) {
                    self.createComment(commentModel);
                });
                spinner.remove();
            }

            var error = function() {
                spinner.remove();
            }

            this.options.getComments(success, error);
        },

        createCommentModel: function(commentJSON) {
            var commentModel = this.applyInternalMappings(commentJSON);
            commentModel.childs = [];
            return commentModel;
        },

        addCommentToDataModel: function(commentModel) {
            if(!(commentModel.id in this.commentsById)) {
                this.commentsById[commentModel.id] = commentModel;

                // Update child array of the parent (append childs to the array of outer most parent)
                if(commentModel.parent) {
                    var outermostParent = this.getOutermostParent(commentModel.parent);
                    outermostParent.childs.push(commentModel.id);
                }
            }
        },

        updateCommentModel: function(commentModel) {
            $.extend(this.commentsById[commentModel.id], commentModel);
        },

        render: function() {
            var self = this;

            // Show active container
            this.showActiveContainer();

            // Create comments
            this.createComments();

            // Create attachments if enabled
            if(this.options.enableAttachments) this.createAttachments();

            // Remove spinner
            this.$el.find('> .spinner').remove();

            this.options.refresh();
        },

        showActiveContainer: function() {
            var activeNavigationEl = this.$el.find('.navigation li[data-container-name].active');
            var containerName = activeNavigationEl.data('container-name');
            var containerEl = this.$el.find('[data-container="' + containerName + '"]');
            containerEl.siblings('[data-container]').hide();
            containerEl.show();
        },

        createComments: function() {
            var self = this;

            // Create the list element before appending to DOM in order to reach better performance
            this.$el.find('#comment-list').remove();
            var commentList = $('<ul/>', {
                id: 'comment-list',
                'class': 'main'
            });

            // Divide commments into main level comments and replies
            var mainLevelComments = [];
            var replies = [];
            $(this.getComments()).each(function(index, commentModel) {
                if(commentModel.parent == null) {
                    mainLevelComments.push(commentModel);
                } else {
                    replies.push(commentModel);
                }
            });

            // Append main level comments
            this.sortComments(mainLevelComments, this.currentSortKey);
            mainLevelComments.reverse();    // Reverse the order as they are prepended to DOM
            $(mainLevelComments).each(function(index, commentModel) {
                self.addComment(commentModel, commentList);
            });

            // Append replies in chronological order
            this.sortComments(replies, 'oldest');
            $(replies).each(function(index, commentModel) {
                self.addComment(commentModel, commentList);
            });

            // Appned list to DOM
            this.$el.find('[data-container="comments"]').prepend(commentList);
        },

        createAttachments: function() {
            var self = this;

            // Create the list element before appending to DOM in order to reach better performance
            this.$el.find('#attachment-list').remove();
            var attachmentList = $('<ul/>', {
                id: 'attachment-list',
                'class': 'main'
            });

            var attachments = this.getAttachments();
            this.sortComments(attachments, 'newest');
            attachments.reverse();    // Reverse the order as they are prepended to DOM
            $(attachments).each(function(index, commentModel) {
                self.addAttachment(commentModel, attachmentList);
            });

            // Appned list to DOM
            this.$el.find('[data-container="attachments"]').prepend(attachmentList);
        },

        addComment: function(commentModel, commentList) {
            commentList = commentList || this.$el.find('#comment-list');
            var commentEl = this.createCommentElement(commentModel);

            // Case: reply
            if(commentModel.parent) {
                var directParentEl = commentList.find('.comment[data-id="'+commentModel.parent+'"]');

                // Re-render action bar of direct parent element
                this.reRenderCommentActionBar(commentModel.parent);

                // Force replies into one level only
                var outerMostParent = directParentEl.parents('.comment').last();
                if(outerMostParent.length == 0) outerMostParent = directParentEl;

                // Append element to DOM
                var childCommentsEl = outerMostParent.find('.child-comments');
                var commentingField = childCommentsEl.find('.commenting-field');
                if(commentingField.length) {
                    commentingField.before(commentEl)
                } else {
                    childCommentsEl.append(commentEl);
                }

                // Update toggle all -button
                this.updateToggleAllButton(outerMostParent);

            // Case: main level comment
            } else {
                commentList.prepend(commentEl);
            }
        },

        addAttachment: function(commentModel, commentList) {
            commentList = commentList || this.$el.find('#attachment-list');
            var commentEl = this.createCommentElement(commentModel);
            commentList.prepend(commentEl);
        },

        removeComment: function(commentId) {
            var self = this;
            var commentModel = this.commentsById[commentId];

            // Remove child comments recursively
            var childComments = this.getChildComments(commentModel.id);
            $(childComments).each(function(index, childComment) {
                self.removeComment(childComment.id);
            });

            // Update the child array of outermost parent
            if(commentModel.parent) {
                var outermostParent = this.getOutermostParent(commentModel.parent);
                var indexToRemove = outermostParent.childs.indexOf(commentModel.id);
                outermostParent.childs.splice(indexToRemove, 1);
            }

            // Remove the comment from data model
            delete this.commentsById[commentId];

            var commentElements = this.$el.find('li.comment[data-id="'+commentId+'"]');
            var parentEl = commentElements.parents('li.comment').last();

            // Remove the element
            commentElements.remove();

            // Update the toggle all button
            this.updateToggleAllButton(parentEl);
        },

        uploadAttachments: function(files, commentingField) {
            var self = this;
            if(!commentingField) commentingField = this.$el.find('.commenting-field.main');
            var isReply = !commentingField.hasClass('main');
            var fileCount = files.length;

            if(fileCount) {
                var uploadButton = commentingField.find('.upload');
                var textarea = commentingField.find('.textarea');

                // Disable upload button and append spinners while request is pending
                uploadButton.removeClass('enabled');
                var attachmentListSpinner = this.createSpinner();
                var commentListSpinner = this.createSpinner();
                this.$el.find('ul#attachment-list').prepend(attachmentListSpinner);
                if(isReply) {
                    commentingField.before(commentListSpinner);
                } else {
                    this.$el.find('ul#comment-list').prepend(commentListSpinner);
                }

                var success = function(commentArray) {
                    $(commentArray).each(function(index, commentJSON) {
                        var commentModel = self.createCommentModel(commentJSON);
                        self.addCommentToDataModel(commentModel);
                        self.addComment(commentModel);
                        self.addAttachment(commentModel);
                    });

                    // Close the commenting field if all the uploads were successfull
                    // and there's no content besides the attachment
                    if(commentArray.length == fileCount && self.getTextareaContent(textarea).length == 0) {
                        commentingField.find('.close').trigger('click');
                    }

                    // Enable upload button and remove spinners
                    uploadButton.addClass('enabled');
                    commentListSpinner.remove();
                    attachmentListSpinner.remove();
                };

                var error = function() {
                    // Enable upload button and remove spinners
                    uploadButton.addClass('enabled');
                    commentListSpinner.remove();
                    attachmentListSpinner.remove();
                };

                var commentArray = [];
                $(files).each(function(index, file) {

                    // Create comment JSON
                    var commentJSON = self.createCommentJSON(textarea);
                    commentJSON.id += '-' + index;
                    commentJSON.content = '';
                    commentJSON.file = file;
                    commentJSON.fileURL = 'C:/fakepath/' + file.name;
                    commentJSON.fileMimeType = file.type;

                    // Reverse mapping
                    commentJSON = self.applyExternalMappings(commentJSON);
                    commentArray.push(commentJSON);
                });

                self.options.uploadAttachments(commentArray, success, error);
            }

            // Clear the input field
            uploadButton.find('input').val('');
        },

        updateToggleAllButton: function(parentEl) {
            var childCommentsEl = parentEl.find('.child-comments');
            var childComments = childCommentsEl.find('.comment');
            var toggleAllButton = childCommentsEl.find('li.toggle-all');
            childComments.removeClass('hidden-reply');

            // Add identifying class for hidden replies so they can be toggled
            var hiddenReplies = childComments.slice(0, -this.options.maxRepliesVisible);
            hiddenReplies.addClass('hidden-reply');

            // Show all replies if replies are expanded
            if(toggleAllButton.find('span.text').text() == this.options.textFormatter(this.options.hideRepliesText)) {
                hiddenReplies.addClass('visible');
            }

            // Make sure that toggle all button is present
            if(childComments.length > this.options.maxRepliesVisible) {

                // Append button to toggle all replies if necessary
                if(!toggleAllButton.length) {

                    toggleAllButton = $('<li/>', {
                        'class': 'toggle-all highlight-font-bold'
                    });
                    var toggleAllButtonText = $('<span/>', {
                        'class': 'text'
                    });
                    var caret = $('<span/>', {
                        'class': 'caret'
                    });

                    // Append toggle button to DOM
                    toggleAllButton.append(toggleAllButtonText).append(caret);
                    childCommentsEl.prepend(toggleAllButton);
                }

                // Update the text of toggle all -button
                this.setToggleAllButtonText(toggleAllButton, false);

            // Make sure that toggle all button is not present
            } else {
                toggleAllButton.remove();
            }
        },

        sortComments: function (comments, sortKey) {
            var self = this;

            // Sort by popularity
            if(sortKey == 'popularity') {
                comments.sort(function(commentA, commentB) {
                    var pointsOfA = commentA.childs.length;
                    var pointsOfB = commentB.childs.length;

                    if(self.options.enableUpvoting) {
                        pointsOfA += commentA.upvoteCount;
                        pointsOfB += commentB.upvoteCount;
                    }

                    if(pointsOfB != pointsOfA) {
                        return pointsOfB - pointsOfA;

                    } else {
                        // Return newer if popularity is the same
                        var createdA = new Date(commentA.created).getTime();
                        var createdB = new Date(commentB.created).getTime();
                        return createdB - createdA;
                    }
                });

            // Sort by date
            } else {
                comments.sort(function(commentA, commentB) {
                    var createdA = new Date(commentA.created).getTime();
                    var createdB = new Date(commentB.created).getTime();
                    if(sortKey == 'oldest') {
                        return createdA - createdB;
                    } else {
                        return createdB - createdA;
                    }
                });
            }
        },

        sortAndReArrangeComments: function(sortKey) {
            var commentList = this.$el.find('#comment-list');

            // Get main level comments
            var mainLevelComments = this.getComments().filter(function(commentModel){return !commentModel.parent});
            this.sortComments(mainLevelComments, sortKey);

            // Rearrange the main level comments
            $(mainLevelComments).each(function(index, commentModel) {
                var commentEl = commentList.find('> li.comment[data-id='+commentModel.id+']');
                commentList.append(commentEl);
            });
        },

        showActiveSort: function() {
            var activeElements = this.$el.find('.navigation li[data-sort-key="' + this.currentSortKey + '"]');

            // Indicate active sort
            this.$el.find('.navigation li').removeClass('active');
            activeElements.addClass('active');

            // Update title for dropdown
            var titleEl = this.$el.find('.navigation .title');
            if(this.currentSortKey != 'attachments') {
                titleEl.addClass('active');
                titleEl.find('header').html(activeElements.first().html());
             } else {
                var defaultDropdownEl = this.$el.find('.navigation ul.dropdown').children().first();
                titleEl.find('header').html(defaultDropdownEl.html());
             }

            // Show active container
            this.showActiveContainer();
        },

        forceResponsive: function() {
            this.$el.addClass('responsive');
        },

        // Event handlers
        // ==============

        closeDropdowns: function() {
            this.$el.find('.dropdown').hide();
        },

        saveOnKeydown: function(ev) {
            // Save comment on cmd/ctrl + enter
            if(ev.keyCode == 13) {
                var metaKey = ev.metaKey || ev.ctrlKey;
                if(this.options.postCommentOnEnter || metaKey) {
                    var el = $(ev.currentTarget);
                    el.siblings('.control-row').find('.save').trigger('click');
                    ev.stopPropagation();
                    ev.preventDefault();
                }
            }
        },

        saveEditableContent: function(ev) {
            var el = $(ev.currentTarget);
            el.data('before', el.html());
        },

        checkEditableContentForChange: function(ev) {
            var el = $(ev.currentTarget);
            if (el.data('before') != el.html()) {
                el.data('before', el.html());
                el.trigger('change');
            }
        },

        navigationElementClicked: function(ev) {
            var navigationEl = $(ev.currentTarget);
            var sortKey = navigationEl.data().sortKey;

            // Sort the comments if necessary
            if(sortKey != 'attachments') {
                this.sortAndReArrangeComments(sortKey);
            }

            // Save the current sort key
            this.currentSortKey = sortKey;
            this.showActiveSort();
        },

        toggleNavigationDropdown: function(ev) {
            // Prevent closing immediately
            ev.stopPropagation();

            var dropdown = $(ev.currentTarget).find('~ .dropdown');
            dropdown.toggle();
        },

        showMainCommentingField: function(ev) {
            var mainTextarea = $(ev.currentTarget);
            mainTextarea.siblings('.control-row').show();
            mainTextarea.parent().find('.close').show();
            mainTextarea.focus();
        },

        hideMainCommentingField: function(ev) {
            var closeButton = $(ev.currentTarget);
            var mainTextarea = this.$el.find('.commenting-field.main .textarea');
            var mainControlRow = this.$el.find('.commenting-field.main .control-row');

            this.clearTextarea(mainTextarea);
            this.adjustTextareaHeight(mainTextarea, false);

            mainControlRow.hide();
            closeButton.hide();
            mainTextarea.blur();
        },

        increaseTextareaHeight: function(ev) {
            var textarea = $(ev.currentTarget);
            this.adjustTextareaHeight(textarea, true);
        },

        textareaContentChanged: function(ev) {
            var textarea = $(ev.currentTarget);
            var content = this.getTextareaContent(textarea);
            var saveButton = textarea.siblings('.control-row').find('.save');

            // Update parent id if reply-to-badge was removed
            if(!textarea.find('.reply-to-badge').length) {
                var commentId = textarea.attr('data-comment');

                // Case: editing comment
                if(commentId) {
                    var parentComments = textarea.parents('li.comment');
                    if(parentComments.length > 1) {
                        var parentId = parentComments.last().data('id');
                        textarea.attr('data-parent', parentId);
                    }

                // Case: new comment
                } else {
                    var parentId = textarea.parents('li.comment').last().data('id');
                    textarea.attr('data-parent', parentId);
                }
            }

            // Move close button if scrollbar is visible
            var commentingField = textarea.parents('.commenting-field').first();
            if(textarea[0].scrollHeight > textarea.outerHeight()) {
                commentingField.addClass('scrollable');
            } else {
                commentingField.removeClass('scrollable');
            }

            // Check if content or parent has changed if editing
            var contentOrParentChangedIfEditing = true;
            if(commentId = textarea.attr('data-comment')) {
                var contentChanged = content != this.commentsById[commentId].content;
                var parentFromModel;
                if(this.commentsById[commentId].parent) {
                    parentFromModel = this.commentsById[commentId].parent.toString();
                }
                var parentChanged = textarea.attr('data-parent') != parentFromModel;
                contentOrParentChangedIfEditing = contentChanged || parentChanged;
            }

            // Check whether save button needs to be enabled
            if(content.length && contentOrParentChangedIfEditing) {
                saveButton.addClass('enabled');
            } else {
                saveButton.removeClass('enabled');
            }
        },

        removeCommentingField: function(ev) {
            var closeButton = $(ev.currentTarget);

            // Remove edit class from comment if user was editing the comment
            var textarea = closeButton.siblings('.textarea');
            if(textarea.attr('data-comment')) {
                closeButton.parents('li.comment').first().removeClass('edit');
            }

            // Remove the field
            var commentingField = closeButton.parents('.commenting-field').first();
            commentingField.remove();
        },

        postComment: function(ev) {
            var self = this;
            var sendButton = $(ev.currentTarget);
            var commentingField = sendButton.parents('.commenting-field').first();
            var textarea = commentingField.find('.textarea');

            // Disable send button while request is pending
            sendButton.removeClass('enabled');

            // Create comment JSON
            var commentJSON = this.createCommentJSON(textarea);

            // Reverse mapping
            commentJSON = this.applyExternalMappings(commentJSON);

            var success = function(commentJSON) {
                self.createComment(commentJSON);
                commentingField.find('.close').trigger('click');
            };

            var error = function() {
                sendButton.addClass('enabled');
            };

            this.options.postComment(commentJSON, success, error);
        },

        createComment: function(commentJSON) {
            var commentModel = this.createCommentModel(commentJSON);
            this.addCommentToDataModel(commentModel);
            this.addComment(commentModel);
        },

        putComment: function(ev) {
            var self = this;
            var saveButton = $(ev.currentTarget);
            var commentingField = saveButton.parents('.commenting-field').first();
            var textarea = commentingField.find('.textarea');

            // Disable send button while request is pending
            saveButton.removeClass('enabled');

            // Use a clone of the existing model and update the model after succesfull update
            var commentJSON =  $.extend({}, this.commentsById[textarea.attr('data-comment')]);
            $.extend(commentJSON, {
                parent: textarea.attr('data-parent') || null,
                content: this.getTextareaContent(textarea),
                modified: new Date().getTime()
            });

            // Reverse mapping
            commentJSON = this.applyExternalMappings(commentJSON);

            var success = function(commentJSON) {
                // The outermost parent can not be changed by editing the comment so the childs array
                // of parent does not require an update

                var commentModel = self.createCommentModel(commentJSON);

                // Delete childs array from new comment model since it doesn't need an update
                delete commentModel['childs'];
                self.updateCommentModel(commentModel);

                // Close the editing field
                commentingField.find('.close').trigger('click');

                // Re-render the comment
                self.reRenderComment(commentModel.id);
            };

            var error = function() {
                saveButton.addClass('enabled');
            };

            this.options.putComment(commentJSON, success, error);
        },

        deleteComment: function(ev) {
            var self = this;
            var deleteButton = $(ev.currentTarget);
            var commentEl = deleteButton.parents('.comment').first();
            var commentJSON =  $.extend({}, this.commentsById[commentEl.attr('data-id')]);
            var commentId = commentJSON.id;
            var parentId = commentJSON.parent;

            // Disable send button while request is pending
            deleteButton.removeClass('enabled');

            // Reverse mapping
            commentJSON = this.applyExternalMappings(commentJSON);

            var success = function() {
                self.removeComment(commentId);
                if(parentId) self.reRenderCommentActionBar(parentId);
            };

            var error = function() {
                deleteButton.addClass('enabled');
            };

            this.options.deleteComment(commentJSON, success, error);
        },

        fileInputChanged: function(ev, files) {
            var files = ev.currentTarget.files;
            var commentingField = $(ev.currentTarget).parents('.commenting-field').first();
            this.uploadAttachments(files, commentingField);
        },

        upvoteComment: function(ev) {
            var self = this;
            var commentEl = $(ev.currentTarget).parents('li.comment').first();
            var commentModel = commentEl.data().model;

            // Check whether user upvoted the comment or revoked the upvote
            var previousUpvoteCount = commentModel.upvoteCount;
            var newUpvoteCount;
            if(commentModel.userHasUpvoted) {
                newUpvoteCount = previousUpvoteCount - 1;
            } else {
                newUpvoteCount = previousUpvoteCount + 1;
            }

            // Show changes immediatelly
            commentModel.userHasUpvoted = !commentModel.userHasUpvoted;
            commentModel.upvoteCount = newUpvoteCount;
            this.reRenderUpvotes(commentModel.id);

            // Reverse mapping
            var commentJSON = $.extend({}, commentModel);
            commentJSON = this.applyExternalMappings(commentJSON);

            var success = function(commentJSON) {
                var commentModel = self.createCommentModel(commentJSON);
                self.updateCommentModel(commentModel);
                self.reRenderUpvotes(commentModel.id);
            };

            var error = function() {

                // Revert changes
                commentModel.userHasUpvoted = !commentModel.userHasUpvoted;
                commentModel.upvoteCount = previousUpvoteCount;
                self.reRenderUpvotes(commentModel.id);
            };

            this.options.upvoteComment(commentJSON, success, error);
        },

        toggleReplies: function(ev) {
            var el = $(ev.currentTarget);
            el.siblings('.hidden-reply').toggleClass('visible');
            this.setToggleAllButtonText(el, true);
        },

        replyButtonClicked: function(ev) {
            var replyButton = $(ev.currentTarget);
            var outermostParent = replyButton.parents('li.comment').last();
            var parentId = replyButton.parents('.comment').first().data().id;


            // Remove existing field
            var replyField = outermostParent.find('.child-comments > .commenting-field');
            if(replyField.length) replyField.remove();
            var previousParentId = replyField.find('.textarea').attr('data-parent');

            // Create the reply field (do not re-create)
            if(previousParentId != parentId) {
                replyField = this.createCommentingFieldElement(parentId);
                outermostParent.find('.child-comments').append(replyField);

                // Move cursor to end
                var textarea = replyField.find('.textarea');
                this.moveCursorToEnd(textarea)
            }
        },

        editButtonClicked: function(ev) {
            var editButton = $(ev.currentTarget);
            var commentEl = editButton.parents('li.comment').first();
            var commentModel = commentEl.data().model;
            commentEl.addClass('edit');

            // Create the editing field
            var editField = this.createCommentingFieldElement(commentModel.parent, commentModel.id);
            commentEl.find('.comment-wrapper').first().append(editField);

            // Append original content
            var textarea = editField.find('.textarea');
            textarea.attr('data-comment', commentModel.id);

            // Escaping HTML
            textarea.append(this.getTextareaContentAsEscapedHTML(commentModel.content));

            // Move cursor to end
            this.moveCursorToEnd(textarea);
        },

        showDroppableOverlay: function(ev) {
            if(this.options.enableAttachments) {
                this.$el.find('.droppable-overlay').css('top', this.$el[0].scrollTop);
                this.$el.find('.droppable-overlay').show();
                this.$el.addClass('drag-ongoing');
            }
        },

        handleDragEnter: function(ev) {
            var count = $(ev.currentTarget).data('dnd-count') || 0;
            count++;
            $(ev.currentTarget).data('dnd-count', count);
            $(ev.currentTarget).addClass('drag-over');
        },

        handleDragLeave: function(ev, callback) {
            var count = $(ev.currentTarget).data('dnd-count');
            count--;
            $(ev.currentTarget).data('dnd-count', count);

            if(count == 0) {
                $(ev.currentTarget).removeClass('drag-over');
                if(callback) callback();
            }
        },

        handleDragLeaveForOverlay: function(ev) {
            var self = this;
            this.handleDragLeave(ev, function() {
                self.hideDroppableOverlay();
            });
        },

        handleDragLeaveForDroppable: function(ev) {
            this.handleDragLeave(ev);
        },

        handleDragOverForOverlay: function(ev) {
            ev.stopPropagation();
            ev.preventDefault();
            ev.originalEvent.dataTransfer.dropEffect = 'copy';
        },

        hideDroppableOverlay: function() {
            this.$el.find('.droppable-overlay').hide();
            this.$el.removeClass('drag-ongoing');
        },

        handleDrop: function(ev) {
            ev.preventDefault();

            // Reset DND counts
            $(ev.target).trigger('dragleave');

            // Hide the overlay and upload the files
            this.hideDroppableOverlay();
            this.uploadAttachments(ev.originalEvent.dataTransfer.files);
        },


        // HTML elements
        // =============

        createHTML: function() {
            var self = this;

            // Commenting field
            var mainCommentingField = this.createCommentingFieldElement();
            mainCommentingField.addClass('main');
            this.$el.append(mainCommentingField);

            // Hide control row and close button
            var mainControlRow = mainCommentingField.find('.control-row');
            mainControlRow.hide();
            mainCommentingField.find('.close').hide();

            // Navigation bar
            if (this.options.enableNavigation) {
                this.$el.append(this.createNavigationElement());
                this.showActiveSort();
            }

            // Loading spinner
            var spinner = this.createSpinner();
            this.$el.append(spinner);

            // Comments container
            var commentsContainer = $('<div/>', {
                'class': 'data-container',
                'data-container': 'comments'
            });
            this.$el.append(commentsContainer);

            // "No comments" placeholder
            var noComments = $('<div/>', {
                'class': 'no-comments no-data',
                text: this.options.textFormatter(this.options.noCommentsText)
            });
            var noCommentsIcon = $('<i/>', {
                'class': 'fa fa-comments fa-2x'
            });
            if(this.options.noCommentsIconURL.length) {
                noCommentsIcon.css('background-image', 'url("'+this.options.noCommentsIconURL+'")');
                noCommentsIcon.addClass('image');
            }
            noComments.prepend($('<br/>')).prepend(noCommentsIcon);
            commentsContainer.append(noComments);

            // Attachments
            if(this.options.enableAttachments) {

                // Attachments container
                var attachmentsContainer = $('<div/>', {
                    'class': 'data-container',
                    'data-container': 'attachments'
                });
                this.$el.append(attachmentsContainer);

                // "No attachments" placeholder
                var noAttachments = $('<div/>', {
                    'class': 'no-attachments no-data',
                    text: this.options.textFormatter(this.options.noAttachmentsText)
                });
                var noAttachmentsIcon = $('<i/>', {
                    'class': 'fa fa-paperclip fa-2x'
                });
                if(this.options.attachmentIconURL.length) {
                    noAttachmentsIcon.css('background-image', 'url("'+this.options.attachmentIconURL+'")');
                    noAttachmentsIcon.addClass('image');
                }
                noAttachments.prepend($('<br/>')).prepend(noAttachmentsIcon);
                attachmentsContainer.append(noAttachments);


                // Drag & dropping attachments
                var droppableOverlay = $('<div/>', {
                    'class': 'droppable-overlay'
                });

                var droppableContainer = $('<div/>', {
                    'class': 'droppable-container'
                });

                var droppable = $('<div/>', {
                    'class': 'droppable'
                });

                var uploadIcon = $('<i/>', {
                    'class': 'fa fa-upload fa-4x'
                });
                if(this.options.uploadIconURL.length) {
                    uploadIcon.css('background-image', 'url("'+this.options.uploadIconURL+'")');
                    uploadIcon.addClass('image');
                }

                var dropAttachmentText = $('<div/>', {
                    text: this.options.textFormatter(this.options.attachmentDropText)
                });
                droppable.append(uploadIcon);
                droppable.append(dropAttachmentText);

                droppableOverlay.html(droppableContainer.html(droppable)).hide();
                this.$el.append(droppableOverlay);
            }
        },

        createProfilePictureElement: function(src) {
            if(src) {
                var profilePicture = $('<img/>', {
                    src: src
                });
            } else {
                var profilePicture = $('<i/>', {
                    'class': 'fa fa-user'
                });
            }
            profilePicture.addClass('profile-picture');
            if(this.options.roundProfilePictures) profilePicture.addClass('round');
            return profilePicture;
        },

        createCommentingFieldElement: function(parentId, existingCommentId) {
            var self = this;

            // Commenting field
            var commentingField = $('<div/>', {
                'class': 'commenting-field'
            });

            // Profile picture
            if(existingCommentId) {
                var profilePictureURL = this.commentsById[existingCommentId].profilePictureURL;
            } else {
                var profilePictureURL = this.options.profilePictureURL;
            }
            var profilePicture = this.createProfilePictureElement(profilePictureURL);

            // New comment
            var textareaWrapper = $('<div/>', {
                'class': 'textarea-wrapper'
            });

            // Control row
            var controlRow = $('<div/>', {
                'class': 'control-row'
            });

            // Textarea
            var textarea = $('<div/>', {
                'class': 'textarea',
                'data-placeholder': this.options.textFormatter(this.options.textareaPlaceholderText),
                contenteditable: true
            });

            // Setting the initial height for the textarea
            this.adjustTextareaHeight(textarea, false);

            // Close button
            var closeButton = $('<span/>', {
                'class': 'close'
            }).append($('<span class="left"/>')).append($('<span class="right"/>'));

            // Save button text
            if(existingCommentId) {
                var saveButtonText = this.options.textFormatter(this.options.saveText);

                // Delete button
                var deleteButton = $('<span/>', {
                    'class': 'delete',
                    text: this.options.textFormatter(this.options.deleteText)
                }).css('background-color', this.options.deleteButtonColor);
                controlRow.append(deleteButton);

                // Enable the delete button only if the user is allowed to delete
                if(this.isAllowedToDelete(existingCommentId)) deleteButton.addClass('enabled')

            } else {
                var saveButtonText = this.options.textFormatter(this.options.sendText);

                // Add upload button if attachments are enabled
                if(this.options.enableAttachments) {
                    var uploadButton = $('<span/>', {
                        'class': 'enabled upload'
                    });
                    var uploadIcon = $('<i/>', {
                        'class': 'fa fa-upload'
                    });
                    var fileInput = $('<input/>', {
                        type: 'file',
                        'data-role': 'none' // Prevent jquery-mobile for adding classes
                    });
                    // Multi file upload might not work with backend as the the file names
                    // may be the same causing duplicates
                    if(!$.browser.mobile) fileInput.attr('multiple', 'multiple');

                    if(this.options.uploadIconURL.length) {
                        uploadIcon.css('background-image', 'url("'+this.options.uploadIconURL+'")');
                        uploadIcon.addClass('image');
                    }
                    uploadButton.append(uploadIcon).append(fileInput);
                    controlRow.append(uploadButton);
                }
            }

            // Save button
            var saveButtonClass = existingCommentId ? 'update' : 'send';
            var saveButton = $('<span/>', {
                'class': saveButtonClass + ' save highlight-background',
                text: saveButtonText
            });

            // Populate the element
            controlRow.prepend(saveButton);
            textareaWrapper.append(closeButton).append(textarea).append(controlRow);
            commentingField.append(profilePicture).append(textareaWrapper);


            if(parentId) {

                // Set the parent id to the field if necessary
                textarea.attr('data-parent', parentId);

                // Append reply-to badge if necessary
                var parentModel = this.commentsById[parentId];
                if(parentModel.parent) {
                    textarea.html('&nbsp;');    // Needed to set the cursor to correct place

                    // Creating the reply-to badge
                    var replyToBadge = $('<input/>', {
                        'class': 'reply-to-badge highlight-font-bold',
                        type: 'button'
                    });
                    var replyToName = '@' + parentModel.fullname;
                    replyToBadge.val(replyToName);
                    textarea.prepend(replyToBadge);
                }
            }

            return commentingField;
        },

        createNavigationElement: function() {
            var navigationEl = $('<ul/>', {
                'class': 'navigation'
            });
            var navigationWrapper = $('<div/>', {
                'class': 'navigation-wrapper'
            });
            navigationEl.append(navigationWrapper);

            // Newest
            var newest = $('<li/>', {
                text: this.options.textFormatter(this.options.newestText),
                'data-sort-key': 'newest',
                'data-container-name': 'comments'
            });

            // Oldest
            var oldest = $('<li/>', {
                text: this.options.textFormatter(this.options.oldestText),
                'data-sort-key': 'oldest',
                'data-container-name': 'comments'
            });

            // Popular
            var popular = $('<li/>', {
                text: this.options.textFormatter(this.options.popularText),
                'data-sort-key': 'popularity',
                'data-container-name': 'comments'
            });

            // Attachments
            var attachments = $('<li/>', {
                text: this.options.textFormatter(this.options.attachmentsText),
                'data-sort-key': 'attachments',
                'data-container-name': 'attachments'
            });

            // Attachments icon
            var attachmentsIcon = $('<i/>', {
                'class': 'fa fa-paperclip'
            });
            if(this.options.attachmentIconURL.length) {
                attachmentsIcon.css('background-image', 'url("'+this.options.attachmentIconURL+'")');
                attachmentsIcon.addClass('image');
            }
            attachments.prepend(attachmentsIcon);


            // Responsive navigation
            var dropdownNavigationWrapper = $('<div/>', {
                'class': 'navigation-wrapper responsive'
            });
            var dropdownNavigation = $('<ul/>', {
                'class': 'dropdown'
            });
            var dropdownTitle = $('<li/>', {
                'class': 'title'
            });
            var dropdownTitleHeader = $('<header/>');

            dropdownTitle.append(dropdownTitleHeader);
            dropdownNavigationWrapper.append(dropdownTitle);
            dropdownNavigationWrapper.append(dropdownNavigation);
            navigationEl.append(dropdownNavigationWrapper);


            // Populate elements
            navigationWrapper.append(newest).append(oldest);
            dropdownNavigation.append(newest.clone()).append(oldest.clone());

            if(this.options.enableReplying || this.options.enableUpvoting) {
                navigationWrapper.append(popular);
                dropdownNavigation.append(popular.clone());
            }
            if(this.options.enableAttachments) {
                navigationWrapper.append(attachments);
                dropdownNavigationWrapper.append(attachments.clone());
            }

            if(this.options.forceResponsive) this.forceResponsive();
            return navigationEl;
        },

        createSpinner: function() {
            var spinner = $('<div/>', {
                'class': 'spinner'
            });
            var spinnerIcon = $('<i/>', {
                'class': 'fa fa-spinner fa-spin'
            });
            if(this.options.spinnerIconURL.length) {
                spinnerIcon.css('background-image', 'url("'+this.options.spinnerIconURL+'")');
                spinnerIcon.addClass('image');
            }
            spinner.html(spinnerIcon);
            return spinner;
        },

        createCommentElement: function(commentModel) {

            // Comment container element
            var commentEl = $('<li/>', {
                'data-id': commentModel.id,
                'class': 'comment'
            }).data('model', commentModel);

            if(commentModel.createdByCurrentUser) commentEl.addClass('by-current-user');
            if(commentModel.createdByAdmin) commentEl.addClass('by-admin');

            // Child comments
            var childComments = $('<ul/>', {
                'class': 'child-comments'
            });

            // Comment wrapper
            var commentWrapper = this.createCommentWrapperElement(commentModel);

            commentEl.append(commentWrapper);
            if(commentModel.parent == null) commentEl.append(childComments);
            return commentEl;
        },

        createCommentWrapperElement: function(commentModel) {
            var commentWrapper = $('<div/>', {
                'class': 'comment-wrapper'
            });

            // Profile picture
            var profilePicture = this.createProfilePictureElement(commentModel.profilePictureURL);

            // Time
            var time = $('<time/>', {
                text: this.options.timeFormatter(commentModel.created),
                'data-original': commentModel.created
            });

            // Name
            var nameText = commentModel.createdByCurrentUser ? this.options.textFormatter(this.options.youText) : commentModel.fullname;
            var name = $('<div/>', {
                'class': 'name'
            });
            if(commentModel.profileURL) {
                var link = $('<a/>', {
                    href: commentModel.profileURL,
                    text: nameText
                });
                name.html(link);
            } else {
                name.text(nameText);
            }

            // Highlight name for own comments and admin
            if(commentModel.createdByCurrentUser || commentModel.createdByAdmin) name.addClass('highlight-font-bold');

            // Show reply-to name if parent of parent exists
            if(commentModel.parent) {
                var parent = this.commentsById[commentModel.parent];
                if(parent.parent) {
                    var replyTo = $('<span/>', {
                        'class': 'reply-to',
                        text: parent.fullname
                    });

                    // reply icon
                    var replyIcon = $('<i/>', {
                        'class': 'fa fa-share'
                    });
                    if(this.options.replyIconURL.length) {
                        replyIcon.css('background-image', 'url("'+this.options.replyIconURL+'")');
                        replyIcon.addClass('image');
                    }

                    replyTo.prepend(replyIcon);
                    name.append(replyTo);
                }
            }

            // Wrapper
            var wrapper = $('<div/>', {
                'class': 'wrapper'
            });

            // Content
            var content = $('<div/>', {
                'class': 'content'
            });

            // Case: attachment
            var isAttachment = commentModel.fileURL != undefined;
            if(isAttachment) {
                var format = null;
                var type = null;

                // Type and format
                if(commentModel.fileMimeType) {
                    var mimeTypeParts = commentModel.fileMimeType.split('/');
                    if(mimeTypeParts.length == 2) {
                        format = mimeTypeParts[1];
                        type = mimeTypeParts[0];
                    }
                }

                // Attachment link
                var link = $('<a/>', {
                    'class': 'attachment',
                    href: commentModel.fileURL,
                    target: '_blank'
                });

                // Case: image preview
                if(type == 'image') {
                    var image = $('<img/>', {
                        src: commentModel.fileURL
                    });
                    link.html(image);

                // Case: video preview
                } else if(type == 'video') {
                    var video = $('<video/>', {
                        src: commentModel.fileURL,
                        type: commentModel.fileMimeType,
                        controls: 'controls'
                    });
                    link.html(video);

                // Case: icon and text
                } else {

                    // Icon
                    var availableIcons = ['archive', 'audio', 'code', 'excel', 'image', 'movie', 'pdf', 'photo',
                        'picture', 'powerpoint', 'sound', 'video', 'word', 'zip'];

                    var iconClass = 'fa fa-file-o';
                    if(availableIcons.indexOf(format) > 0) {
                        iconClass = 'fa fa-file-' + format + '-o';
                    } else if(availableIcons.indexOf(type) > 0) {
                        iconClass = 'fa fa-file-' + type + '-o';
                    }

                    var fileIcon = $('<i/>', {
                        'class': iconClass
                    });
                    if(this.options.fileIconURL.length) {
                        fileIcon.css('background-image', 'url("'+this.options.fileIconURL+'")');
                        fileIcon.addClass('image');
                    }

                    // File name
                    var parts = commentModel.fileURL.split('/');
                    var fileName = parts[parts.length - 1];
                    fileName = fileName.split('?')[0];
                    fileName = decodeURIComponent(fileName);

                    link.text(fileName);
                    link.prepend(fileIcon);
                }
                content.html(link);

            // Case: regular comment
            } else {
                content.html(this.linkify(this.escape(commentModel.content)));
            }

            // Edited timestamp
            if(commentModel.modified && commentModel.modified != commentModel.created) {
                var editedTime = this.options.timeFormatter(commentModel.modified);
                var edited = $('<time/>', {
                    'class': 'edited',
                    text: this.options.textFormatter(this.options.editedText) + ' ' + editedTime,
                    'data-original': commentModel.modified
                });
                content.append(edited);
            }

            // Actions
            var actions = $('<span/>', {
                'class': 'actions'
            });

            // Separator
            var separator = $('<span/>', {
                'class': 'separator',
                text: '·'
            });

            // Reply
            var reply = $('<button/>', {
                'class': 'action reply',
                'type': 'button',
                text: this.options.textFormatter(this.options.replyText)
            });

            // Upvote icon
            var upvoteIcon = $('<i/>', {
                'class': 'fa fa-thumbs-up'
            });
            if(this.options.upvoteIconURL.length) {
                upvoteIcon.css('background-image', 'url("'+this.options.upvoteIconURL+'")');
                upvoteIcon.addClass('image');
            }

            // Upvotes
            var upvotes = this.createUpvoteElement(commentModel);

            // Append buttons for actions that are enabled
            if(this.options.enableReplying) actions.append(reply);
            if(this.options.enableUpvoting) actions.append(upvotes);

            if(commentModel.createdByCurrentUser || this.options.currentUserIsAdmin) {

                // Case: delete button for attachment
                if(isAttachment && this.isAllowedToDelete(commentModel.id)) {
                    var deleteButton = $('<button/>', {
                        'class': 'action delete enabled',
                        text: this.options.textFormatter(this.options.deleteText)
                    });
                    actions.append(deleteButton);

                // Case: edit button for regular comment
                } else if(!isAttachment && this.options.enableEditing) {
                    var editButton = $('<button/>', {
                        'class': 'action edit',
                        text: this.options.textFormatter(this.options.editText)
                    });
                    actions.append(editButton);
                }
            }

            // Append separators between the actions
            actions.children().each(function(index, actionEl) {
                if(!$(actionEl).is(':last-child')) {
                    $(actionEl).after(separator.clone());
                }
            });

            wrapper.append(content);
            wrapper.append(actions);
            commentWrapper.append(profilePicture).append(time).append(name).append(wrapper);
            return commentWrapper;
        },

        createUpvoteElement: function(commentModel) {
            // Upvote icon
            var upvoteIcon = $('<i/>', {
                'class': 'fa fa-thumbs-up'
            });
            if(this.options.upvoteIconURL.length) {
                upvoteIcon.css('background-image', 'url("'+this.options.upvoteIconURL+'")');
                upvoteIcon.addClass('image');
            }

            // Upvotes
            var upvoteEl = $('<button/>', {
                'class': 'action upvote' + (commentModel.userHasUpvoted ? ' highlight-font' : '')
            }).append($('<span/>', {
                text: commentModel.upvoteCount,
                'class': 'upvote-count'
            })).append(upvoteIcon);

            return upvoteEl;
        },

        reRenderComment: function(id) {
            var commentModel = this.commentsById[id];
            var commentElements = this.$el.find('li.comment[data-id="'+commentModel.id+'"]');

            var self = this;
            commentElements.each(function(index, commentEl) {
                var commentWrapper = self.createCommentWrapperElement(commentModel);
                $(commentEl).find('.comment-wrapper').first().replaceWith(commentWrapper);
            });
        },

        reRenderCommentActionBar: function(id) {
            var commentModel = this.commentsById[id];
            var commentElements = this.$el.find('li.comment[data-id="'+commentModel.id+'"]');

            var self = this;
            commentElements.each(function(index, commentEl) {
                var commentWrapper = self.createCommentWrapperElement(commentModel);
                $(commentEl).find('.actions').first().replaceWith(commentWrapper.find('.actions'));
            });
        },

        reRenderUpvotes: function(id) {
            var commentModel = this.commentsById[id];
            var commentElements = this.$el.find('li.comment[data-id="'+commentModel.id+'"]');

            var self = this;
            commentElements.each(function(index, commentEl) {
                var upvotes = self.createUpvoteElement(commentModel);
                $(commentEl).find('.upvote').first().replaceWith(upvotes);
            });
        },


        // Styling
        // =======

        createCssDeclarations: function() {

            // Remove previous css-declarations
            $('head style.jquery-comments-css').remove();

            // Navigation underline
            this.createCss('.jquery-comments ul.navigation li.active:after {background: '
                + this.options.highlightColor  + ' !important;',
                +'}');

            // Dropdown active element
            this.createCss('.jquery-comments ul.navigation ul.dropdown li.active {background: '
                + this.options.highlightColor  + ' !important;',
                +'}');

            // Background highlight
            this.createCss('.jquery-comments .highlight-background {background: '
                + this.options.highlightColor  + ' !important;',
                +'}');

            // Font highlight
            this.createCss('.jquery-comments .highlight-font {color: '
                + this.options.highlightColor + ' !important;'
                +'}');
            this.createCss('.jquery-comments .highlight-font-bold {color: '
                + this.options.highlightColor + ' !important;'
                + 'font-weight: bold;'
                +'}');
        },

        createCss: function(css) {
            var styleEl = $('<style/>', {
                type: 'text/css',
                'class': 'jquery-comments-css',
                text: css
            });
            $('head').append(styleEl);
        },


        // Utilities
        // =========

        getComments: function() {
            var self = this;
            return Object.keys(this.commentsById).map(function(id){return self.commentsById[id]});
        },

        getChildComments: function(parentId) {
            return this.getComments().filter(function(comment){return comment.parent == parentId});
        },

        getAttachments: function() {
            return this.getComments().filter(function(comment){return comment.fileURL != undefined});
        },

        getOutermostParent: function(directParentId) {
            var parentId = directParentId;
            do {
                var parentComment = this.commentsById[parentId];
                parentId = parentComment.parent;
            } while(parentComment.parent != null);
            return parentComment;
        },

        createCommentJSON: function(textarea) {
            var time = new Date().toISOString();
            var commentJSON = {
                id: 'c' +  (this.getComments().length + 1),   // Temporary id
                parent: textarea.attr('data-parent') || null,
                created: time,
                modified: time,
                content: this.getTextareaContent(textarea),
                fullname: this.options.textFormatter(this.options.youText),
                profilePictureURL: this.options.profilePictureURL,
                createdByCurrentUser: true,
                upvoteCount: 0,
                userHasUpvoted: false
            };
            return commentJSON;
        },

        isAllowedToDelete: function(commentId) {
            if(this.options.enableDeleting) {
                var isAllowedToDelete = true;
                if(!this.options.enableDeletingCommentWithReplies) {
                    $(this.getComments()).each(function(index, comment) {
                        if(comment.parent == commentId) isAllowedToDelete = false;
                    });
                }
                return isAllowedToDelete;
            }
            return false;
        },

        setToggleAllButtonText: function(toggleAllButton, toggle) {
            var self = this;
            var textContainer = toggleAllButton.find('span.text');
            var caret = toggleAllButton.find('.caret');

            var showExpandingText = function() {
                var text = self.options.textFormatter(self.options.viewAllRepliesText);
                var replyCount = toggleAllButton.siblings('.comment').length;
                text = text.replace('__replyCount__', replyCount);
                textContainer.text(text);
            };

            var hideRepliesText = this.options.textFormatter(this.options.hideRepliesText);

            if(toggle) {

                // Toggle text
                if(textContainer.text() == hideRepliesText) {
                    showExpandingText();
                } else {
                    textContainer.text(hideRepliesText);
                }
                // Toggle direction of the caret
                caret.toggleClass('up');

            } else {

                // Update text if necessary
                if(textContainer.text() != hideRepliesText) {
                    showExpandingText();
                }
            }
        },

        adjustTextareaHeight: function(textarea, focus) {
            var textareaBaseHeight = 2.2;
            var lineHeight = 1.45;

            var setRows = function(rows) {
                var height = textareaBaseHeight + (rows - 1) * lineHeight;
                textarea.css('height', height + 'em');
            };

            textarea = $(textarea);
            var rowCount = focus == true ? this.options.textareaRowsOnFocus : this.options.textareaRows;
            do {
                setRows(rowCount);
                rowCount++;
                var isAreaScrollable = textarea[0].scrollHeight > textarea.outerHeight();
                var maxRowsUsed = this.options.textareaMaxRows == false ?
                    false : rowCount > this.options.textareaMaxRows;
            } while(isAreaScrollable && !maxRowsUsed);
        },

        clearTextarea: function(textarea) {
            textarea.empty().trigger('input');
        },

        getTextareaContent: function(textarea) {
            var ce = $('<pre/>').html(textarea.html());
            ce.find('div, p, br').replaceWith(function() { return '\n' + this.innerHTML; });

            // Trim leading spaces
            var text = ce.text().replace(/^\s+/g, '');
            return text;
        },

        getTextareaContentAsEscapedHTML: function(html) {
            // Escaping HTML except the new lines
            var escaped = this.escape(html);
            return escaped.replace(/(?:\n)/g, '<br>');
        },

        moveCursorToEnd: function(el) {
            el = $(el)[0];

            // Trigger input to adjust size
            $(el).trigger('input');

            // Scroll to bottom
            $(el).scrollTop(el.scrollHeight);

            // Move cursor to end
            if (typeof window.getSelection != 'undefined' && typeof document.createRange != 'undefined') {
                var range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (typeof document.body.createTextRange != 'undefined') {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(el);
                textRange.collapse(false);
                textRange.select();
            }

            // Focus
            el.focus();
        },

        escape: function(inputText) {
            return $('<pre/>').text(inputText).html();
        },

        linkify: function(inputText) {
            var replacedText, replacePattern1, replacePattern2, replacePattern3;

            // URLs starting with http://, https://, file:// or ftp://
            replacePattern1 = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
            replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

            // URLs starting with "www." (without // before it, or it'd re-link the ones done above).
            replacePattern2 = /(^|[^\/f])(www\.[\S]+(\b|$))/gim;
            replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

            // Change email addresses to mailto:: links.
            replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
            replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

            // If there are hrefs in the original text, let's split
            // the text up and only work on the parts that don't have urls yet.
            var count = inputText.match(/<a href/g) || [];

            if(count.length > 0){
                // Keep delimiter when splitting
                var splitInput = inputText.split(/(<\/a>)/g);
                for (var i = 0 ; i < splitInput.length ; i++){
                    if(splitInput[i].match(/<a href/g) == null){
                        splitInput[i] = splitInput[i].replace(replacePattern1, '<a href="$1" target="_blank">$1</a>').replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>').replace(replacePattern3, '<a href="mailto:$1">$1</a>');
                    }
                }
                var combinedReplacedText = splitInput.join('');
                return combinedReplacedText;
            } else {
                return replacedText;
            }
        },

        applyInternalMappings: function(commentJSON) {

            // Inverting field mappings
            var invertedMappings = {};
            var mappings = this.options.fieldMappings;
            for (var prop in mappings) {
                if(mappings.hasOwnProperty(prop)) {
                    invertedMappings[mappings[prop]] = prop;
                }
            }

            return this.applyMappings(invertedMappings, commentJSON);
        },

        applyExternalMappings: function(commentJSON) {
            var mappings = this.options.fieldMappings;
            return this.applyMappings(mappings, commentJSON);
        },

        applyMappings: function(mappings, commentJSON) {
            var result = {};

            for(var key1 in commentJSON) {
                if(key1 in mappings) {
                    var key2 = mappings[key1];
                    result[key2] = commentJSON[key1];
                }
            }
            return result;
        }

    };

    $.fn.comments = function(options) {
        return this.each(function() {
            var comments = Object.create(Comments);
            comments.init(options || {}, this);
            $.data(this, 'comments', comments);
        });
    };
}));
/* ========================================================================
 * Bootstrap (plugin): validator.js v0.10.2
 * ========================================================================
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Cina Saffary.
 * Made by @1000hz in the style of Bootstrap 3 era @fat
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * ======================================================================== */


+function ($) {
  'use strict';

  // VALIDATOR CLASS DEFINITION
  // ==========================

  function getValue($el) {
    return $el.is('[type="checkbox"]') ? $el.prop('checked')                                     :
           $el.is('[type="radio"]')    ? !!$('[name="' + $el.attr('name') + '"]:checked').length :
                                         $.trim($el.val())
  }

  var Validator = function (element, options) {
    this.options  = options
    this.$element = $(element)
    this.$inputs  = this.$element.find(Validator.INPUT_SELECTOR)
    this.$btn     = $('button[type="submit"], input[type="submit"]')
                      .filter('[form="' + this.$element.attr('id') + '"]')
                      .add(this.$element.find('input[type="submit"], button[type="submit"]'))

    options.errors = $.extend({}, Validator.DEFAULTS.errors, options.errors)

    for (var custom in options.custom) {
      if (!options.errors[custom]) throw new Error('Missing default error message for custom validator: ' + custom)
    }

    $.extend(Validator.VALIDATORS, options.custom)

    this.$element.attr('novalidate', true) // disable automatic native validation
    this.toggleSubmit()

    this.$element.on('input.bs.validator change.bs.validator focusout.bs.validator', Validator.INPUT_SELECTOR, $.proxy(this.onInput, this))
    this.$element.on('submit.bs.validator', $.proxy(this.onSubmit, this))

    this.$element.find('[data-match]').each(function () {
      var $this  = $(this)
      var target = $this.data('match')

      $(target).on('input.bs.validator', function (e) {
        getValue($this) && $this.trigger('input.bs.validator')
      })
    })
  }

  Validator.INPUT_SELECTOR = ':input:not([type="submit"], button):enabled:visible'

  Validator.FOCUS_OFFSET = 20

  Validator.DEFAULTS = {
    delay: 500,
    html: false,
    disable: true,
    focus: true,
    custom: {},
    errors: {
      match: 'Does not match',
      minlength: 'Not long enough'
    },
    feedback: {
      success: 'glyphicon-ok',
      error: 'glyphicon-remove'
    }
  }

  Validator.VALIDATORS = {
    'native': function ($el) {
      var el = $el[0]
      return el.checkValidity ? el.checkValidity() : true
    },
    'match': function ($el) {
      var target = $el.data('match')
      return !$el.val() || $el.val() === $(target).val()
    },
    'minlength': function ($el) {
      var minlength = $el.data('minlength')
      return !$el.val() || $el.val().length >= minlength
    }
  }

  Validator.prototype.onInput = function (e) {
    var self        = this
    var $el         = $(e.target)
    var deferErrors = e.type !== 'focusout'
    this.validateInput($el, deferErrors).done(function () {
      self.toggleSubmit()
    })
  }

  Validator.prototype.validateInput = function ($el, deferErrors) {
    var value      = getValue($el)
    var prevValue  = $el.data('bs.validator.previous')
    var prevErrors = $el.data('bs.validator.errors')
    var errors

    if (prevValue === value) return $.Deferred().resolve()
    else $el.data('bs.validator.previous', value)

    if ($el.is('[type="radio"]')) $el = this.$element.find('input[name="' + $el.attr('name') + '"]')

    var e = $.Event('validate.bs.validator', {relatedTarget: $el[0]})
    this.$element.trigger(e)
    if (e.isDefaultPrevented()) return

    var self = this

    return this.runValidators($el).done(function (errors) {
      $el.data('bs.validator.errors', errors)

      errors.length
        ? deferErrors ? self.defer($el, self.showErrors) : self.showErrors($el)
        : self.clearErrors($el)

      if (!prevErrors || errors.toString() !== prevErrors.toString()) {
        e = errors.length
          ? $.Event('invalid.bs.validator', {relatedTarget: $el[0], detail: errors})
          : $.Event('valid.bs.validator', {relatedTarget: $el[0], detail: prevErrors})

        self.$element.trigger(e)
      }

      self.toggleSubmit()

      self.$element.trigger($.Event('validated.bs.validator', {relatedTarget: $el[0]}))
    })
  }


  Validator.prototype.runValidators = function ($el) {
    var errors   = []
    var deferred = $.Deferred()
    var options  = this.options

    $el.data('bs.validator.deferred') && $el.data('bs.validator.deferred').reject()
    $el.data('bs.validator.deferred', deferred)

    function getErrorMessage(key) {
      return $el.data(key + '-error')
        || $el.data('error')
        || key == 'native' && $el[0].validationMessage
        || options.errors[key]
    }

    $.each(Validator.VALIDATORS, $.proxy(function (key, validator) {
      if ((getValue($el) || $el.attr('required')) &&
          ($el.data(key) || key == 'native') &&
          !validator.call(this, $el)) {
        var error = getErrorMessage(key)
        !~errors.indexOf(error) && errors.push(error)
      }
    }, this))

    if (!errors.length && getValue($el) && $el.data('remote')) {
      this.defer($el, function () {
        var data = {}
        data[$el.attr('name')] = getValue($el)
        $.get($el.data('remote'), data)
          .fail(function (jqXHR, textStatus, error) { errors.push(getErrorMessage('remote') || error) })
          .always(function () { deferred.resolve(errors)})
      })
    } else deferred.resolve(errors)

    return deferred.promise()
  }

  Validator.prototype.validate = function () {
    var self = this

    $.when(this.$inputs.map(function (el) {
      return self.validateInput($(this), false)
    })).then(function () {
      self.toggleSubmit()
      self.focusError()
    })

    return this
  }

  Validator.prototype.focusError = function () {
    if (!this.options.focus) return

    var $input = $(".has-error:first :input")
    if ($input.length === 0) return

    $(document.body).animate({scrollTop: $input.offset().top - Validator.FOCUS_OFFSET}, 250)
    $input.focus()
  }

  Validator.prototype.showErrors = function ($el) {
    var method = this.options.html ? 'html' : 'text'
    var errors = $el.data('bs.validator.errors')
    var $group = $el.closest('.form-group')
    var $block = $group.find('.help-block.with-errors')
    var $feedback = $group.find('.form-control-feedback')

    if (!errors.length) return

    errors = $('<ul/>')
      .addClass('list-unstyled')
      .append($.map(errors, function (error) { return $('<li/>')[method](error) }))

    $block.data('bs.validator.originalContent') === undefined && $block.data('bs.validator.originalContent', $block.html())
    $block.empty().append(errors)
    $group.addClass('has-error has-danger')

    $group.hasClass('has-feedback')
      && $feedback.removeClass(this.options.feedback.success)
      && $feedback.addClass(this.options.feedback.error)
      && $group.removeClass('has-success')
  }

  Validator.prototype.clearErrors = function ($el) {
    var $group = $el.closest('.form-group')
    var $block = $group.find('.help-block.with-errors')
    var $feedback = $group.find('.form-control-feedback')

    $block.html($block.data('bs.validator.originalContent'))
    $group.removeClass('has-error has-danger')

    $group.hasClass('has-feedback')
      && $feedback.removeClass(this.options.feedback.error)
      && getValue($el)
      && $feedback.addClass(this.options.feedback.success)
      && $group.addClass('has-success')
  }

  Validator.prototype.hasErrors = function () {
    function fieldErrors() {
      return !!($(this).data('bs.validator.errors') || []).length
    }

    return !!this.$inputs.filter(fieldErrors).length
  }

  Validator.prototype.isIncomplete = function () {
    function fieldIncomplete() {
      return !getValue($(this))
    }

    return !!this.$inputs.filter('[required]').filter(fieldIncomplete).length
  }

  Validator.prototype.onSubmit = function (e) {
    this.validate()
    if (this.isIncomplete() || this.hasErrors()) e.preventDefault()
  }

  Validator.prototype.toggleSubmit = function () {
    if (!this.options.disable) return
    this.$btn.toggleClass('disabled', this.isIncomplete() || this.hasErrors())
  }

  Validator.prototype.defer = function ($el, callback) {
    callback = $.proxy(callback, this, $el)
    if (!this.options.delay) return callback()
    window.clearTimeout($el.data('bs.validator.timeout'))
    $el.data('bs.validator.timeout', window.setTimeout(callback, this.options.delay))
  }

  Validator.prototype.destroy = function () {
    this.$element
      .removeAttr('novalidate')
      .removeData('bs.validator')
      .off('.bs.validator')
      .find('.form-control-feedback')
        .removeClass([this.options.feedback.error, this.options.feedback.success].join(' '))

    this.$inputs
      .off('.bs.validator')
      .removeData(['bs.validator.errors', 'bs.validator.deferred', 'bs.validator.previous'])
      .each(function () {
        var $this = $(this)
        var timeout = $this.data('bs.validator.timeout')
        window.clearTimeout(timeout) && $this.removeData('bs.validator.timeout')
      })

    this.$element.find('.help-block.with-errors').each(function () {
      var $this = $(this)
      var originalContent = $this.data('bs.validator.originalContent')

      $this
        .removeData('bs.validator.originalContent')
        .html(originalContent)
    })

    this.$element.find('input[type="submit"], button[type="submit"]').removeClass('disabled')

    this.$element.find('.has-error, .has-danger').removeClass('has-error has-danger')

    return this
  }

  // VALIDATOR PLUGIN DEFINITION
  // ===========================


  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var options = $.extend({}, Validator.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var data    = $this.data('bs.validator')

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.validator', (data = new Validator(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.validator

  $.fn.validator             = Plugin
  $.fn.validator.Constructor = Validator


  // VALIDATOR NO CONFLICT
  // =====================

  $.fn.validator.noConflict = function () {
    $.fn.validator = old
    return this
  }


  // VALIDATOR DATA-API
  // ==================

  $(window).on('load', function () {
    $('form[data-toggle="validator"]').each(function () {
      var $form = $(this)
      Plugin.call($form, $form.data())
    })
  })

}(jQuery);

/*!
 * @copyright Copyright &copy; Kartik Visweswaran, Krajee.com, 2014 - 2015
 * @version 4.3.2
 *
 * File input styled for Bootstrap 3.0 that utilizes HTML5 File Input's advanced features including the FileReader API.
 *
 * The plugin drastically enhances the HTML file input to preview multiple files on the client before upload. In
 * addition it provides the ability to preview content of images, text, videos, audio, html, flash and other objects.
 * It also offers the ability to upload and delete files using AJAX, and add files in batches (i.e. preview, append,
 * or remove before upload).
 *
 * Author: Kartik Visweswaran
 * Copyright: 2015, Kartik Visweswaran, Krajee.com
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
(function (factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) { // jshint ignore:line
        // AMD. Register as an anonymous module.
        define(['jquery'], factory); // jshint ignore:line
    } else { // noinspection JSUnresolvedVariable
        if (typeof module === 'object' && module.exports) { // jshint ignore:line
            // Node/CommonJS
            // noinspection JSUnresolvedVariable
            module.exports = factory(require('jquery')); // jshint ignore:line
        } else {
            // Browser globals
            factory(window.jQuery);
        }
    }
}(function ($) {
    "use strict";

    $.fn.fileinputLocales = {};

    var NAMESPACE, objUrl, compare, isIE, isEdge, handler, previewCache, getNum, hasFileAPISupport, hasDragDropSupport,
        hasFileUploadSupport, addCss, STYLE_SETTING, OBJECT_PARAMS, DEFAULT_PREVIEW, defaultFileActionSettings, tMain1,
        tMain2, tPreview, tIcon, tClose, tCaption, tBtnDefault, tBtnLink, tBtnBrowse, tModal, tProgress, tFooter,
        tActions, tActionDelete, tActionUpload, tZoom, tGeneric, tHtml, tImage, tText, tVideo, tAudio, tFlash, tObject,
        tOther, defaultLayoutTemplates, defaultPreviewTemplates, defaultPreviewTypes, defaultPreviewSettings, FileInput,
        defaultFileTypeSettings, isEmpty, isArray, isSet, getElement, uniqId, htmlEncode, replaceTags, cleanMemory;

    NAMESPACE = '.fileinput';
    //noinspection JSUnresolvedVariable
    objUrl = window.URL || window.webkitURL;
    compare = function (input, str, exact) {
        return input !== undefined && (exact ? input === str : input.match(str));
    };
    isIE = function (ver) {
        // check for IE versions < 11
        if (navigator.appName !== 'Microsoft Internet Explorer') {
            return false;
        }
        if (ver === 10) {
            return new RegExp('msie\\s' + ver, 'i').test(navigator.userAgent);
        }
        var div = document.createElement("div"), status;
        div.innerHTML = "<!--[if IE " + ver + "]> <i></i> <![endif]-->";
        status = div.getElementsByTagName("i").length;
        document.body.appendChild(div);
        div.parentNode.removeChild(div);
        return status;
    };
    isEdge = function () {
        return new RegExp('Edge\/[0-9]+', 'i').test(navigator.userAgent);
    };
    handler = function ($el, event, callback, skipNS) {
        var ev = skipNS ? event : event.split(' ').join(NAMESPACE + ' ') + NAMESPACE;
        $el.off(ev).on(ev, callback);
    };
    previewCache = {
        data: {},
        init: function (obj) {
            var content = obj.initialPreview, id = obj.id;
            if (content.length > 0 && !isArray(content)) {
                content = content.split(obj.initialPreviewDelimiter);
            }
            previewCache.data[id] = {
                content: content,
                config: obj.initialPreviewConfig,
                tags: obj.initialPreviewThumbTags,
                delimiter: obj.initialPreviewDelimiter,
                template: obj.previewGenericTemplate,
                msg: function (n) {
                    return obj._getMsgSelected(n);
                },
                initId: obj.previewInitId,
                footer: obj._getLayoutTemplate('footer').replace(/\{progress}/g, obj._renderThumbProgress()),
                isDelete: obj.initialPreviewShowDelete,
                caption: obj.initialCaption,
                actions: function (showUpload, showDelete, disabled, url, key) {
                    return obj._renderFileActions(showUpload, showDelete, disabled, url, key);
                }
            };
        },
        fetch: function (id) {
            return previewCache.data[id].content.filter(function (n) {
                return n !== null;
            });
        },
        count: function (id, all) {
            return !!previewCache.data[id] && !!previewCache.data[id].content ?
                (all ? previewCache.data[id].content.length : previewCache.fetch(id).length) : 0;
        },
        get: function (id, i, isDisabled) {
            var ind = 'init_' + i, data = previewCache.data[id], config = data.config[i],
                previewId = data.initId + '-' + ind, out, $tmp, frameClass = ' file-preview-initial';
            /** @namespace config.frameClass */
            /** @namespace config.frameAttr */
            isDisabled = isDisabled === undefined ? true : isDisabled;
            if (data.content[i] === null) {
                return '';
            }
            if (!isEmpty(config) && !isEmpty(config.frameClass)) {
                frameClass += ' ' + config.frameClass;
            }
            out = data.template
                .replace(/\{previewId}/g, previewId)
                .replace(/\{frameClass}/g, frameClass)
                .replace(/\{fileindex}/g, ind)
                .replace(/\{content}/g, data.content[i])
                .replace(/\{footer}/g, previewCache.footer(id, i, isDisabled));
            if (data.tags.length && data.tags[i]) {
                out = replaceTags(out, data.tags[i]);
            }
            if (!isEmpty(config) && !isEmpty(config.frameAttr)) {
                $tmp = $(document.createElement('div')).html(out);
                $tmp.find('.file-preview-initial').attr(config.frameAttr);
                out = $tmp.html();
                $tmp.remove();
            }
            return out;
        },
        add: function (id, content, config, tags, append) {
            var data = $.extend(true, {}, previewCache.data[id]), index;
            if (!isArray(content)) {
                content = content.split(data.delimiter);
            }
            if (append) {
                index = data.content.push(content) - 1;
                data.config[index] = config;
                data.tags[index] = tags;
            } else {
                index = content.length - 1;
                data.content = content;
                data.config = config;
                data.tags = tags;
            }
            previewCache.data[id] = data;
            return index;
        },
        set: function (id, content, config, tags, append) {
            var data = $.extend(true, {}, previewCache.data[id]), i, chk;
            if (!content || !content.length) {
                return;
            }
            if (!isArray(content)) {
                content = content.split(data.delimiter);
            }
            chk = content.filter(function (n) {
                return n !== null;
            });
            if (!chk.length) {
                return;
            }
            if (data.content === undefined) {
                data.content = [];
            }
            if (data.config === undefined) {
                data.config = [];
            }
            if (data.tags === undefined) {
                data.tags = [];
            }
            if (append) {
                for (i = 0; i < content.length; i++) {
                    if (content[i]) {
                        data.content.push(content[i]);
                    }
                }
                for (i = 0; i < config.length; i++) {
                    if (config[i]) {
                        data.config.push(config[i]);
                    }
                }
                for (i = 0; i < tags.length; i++) {
                    if (tags[i]) {
                        data.tags.push(tags[i]);
                    }
                }
            } else {
                data.content = content;
                data.config = config;
                data.tags = tags;
            }
            previewCache.data[id] = data;
        },
        unset: function (id, index) {
            var chk = previewCache.count(id);
            if (!chk) {
                return;
            }
            if (chk === 1) {
                previewCache.data[id].content = [];
                previewCache.data[id].config = [];
                previewCache.data[id].tags = [];
                return;
            }
            previewCache.data[id].content[index] = null;
            previewCache.data[id].config[index] = null;
            previewCache.data[id].tags[index] = null;
        },
        out: function (id) {
            var html = '', data = previewCache.data[id], caption, len = previewCache.count(id, true);
            if (len === 0) {
                return {content: '', caption: ''};
            }
            for (var i = 0; i < len; i++) {
                html += previewCache.get(id, i);
            }
            caption = data.msg(previewCache.count(id));
            return {content: html, caption: caption};
        },
        footer: function (id, i, isDisabled) {
            var data = previewCache.data[id];
            isDisabled = isDisabled === undefined ? true : isDisabled;
            if (data.config.length === 0 || isEmpty(data.config[i])) {
                return '';
            }
            var config = data.config[i],
                caption = isSet('caption', config) ? config.caption : '',
                width = isSet('width', config) ? config.width : 'auto',
                url = isSet('url', config) ? config.url : false,
                key = isSet('key', config) ? config.key : null,
                disabled = (url === false) && isDisabled,
                actions = data.isDelete ? data.actions(false, true, disabled, url, key) : '',
                footer = data.footer.replace(/\{actions}/g, actions);
            return footer.replace(/\{caption}/g, caption)
                .replace(/\{width}/g, width)
                .replace(/\{indicator}/g, '')
                .replace(/\{indicatorTitle}/g, '');
        }
    };
    getNum = function (num, def) {
        def = def || 0;
        if (typeof num === "number") {
            return num;
        }
        if (typeof num === "string") {
            num = parseFloat(num);
        }
        return isNaN(num) ? def : num;
    };
    hasFileAPISupport = function () {
        return !!(window.File && window.FileReader);
    };
    hasDragDropSupport = function () {
        var div = document.createElement('div');
        /** @namespace div.draggable */
        /** @namespace div.ondragstart */
        /** @namespace div.ondrop */
        return !isIE(9) && !isEdge() && // Fix for MS Edge drag & drop support bug
            (div.draggable !== undefined || (div.ondragstart !== undefined && div.ondrop !== undefined));
    };
    hasFileUploadSupport = function () {
        return hasFileAPISupport() && window.FormData;
    };
    addCss = function ($el, css) {
        $el.removeClass(css).addClass(css);
    };
    STYLE_SETTING = 'style="width:{width};height:{height};"';
    OBJECT_PARAMS = '      <param name="controller" value="true" />\n' +
        '      <param name="allowFullScreen" value="true" />\n' +
        '      <param name="allowScriptAccess" value="always" />\n' +
        '      <param name="autoPlay" value="false" />\n' +
        '      <param name="autoStart" value="false" />\n' +
        '      <param name="quality" value="high" />\n';
    DEFAULT_PREVIEW = '<div class="file-preview-other">\n' +
        '   <span class="{previewFileIconClass}">{previewFileIcon}</span>\n' +
        '</div>';
    defaultFileActionSettings = {
        removeIcon: '<i class="glyphicon glyphicon-trash text-danger"></i>',
        removeClass: 'btn btn-xs btn-default',
        removeTitle: 'Remove file',
        uploadIcon: '<i class="glyphicon glyphicon-upload text-info"></i>',
        uploadClass: 'btn btn-xs btn-default',
        uploadTitle: 'Upload file',
        indicatorNew: '<i class="glyphicon glyphicon-hand-down text-warning"></i>',
        indicatorSuccess: '<i class="glyphicon glyphicon-ok-sign text-success"></i>',
        indicatorError: '<i class="glyphicon glyphicon-exclamation-sign text-danger"></i>',
        indicatorLoading: '<i class="glyphicon glyphicon-hand-up text-muted"></i>',
        indicatorNewTitle: 'Not uploaded yet',
        indicatorSuccessTitle: 'Uploaded',
        indicatorErrorTitle: 'Upload Error',
        indicatorLoadingTitle: 'Uploading ...'
    };
    tMain1 = '{preview}\n' +
        '<div class="kv-upload-progress hide"></div>\n' +
        '<div class="input-group {class}">\n' +
        '   {caption}\n' +
        '   <div class="input-group-btn">\n' +
        '       {remove}\n' +
        '       {cancel}\n' +
        '       {upload}\n' +
        '       {browse}\n' +
        '   </div>\n' +
        '</div>';
    tMain2 = '{preview}\n<div class="kv-upload-progress hide"></div>\n{remove}\n{cancel}\n{upload}\n{browse}\n';
    tPreview = '<div class="file-preview {class}">\n' +
        '    {close}' +
        '    <div class="{dropClass}">\n' +
        '    <div class="file-preview-thumbnails">\n' +
        '    </div>\n' +
        '    <div class="clearfix"></div>' +
        '    <div class="file-preview-status text-center text-success"></div>\n' +
        '    <div class="kv-fileinput-error"></div>\n' +
        '    </div>\n' +
        '</div>';
    tClose = '<div class="close fileinput-remove">&times;</div>\n';
    tIcon = '<span class="glyphicon glyphicon-file kv-caption-icon"></span>';
    tCaption = '<div tabindex="500" class="form-control file-caption {class}">\n' +
        '   <div class="file-caption-name"></div>\n' +
        '</div>\n';
    //noinspection HtmlUnknownAttribute
    tBtnDefault = '<button type="{type}" tabindex="500" title="{title}" class="{css}" {status}>{icon}{label}</button>';
    tBtnLink = '<a href="{href}" tabindex="500" title="{title}" class="{css}" {status}>{icon}{label}</a>';
    tBtnBrowse = '<div tabindex="500" class="{css}" {status}>{icon}{label}</div>';
    tModal = '<div id="{id}" class="file-preview-detail-modal modal fade" tabindex="-1">\n' +
        '  <div class="modal-dialog modal-lg">\n' +
        '    <div class="modal-content">\n' +
        '      <div class="modal-header">\n' +
        '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n' +
        '        <h3 class="modal-title">{heading} <small>{title}</small></h3>\n' +
        '      </div>\n' +
        '      <div class="modal-body">\n' +
        '           <pre>{body}</pre>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>';
    tProgress = '<div class="progress">\n' +
        '    <div class="{class}" role="progressbar"' +
        ' aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;">\n' +
        '        {percent}%\n' +
        '     </div>\n' +
        '</div>';
    tFooter = '<div class="file-thumbnail-footer">\n' +
        '    <div class="file-footer-caption" title="{caption}">{caption}</div>\n' +
        '    {progress} {actions}\n' +
        '</div>';
    tActions = '<div class="file-actions">\n' +
        '    <div class="file-footer-buttons">\n' +
        '        {upload}{delete}{other}' +
        '    </div>\n' +
        '    <div class="file-upload-indicator" title="{indicatorTitle}">{indicator}</div>\n' +
        '    <div class="clearfix"></div>\n' +
        '</div>';
    tActionDelete = '<button type="button" class="kv-file-remove {removeClass}" ' +
        'title="{removeTitle}" {dataUrl}{dataKey}>{removeIcon}</button>\n';
    tActionUpload = '<button type="button" class="kv-file-upload {uploadClass}" title="{uploadTitle}">' +
        '   {uploadIcon}\n</button>\n';
    tZoom = '<button type="button" class="btn btn-default btn-xs btn-block" title="{zoomTitle}: {caption}" onclick="{dialog}">\n' +
        '   {zoomInd}\n' +
        '</button>\n';
    tGeneric = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n' +
        '   {content}\n' +
        '   {footer}\n' +
        '</div>\n';
    tHtml = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n' +
        '    <object class="file-object" data="{data}" type="{type}" width="{width}" height="{height}">\n' +
        '       ' + DEFAULT_PREVIEW + '\n' +
        '    </object>\n' +
        '   {footer}\n' +
        '</div>';
    tImage = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n' +
        '   <img src="{data}" class="file-preview-image" title="{caption}" alt="{caption}" ' + STYLE_SETTING + '>\n' +
        '   {footer}\n' +
        '</div>\n';
    tText = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}">\n' +
        '   <pre class="file-preview-text" title="{caption}" ' + STYLE_SETTING + '>{data}</pre>\n' +
        '   {zoom}\n' +
        '   {footer}\n' +
        '</div>';
    tVideo = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}"' +
        ' title="{caption}" ' + STYLE_SETTING + '>\n' +
        '   <video width="{width}" height="{height}" controls>\n' +
        '       <source src="{data}" type="{type}">\n' +
        '       ' + DEFAULT_PREVIEW + '\n' +
        '   </video>\n' +
        '   {footer}\n' +
        '</div>\n';
    tAudio = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}"' +
        ' title="{caption}" ' + STYLE_SETTING + '>\n' +
        '   <audio controls>\n' +
        '       <source src="' + '{data}' + '" type="{type}">\n' +
        '       ' + DEFAULT_PREVIEW + '\n' +
        '   </audio>\n' +
        '   {footer}\n' +
        '</div>';
    tFlash = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}"' +
        ' title="{caption}" ' + STYLE_SETTING + '>\n' +
        '   <object class="file-object" type="application/x-shockwave-flash" width="{width}" height="{height}" data="{data}">\n' +
        OBJECT_PARAMS + '       ' + DEFAULT_PREVIEW + '\n' +
        '   </object>\n' +
        '   {footer}\n' +
        '</div>\n';
    tObject = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}"' +
        ' title="{caption}" ' + STYLE_SETTING + '>\n' +
        '   <object class="file-object" data="{data}" type="{type}" width="{width}" height="{height}">\n' +
        '       <param name="movie" value="{caption}" />\n' +
        OBJECT_PARAMS + '         ' + DEFAULT_PREVIEW + '\n' +
        '   </object>\n' +
        '   {footer}\n' +
        '</div>';
    tOther = '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}"' +
        ' title="{caption}" ' + STYLE_SETTING + '>\n' +
        '   <div class="file-preview-other-frame">\n' +
        '   ' + DEFAULT_PREVIEW + '\n' +
        '   </div>\n' +
        '   <div class="file-preview-other-footer">{footer}</div>\n' +
        '</div>';
    defaultLayoutTemplates = {
        main1: tMain1,
        main2: tMain2,
        preview: tPreview,
        close: tClose,
        zoom: tZoom,
        icon: tIcon,
        caption: tCaption,
        modal: tModal,
        progress: tProgress,
        footer: tFooter,
        actions: tActions,
        actionDelete: tActionDelete,
        actionUpload: tActionUpload,
        btnDefault: tBtnDefault,
        btnLink: tBtnLink,
        btnBrowse: tBtnBrowse
    };
    defaultPreviewTemplates = {
        generic: tGeneric,
        html: tHtml,
        image: tImage,
        text: tText,
        video: tVideo,
        audio: tAudio,
        flash: tFlash,
        object: tObject,
        other: tOther
    };
    defaultPreviewTypes = ['image', 'html', 'text', 'video', 'audio', 'flash', 'object'];
    defaultPreviewSettings = {
        image: {width: "auto", height: "160px"},
        html: {width: "213px", height: "160px"},
        text: {width: "160px", height: "136px"},
        video: {width: "213px", height: "160px"},
        audio: {width: "213px", height: "80px"},
        flash: {width: "213px", height: "160px"},
        object: {width: "160px", height: "160px"},
        other: {width: "160px", height: "160px"}
    };
    defaultFileTypeSettings = {
        image: function (vType, vName) {
            return compare(vType, 'image.*') || compare(vName, /\.(gif|png|jpe?g)$/i);
        },
        html: function (vType, vName) {
            return compare(vType, 'text/html') || compare(vName, /\.(htm|html)$/i);
        },
        text: function (vType, vName) {
            return compare(vType, 'text.*') || compare(vType, /\.(xml|javascript)$/i) ||
                compare(vName, /\.(txt|md|csv|nfo|ini|json|php|js|css)$/i);
        },
        video: function (vType, vName) {
            return compare(vType, 'video.*') && (compare(vType, /(ogg|mp4|mp?g|webm|3gp)$/i) ||
                compare(vName, /\.(og?|mp4|webm|mp?g|3gp)$/i));
        },
        audio: function (vType, vName) {
            return compare(vType, 'audio.*') && (compare(vType, /(ogg|mp3|mp?g|wav)$/i) ||
                compare(vName, /\.(og?|mp3|mp?g|wav)$/i));
        },
        flash: function (vType, vName) {
            return compare(vType, 'application/x-shockwave-flash', true) || compare(vName, /\.(swf)$/i);
        },
        object: function (vType, vName) {
            return compare(vType, 'application/pdf', true) || compare(vName, /\.(pdf)$/i);
        },
        other: function () {
            return true;
        }
    };
    isEmpty = function (value, trim) {
        return value === undefined || value === null || value.length === 0 || (trim && $.trim(value) === '');
    };
    isArray = function (a) {
        return Array.isArray(a) || Object.prototype.toString.call(a) === '[object Array]';
    };
    isSet = function (needle, haystack) {
        return (typeof haystack === 'object' && needle in haystack);
    };
    getElement = function (options, param, value) {
        return (isEmpty(options) || isEmpty(options[param])) ? value : $(options[param]);
    };
    uniqId = function () {
        return Math.round(new Date().getTime() + (Math.random() * 100));
    };
    htmlEncode = function (str) {
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    };
    replaceTags = function (str, tags) {
        var out = str;
        if (!tags) {
            return out;
        }
        $.each(tags, function (key, value) {
            if (typeof value === "function") {
                value = value();
            }
            out = out.split(key).join(value);
        });
        return out;
    };
    cleanMemory = function ($thumb) {
        var data = $thumb.is('img') ? $thumb.attr('src') : $thumb.find('source').attr('src');
        /** @namespace objUrl.revokeObjectURL */
        objUrl.revokeObjectURL(data);
    };
    FileInput = function (element, options) {
        var self = this;
        self.$element = $(element);
        if (!self._validate()) {
            return;
        }
        self.isPreviewable = hasFileAPISupport();
        self.isIE9 = isIE(9);
        self.isIE10 = isIE(10);
        if (self.isPreviewable || self.isIE9) {
            self._init(options);
            self._listen();
        } else {
            self.$element.removeClass('file-loading');
        }
    };

    FileInput.prototype = {
        constructor: FileInput,
        _init: function (options) {
            var self = this, $el = self.$element, t;
            $.each(options, function (key, value) {
                switch (key) {
                    case 'minFileCount':
                    case 'maxFileCount':
                    case 'maxFileSize':
                        self[key] = getNum(value);
                        break;
                    default:
                        self[key] = value;
                        break;
                }
            });
            if (isEmpty(self.allowedPreviewTypes)) {
                self.allowedPreviewTypes = defaultPreviewTypes;
            }
            self.fileInputCleared = false;
            self.fileBatchCompleted = true;
            if (!self.isPreviewable) {
                self.showPreview = false;
            }
            self.uploadFileAttr = !isEmpty($el.attr('name')) ? $el.attr('name') : 'file_data';
            self.reader = null;
            self.formdata = {};
            self.clearStack();
            self.uploadCount = 0;
            self.uploadStatus = {};
            self.uploadLog = [];
            self.uploadAsyncCount = 0;
            self.loadedImages = [];
            self.totalImagesCount = 0;
            self.ajaxRequests = [];
            self.isError = false;
            self.ajaxAborted = false;
            self.cancelling = false;
            t = self._getLayoutTemplate('progress');
            self.progressTemplate = t.replace('{class}', self.progressClass);
            self.progressCompleteTemplate = t.replace('{class}', self.progressCompleteClass);
            self.progressErrorTemplate = t.replace('{class}', self.progressErrorClass);
            self.dropZoneEnabled = hasDragDropSupport() && self.dropZoneEnabled;
            self.isDisabled = self.$element.attr('disabled') || self.$element.attr('readonly');
            self.isUploadable = hasFileUploadSupport() && !isEmpty(self.uploadUrl);
            self.slug = typeof options.slugCallback === "function" ? options.slugCallback : self._slugDefault;
            self.mainTemplate = self.showCaption ? self._getLayoutTemplate('main1') : self._getLayoutTemplate('main2');
            self.captionTemplate = self._getLayoutTemplate('caption');
            self.previewGenericTemplate = self._getPreviewTemplate('generic');
            if (self.resizeImage && (self.maxImageWidth || self.maxImageHeight)) {
                self.imageCanvas = document.createElement('canvas');
                self.imageCanvasContext = self.imageCanvas.getContext('2d');
            }
            if (isEmpty(self.$element.attr('id'))) {
                self.$element.attr('id', uniqId());
            }
            if (self.$container === undefined) {
                self.$container = self._createContainer();
            } else {
                self._refreshContainer();
            }
            self.$dropZone = self.$container.find('.file-drop-zone');
            self.$progress = self.$container.find('.kv-upload-progress');
            self.$btnUpload = self.$container.find('.fileinput-upload');
            self.$captionContainer = getElement(options, 'elCaptionContainer', self.$container.find('.file-caption'));
            self.$caption = getElement(options, 'elCaptionText', self.$container.find('.file-caption-name'));
            self.$previewContainer = getElement(options, 'elPreviewContainer', self.$container.find('.file-preview'));
            self.$preview = getElement(options, 'elPreviewImage', self.$container.find('.file-preview-thumbnails'));
            self.$previewStatus = getElement(options, 'elPreviewStatus', self.$container.find('.file-preview-status'));
            self.$errorContainer = getElement(options, 'elErrorContainer',
                self.$previewContainer.find('.kv-fileinput-error'));
            if (!isEmpty(self.msgErrorClass)) {
                addCss(self.$errorContainer, self.msgErrorClass);
            }
            self.$errorContainer.hide();
            self.fileActionSettings = $.extend(true, defaultFileActionSettings, options.fileActionSettings);
            self.previewInitId = "preview-" + uniqId();
            self.id = self.$element.attr('id');
            previewCache.init(self);
            self._initPreview(true);
            self._initPreviewDeletes();
            self.options = options;
            self._setFileDropZoneTitle();
            self.$element.removeClass('file-loading');
            if (self.$element.attr('disabled')) {
                self.disable();
            }
        },
        _validate: function () {
            var self = this, $exception;
            if (self.$element.attr('type') === 'file') {
                return true;
            }
            $exception = '<div class="help-block alert alert-warning">' +
                '<h4>Invalid Input Type</h4>' +
                'You must set an input <code>type = file</code> for <b>bootstrap-fileinput</b> plugin to initialize.' +
                '</div>';
            self.$element.after($exception);
            return false;
        },
        _errorsExist: function () {
            var self = this, $err;
            if (self.$errorContainer.find('li').length) {
                return true;
            }
            $err = $(document.createElement('div')).html(self.$errorContainer.html());
            $err.find('span.kv-error-close').remove();
            $err.find('ul').remove();
            return $.trim($err.text()).length ? true : false;
        },
        _errorHandler: function (evt, caption) {
            var self = this, err = evt.target.error;
            /** @namespace err.NOT_FOUND_ERR */
            /** @namespace err.SECURITY_ERR */
            /** @namespace err.NOT_READABLE_ERR */
            if (err.code === err.NOT_FOUND_ERR) {
                self._showError(self.msgFileNotFound.replace('{name}', caption));
            } else if (err.code === err.SECURITY_ERR) {
                self._showError(self.msgFileSecured.replace('{name}', caption));
            } else if (err.code === err.NOT_READABLE_ERR) {
                self._showError(self.msgFileNotReadable.replace('{name}', caption));
            } else if (err.code === err.ABORT_ERR) {
                self._showError(self.msgFilePreviewAborted.replace('{name}', caption));
            } else {
                self._showError(self.msgFilePreviewError.replace('{name}', caption));
            }
        },
        _addError: function (msg) {
            var self = this, $error = self.$errorContainer;
            if (msg && $error.length) {
                $error.html(self.errorCloseButton + msg);
                handler($error.find('.kv-error-close'), 'click', function () {
                    $error.fadeOut('slow');
                });
            }
        },
        _resetErrors: function (fade) {
            var self = this, $error = self.$errorContainer;
            self.isError = false;
            self.$container.removeClass('has-error');
            $error.html('');
            if (fade) {
                $error.fadeOut('slow');
            } else {
                $error.hide();
            }
        },
        _showFolderError: function (folders) {
            var self = this, $error = self.$errorContainer, msg;
            if (!folders) {
                return;
            }
            msg = self.msgFoldersNotAllowed.replace(/\{n}/g, folders);
            self._addError(msg);
            addCss(self.$container, 'has-error');
            $error.fadeIn(800);
            self._raise('filefoldererror', [folders, msg]);
        },
        _showUploadError: function (msg, params, event) {
            var self = this, $error = self.$errorContainer, ev = event || 'fileuploaderror', e = params && params.id ?
            '<li data-file-id="' + params.id + '">' + msg + '</li>' : '<li>' + msg + '</li>';
            if ($error.find('ul').length === 0) {
                self._addError('<ul>' + e + '</ul>');
            } else {
                $error.find('ul').append(e);
            }
            $error.fadeIn(800);
            self._raise(ev, [params, msg]);
            self.$container.removeClass('file-input-new');
            addCss(self.$container, 'has-error');
            return true;
        },
        _showError: function (msg, params, event) {
            var self = this, $error = self.$errorContainer, ev = event || 'fileerror';
            params = params || {};
            params.reader = self.reader;
            self._addError(msg);
            $error.fadeIn(800);
            self._raise(ev, [params, msg]);
            if (!self.isUploadable) {
                self._clearFileInput();
            }
            self.$container.removeClass('file-input-new');
            addCss(self.$container, 'has-error');
            self.$btnUpload.attr('disabled', true);
            return true;
        },
        _noFilesError: function (params) {
            var self = this, label = self.minFileCount > 1 ? self.filePlural : self.fileSingle,
                msg = self.msgFilesTooLess.replace('{n}', self.minFileCount).replace('{files}', label),
                $error = self.$errorContainer;
            self._addError(msg);
            self.isError = true;
            self._updateFileDetails(0);
            $error.fadeIn(800);
            self._raise('fileerror', [params, msg]);
            self._clearFileInput();
            addCss(self.$container, 'has-error');
        },
        _parseError: function (jqXHR, errorThrown, fileName) {
            /** @namespace jqXHR.responseJSON */
            var self = this, errMsg = $.trim(errorThrown + ''),
                dot = errMsg.slice(-1) === '.' ? '' : '.',
                text = jqXHR.responseJSON !== undefined && jqXHR.responseJSON.error !== undefined ?
                    jqXHR.responseJSON.error : jqXHR.responseText;
            if (self.cancelling && self.msgUploadAborted) {
                errMsg = self.msgUploadAborted;
            }
            if (self.showAjaxErrorDetails && text) {
                text = $.trim(text.replace(/\n\s*\n/g, '\n'));
                text = text.length > 0 ? '<pre>' + text + '</pre>' : '';
                errMsg += dot + text;
            } else {
                errMsg += dot;
            }
            self.cancelling = false;
            return fileName ? '<b>' + fileName + ': </b>' + errMsg : errMsg;
        },
        _parseFileType: function (file) {
            var self = this, isValid, vType, cat, i;
            for (i = 0; i < defaultPreviewTypes.length; i += 1) {
                cat = defaultPreviewTypes[i];
                isValid = isSet(cat, self.fileTypeSettings) ? self.fileTypeSettings[cat] : defaultFileTypeSettings[cat];
                vType = isValid(file.type, file.name) ? cat : '';
                if (!isEmpty(vType)) {
                    return vType;
                }
            }
            return 'other';
        },
        _parseFilePreviewIcon: function (content, fname) {
            var self = this, ext, icn = self.previewFileIcon;
            if (fname && fname.indexOf('.') > -1) {
                ext = fname.split('.').pop();
                if (self.previewFileIconSettings && self.previewFileIconSettings[ext]) {
                    icn = self.previewFileIconSettings[ext];
                }
                if (self.previewFileExtSettings) {
                    $.each(self.previewFileExtSettings, function (key, func) {
                        if (self.previewFileIconSettings[key] && func(ext)) {
                            icn = self.previewFileIconSettings[key];
                        }
                    });
                }
            }
            if (content.indexOf('{previewFileIcon}') > -1) {
                return content.replace(/\{previewFileIconClass}/g, self.previewFileIconClass).replace(
                    /\{previewFileIcon}/g, icn);
            }
            return content;
        },
        _raise: function (event, params) {
            var self = this, e = $.Event(event);
            if (params !== undefined) {
                self.$element.trigger(e, params);
            } else {
                self.$element.trigger(e);
            }
            if (e.isDefaultPrevented()) {
                return false;
            }
            if (!e.result) {
                return e.result;
            }
            switch (event) {
                // ignore these events
                case 'filebatchuploadcomplete':
                case 'filebatchuploadsuccess':
                case 'fileuploaded':
                case 'fileclear':
                case 'filecleared':
                case 'filereset':
                case 'fileerror':
                case 'filefoldererror':
                case 'fileuploaderror':
                case 'filebatchuploaderror':
                case 'filedeleteerror':
                case 'filecustomerror':
                case 'filesuccessremove':
                    break;
                // receive data response via `filecustomerror` event`
                default:
                    self.ajaxAborted = e.result;
                    break;
            }
            return true;
        },
        _listen: function () {
            var self = this, $el = self.$element, $form = $el.closest('form'), $cont = self.$container;
            handler($el, 'change', $.proxy(self._change, self));
            handler(self.$btnFile, 'click', $.proxy(self._browse, self));
            handler($form, 'reset', $.proxy(self.reset, self));
            handler($cont.find('.fileinput-remove:not([disabled])'), 'click', $.proxy(self.clear, self));
            handler($cont.find('.fileinput-cancel'), 'click', $.proxy(self.cancel, self));
            self._initDragDrop();
            if (!self.isUploadable) {
                handler($form, 'submit', $.proxy(self._submitForm, self));
            }
            handler(self.$container.find('.fileinput-upload'), 'click', $.proxy(self._uploadClick, self));
        },
        _initDragDrop: function () {
            var self = this, $zone = self.$dropZone;
            if (self.isUploadable && self.dropZoneEnabled && self.showPreview) {
                handler($zone, 'dragenter dragover', $.proxy(self._zoneDragEnter, self));
                handler($zone, 'dragleave', $.proxy(self._zoneDragLeave, self));
                handler($zone, 'drop', $.proxy(self._zoneDrop, self));
                handler($(document), 'dragenter dragover drop', self._zoneDragDropInit);
            }
        },
        _zoneDragDropInit: function (e) {
            e.stopPropagation();
            e.preventDefault();
        },
        _zoneDragEnter: function (e) {
            var self = this, hasFiles = $.inArray('Files', e.originalEvent.dataTransfer.types) > -1;
            self._zoneDragDropInit(e);
            if (self.isDisabled || !hasFiles) {
                e.originalEvent.dataTransfer.effectAllowed = 'none';
                e.originalEvent.dataTransfer.dropEffect = 'none';
                return;
            }
            addCss(self.$dropZone, 'file-highlighted');
        },
        _zoneDragLeave: function (e) {
            var self = this;
            self._zoneDragDropInit(e);
            if (self.isDisabled) {
                return;
            }
            self.$dropZone.removeClass('file-highlighted');
        },
        _zoneDrop: function (e) {
            var self = this;
            e.preventDefault();
            /** @namespace e.originalEvent.dataTransfer */
            if (self.isDisabled || isEmpty(e.originalEvent.dataTransfer.files)) {
                return;
            }
            self._change(e, 'dragdrop');
            self.$dropZone.removeClass('file-highlighted');
        },
        _uploadClick: function (e) {
            var self = this, $btn = self.$container.find('.fileinput-upload'), $form,
                isEnabled = !$btn.hasClass('disabled') && isEmpty($btn.attr('disabled'));
            if (e && e.isDefaultPrevented()) {
                return;
            }
            if (!self.isUploadable) {
                if (isEnabled && $btn.attr('type') !== 'submit') {
                    $form = $btn.closest('form');
                    // downgrade to normal form submit if possible
                    if ($form.length) {
                        $form.trigger('submit');
                    }
                    e.preventDefault();
                }
                return;
            }
            e.preventDefault();
            if (isEnabled) {
                self.upload();
            }
        },
        _submitForm: function () {
            var self = this, $el = self.$element, files = $el.get(0).files;
            if (files && self.minFileCount > 0 && self._getFileCount(files.length) < self.minFileCount) {
                self._noFilesError({});
                return false;
            }
            return !self._abort({});
        },
        _clearPreview: function () {
            var self = this, $thumbs = !self.showUploadedThumbs ? self.$preview.find('.file-preview-frame') :
                self.$preview.find('.file-preview-frame:not(.file-preview-success)');
            $thumbs.remove();
            if (!self.$preview.find('.file-preview-frame').length || !self.showPreview) {
                self._resetUpload();
            }
            self._validateDefaultPreview();
        },
        _initPreview: function (isInit) {
            var self = this, cap = self.initialCaption || '', out;
            if (!previewCache.count(self.id)) {
                self._clearPreview();
                if (isInit) {
                    self._setCaption(cap);
                } else {
                    self._initCaption();
                }
                return;
            }
            out = previewCache.out(self.id);
            cap = isInit && self.initialCaption ? self.initialCaption : out.caption;
            self.$preview.html(out.content);
            self._setCaption(cap);
            if (!isEmpty(out.content)) {
                self.$container.removeClass('file-input-new');
            }
        },
        _initPreviewDeletes: function () {
            var self = this, deleteExtraData = self.deleteExtraData || {},
                resetProgress = function () {
                    var hasFiles = self.isUploadable ? previewCache.count(self.id) : self.$element.get(0).files.length;
                    if (self.$preview.find('.kv-file-remove').length === 0 && !hasFiles) {
                        self.reset();
                        self.initialCaption = '';
                    }
                };

            self.$preview.find('.kv-file-remove').each(function () {
                var $el = $(this), vUrl = $el.data('url') || self.deleteUrl, vKey = $el.data('key');
                if (isEmpty(vUrl) || vKey === undefined) {
                    return;
                }
                var $frame = $el.closest('.file-preview-frame'), cache = previewCache.data[self.id],
                    settings, params, index = $frame.data('fileindex'), config, extraData;
                index = parseInt(index.replace('init_', ''));
                config = isEmpty(cache.config) && isEmpty(cache.config[index]) ? null : cache.config[index];
                extraData = isEmpty(config) || isEmpty(config.extra) ? deleteExtraData : config.extra;
                if (typeof extraData === "function") {
                    extraData = extraData();
                }
                params = {id: $el.attr('id'), key: vKey, extra: extraData};
                settings = $.extend(true, {}, {
                    url: vUrl,
                    type: 'POST',
                    dataType: 'json',
                    data: $.extend(true, {}, {key: vKey}, extraData),
                    beforeSend: function (jqXHR) {
                        self.ajaxAborted = false;
                        self._raise('filepredelete', [vKey, jqXHR, extraData]);
                        if (self.ajaxAborted) {
                            jqXHR.abort();
                        } else {
                            addCss($frame, 'file-uploading');
                            addCss($el, 'disabled');
                        }
                    },
                    success: function (data, textStatus, jqXHR) {
                        var n, cap;
                        if (isEmpty(data) || isEmpty(data.error)) {
                            previewCache.unset(self.id, index);
                            n = previewCache.count(self.id);
                            cap = n > 0 ? self._getMsgSelected(n) : '';
                            self._raise('filedeleted', [vKey, jqXHR, extraData]);
                            self._setCaption(cap);
                        } else {
                            params.jqXHR = jqXHR;
                            params.response = data;
                            self._showError(data.error, params, 'filedeleteerror');
                            $frame.removeClass('file-uploading');
                            $el.removeClass('disabled');
                            resetProgress();
                            return;
                        }
                        $frame.removeClass('file-uploading').addClass('file-deleted');
                        $frame.fadeOut('slow', function () {
                            self._clearObjects($frame);
                            $frame.remove();
                            resetProgress();
                            if (!n && self.getFileStack().length === 0) {
                                self._setCaption('');
                                self.reset();
                            }
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        var errMsg = self._parseError(jqXHR, errorThrown);
                        params.jqXHR = jqXHR;
                        params.response = {};
                        self._showError(errMsg, params, 'filedeleteerror');
                        $frame.removeClass('file-uploading');
                        resetProgress();
                    }
                }, self.ajaxDeleteSettings);
                handler($el, 'click', function () {
                    if (!self._validateMinCount()) {
                        return false;
                    }
                    $.ajax(settings);
                });
            });
        },
        _clearObjects: function ($el) {
            $el.find('video audio').each(function () {
                this.pause();
                $(this).remove();
            });
            $el.find('img object div').each(function () {
                $(this).remove();
            });
        },
        _clearFileInput: function () {
            var self = this, $el = self.$element, $srcFrm, $tmpFrm, $tmpEl;
            if (isEmpty($el.val())) {
                return;
            }
            // Fix for IE ver < 11, that does not clear file inputs. Requires a sequence of steps to prevent IE
            // crashing but still allow clearing of the file input.
            if (self.isIE9 || self.isIE10) {
                $srcFrm = $el.closest('form');
                $tmpFrm = $(document.createElement('form'));
                $tmpEl = $(document.createElement('div'));
                $el.before($tmpEl);
                if ($srcFrm.length) {
                    $srcFrm.after($tmpFrm);
                } else {
                    $tmpEl.after($tmpFrm);
                }
                $tmpFrm.append($el).trigger('reset');
                $tmpEl.before($el).remove();
                $tmpFrm.remove();
            } else { // normal input clear behavior for other sane browsers
                $el.val('');
            }
            self.fileInputCleared = true;
        },
        _resetUpload: function () {
            var self = this;
            self.uploadCache = {content: [], config: [], tags: [], append: true};
            self.uploadCount = 0;
            self.uploadStatus = {};
            self.uploadLog = [];
            self.uploadAsyncCount = 0;
            self.loadedImages = [];
            self.totalImagesCount = 0;
            self.$btnUpload.removeAttr('disabled');
            self._setProgress(0);
            addCss(self.$progress, 'hide');
            self._resetErrors(false);
            self.ajaxAborted = false;
            self.ajaxRequests = [];
            self._resetCanvas();
        },
        _resetCanvas: function () {
            var self = this;
            if (self.canvas && self.imageCanvasContext) {
                self.imageCanvasContext.clearRect(0, 0, self.canvas.width, self.canvas.height);
            }
        },
        _hasInitialPreview: function () {
            var self = this;
            return !self.overwriteInitial && previewCache.count(self.id);
        },
        _resetPreview: function () {
            var self = this, out, cap;
            if (previewCache.count(self.id)) {
                out = previewCache.out(self.id);
                self.$preview.html(out.content);
                cap = self.initialCaption ? self.initialCaption : out.caption;
                self._setCaption(cap);
            } else {
                self._clearPreview();
                self._initCaption();
            }
        },
        _clearDefaultPreview: function () {
            var self = this;
            self.$preview.find('.file-default-preview').remove();
        },
        _validateDefaultPreview: function () {
            var self = this;
            if (!self.showPreview || isEmpty(self.defaultPreviewContent)) {
                return;
            }
            self.$preview.html('<div class="file-default-preview">' + self.defaultPreviewContent + '</div>');
            self.$container.removeClass('file-input-new');
        },
        _resetPreviewThumbs: function (isAjax) {
            var self = this, out;
            if (isAjax) {
                self._clearPreview();
                self.clearStack();
                return;
            }
            if (self._hasInitialPreview()) {
                out = previewCache.out(self.id);
                self.$preview.html(out.content);
                self._setCaption(out.caption);
                self._initPreviewDeletes();
            } else {
                self._clearPreview();
            }
        },
        _getLayoutTemplate: function (t) {
            var self = this,
                template = isSet(t, self.layoutTemplates) ? self.layoutTemplates[t] : defaultLayoutTemplates[t];
            if (isEmpty(self.customLayoutTags)) {
                return template;
            }
            return replaceTags(template, self.customLayoutTags);
        },
        _getPreviewTemplate: function (t) {
            var self = this,
                template = isSet(t, self.previewTemplates) ? self.previewTemplates[t] : defaultPreviewTemplates[t];
            if (isEmpty(self.customPreviewTags)) {
                return template;
            }
            return replaceTags(template, self.customPreviewTags);
        },
        _getOutData: function (jqXHR, responseData, filesData) {
            var self = this;
            jqXHR = jqXHR || {};
            responseData = responseData || {};
            filesData = filesData || self.filestack.slice(0) || {};
            return {
                form: self.formdata,
                files: filesData,
                filenames: self.filenames,
                extra: self._getExtraData(),
                response: responseData,
                reader: self.reader,
                jqXHR: jqXHR
            };
        },
        _getMsgSelected: function (n) {
            var self = this, strFiles = n === 1 ? self.fileSingle : self.filePlural;
            return self.msgSelected.replace('{n}', n).replace('{files}', strFiles);
        },
        _getThumbs: function (css) {
            css = css || '';
            return this.$preview.find('.file-preview-frame:not(.file-preview-initial)' + css);
        },
        _getExtraData: function (previewId, index) {
            var self = this, data = self.uploadExtraData;
            if (typeof self.uploadExtraData === "function") {
                data = self.uploadExtraData(previewId, index);
            }
            return data;
        },
        _initXhr: function (xhrobj, previewId, fileCount) {
            var self = this;
            if (xhrobj.upload) {
                xhrobj.upload.addEventListener('progress', function (event) {
                    var pct = 0, position = event.loaded || event.position, total = event.total;
                    /** @namespace event.lengthComputable */
                    if (event.lengthComputable) {
                        pct = Math.ceil(position / total * 100);
                    }
                    if (previewId) {
                        self._setAsyncUploadStatus(previewId, pct, fileCount);
                    } else {
                        self._setProgress(Math.ceil(pct));
                    }
                }, false);
            }
            return xhrobj;
        },
        _ajaxSubmit: function (fnBefore, fnSuccess, fnComplete, fnError, previewId, index) {
            var self = this, settings;
            self._raise('filepreajax', [previewId, index]);
            self._uploadExtra(previewId, index);
            settings = $.extend(true, {}, {
                xhr: function () {
                    var xhrobj = $.ajaxSettings.xhr();
                    return self._initXhr(xhrobj, previewId, self.getFileStack().length);
                },
                url: self.uploadUrl,
                type: 'POST',
                dataType: 'json',
                data: self.formdata,
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: fnBefore,
                success: fnSuccess,
                complete: fnComplete,
                error: fnError
            }, self.ajaxSettings);
            self.ajaxRequests.push($.ajax(settings));
        },
        _initUploadSuccess: function (out, $thumb, allFiles) {
            var self = this, append, data, index, $newThumb, content, config, tags, i;
            if (!self.showPreview || typeof out !== 'object' || $.isEmptyObject(out)) {
                return;
            }
            if (out.initialPreview !== undefined && out.initialPreview.length > 0) {
                self.hasInitData = true;
                content = out.initialPreview || [];
                config = out.initialPreviewConfig || [];
                tags = out.initialPreviewThumbTags || [];
                append = out.append === undefined || out.append ? true : false;
                self.overwriteInitial = false;
                if ($thumb !== undefined) {
                    if (!allFiles) {
                        index = previewCache.add(self.id, content, config[0], tags[0], append);
                        data = previewCache.get(self.id, index, false);
                        $newThumb = $(data).hide();
                        $thumb.after($newThumb).fadeOut('slow', function () {
                            $newThumb.fadeIn('slow').css('display:inline-block');
                            self._initPreviewDeletes();
                            self._clearFileInput();
                            $thumb.remove();
                        });
                    } else {
                        i = $thumb.attr('data-fileindex');
                        self.uploadCache.content[i] = content[0];
                        self.uploadCache.config[i] = config[0];
                        self.uploadCache.tags[i] = tags[0];
                        self.uploadCache.append = append;
                    }
                } else {
                    previewCache.set(self.id, content, config, tags, append);
                    self._initPreview();
                    self._initPreviewDeletes();
                }
            }
        },
        _initSuccessThumbs: function () {
            var self = this;
            if (!self.showPreview) {
                return;
            }
            self._getThumbs('.file-preview-success').each(function () {
                var $thumb = $(this), $remove = $thumb.find('.kv-file-remove');
                $remove.removeAttr('disabled');
                handler($remove, 'click', function () {
                    var out = self._raise('filesuccessremove', [$thumb.attr('id'), $thumb.data('fileindex')]);
                    cleanMemory($thumb);
                    if (out === false) {
                        return;
                    }
                    $thumb.fadeOut('slow', function () {
                        $thumb.remove();
                        if (!self.$preview.find('.file-preview-frame').length) {
                            self.reset();
                        }
                    });
                });
            });
        },
        _checkAsyncComplete: function () {
            var self = this, previewId, i;
            for (i = 0; i < self.filestack.length; i++) {
                if (self.filestack[i]) {
                    previewId = self.previewInitId + "-" + i;
                    if ($.inArray(previewId, self.uploadLog) === -1) {
                        return false;
                    }
                }
            }
            return (self.uploadAsyncCount === self.uploadLog.length);
        },
        _uploadExtra: function (previewId, index) {
            var self = this, data = self._getExtraData(previewId, index);
            if (data.length === 0) {
                return;
            }
            $.each(data, function (key, value) {
                self.formdata.append(key, value);
            });
        },
        _uploadSingle: function (i, files, allFiles) {
            var self = this, total = self.getFileStack().length, formdata = new FormData(), outData,
                previewId = self.previewInitId + "-" + i, $thumb, chkComplete, $btnUpload, $btnDelete,
                hasPostData = self.filestack.length > 0 || !$.isEmptyObject(self.uploadExtraData),
                fnBefore, fnSuccess, fnComplete, fnError, updateUploadLog, params = {id: previewId, index: i};
            self.formdata = formdata;
            if (self.showPreview) {
                $thumb = $('#' + previewId + ':not(.file-preview-initial)');
                $btnUpload = $thumb.find('.kv-file-upload');
                $btnDelete = $thumb.find('.kv-file-remove');
                $('#' + previewId).find('.file-thumb-progress').removeClass('hide');
            }
            if (total === 0 || !hasPostData || ($btnUpload && $btnUpload.hasClass('disabled')) || self._abort(params)) {
                return;
            }
            updateUploadLog = function (i, previewId) {
                self.updateStack(i, undefined);
                self.uploadLog.push(previewId);
                if (self._checkAsyncComplete()) {
                    self.fileBatchCompleted = true;
                }
            };
            chkComplete = function () {
                if (!self.fileBatchCompleted) {
                    return;
                }
                setTimeout(function () {
                    if (self.showPreview) {
                        previewCache.set(
                            self.id,
                            self.uploadCache.content,
                            self.uploadCache.config,
                            self.uploadCache.tags,
                            self.uploadCache.append
                        );
                        if (self.hasInitData) {
                            self._initPreview();
                            self._initPreviewDeletes();
                        }
                    }
                    self.unlock();
                    self._clearFileInput();
                    self._raise('filebatchuploadcomplete', [self.filestack, self._getExtraData()]);
                    self.uploadCount = 0;
                    self.uploadStatus = {};
                    self.uploadLog = [];
                    self._setProgress(100);
                }, 100);
            };
            fnBefore = function (jqXHR) {
                outData = self._getOutData(jqXHR);
                self.fileBatchCompleted = false;
                if (self.showPreview) {
                    if (!$thumb.hasClass('file-preview-success')) {
                        self._setThumbStatus($thumb, 'Loading');
                        addCss($thumb, 'file-uploading');
                    }
                    $btnUpload.attr('disabled', true);
                    $btnDelete.attr('disabled', true);
                }
                if (!allFiles) {
                    self.lock();
                }
                self._raise('filepreupload', [outData, previewId, i]);
                $.extend(true, params, outData);
                if (self._abort(params)) {
                    jqXHR.abort();
                    self._setProgressCancelled();
                }
            };
            fnSuccess = function (data, textStatus, jqXHR) {
                outData = self._getOutData(jqXHR, data);
                $.extend(true, params, outData);
                setTimeout(function () {
                    if (isEmpty(data) || isEmpty(data.error)) {
                        if (self.showPreview) {
                            self._setThumbStatus($thumb, 'Success');
                            $btnUpload.hide();
                            self._initUploadSuccess(data, $thumb, allFiles);
                        }
                        self._raise('fileuploaded', [outData, previewId, i]);
                        if (!allFiles) {
                            self.updateStack(i, undefined);
                        } else {
                            updateUploadLog(i, previewId);
                        }
                    } else {
                        self._showUploadError(data.error, params);
                        self._setPreviewError($thumb, i);
                        if (allFiles) {
                            updateUploadLog(i, previewId);
                        }
                    }
                }, 100);
            };
            fnComplete = function () {
                setTimeout(function () {
                    if (self.showPreview) {
                        $btnUpload.removeAttr('disabled');
                        $btnDelete.removeAttr('disabled');
                        $thumb.removeClass('file-uploading');
                    }
                    if (!allFiles) {
                        self.unlock(false);
                        self._clearFileInput();
                    } else {
                        chkComplete();
                    }
                    self._initSuccessThumbs();
                }, 100);
            };
            fnError = function (jqXHR, textStatus, errorThrown) {
                var errMsg = self._parseError(jqXHR, errorThrown, (allFiles ? files[i].name : null));
                setTimeout(function () {
                    if (allFiles) {
                        updateUploadLog(i, previewId);
                    }
                    self.uploadStatus[previewId] = 100;
                    self._setPreviewError($thumb, i);
                    $.extend(true, params, self._getOutData(jqXHR));
                    self._showUploadError(errMsg, params);
                }, 100);
            };
            formdata.append(self.uploadFileAttr, files[i], self.filenames[i]);
            formdata.append('file_id', i);
            self._ajaxSubmit(fnBefore, fnSuccess, fnComplete, fnError, previewId, i);
        },
        _uploadBatch: function () {
            var self = this, files = self.filestack, total = files.length, params = {}, fnBefore, fnSuccess, fnError,
                fnComplete, hasPostData = self.filestack.length > 0 || !$.isEmptyObject(self.uploadExtraData),
                setAllUploaded;
            self.formdata = new FormData();
            if (total === 0 || !hasPostData || self._abort(params)) {
                return;
            }
            setAllUploaded = function () {
                $.each(files, function (key) {
                    self.updateStack(key, undefined);
                });
                self._clearFileInput();
            };
            fnBefore = function (jqXHR) {
                self.lock();
                var outData = self._getOutData(jqXHR);
                if (self.showPreview) {
                    self._getThumbs().each(function () {
                        var $thumb = $(this), $btnUpload = $thumb.find('.kv-file-upload'),
                            $btnDelete = $thumb.find('.kv-file-remove');
                        if (!$thumb.hasClass('file-preview-success')) {
                            self._setThumbStatus($thumb, 'Loading');
                            addCss($thumb, 'file-uploading');
                        }
                        $btnUpload.attr('disabled', true);
                        $btnDelete.attr('disabled', true);
                    });
                }
                self._raise('filebatchpreupload', [outData]);
                if (self._abort(outData)) {
                    jqXHR.abort();
                    self._setProgressCancelled();
                }
            };
            fnSuccess = function (data, textStatus, jqXHR) {
                /** @namespace data.errorkeys */
                var outData = self._getOutData(jqXHR, data), $thumbs = self._getThumbs(), key = 0,
                    keys = isEmpty(data) || isEmpty(data.errorkeys) ? [] : data.errorkeys;
                if (isEmpty(data) || isEmpty(data.error)) {
                    self._raise('filebatchuploadsuccess', [outData]);
                    setAllUploaded();
                    if (self.showPreview) {
                        $thumbs.each(function () {
                            var $thumb = $(this), $btnUpload = $thumb.find('.kv-file-upload');
                            $thumb.find('.kv-file-upload').hide();
                            self._setThumbStatus($thumb, 'Success');
                            $thumb.removeClass('file-uploading');
                            $btnUpload.removeAttr('disabled');
                        });
                        self._initUploadSuccess(data);
                    } else {
                        self.reset();
                    }
                } else {
                    if (self.showPreview) {
                        $thumbs.each(function () {
                            var $thumb = $(this), $btnDelete = $thumb.find('.kv-file-remove'),
                                $btnUpload = $thumb.find('.kv-file-upload');
                            $thumb.removeClass('file-uploading');
                            $btnUpload.removeAttr('disabled');
                            $btnDelete.removeAttr('disabled');
                            if (keys.length === 0) {
                                self._setPreviewError($thumb);
                                return;
                            }
                            if ($.inArray(key, keys) !== -1) {
                                self._setPreviewError($thumb);
                            } else {
                                $thumb.find('.kv-file-upload').hide();
                                self._setThumbStatus($thumb, 'Success');
                                self.updateStack(key, undefined);
                            }
                            key++;
                        });
                        self._initUploadSuccess(data);
                    }
                    self._showUploadError(data.error, outData, 'filebatchuploaderror');
                }
            };
            fnComplete = function () {
                self._setProgress(100);
                self.unlock();
                self._initSuccessThumbs();
                self._clearFileInput();
                self._raise('filebatchuploadcomplete', [self.filestack, self._getExtraData()]);
            };
            fnError = function (jqXHR, textStatus, errorThrown) {
                var outData = self._getOutData(jqXHR), errMsg = self._parseError(jqXHR, errorThrown);
                self._showUploadError(errMsg, outData, 'filebatchuploaderror');
                self.uploadFileCount = total - 1;
                if (!self.showPreview) {
                    return;
                }
                self._getThumbs().each(function () {
                    var $thumb = $(this), key = $thumb.attr('data-fileindex');
                    $thumb.removeClass('file-uploading');
                    if (self.filestack[key] !== undefined) {
                        self._setPreviewError($thumb);
                    }
                });
                self._getThumbs().removeClass('file-uploading');
                self._getThumbs(' .kv-file-upload').removeAttr('disabled');
                self._getThumbs(' .kv-file-delete').removeAttr('disabled');
            };
            $.each(files, function (key, data) {
                if (!isEmpty(files[key])) {
                    self.formdata.append(self.uploadFileAttr, data, self.filenames[key]);
                }
            });
            self._ajaxSubmit(fnBefore, fnSuccess, fnComplete, fnError);
        },
        _uploadExtraOnly: function () {
            var self = this, params = {}, fnBefore, fnSuccess, fnComplete, fnError;
            self.formdata = new FormData();
            if (self._abort(params)) {
                return;
            }
            fnBefore = function (jqXHR) {
                self.lock();
                var outData = self._getOutData(jqXHR);
                self._raise('filebatchpreupload', [outData]);
                self._setProgress(50);
                params.data = outData;
                params.xhr = jqXHR;
                if (self._abort(params)) {
                    jqXHR.abort();
                    self._setProgressCancelled();
                }
            };
            fnSuccess = function (data, textStatus, jqXHR) {
                var outData = self._getOutData(jqXHR, data);
                if (isEmpty(data) || isEmpty(data.error)) {
                    self._raise('filebatchuploadsuccess', [outData]);
                    self._clearFileInput();
                    self._initUploadSuccess(data);
                } else {
                    self._showUploadError(data.error, outData, 'filebatchuploaderror');
                }
            };
            fnComplete = function () {
                self._setProgress(100);
                self.unlock();
                self._clearFileInput();
                self._raise('filebatchuploadcomplete', [self.filestack, self._getExtraData()]);
            };
            fnError = function (jqXHR, textStatus, errorThrown) {
                var outData = self._getOutData(jqXHR), errMsg = self._parseError(jqXHR, errorThrown);
                params.data = outData;
                self._showUploadError(errMsg, outData, 'filebatchuploaderror');
            };
            self._ajaxSubmit(fnBefore, fnSuccess, fnComplete, fnError);
        },
        _initFileActions: function () {
            var self = this;
            if (!self.showPreview) {
                return;
            }
            self.$preview.find('.kv-file-remove').each(function () {
                var $el = $(this), $frame = $el.closest('.file-preview-frame'), hasError,
                    id = $frame.attr('id'), ind = $frame.attr('data-fileindex'), n, cap, status;
                handler($el, 'click', function () {
                    status = self._raise('filepreremove', [id, ind]);
                    if (status === false || !self._validateMinCount()) {
                        return false;
                    }
                    hasError = $frame.hasClass('file-preview-error');
                    cleanMemory($frame);
                    $frame.fadeOut('slow', function () {
                        self.updateStack(ind, undefined);
                        self._clearObjects($frame);
                        $frame.remove();
                        if (id && hasError) {
                            self.$errorContainer.find('li[data-file-id="' + id + '"]').fadeOut('fast', function () {
                                $(this).remove();
                                if (!self._errorsExist()) {
                                    self._resetErrors();
                                }
                            });
                        }
                        var filestack = self.getFileStack(true), len = filestack.length, chk = previewCache.count(
                            self.id),
                            hasThumb = self.showPreview && self.$preview.find('.file-preview-frame').length;
                        self._clearFileInput();
                        if (len === 0 && chk === 0 && !hasThumb) {
                            self.reset();
                        } else {
                            n = chk + len;
                            cap = n > 1 ? self._getMsgSelected(n) : (filestack[0] ? self._getFileNames()[0] : '');
                            self._setCaption(cap);
                        }
                        self._raise('fileremoved', [id, ind]);
                    });
                });
            });
            self.$preview.find('.kv-file-upload').each(function () {
                var $el = $(this);
                handler($el, 'click', function () {
                    var $frame = $el.closest('.file-preview-frame'),
                        ind = $frame.attr('data-fileindex');
                    if (!$frame.hasClass('file-preview-error')) {
                        self._uploadSingle(ind, self.filestack, false);
                    }
                });
            });
        },
        _hideFileIcon: function () {
            if (this.overwriteInitial) {
                this.$captionContainer.find('.kv-caption-icon').hide();
            }
        },
        _showFileIcon: function () {
            this.$captionContainer.find('.kv-caption-icon').show();
        },
        _previewDefault: function (file, previewId, isDisabled) {
            if (!this.showPreview) {
                return;
            }
            var self = this, frameClass = '', fname = file ? file.name : '',
                /** @namespace objUrl.createObjectURL */
                data = objUrl.createObjectURL(file), ind = previewId.slice(previewId.lastIndexOf('-') + 1),
                config = self.previewSettings.other || defaultPreviewSettings.other,
                footer = self._renderFileFooter(file.name, config.width),
                previewOtherTemplate = self._parseFilePreviewIcon(self._getPreviewTemplate('other'), fname);
            if (isDisabled === true) {
                if (!self.isUploadable) {
                    footer += '<div class="file-other-error" title="' + self.fileActionSettings.indicatorErrorTitle +
                        '">' + self.fileActionSettings.indicatorError + '</div>';
                }
            }
            self._clearDefaultPreview();
            self.$preview.append("\n" + previewOtherTemplate
                    .replace(/\{previewId}/g, previewId)
                    .replace(/\{frameClass}/g, frameClass)
                    .replace(/\{fileindex}/g, ind)
                    .replace(/\{caption}/g, self.slug(file.name))
                    .replace(/\{width}/g, config.width)
                    .replace(/\{height}/g, config.height)
                    .replace(/\{type}/g, file.type)
                    .replace(/\{data}/g, data)
                    .replace(/\{footer}/g, footer));
            if (isDisabled === true && self.isUploadable) {
                self._setThumbStatus($('#' + previewId), 'Error');
            }
        },
        _previewFile: function (i, file, theFile, previewId, data) {
            if (!this.showPreview) {
                return;
            }
            var self = this, cat = self._parseFileType(file), fname = file ? file.name : '', caption = self.slug(fname),
                content, strText, types = self.allowedPreviewTypes, mimes = self.allowedPreviewMimeTypes,
                tmplt = self._getPreviewTemplate(cat), chkTypes = types && types.indexOf(cat) >= 0, id,
                config = isSet(cat, self.previewSettings) ? self.previewSettings[cat] : defaultPreviewSettings[cat],
                chkMimes = mimes && mimes.indexOf(file.type) !== -1,
                footer = self._renderFileFooter(caption, config.width), modal = '',
                ind = previewId.slice(previewId.lastIndexOf('-') + 1);
            if (chkTypes || chkMimes) {
                tmplt = self._parseFilePreviewIcon(tmplt, fname.split('.').pop());
                if (cat === 'text') {
                    strText = htmlEncode(theFile.target.result);
                    id = 'text-' + uniqId();
                    content = tmplt.replace(/\{zoom}/g, self._getLayoutTemplate('zoom'));
                    modal = self._getLayoutTemplate('modal').replace('{id}', id)
                        .replace(/\{title}/g, caption)
                        .replace(/\{body}/g, strText).replace(/\{heading}/g, self.msgZoomModalHeading);
                    content = content.replace(/\{previewId}/g, previewId).replace(/\{caption}/g, caption)
                            .replace(/\{width}/g, config.width).replace(/\{height}/g, config.height)
                            .replace(/\{frameClass}/g, '').replace(/\{zoomInd}/g, self.zoomIndicator)
                            .replace(/\{footer}/g, footer).replace(/\{fileindex}/g, ind)
                            .replace(/\{type}/g, file.type).replace(/\{zoomTitle}/g, self.msgZoomTitle)
                            .replace(/\{dialog}/g, "$('#" + id + "').modal('show')")
                            .replace(/\{data}/g, strText) + modal;
                } else {
                    content = tmplt.replace(/\{previewId}/g, previewId).replace(/\{caption}/g, caption)
                        .replace(/\{frameClass}/g, '').replace(/\{type}/g, file.type).replace(/\{fileindex}/g, ind)
                        .replace(/\{width}/g, config.width).replace(/\{height}/g, config.height)
                        .replace(/\{footer}/g, footer).replace(/\{data}/g, data);
                }
                self._clearDefaultPreview();
                self.$preview.append("\n" + content);
                self._validateImage(i, previewId, caption, file.type);
            } else {
                self._previewDefault(file, previewId);
            }
        },
        _slugDefault: function (text) {
            return isEmpty(text) ? '' : String(text).replace(/[\-\[\]\/\{}:;#%=\(\)\*\+\?\\\^\$\|<>&"']/g, '_');
        },
        _readFiles: function (files) {
            this.reader = new FileReader();
            var self = this, $el = self.$element, $preview = self.$preview, reader = self.reader,
                $container = self.$previewContainer, $status = self.$previewStatus, msgLoading = self.msgLoading,
                msgProgress = self.msgProgress, previewInitId = self.previewInitId, numFiles = files.length,
                settings = self.fileTypeSettings, ctr = self.filestack.length, readFile,
                throwError = function (msg, file, previewId, index) {
                    var p1 = $.extend(true, {}, self._getOutData({}, {}, files), {id: previewId, index: index}),
                        p2 = {id: previewId, index: index, file: file, files: files};
                    self._previewDefault(file, previewId, true);
                    if (self.isUploadable) {
                        self.addToStack(undefined);
                    }
                    setTimeout(readFile(index + 1), 100);
                    self._initFileActions();
                    if (self.removeFromPreviewOnError) {
                        $('#' + previewId).remove();
                    }
                    return self.isUploadable ? self._showUploadError(msg, p1) : self._showError(msg, p2);
                };

            self.loadedImages = [];
            self.totalImagesCount = 0;

            $.each(files, function (key, file) {
                var func = self.fileTypeSettings.image || defaultFileTypeSettings.image;
                if (func && func(file.type)) {
                    self.totalImagesCount++;
                }
            });

            readFile = function (i) {
                if (isEmpty($el.attr('multiple'))) {
                    numFiles = 1;
                }
                if (i >= numFiles) {
                    if (self.isUploadable && self.filestack.length > 0) {
                        self._raise('filebatchselected', [self.getFileStack()]);
                    } else {
                        self._raise('filebatchselected', [files]);
                    }
                    $container.removeClass('file-thumb-loading');
                    $status.html('');
                    return;
                }
                var node = ctr + i, previewId = previewInitId + "-" + node, isText, file = files[i],
                    caption = self.slug(file.name), fileSize = (file.size || 0) / 1000, checkFile, fileExtExpr = '',
                    previewData = objUrl.createObjectURL(file), fileCount = 0, j, msg, typ, chk,
                    fileTypes = self.allowedFileTypes, strTypes = isEmpty(fileTypes) ? '' : fileTypes.join(', '),
                    fileExt = self.allowedFileExtensions, strExt = isEmpty(fileExt) ? '' : fileExt.join(', ');
                if (!isEmpty(fileExt)) {
                    fileExtExpr = new RegExp('\\.(' + fileExt.join('|') + ')$', 'i');
                }
                fileSize = fileSize.toFixed(2);
                if (self.maxFileSize > 0 && fileSize > self.maxFileSize) {
                    msg = self.msgSizeTooLarge.replace('{name}', caption)
                        .replace('{size}', fileSize)
                        .replace('{maxSize}', self.maxFileSize);
                    self.isError = throwError(msg, file, previewId, i);
                    return;
                }
                if (!isEmpty(fileTypes) && isArray(fileTypes)) {
                    for (j = 0; j < fileTypes.length; j += 1) {
                        typ = fileTypes[j];
                        checkFile = settings[typ];
                        chk = (checkFile !== undefined && checkFile(file.type, caption));
                        fileCount += isEmpty(chk) ? 0 : chk.length;
                    }
                    if (fileCount === 0) {
                        msg = self.msgInvalidFileType.replace('{name}', caption).replace('{types}', strTypes);
                        self.isError = throwError(msg, file, previewId, i);
                        return;
                    }
                }
                if (fileCount === 0 && !isEmpty(fileExt) && isArray(fileExt) && !isEmpty(fileExtExpr)) {
                    chk = compare(caption, fileExtExpr);
                    fileCount += isEmpty(chk) ? 0 : chk.length;
                    if (fileCount === 0) {
                        msg = self.msgInvalidFileExtension.replace('{name}', caption).replace('{extensions}',
                            strExt);
                        self.isError = throwError(msg, file, previewId, i);
                        return;
                    }
                }
                if (!self.showPreview) {
                    self.addToStack(file);
                    setTimeout(readFile(i + 1), 100);
                    self._raise('fileloaded', [file, previewId, i, reader]);
                    return;
                }
                if ($preview.length > 0 && FileReader !== undefined) {
                    $status.html(msgLoading.replace('{index}', i + 1).replace('{files}', numFiles));
                    $container.addClass('file-thumb-loading');
                    reader.onerror = function (evt) {
                        self._errorHandler(evt, caption);
                    };
                    reader.onload = function (theFile) {
                        self._previewFile(i, file, theFile, previewId, previewData);
                        self._initFileActions();
                    };
                    reader.onloadend = function () {
                        msg = msgProgress
                            .replace('{index}', i + 1).replace('{files}', numFiles)
                            .replace('{percent}', 50).replace('{name}', caption);
                        setTimeout(function () {
                            $status.html(msg);
                            self._updateFileDetails(numFiles);
                            readFile(i + 1);
                        }, 100);
                        self._raise('fileloaded', [file, previewId, i, reader]);
                    };
                    reader.onprogress = function (data) {
                        if (data.lengthComputable) {
                            var fact = (data.loaded / data.total) * 100, progress = Math.ceil(fact);
                            msg = msgProgress.replace('{index}', i + 1).replace('{files}', numFiles)
                                .replace('{percent}', progress).replace('{name}', caption);
                            setTimeout(function () {
                                $status.html(msg);
                            }, 100);
                        }
                    };
                    isText = isSet('text', settings) ? settings.text : defaultFileTypeSettings.text;
                    if (isText(file.type, caption)) {
                        reader.readAsText(file, self.textEncoding);
                    } else {
                        reader.readAsArrayBuffer(file);
                    }
                } else {
                    self._previewDefault(file, previewId);
                    setTimeout(function () {
                        readFile(i + 1);
                        self._updateFileDetails(numFiles);
                    }, 100);
                    self._raise('fileloaded', [file, previewId, i, reader]);
                }
                self.addToStack(file);
            };

            readFile(0);
            self._updateFileDetails(numFiles, false);
        },
        _updateFileDetails: function (numFiles) {
            var self = this, $el = self.$element, fileStack = self.getFileStack(),
                name = ($el[0].files[0] && $el[0].files[0].name) || (fileStack.length && fileStack[0].name) || '',
                label = self.slug(name), n = self.isUploadable ? fileStack.length : numFiles,
                nFiles = previewCache.count(self.id) + n, log = n > 1 ? self._getMsgSelected(nFiles) : label;
            if (self.isError) {
                self.$previewContainer.removeClass('file-thumb-loading');
                self.$previewStatus.html('');
                self.$captionContainer.find('.kv-caption-icon').hide();
            } else {
                self._showFileIcon();
            }
            self._setCaption(log, self.isError);
            self.$container.removeClass('file-input-new file-input-ajax-new');
            if (arguments.length === 1) {
                self._raise('fileselect', [numFiles, label]);
            }
            if (previewCache.count(self.id)) {
                self._initPreviewDeletes();
            }
        },
        _setThumbStatus: function ($thumb, status) {
            var self = this;
            if (!self.showPreview) {
                return;
            }
            var icon = 'indicator' + status, msg = icon + 'Title',
                css = 'file-preview-' + status.toLowerCase(),
                $indicator = $thumb.find('.file-upload-indicator'),
                config = self.fileActionSettings;
            $thumb.removeClass('file-preview-success file-preview-error file-preview-loading');
            if (status === 'Error') {
                $thumb.find('.kv-file-upload').attr('disabled', true);
            }
            $indicator.html(config[icon]);
            $indicator.attr('title', config[msg]);
            $thumb.addClass(css);
        },
        _setProgressCancelled: function () {
            var self = this;
            self._setProgress(100, self.$progress, self.msgCancelled);
        },
        _setProgress: function (p, $el, error) {
            var self = this, pct = Math.min(p, 100), template = pct < 100 ? self.progressTemplate :
                (error ? self.progressErrorTemplate : self.progressCompleteTemplate);
            $el = $el || self.$progress;
            if (!isEmpty(template)) {
                $el.html(template.replace(/\{percent}/g, pct));
                if (error) {
                    $el.find('[role="progressbar"]').html(error);
                }
            }
        },
        _setFileDropZoneTitle: function () {
            var self = this, $zone = self.$container.find('.file-drop-zone');
            $zone.find('.' + self.dropZoneTitleClass).remove();
            if (!self.isUploadable || !self.showPreview || $zone.length === 0 || self.getFileStack().length > 0 || !self.dropZoneEnabled) {
                return;
            }
            if ($zone.find('.file-preview-frame').length === 0 && isEmpty(self.defaultPreviewContent)) {
                $zone.prepend('<div class="' + self.dropZoneTitleClass + '">' + self.dropZoneTitle + '</div>');
            }
            self.$container.removeClass('file-input-new');
            addCss(self.$container, 'file-input-ajax-new');
        },
        _setAsyncUploadStatus: function (previewId, pct, total) {
            var self = this, sum = 0;
            self._setProgress(pct, $('#' + previewId).find('.file-thumb-progress'));
            self.uploadStatus[previewId] = pct;
            $.each(self.uploadStatus, function (key, value) {
                sum += value;
            });
            self._setProgress(Math.ceil(sum / total));

        },
        _validateMinCount: function () {
            var self = this, len = self.isUploadable ? self.getFileStack().length : self.$element.get(0).files.length;
            if (self.validateInitialCount && self.minFileCount > 0 && self._getFileCount(
                    len - 1) < self.minFileCount) {
                self._noFilesError({});
                return false;
            }
            return true;
        },
        _getFileCount: function (fileCount) {
            var self = this, addCount = 0;
            if (self.validateInitialCount && !self.overwriteInitial) {
                addCount = previewCache.count(self.id);
                fileCount += addCount;
            }
            return fileCount;
        },
        _getFileName: function (file) {
            return file && file.name ? this.slug(file.name) : undefined;
        },
        _getFileNames: function (skipNull) {
            var self = this;
            return self.filenames.filter(function (n) {
                return (skipNull ? n !== undefined : n !== undefined && n !== null);
            });
        },
        _setPreviewError: function ($thumb, i, val) {
            var self = this;
            if (i) {
                self.updateStack(i, val);
            }
            if (self.removeFromPreviewOnError) {
                $thumb.remove();
            } else {
                self._setThumbStatus($thumb, 'Error');
            }
        },
        _checkDimensions: function (i, chk, $img, $thumb, fname, type, params) {
            var self = this, msg, dim, tag = chk === 'Small' ? 'min' : 'max', limit = self[tag + 'Image' + type],
                $imgEl, isValid;
            if (isEmpty(limit) || !$img.length) {
                return;
            }
            $imgEl = $img[0];
            dim = (type === 'Width') ? $imgEl.naturalWidth || $imgEl.width : $imgEl.naturalHeight || $imgEl.height;
            isValid = chk === 'Small' ? dim >= limit : dim <= limit;
            if (isValid) {
                return;
            }
            msg = self['msgImage' + type + chk].replace('{name}', fname).replace('{size}', limit);
            self._showUploadError(msg, params);
            self._setPreviewError($thumb, i, null);
        },
        _validateImage: function (i, previewId, fname, ftype) {
            var self = this, $preview = self.$preview, params, w1, w2,
                $thumb = $preview.find("#" + previewId), $img = $thumb.find('img');
            fname = fname || 'Untitled';
            if (!$img.length) {
                return;
            }
            handler($img, 'load', function () {
                w1 = $thumb.width();
                w2 = $preview.width();
                if (w1 > w2) {
                    $img.css('width', '100%');
                    $thumb.css('width', '97%');
                }
                params = {ind: i, id: previewId};
                self._checkDimensions(i, 'Small', $img, $thumb, fname, 'Width', params);
                self._checkDimensions(i, 'Small', $img, $thumb, fname, 'Height', params);
                if (!self.resizeImage) {
                    self._checkDimensions(i, 'Large', $img, $thumb, fname, 'Width', params);
                    self._checkDimensions(i, 'Large', $img, $thumb, fname, 'Height', params);
                }
                self._raise('fileimageloaded', [previewId]);
                self.loadedImages.push({ind: i, img: $img, thumb: $thumb, pid: previewId, typ: ftype});
                self._validateAllImages();
                objUrl.revokeObjectURL($img.attr('src'));
            });
        },
        _validateAllImages: function () {
            var self = this, i, config, $img, $thumb, pid, ind, params = {}, errFunc;
            if (self.loadedImages.length !== self.totalImagesCount) {
                return;
            }
            self._raise('fileimagesloaded');
            if (!self.resizeImage) {
                return;
            }
            errFunc = self.isUploadable ? self._showUploadError : self._showError;
            for (i = 0; i < self.loadedImages.length; i++) {
                config = self.loadedImages[i];
                $img = config.img;
                $thumb = config.thumb;
                pid = config.pid;
                ind = config.ind;
                params = {id: pid, 'index': ind};
                if (!self._getResizedImage($img[0], config.typ, pid, ind)) {
                    errFunc(self.msgImageResizeError, params, 'fileimageresizeerror');
                    self._setPreviewError($thumb, ind);
                }
            }
            self._raise('fileimagesresized');
        },
        _getResizedImage: function (image, type, pid, ind) {
            var self = this, width = image.naturalWidth, height = image.naturalHeight, ratio = 1,
                maxWidth = self.maxImageWidth || width, maxHeight = self.maxImageHeight || height,
                isValidImage = (width && height), chkWidth, chkHeight,
                canvas = self.imageCanvas, context = self.imageCanvasContext;
            if (!isValidImage) {
                return false;
            }
            if (width === maxWidth && height === maxHeight) {
                return true;
            }
            type = type || self.resizeDefaultImageType;
            chkWidth = width > maxWidth;
            chkHeight = height > maxHeight;
            if (self.resizePreference === 'width') {
                ratio = chkWidth ? maxWidth / width : (chkHeight ? maxHeight / height : 1);
            } else {
                ratio = chkHeight ? maxHeight / height : (chkWidth ? maxWidth / width : 1);
            }
            self._resetCanvas();
            width *= ratio;
            height *= ratio;
            canvas.width = width;
            canvas.height = height;
            try {
                context.drawImage(image, 0, 0, width, height);
                canvas.toBlob(function (blob) {
                    self._raise('fileimageresized', [pid, ind]);
                    self.filestack[ind] = blob;
                }, type, self.resizeQuality);
                return true;
            }
            catch (err) {
                return false;
            }
        },
        _initBrowse: function ($container) {
            var self = this;
            self.$btnFile = $container.find('.btn-file');
            self.$btnFile.append(self.$element);
        },
        _initCaption: function () {
            var self = this, cap = self.initialCaption || '';
            if (self.overwriteInitial || isEmpty(cap)) {
                self.$caption.html('');
                return false;
            }
            self._setCaption(cap);
            return true;
        },
        _setCaption: function (content, isError) {
            var self = this, title, out, n, cap, stack = self.getFileStack();
            if (!self.$caption.length) {
                return;
            }
            if (isError) {
                title = $('<div>' + self.msgValidationError + '</div>').text();
                n = stack.length;
                if (n) {
                    cap = n === 1 && stack[0] ? self._getFileNames()[0] : self._getMsgSelected(n);
                } else {
                    cap = self._getMsgSelected(self.msgNo);
                }
                out = '<span class="' + self.msgValidationErrorClass + '">' + self.msgValidationErrorIcon +
                    (isEmpty(content) ? cap : content) + '</span>';
            } else {
                if (isEmpty(content)) {
                    return;
                }
                title = $('<div>' + content + '</div>').text();
                out = self._getLayoutTemplate('icon') + title;
            }
            self.$caption.html(out);
            self.$caption.attr('title', title);
            self.$captionContainer.find('.file-caption-ellipsis').attr('title', title);
        },
        _createContainer: function () {
            var self = this,
                $container = $(document.createElement("div"))
                    .attr({"class": 'file-input file-input-new'})
                    .html(self._renderMain());
            self.$element.before($container);
            self._initBrowse($container);
            return $container;
        },
        _refreshContainer: function () {
            var self = this, $container = self.$container;
            $container.before(self.$element);
            $container.html(self._renderMain());
            self._initBrowse($container);
        },
        _renderMain: function () {
            var self = this, dropCss = (self.isUploadable && self.dropZoneEnabled) ? ' file-drop-zone' : 'file-drop-disabled',
                close = !self.showClose ? '' : self._getLayoutTemplate('close'),
                preview = !self.showPreview ? '' : self._getLayoutTemplate('preview')
                    .replace(/\{class}/g, self.previewClass)
                    .replace(/\{dropClass}/g, dropCss),
                css = self.isDisabled ? self.captionClass + ' file-caption-disabled' : self.captionClass,
                caption = self.captionTemplate.replace(/\{class}/g, css + ' kv-fileinput-caption');
            return self.mainTemplate.replace(/\{class}/g, self.mainClass)
                .replace(/\{preview}/g, preview)
                .replace(/\{close}/g, close)
                .replace(/\{caption}/g, caption)
                .replace(/\{upload}/g, self._renderButton('upload'))
                .replace(/\{remove}/g, self._renderButton('remove'))
                .replace(/\{cancel}/g, self._renderButton('cancel'))
                .replace(/\{browse}/g, self._renderButton('browse'));
        },
        _renderButton: function (type) {
            var self = this, tmplt = self._getLayoutTemplate('btnDefault'), css = self[type + 'Class'],
                title = self[type + 'Title'], icon = self[type + 'Icon'], label = self[type + 'Label'],
                status = self.isDisabled ? ' disabled' : '', btnType = 'button';
            switch (type) {
                case 'remove':
                    if (!self.showRemove) {
                        return '';
                    }
                    break;
                case 'cancel':
                    if (!self.showCancel) {
                        return '';
                    }
                    css += ' hide';
                    break;
                case 'upload':
                    if (!self.showUpload) {
                        return '';
                    }
                    if (self.isUploadable && !self.isDisabled) {
                        tmplt = self._getLayoutTemplate('btnLink').replace('{href}', self.uploadUrl);
                    } else {
                        btnType = 'submit';
                    }
                    break;
                case 'browse':
                    tmplt = self._getLayoutTemplate('btnBrowse');
                    break;
                default:
                    return '';
            }
            css += type === 'browse' ? ' btn-file' : ' fileinput-' + type + ' fileinput-' + type + '-button';
            if (!isEmpty(label)) {
                label = ' <span class="' + self.buttonLabelClass + '">' + label + '</span>';
            }
            return tmplt.replace('{type}', btnType)
                .replace('{css}', css)
                .replace('{title}', title)
                .replace('{status}', status)
                .replace('{icon}', icon)
                .replace('{label}', label);
        },
        _renderThumbProgress: function () {
            return '<div class="file-thumb-progress hide">' + this.progressTemplate.replace(/\{percent}/g,
                    '0') + '</div>';
        },
        _renderFileFooter: function (caption, width) {
            var self = this, config = self.fileActionSettings, footer, out, template = self._getLayoutTemplate(
                'footer');
            if (self.isUploadable) {
                footer = template.replace(/\{actions}/g, self._renderFileActions(true, true, false, false, false));
                out = footer.replace(/\{caption}/g, caption)
                    .replace(/\{width}/g, width)
                    .replace(/\{progress}/g, self._renderThumbProgress())
                    .replace(/\{indicator}/g, config.indicatorNew)
                    .replace(/\{indicatorTitle}/g, config.indicatorNewTitle);
            } else {
                out = template.replace(/\{actions}/g, '')
                    .replace(/\{caption}/g, caption)
                    .replace(/\{progress}/g, '')
                    .replace(/\{width}/g, width)
                    .replace(/\{indicator}/g, '')
                    .replace(/\{indicatorTitle}/g, '');
            }
            out = replaceTags(out, self.previewThumbTags);
            return out;
        },
        _renderFileActions: function (showUpload, showDelete, disabled, url, key) {
            if (!showUpload && !showDelete) {
                return '';
            }
            var self = this,
                vUrl = url === false ? '' : ' data-url="' + url + '"',
                vKey = key === false ? '' : ' data-key="' + key + '"',
                btnDelete = self._getLayoutTemplate('actionDelete'),
                btnUpload = '',
                template = self._getLayoutTemplate('actions'),
                otherButtons = self.otherActionButtons.replace(/\{dataKey}/g, vKey),
                config = self.fileActionSettings,
                removeClass = disabled ? config.removeClass + ' disabled' : config.removeClass;
            btnDelete = btnDelete
                .replace(/\{removeClass}/g, removeClass)
                .replace(/\{removeIcon}/g, config.removeIcon)
                .replace(/\{removeTitle}/g, config.removeTitle)
                .replace(/\{dataUrl}/g, vUrl)
                .replace(/\{dataKey}/g, vKey);
            if (showUpload) {
                btnUpload = self._getLayoutTemplate('actionUpload')
                    .replace(/\{uploadClass}/g, config.uploadClass)
                    .replace(/\{uploadIcon}/g, config.uploadIcon)
                    .replace(/\{uploadTitle}/g, config.uploadTitle);
            }
            return template
                .replace(/\{delete}/g, btnDelete)
                .replace(/\{upload}/g, btnUpload)
                .replace(/\{other}/g, otherButtons);
        },
        _browse: function (e) {
            var self = this;
            self._raise('filebrowse');
            if (e && e.isDefaultPrevented()) {
                return;
            }
            if (self.isError && !self.isUploadable) {
                self.clear();
            }
            self.$captionContainer.focus();
        },
        _change: function (e) {
            var self = this, $el = self.$element;
            if (!self.isUploadable && isEmpty($el.val()) && self.fileInputCleared) { // IE 11 fix
                self.fileInputCleared = false;
                return;
            }
            self.fileInputCleared = false;
            var tfiles, msg, total, isDragDrop = arguments.length > 1, isAjaxUpload = self.isUploadable, i = 0, f, n, len,
                files = isDragDrop ? e.originalEvent.dataTransfer.files : $el.get(0).files, ctr = self.filestack.length,
                isSingleUpload = isEmpty($el.attr('multiple')), flagSingle = (isSingleUpload && ctr > 0), folders = 0,
                throwError = function (mesg, file, previewId, index) {
                    var p1 = $.extend(true, {}, self._getOutData({}, {}, files), {id: previewId, index: index}),
                        p2 = {id: previewId, index: index, file: file, files: files};
                    return self.isUploadable ? self._showUploadError(mesg, p1) : self._showError(mesg, p2);
                };
            self.reader = null;
            self._resetUpload();
            self._hideFileIcon();
            if (self.isUploadable) {
                self.$container.find('.file-drop-zone .' + self.dropZoneTitleClass).remove();
            }
            if (isDragDrop) {
                tfiles = [];
                while (files[i]) {
                    f = files[i];
                    if (!f.type && f.size % 4096 === 0) {
                        folders++;
                    } else {
                        tfiles.push(f);
                    }
                    i++;
                }
            } else {
                if (e.target.files === undefined) {
                    tfiles = e.target && e.target.value ? [
                        {name: e.target.value.replace(/^.+\\/, '')}
                    ] : [];
                } else {
                    tfiles = e.target.files;
                }
            }
            if (isEmpty(tfiles) || tfiles.length === 0) {
                if (!isAjaxUpload) {
                    self.clear();
                }
                self._showFolderError(folders);
                self._raise('fileselectnone');
                return;
            }
            self._resetErrors();
            len = tfiles.length;
            total = self._getFileCount(self.isUploadable ? (self.getFileStack().length + len) : len);
            if (self.maxFileCount > 0 && total > self.maxFileCount) {
                if (!self.autoReplace || len > self.maxFileCount) {
                    n = (self.autoReplace && len > self.maxFileCount) ? len : total;
                    msg = self.msgFilesTooMany.replace('{m}', self.maxFileCount).replace('{n}', n);
                    self.isError = throwError(msg, null, null, null);
                    self.$captionContainer.find('.kv-caption-icon').hide();
                    self._setCaption('', true);
                    self.$container.removeClass('file-input-new file-input-ajax-new');
                    return;
                }
                if (total > self.maxFileCount) {
                    self._resetPreviewThumbs(isAjaxUpload);
                }
            } else {
                if (!isAjaxUpload || flagSingle) {
                    self._resetPreviewThumbs(false);
                    if (flagSingle) {
                        self.clearStack();
                    }
                } else {
                    if (isAjaxUpload && ctr === 0 && (!previewCache.count(self.id) || self.overwriteInitial)) {
                        self._resetPreviewThumbs(true);
                    }
                }
            }
            if (self.isPreviewable) {
                self._readFiles(tfiles);
            } else {
                self._updateFileDetails(1);
            }
            self._showFolderError(folders);
        },
        _abort: function (params) {
            var self = this, data;
            if (self.ajaxAborted && typeof self.ajaxAborted === "object" && self.ajaxAborted.message !== undefined) {
                data = $.extend(true, {}, self._getOutData(), params);
                data.abortData = self.ajaxAborted.data || {};
                data.abortMessage = self.ajaxAborted.message;
                self.cancel();
                self._setProgress(100, self.$progress, self.msgCancelled);
                self._showUploadError(self.ajaxAborted.message, data, 'filecustomerror');
                return true;
            }
            return false;
        },
        _resetFileStack: function () {
            var self = this, i = 0, newstack = [], newnames = [];
            self._getThumbs().each(function () {
                var $thumb = $(this), ind = $thumb.attr('data-fileindex'),
                    file = self.filestack[ind];
                if (ind === -1) {
                    return;
                }
                if (file !== undefined) {
                    newstack[i] = file;
                    newnames[i] = self._getFileName(file);
                    $thumb.attr({
                        'id': self.previewInitId + '-' + i,
                        'data-fileindex': i
                    });
                    i++;
                } else {
                    $thumb.attr({
                        'id': 'uploaded-' + uniqId(),
                        'data-fileindex': '-1'
                    });
                }
            });
            self.filestack = newstack;
            self.filenames = newnames;
        },
        clearStack: function () {
            var self = this;
            self.filestack = [];
            self.filenames = [];
            return self.$element;
        },
        updateStack: function (i, file) {
            var self = this;
            self.filestack[i] = file;
            self.filenames[i] = self._getFileName(file);
            return self.$element;
        },
        addToStack: function (file) {
            var self = this;
            self.filestack.push(file);
            self.filenames.push(self._getFileName(file));
            return self.$element;
        },
        getFileStack: function (skipNull) {
            var self = this;
            return self.filestack.filter(function (n) {
                return (skipNull ? n !== undefined : n !== undefined && n !== null);
            });
        },
        lock: function () {
            var self = this;
            self._resetErrors();
            self.disable();
            if (self.showRemove) {
                addCss(self.$container.find('.fileinput-remove'), 'hide');
            }
            if (self.showCancel) {
                self.$container.find('.fileinput-cancel').removeClass('hide');
            }
            self._raise('filelock', [self.filestack, self._getExtraData()]);
            return self.$element;
        },
        unlock: function (reset) {
            var self = this;
            if (reset === undefined) {
                reset = true;
            }
            self.enable();
            if (self.showCancel) {
                addCss(self.$container.find('.fileinput-cancel'), 'hide');
            }
            if (self.showRemove) {
                self.$container.find('.fileinput-remove').removeClass('hide');
            }
            if (reset) {
                self._resetFileStack();
            }
            self._raise('fileunlock', [self.filestack, self._getExtraData()]);
            return self.$element;
        },
        cancel: function () {
            var self = this, xhr = self.ajaxRequests, len = xhr.length, i;
            if (len > 0) {
                for (i = 0; i < len; i += 1) {
                    self.cancelling = true;
                    xhr[i].abort();
                }
            }
            self._setProgressCancelled();
            self._getThumbs().each(function () {
                var $thumb = $(this), ind = $thumb.attr('data-fileindex');
                $thumb.removeClass('file-uploading');
                if (self.filestack[ind] !== undefined) {
                    $thumb.find('.kv-file-upload').removeClass('disabled').removeAttr('disabled');
                    $thumb.find('.kv-file-remove').removeClass('disabled').removeAttr('disabled');
                }
                self.unlock();
            });
            return self.$element;
        },
        clear: function () {
            var self = this, cap;
            self.$btnUpload.removeAttr('disabled');
            self._getThumbs().find('video,audio,img').each(function () {
                cleanMemory($(this));
            });
            self._resetUpload();
            self.clearStack();
            self._clearFileInput();
            self._resetErrors(true);
            self._raise('fileclear');
            if (self._hasInitialPreview()) {
                self._showFileIcon();
                self._resetPreview();
                self._initPreviewDeletes();
                self.$container.removeClass('file-input-new');
            } else {
                self._getThumbs().each(function () {
                    self._clearObjects($(this));
                });
                if (self.isUploadable) {
                    previewCache.data[self.id] = {};
                }
                self.$preview.html('');
                cap = (!self.overwriteInitial && self.initialCaption.length > 0) ? self.initialCaption : '';
                self._setCaption(cap);
                self.$caption.attr('title', '');
                addCss(self.$container, 'file-input-new');
                self._validateDefaultPreview();
            }
            if (self.$container.find('.file-preview-frame').length === 0) {
                if (!self._initCaption()) {
                    self.$captionContainer.find('.kv-caption-icon').hide();
                }
            }
            self._hideFileIcon();
            self._raise('filecleared');
            self.$captionContainer.focus();
            self._setFileDropZoneTitle();
            return self.$element;
        },
        reset: function () {
            var self = this;
            self._resetPreview();
            self.$container.find('.fileinput-filename').text('');
            self._raise('filereset');
            addCss(self.$container, 'file-input-new');
            if (self.$preview.find('.file-preview-frame').length || self.isUploadable && self.dropZoneEnabled) {
                self.$container.removeClass('file-input-new');
            }
            self._setFileDropZoneTitle();
            self.clearStack();
            self.formdata = {};
            return self.$element;
        },
        disable: function () {
            var self = this;
            self.isDisabled = true;
            self._raise('filedisabled');
            self.$element.attr('disabled', 'disabled');
            self.$container.find(".kv-fileinput-caption").addClass("file-caption-disabled");
            self.$container.find(".btn-file, .fileinput-remove, .fileinput-upload, .file-preview-frame button").attr(
                "disabled",
                true);
            self._initDragDrop();
            return self.$element;
        },
        enable: function () {
            var self = this;
            self.isDisabled = false;
            self._raise('fileenabled');
            self.$element.removeAttr('disabled');
            self.$container.find(".kv-fileinput-caption").removeClass("file-caption-disabled");
            self.$container.find(
                ".btn-file, .fileinput-remove, .fileinput-upload, .file-preview-frame button").removeAttr("disabled");
            self._initDragDrop();
            return self.$element;
        },
        upload: function () {
            var self = this, totLen = self.getFileStack().length, params = {},
                i, outData, len, hasExtraData = !$.isEmptyObject(self._getExtraData());
            if (self.minFileCount > 0 && self._getFileCount(totLen) < self.minFileCount) {
                self._noFilesError(params);
                return;
            }
            if (!self.isUploadable || self.isDisabled || (totLen === 0 && !hasExtraData)) {
                return;
            }
            self._resetUpload();
            self.$progress.removeClass('hide');
            self.uploadCount = 0;
            self.uploadStatus = {};
            self.uploadLog = [];
            self.lock();
            self._setProgress(2);
            if (totLen === 0 && hasExtraData) {
                self._uploadExtraOnly();
                return;
            }
            len = self.filestack.length;
            self.hasInitData = false;
            if (self.uploadAsync) {
                outData = self._getOutData();
                self._raise('filebatchpreupload', [outData]);
                self.fileBatchCompleted = false;
                self.uploadCache = {content: [], config: [], tags: [], append: true};
                self.uploadAsyncCount = self.getFileStack().length;
                for (i = 0; i < len; i++) {
                    self.uploadCache.content[i] = null;
                    self.uploadCache.config[i] = null;
                    self.uploadCache.tags[i] = null;
                }
                for (i = 0; i < len; i++) {
                    if (self.filestack[i] !== undefined) {
                        self._uploadSingle(i, self.filestack, true);
                    }
                }
                return;
            }
            self._uploadBatch();
            return self.$element;
        },
        destroy: function () {
            var self = this, $cont = self.$container;
            $cont.find('.file-drop-zone').off();
            self.$element.insertBefore($cont).off(NAMESPACE).removeData();
            $cont.off().remove();
            return self.$element;
        },
        refresh: function (options) {
            var self = this, $el = self.$element;
            options = options ? $.extend(true, {}, self.options, options) : self.options;
            self.destroy();
            $el.fileinput(options);
            if ($el.val()) {
                $el.trigger('change.fileinput');
            }
            return $el;
        }
    };

    $.fn.fileinput = function (option) {
        if (!hasFileAPISupport() && !isIE(9)) {
            return;
        }
        var args = Array.apply(null, arguments), retvals = [];
        args.shift();
        this.each(function () {
            var self = $(this), data = self.data('fileinput'), options = typeof option === 'object' && option,
                lang = options.language || self.data('language') || 'en', loc = {}, opts;

            if (!data) {
                if (lang !== 'en' && !isEmpty($.fn.fileinputLocales[lang])) {
                    loc = $.fn.fileinputLocales[lang];
                }
                opts = $.extend(true, {}, $.fn.fileinput.defaults, $.fn.fileinputLocales.en, loc, options, self.data());
                data = new FileInput(this, opts);
                self.data('fileinput', data);
            }

            if (typeof option === 'string') {
                retvals.push(data[option].apply(data, args));
            }
        });
        switch (retvals.length) {
            case 0:
                return this;
            case 1:
                return retvals[0];
            default:
                return retvals;
        }
    };

    $.fn.fileinput.defaults = {
        language: 'en',
        showCaption: true,
        showPreview: true,
        showRemove: true,
        showUpload: true,
        showCancel: true,
        showClose: true,
        showUploadedThumbs: true,
        autoReplace: false,
        mainClass: '',
        previewClass: '',
        captionClass: '',
        mainTemplate: null,
        initialCaption: '',
        initialPreview: [],
        initialPreviewDelimiter: '*$$*',
        initialPreviewConfig: [],
        initialPreviewThumbTags: [],
        previewThumbTags: {},
        initialPreviewShowDelete: true,
        removeFromPreviewOnError: false,
        deleteUrl: '',
        deleteExtraData: {},
        overwriteInitial: true,
        layoutTemplates: defaultLayoutTemplates,
        previewTemplates: defaultPreviewTemplates,
        allowedPreviewTypes: null,
        allowedPreviewMimeTypes: null,
        allowedFileTypes: null,
        allowedFileExtensions: null,
        defaultPreviewContent: null,
        customLayoutTags: {},
        customPreviewTags: {},
        previewSettings: defaultPreviewSettings,
        fileTypeSettings: defaultFileTypeSettings,
        previewFileIcon: '<i class="glyphicon glyphicon-file"></i>',
        previewFileIconClass: 'file-icon-4x',
        previewFileIconSettings: {},
        previewFileExtSettings: {},
        buttonLabelClass: 'hidden-xs',
        browseIcon: '<i class="glyphicon glyphicon-folder-open"></i>&nbsp;',
        browseClass: 'btn btn-primary',
        removeIcon: '<i class="glyphicon glyphicon-trash"></i>',
        removeClass: 'btn btn-default',
        cancelIcon: '<i class="glyphicon glyphicon-ban-circle"></i>',
        cancelClass: 'btn btn-default',
        uploadIcon: '<i class="glyphicon glyphicon-upload"></i>',
        uploadClass: 'btn btn-default',
        uploadUrl: null,
        uploadAsync: true,
        uploadExtraData: {},
        minImageWidth: null,
        minImageHeight: null,
        maxImageWidth: null,
        maxImageHeight: null,
        resizeImage: false,
        resizePreference: 'width',
        resizeQuality: 0.92,
        resizeDefaultImageType: 'image/jpeg',
        maxFileSize: 0,
        minFileCount: 0,
        maxFileCount: 0,
        validateInitialCount: false,
        msgValidationErrorClass: 'text-danger',
        msgValidationErrorIcon: '<i class="glyphicon glyphicon-exclamation-sign"></i> ',
        msgErrorClass: 'file-error-message',
        progressThumbClass: "progress-bar progress-bar-success progress-bar-striped active",
        progressClass: "progress-bar progress-bar-success progress-bar-striped active",
        progressCompleteClass: "progress-bar progress-bar-success",
        progressErrorClass: "progress-bar progress-bar-danger",
        previewFileType: 'image',
        zoomIndicator: '<i class="glyphicon glyphicon-zoom-in"></i>',
        elCaptionContainer: null,
        elCaptionText: null,
        elPreviewContainer: null,
        elPreviewImage: null,
        elPreviewStatus: null,
        elErrorContainer: null,
        errorCloseButton: '<span class="close kv-error-close">&times;</span>',
        slugCallback: null,
        dropZoneEnabled: true,
        dropZoneTitleClass: 'file-drop-zone-title',
        fileActionSettings: {},
        otherActionButtons: '',
        textEncoding: 'UTF-8',
        ajaxSettings: {},
        ajaxDeleteSettings: {},
        showAjaxErrorDetails: true
    };

    $.fn.fileinputLocales.en = {
        fileSingle: 'file',
        filePlural: 'files',
        browseLabel: 'Browse &hellip;',
        removeLabel: 'Remove',
        removeTitle: 'Clear selected files',
        cancelLabel: 'Cancel',
        cancelTitle: 'Abort ongoing upload',
        uploadLabel: 'Upload',
        uploadTitle: 'Upload selected files',
        msgNo: 'No',
        msgCancelled: 'Cancelled',
        msgZoomTitle: 'View details',
        msgZoomModalHeading: 'Detailed Preview',
        msgSizeTooLarge: 'File "{name}" (<b>{size} KB</b>) exceeds maximum allowed upload size of <b>{maxSize} KB</b>.',
        msgFilesTooLess: 'You must select at least <b>{n}</b> {files} to upload.',
        msgFilesTooMany: 'Number of files selected for upload <b>({n})</b> exceeds maximum allowed limit of <b>{m}</b>.',
        msgFileNotFound: 'File "{name}" not found!',
        msgFileSecured: 'Security restrictions prevent reading the file "{name}".',
        msgFileNotReadable: 'File "{name}" is not readable.',
        msgFilePreviewAborted: 'File preview aborted for "{name}".',
        msgFilePreviewError: 'An error occurred while reading the file "{name}".',
        msgInvalidFileType: 'Invalid type for file "{name}". Only "{types}" files are supported.',
        msgInvalidFileExtension: 'Invalid extension for file "{name}". Only "{extensions}" files are supported.',
        msgUploadAborted: 'The file upload was aborted',
        msgValidationError: 'Validation Error',
        msgLoading: 'Loading file {index} of {files} &hellip;',
        msgProgress: 'Loading file {index} of {files} - {name} - {percent}% completed.',
        msgSelected: '{n} {files} selected',
        msgFoldersNotAllowed: 'Drag & drop files only! {n} folder(s) dropped were skipped.',
        msgImageWidthSmall: 'Width of image file "{name}" must be at least {size} px.',
        msgImageHeightSmall: 'Height of image file "{name}" must be at least {size} px.',
        msgImageWidthLarge: 'Width of image file "{name}" cannot exceed {size} px.',
        msgImageHeightLarge: 'Height of image file "{name}" cannot exceed {size} px.',
        msgImageResizeError: 'Could not get the image dimensions to resize.',
        msgImageResizeException: 'Error while resizing the image.<pre>{errors}</pre>',
        dropZoneTitle: 'Drag & drop files here &hellip;'
    };

    $.fn.fileinput.Constructor = FileInput;

    /**
     * Convert automatically file inputs with class 'file' into a bootstrap fileinput control.
     */
    $(document).ready(function () {
        var $input = $('input.file[type=file]');
        if ($input.length) {
            $input.fileinput();
        }
    });
}));

/*
 * Jeditable - jQuery in place edit plugin
 *
 * Copyright (c) 2006-2009 Mika Tuupola, Dylan Verheul
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/jeditable
 *
 * Based on editable by Dylan Verheul <dylan_at_dyve.net>:
 *    http://www.dyve.net/jquery/?editable
 *
 */

/**
  * Version 1.7.1
  *
  * ** means there is basic unit tests for this parameter.
  *
  * @name  Jeditable
  * @type  jQuery
  * @param String  target             (POST) URL or function to send edited content to **
  * @param Hash    options            additional options
  * @param String  options[method]    method to use to send edited content (POST or PUT) **
  * @param Function options[callback] Function to run after submitting edited content **
  * @param String  options[name]      POST parameter name of edited content
  * @param String  options[id]        POST parameter name of edited div id
  * @param Hash    options[submitdata] Extra parameters to send when submitting edited content.
  * @param String  options[type]      text, textarea or select (or any 3rd party input type) **
  * @param Integer options[rows]      number of rows if using textarea **
  * @param Integer options[cols]      number of columns if using textarea **
  * @param Mixed   options[height]    'auto', 'none' or height in pixels **
  * @param Mixed   options[width]     'auto', 'none' or width in pixels **
  * @param String  options[loadurl]   URL to fetch input content before editing **
  * @param String  options[loadtype]  Request type for load url. Should be GET or POST.
  * @param String  options[loadtext]  Text to display while loading external content.
  * @param Mixed   options[loaddata]  Extra parameters to pass when fetching content before editing.
  * @param Mixed   options[data]      Or content given as paramameter. String or function.**
  * @param String  options[indicator] indicator html to show when saving
  * @param String  options[tooltip]   optional tooltip text via title attribute **
  * @param String  options[event]     jQuery event such as 'click' of 'dblclick' **
  * @param String  options[submit]    submit button value, empty means no button **
  * @param String  options[cancel]    cancel button value, empty means no button **
  * @param String  options[cssclass]  CSS class to apply to input form. 'inherit' to copy from parent. **
  * @param String  options[style]     Style to apply to input form 'inherit' to copy from parent. **
  * @param String  options[select]    true or false, when true text is highlighted ??
  * @param String  options[placeholder] Placeholder text or html to insert when element is empty. **
  * @param String  options[onblur]    'cancel', 'submit', 'ignore' or function ??
  *
  * @param Function options[onsubmit] function(settings, original) { ... } called before submit
  * @param Function options[onreset]  function(settings, original) { ... } called before reset
  * @param Function options[onerror]  function(settings, original, xhr) { ... } called on error
  *
  * @param Hash    options[ajaxoptions]  jQuery Ajax options. See docs.jquery.com.
  *
  */

(function($) {

    $.fn.editable = function(target, options) {

        if ('disable' == target) {
            $(this).data('disabled.editable', true);
            return;
        }
        if ('enable' == target) {
            $(this).data('disabled.editable', false);
            return;
        }
        if ('destroy' == target) {
            $(this)
                .unbind($(this).data('event.editable'))
                .removeData('disabled.editable')
                .removeData('event.editable');
            return;
        }

        var settings = $.extend({}, $.fn.editable.defaults, {target:target}, options);

        /* setup some functions */
        var plugin   = $.editable.types[settings.type].plugin || function() { };
        var submit   = $.editable.types[settings.type].submit || function() { };
        var buttons  = $.editable.types[settings.type].buttons
                    || $.editable.types['defaults'].buttons;
        var content  = $.editable.types[settings.type].content
                    || $.editable.types['defaults'].content;
        var element  = $.editable.types[settings.type].element
                    || $.editable.types['defaults'].element;
        var reset    = $.editable.types[settings.type].reset
                    || $.editable.types['defaults'].reset;
        var callback = settings.callback || function() { };
        var onedit   = settings.onedit   || function() { };
        var onsubmit = settings.onsubmit || function() { };
        var onreset  = settings.onreset  || function() { };
        var onerror  = settings.onerror  || reset;

        /* show tooltip */
        if (settings.tooltip) {
            $(this).attr('title', settings.tooltip);
        }

        settings.autowidth  = 'auto' == settings.width;
        settings.autoheight = 'auto' == settings.height;

        return this.each(function() {

            /* save this to self because this changes when scope changes */
            var self = this;

            /* inlined block elements lose their width and height after first edit */
            /* save them for later use as workaround */
            var savedwidth  = $(self).width();
            var savedheight = $(self).height();

            /* save so it can be later used by $.editable('destroy') */
            $(this).data('event.editable', settings.event);

            /* if element is empty add something clickable (if requested) */
            if (!$.trim($(this).html())) {
                $(this).html(settings.placeholder);
            }

            $(this).bind(settings.event, function(e) {

                /* abort if disabled for this element */
                if (true === $(this).data('disabled.editable')) {
                    return;
                }

                /* prevent throwing an exeption if edit field is clicked again */
                if (self.editing) {
                    return;
                }

                /* abort if onedit hook returns false */
                if (false === onedit.apply(this, [settings, self])) {
                   return;
                }

                /* prevent default action and bubbling */
                e.preventDefault();
                e.stopPropagation();

                /* remove tooltip */
                if (settings.tooltip) {
                    $(self).removeAttr('title');
                }

                /* figure out how wide and tall we are, saved width and height */
                /* are workaround for http://dev.jquery.com/ticket/2190 */
                if (0 == $(self).width()) {
                    //$(self).css('visibility', 'hidden');
                    settings.width  = savedwidth;
                    settings.height = savedheight;
                } else {
                    if (settings.width != 'none') {
                        settings.width =
                            settings.autowidth ? $(self).width()  : settings.width;
                    }
                    if (settings.height != 'none') {
                        settings.height =
                            settings.autoheight ? $(self).height() : settings.height;
                    }
                }
                //$(this).css('visibility', '');

                /* remove placeholder text, replace is here because of IE */
                if ($(this).html().toLowerCase().replace(/(;|")/g, '') ==
                    settings.placeholder.toLowerCase().replace(/(;|")/g, '')) {
                        $(this).html('');
                }

                self.editing    = true;
                self.revert     = $(self).html();
                $(self).html('');

                /* create the form object */
                var form = $('<form />');

                /* apply css or style or both */
                if (settings.cssclass) {
                    if ('inherit' == settings.cssclass) {
                        form.attr('class', $(self).attr('class'));
                    } else {
                        form.attr('class', settings.cssclass);
                    }
                }

                if (settings.style) {
                    if ('inherit' == settings.style) {
                        form.attr('style', $(self).attr('style'));
                        /* IE needs the second line or display wont be inherited */
                        form.css('display', $(self).css('display'));
                    } else {
                        form.attr('style', settings.style);
                    }
                }

                /* add main input element to form and store it in input */
                var input = element.apply(form, [settings, self]);

                /* set input content via POST, GET, given data or existing value */
                var input_content;

                if (settings.loadurl) {
                    var t = setTimeout(function() {
                        input.disabled = true;
                        content.apply(form, [settings.loadtext, settings, self]);
                    }, 100);

                    var loaddata = {};
                    loaddata[settings.id] = self.id;
                    if ($.isFunction(settings.loaddata)) {
                        $.extend(loaddata, settings.loaddata.apply(self, [self.revert, settings]));
                    } else {
                        $.extend(loaddata, settings.loaddata);
                    }
                    $.ajax({
                       type : settings.loadtype,
                       url  : settings.loadurl,
                       data : loaddata,
                       async : false,
                       success: function(result) {
                          window.clearTimeout(t);
                          input_content = result;
                          input.disabled = false;
                       }
                    });
                } else if (settings.data) {
                    input_content = settings.data;
                    if ($.isFunction(settings.data)) {
                        input_content = settings.data.apply(self, [self.revert, settings]);
                    }
                } else {
                    input_content = self.revert;
                }
                content.apply(form, [input_content, settings, self]);

                input.attr('name', settings.name);

                /* add buttons to the form */
                buttons.apply(form, [settings, self]);

                /* add created form to self */
                $(self).append(form);

                /* attach 3rd party plugin if requested */
                plugin.apply(form, [settings, self]);

                /* focus to first visible form element */
                $(':input:visible:enabled:first', form).focus();

                /* highlight input contents when requested */
                if (settings.select) {
                    input.select();
                }

                /* discard changes if pressing esc */
                input.keydown(function(e) {
                    if (e.keyCode == 27) {
                        e.preventDefault();
                        //self.reset();
                        reset.apply(form, [settings, self]);
                    }
                });

                /* discard, submit or nothing with changes when clicking outside */
                /* do nothing is usable when navigating with tab */
                var t;
                if ('cancel' == settings.onblur) {
                    input.blur(function(e) {
                        /* prevent canceling if submit was clicked */
                        t = setTimeout(function() {
                            reset.apply(form, [settings, self]);
                        }, 500);
                    });
                } else if ('submit' == settings.onblur) {
                    input.blur(function(e) {
                        /* prevent double submit if submit was clicked */
                        t = setTimeout(function() {
                            form.submit();
                        }, 200);
                    });
                } else if ($.isFunction(settings.onblur)) {
                    input.blur(function(e) {
                        settings.onblur.apply(self, [input.val(), settings]);
                    });
                } else {
                    input.blur(function(e) {
                      /* TODO: maybe something here */
                    });
                }

                form.submit(function(e) {

                    if (t) {
                        clearTimeout(t);
                    }

                    /* do no submit */
                    e.preventDefault();

                    /* call before submit hook. */
                    /* if it returns false abort submitting */
                    if (false !== onsubmit.apply(form, [settings, self])) {
                        /* custom inputs call before submit hook. */
                        /* if it returns false abort submitting */
                        if (false !== submit.apply(form, [settings, self])) {

                          /* check if given target is function */
                          if ($.isFunction(settings.target)) {
                              var str = settings.target.apply(self, [input.val(), settings]);
                              $(self).html(str);
                              self.editing = false;
                              callback.apply(self, [self.innerHTML, settings]);
                              /* TODO: this is not dry */
                              if (!$.trim($(self).html())) {
                                  $(self).html(settings.placeholder);
                              }
                          } else {
                              /* add edited content and id of edited element to POST */
                              var submitdata = {};
                              submitdata[settings.name] = input.val();
                              submitdata[settings.id] = self.id;
                              /* add extra data to be POST:ed */
                              if ($.isFunction(settings.submitdata)) {
                                  $.extend(submitdata, settings.submitdata.apply(self, [self.revert, settings]));
                              } else {
                                  $.extend(submitdata, settings.submitdata);
                              }

                              /* quick and dirty PUT support */
                              if ('PUT' == settings.method) {
                                  submitdata['_method'] = 'put';
                              }

                              /* show the saving indicator */
                              $(self).html(settings.indicator);

                              /* defaults for ajaxoptions */
                              var ajaxoptions = {
                                  type    : 'POST',
                                  data    : submitdata,
                                  dataType: 'html',
                                  url     : settings.target,
                                  success : function(result, status) {
                                      if (ajaxoptions.dataType == 'html') {
                                        $(self).html(result);
                                      }
                                      self.editing = false;
                                      callback.apply(self, [result, settings]);
                                      if (!$.trim($(self).html())) {
                                          $(self).html(settings.placeholder);
                                      }
                                  },
                                  error   : function(xhr, status, error) {
                                      onerror.apply(form, [settings, self, xhr]);
                                  }
                              };

                              /* override with what is given in settings.ajaxoptions */
                              $.extend(ajaxoptions, settings.ajaxoptions);
                              $.ajax(ajaxoptions);

                            }
                        }
                    }

                    /* show tooltip again */
                    $(self).attr('title', settings.tooltip);

                    return false;
                });
            });

            /* privileged methods */
            this.reset = function(form) {
                /* prevent calling reset twice when blurring */
                if (this.editing) {
                    /* before reset hook, if it returns false abort reseting */
                    if (false !== onreset.apply(form, [settings, self])) {
                        $(self).html(self.revert);
                        self.editing   = false;
                        if (!$.trim($(self).html())) {
                            $(self).html(settings.placeholder);
                        }
                        /* show tooltip again */
                        if (settings.tooltip) {
                            $(self).attr('title', settings.tooltip);
                        }
                    }
                }
            };
        });

    };


    $.editable = {
        types: {
            defaults: {
                element : function(settings, original) {
                    var input = $('<input type="hidden"></input>');
                    $(this).append(input);
                    return(input);
                },
                content : function(string, settings, original) {
                    $(':input:first', this).val(string);
                },
                reset : function(settings, original) {
                  original.reset(this);
                },
                buttons : function(settings, original) {
                    var form = this;
                    if (settings.submit) {
                        /* if given html string use that */
                        if (settings.submit.match(/>$/)) {
                            var submit = $(settings.submit).click(function() {
                                if (submit.attr("type") != "submit") {
                                    form.submit();
                                }
                            });
                        /* otherwise use button with given string as text */
                        } else {
                            var submit = $('<button type="submit" />');
                            submit.html(settings.submit);
                        }
                        $(this).append(submit);
                    }
                    if (settings.cancel) {
                        /* if given html string use that */
                        if (settings.cancel.match(/>$/)) {
                            var cancel = $(settings.cancel);
                        /* otherwise use button with given string as text */
                        } else {
                            var cancel = $('<button type="cancel" />');
                            cancel.html(settings.cancel);
                        }
                        $(this).append(cancel);

                        $(cancel).click(function(event) {
                            //original.reset();
                            if ($.isFunction($.editable.types[settings.type].reset)) {
                                var reset = $.editable.types[settings.type].reset;
                            } else {
                                var reset = $.editable.types['defaults'].reset;
                            }
                            reset.apply(form, [settings, original]);
                            return false;
                        });
                    }
                }
            },
            text: {
                element : function(settings, original) {
                    var input = $('<input />');
                    if (settings.width  != 'none') { input.width(settings.width);  }
                    if (settings.height != 'none') { input.height(settings.height); }
                    /* https://bugzilla.mozilla.org/show_bug.cgi?id=236791 */
                    //input[0].setAttribute('autocomplete','off');
                    input.attr('autocomplete','off');
                    $(this).append(input);
                    return(input);
                }
            },
            textarea: {
                element : function(settings, original) {
                    var textarea = $('<textarea />');
                    if (settings.rows) {
                        textarea.attr('rows', settings.rows);
                    } else if (settings.height != "none") {
                        textarea.height(settings.height);
                    }
                    if (settings.cols) {
                        textarea.attr('cols', settings.cols);
                    } else if (settings.width != "none") {
                        textarea.width(settings.width);
                    }
                    $(this).append(textarea);
                    return(textarea);
                }
            },
            select: {
               element : function(settings, original) {
                    var select = $('<select />');
                    $(this).append(select);
                    return(select);
                },
                content : function(data, settings, original) {
                    /* If it is string assume it is json. */
                    if (String == data.constructor) {
                        eval ('var json = ' + data);
                    } else {
                    /* Otherwise assume it is a hash already. */
                        var json = data;
                    }
                    for (var key in json) {
                        if (!json.hasOwnProperty(key)) {
                            continue;
                        }
                        if ('selected' == key) {
                            continue;
                        }
                        var option = $('<option />').val(key).append(json[key]);
                        $('select', this).append(option);
                    }
                    /* Loop option again to set selected. IE needed this... */
                    $('select', this).children().each(function() {
                        if ($(this).val() == json['selected'] ||
                            $(this).text() == $.trim(original.revert)) {
                                $(this).attr('selected', 'selected');
                        }
                    });
                }
            }
        },

        /* Add new input type */
        addInputType: function(name, input) {
            $.editable.types[name] = input;
        }
    };

    // publicly accessible defaults
    $.fn.editable.defaults = {
        name       : 'value',
        id         : 'id',
        type       : 'text',
        width      : 'auto',
        height     : 'auto',
        event      : 'click.editable',
        onblur     : 'cancel',
        loadtype   : 'GET',
        loadtext   : 'Loading...',
        placeholder: 'Click to edit',
        loaddata   : {},
        submitdata : {},
        ajaxoptions: {}
    };

})(jQuery);

// Released under MIT license
// Copyright (c) 2009-2010 Dominic Baggott
// Copyright (c) 2009-2010 Ash Berlin
// Copyright (c) 2011 Christoph Dorn <christoph@christophdorn.com> (http://www.christophdorn.com)

(function( expose ) {

/**
 *  class Markdown
 *
 *  Markdown processing in Javascript done right. We have very particular views
 *  on what constitutes 'right' which include:
 *
 *  - produces well-formed HTML (this means that em and strong nesting is
 *    important)
 *
 *  - has an intermediate representation to allow processing of parsed data (We
 *    in fact have two, both as [JsonML]: a markdown tree and an HTML tree).
 *
 *  - is easily extensible to add new dialects without having to rewrite the
 *    entire parsing mechanics
 *
 *  - has a good test suite
 *
 *  This implementation fulfills all of these (except that the test suite could
 *  do with expanding to automatically run all the fixtures from other Markdown
 *  implementations.)
 *
 *  ##### Intermediate Representation
 *
 *  *TODO* Talk about this :) Its JsonML, but document the node names we use.
 *
 *  [JsonML]: http://jsonml.org/ "JSON Markup Language"
 **/
var Markdown = expose.Markdown = function Markdown(dialect) {
  switch (typeof dialect) {
    case "undefined":
      this.dialect = Markdown.dialects.Gruber;
      break;
    case "object":
      this.dialect = dialect;
      break;
    default:
      if (dialect in Markdown.dialects) {
        this.dialect = Markdown.dialects[dialect];
      }
      else {
        throw new Error("Unknown Markdown dialect '" + String(dialect) + "'");
      }
      break;
  }
  this.em_state = [];
  this.strong_state = [];
  this.debug_indent = "";
};

/**
 *  parse( markdown, [dialect] ) -> JsonML
 *  - markdown (String): markdown string to parse
 *  - dialect (String | Dialect): the dialect to use, defaults to gruber
 *
 *  Parse `markdown` and return a markdown document as a Markdown.JsonML tree.
 **/
expose.parse = function( source, dialect ) {
  // dialect will default if undefined
  var md = new Markdown( dialect );
  return md.toTree( source );
};

/**
 *  toHTML( markdown, [dialect]  ) -> String
 *  toHTML( md_tree ) -> String
 *  - markdown (String): markdown string to parse
 *  - md_tree (Markdown.JsonML): parsed markdown tree
 *
 *  Take markdown (either as a string or as a JsonML tree) and run it through
 *  [[toHTMLTree]] then turn it into a well-formated HTML fragment.
 **/
expose.toHTML = function toHTML( source , dialect , options ) {
  var input = expose.toHTMLTree( source , dialect , options );

  return expose.renderJsonML( input );
};

/**
 *  toHTMLTree( markdown, [dialect] ) -> JsonML
 *  toHTMLTree( md_tree ) -> JsonML
 *  - markdown (String): markdown string to parse
 *  - dialect (String | Dialect): the dialect to use, defaults to gruber
 *  - md_tree (Markdown.JsonML): parsed markdown tree
 *
 *  Turn markdown into HTML, represented as a JsonML tree. If a string is given
 *  to this function, it is first parsed into a markdown tree by calling
 *  [[parse]].
 **/
expose.toHTMLTree = function toHTMLTree( input, dialect , options ) {
  // convert string input to an MD tree
  if ( typeof input ==="string" ) input = this.parse( input, dialect );

  // Now convert the MD tree to an HTML tree

  // remove references from the tree
  var attrs = extract_attr( input ),
      refs = {};

  if ( attrs && attrs.references ) {
    refs = attrs.references;
  }

  var html = convert_tree_to_html( input, refs , options );
  merge_text_nodes( html );
  return html;
};

// For Spidermonkey based engines
function mk_block_toSource() {
  return "Markdown.mk_block( " +
          uneval(this.toString()) +
          ", " +
          uneval(this.trailing) +
          ", " +
          uneval(this.lineNumber) +
          " )";
}

// node
function mk_block_inspect() {
  var util = require('util');
  return "Markdown.mk_block( " +
          util.inspect(this.toString()) +
          ", " +
          util.inspect(this.trailing) +
          ", " +
          util.inspect(this.lineNumber) +
          " )";

}

var mk_block = Markdown.mk_block = function(block, trail, line) {
  // Be helpful for default case in tests.
  if ( arguments.length == 1 ) trail = "\n\n";

  var s = new String(block);
  s.trailing = trail;
  // To make it clear its not just a string
  s.inspect = mk_block_inspect;
  s.toSource = mk_block_toSource;

  if (line != undefined)
    s.lineNumber = line;

  return s;
};

function count_lines( str ) {
  var n = 0, i = -1;
  while ( ( i = str.indexOf('\n', i+1) ) !== -1) n++;
  return n;
}

// Internal - split source into rough blocks
Markdown.prototype.split_blocks = function splitBlocks( input, startLine ) {
  // [\s\S] matches _anything_ (newline or space)
  var re = /([\s\S]+?)($|\n(?:\s*\n|$)+)/g,
      blocks = [],
      m;

  var line_no = 1;

  if ( ( m = /^(\s*\n)/.exec(input) ) != null ) {
    // skip (but count) leading blank lines
    line_no += count_lines( m[0] );
    re.lastIndex = m[0].length;
  }

  while ( ( m = re.exec(input) ) !== null ) {
    blocks.push( mk_block( m[1], m[2], line_no ) );
    line_no += count_lines( m[0] );
  }

  return blocks;
};

/**
 *  Markdown#processBlock( block, next ) -> undefined | [ JsonML, ... ]
 *  - block (String): the block to process
 *  - next (Array): the following blocks
 *
 * Process `block` and return an array of JsonML nodes representing `block`.
 *
 * It does this by asking each block level function in the dialect to process
 * the block until one can. Succesful handling is indicated by returning an
 * array (with zero or more JsonML nodes), failure by a false value.
 *
 * Blocks handlers are responsible for calling [[Markdown#processInline]]
 * themselves as appropriate.
 *
 * If the blocks were split incorrectly or adjacent blocks need collapsing you
 * can adjust `next` in place using shift/splice etc.
 *
 * If any of this default behaviour is not right for the dialect, you can
 * define a `__call__` method on the dialect that will get invoked to handle
 * the block processing.
 */
Markdown.prototype.processBlock = function processBlock( block, next ) {
  var cbs = this.dialect.block,
      ord = cbs.__order__;

  if ( "__call__" in cbs ) {
    return cbs.__call__.call(this, block, next);
  }

  for ( var i = 0; i < ord.length; i++ ) {
    //D:this.debug( "Testing", ord[i] );
    var res = cbs[ ord[i] ].call( this, block, next );
    if ( res ) {
      //D:this.debug("  matched");
      if ( !isArray(res) || ( res.length > 0 && !( isArray(res[0]) ) ) )
        this.debug(ord[i], "didn't return a proper array");
      //D:this.debug( "" );
      return res;
    }
  }

  // Uhoh! no match! Should we throw an error?
  return [];
};

Markdown.prototype.processInline = function processInline( block ) {
  return this.dialect.inline.__call__.call( this, String( block ) );
};

/**
 *  Markdown#toTree( source ) -> JsonML
 *  - source (String): markdown source to parse
 *
 *  Parse `source` into a JsonML tree representing the markdown document.
 **/
// custom_tree means set this.tree to `custom_tree` and restore old value on return
Markdown.prototype.toTree = function toTree( source, custom_root ) {
  var blocks = source instanceof Array ? source : this.split_blocks( source );

  // Make tree a member variable so its easier to mess with in extensions
  var old_tree = this.tree;
  try {
    this.tree = custom_root || this.tree || [ "markdown" ];

    blocks:
    while ( blocks.length ) {
      var b = this.processBlock( blocks.shift(), blocks );

      // Reference blocks and the like won't return any content
      if ( !b.length ) continue blocks;

      this.tree.push.apply( this.tree, b );
    }
    return this.tree;
  }
  finally {
    if ( custom_root ) {
      this.tree = old_tree;
    }
  }
};

// Noop by default
Markdown.prototype.debug = function () {
  var args = Array.prototype.slice.call( arguments);
  args.unshift(this.debug_indent);
  if (typeof print !== "undefined")
      print.apply( print, args );
  if (typeof console !== "undefined" && typeof console.log !== "undefined")
      console.log.apply( null, args );
}

Markdown.prototype.loop_re_over_block = function( re, block, cb ) {
  // Dont use /g regexps with this
  var m,
      b = block.valueOf();

  while ( b.length && (m = re.exec(b) ) != null) {
    b = b.substr( m[0].length );
    cb.call(this, m);
  }
  return b;
};

/**
 * Markdown.dialects
 *
 * Namespace of built-in dialects.
 **/
Markdown.dialects = {};

/**
 * Markdown.dialects.Gruber
 *
 * The default dialect that follows the rules set out by John Gruber's
 * markdown.pl as closely as possible. Well actually we follow the behaviour of
 * that script which in some places is not exactly what the syntax web page
 * says.
 **/
Markdown.dialects.Gruber = {
  block: {
    atxHeader: function atxHeader( block, next ) {
      var m = block.match( /^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/ );

      if ( !m ) return undefined;

      var header = [ "header", { level: m[ 1 ].length } ];
      Array.prototype.push.apply(header, this.processInline(m[ 2 ]));

      if ( m[0].length < block.length )
        next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

      return [ header ];
    },

    setextHeader: function setextHeader( block, next ) {
      var m = block.match( /^(.*)\n([-=])\2\2+(?:\n|$)/ );

      if ( !m ) return undefined;

      var level = ( m[ 2 ] === "=" ) ? 1 : 2;
      var header = [ "header", { level : level }, m[ 1 ] ];

      if ( m[0].length < block.length )
        next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

      return [ header ];
    },

    code: function code( block, next ) {
      // |    Foo
      // |bar
      // should be a code block followed by a paragraph. Fun
      //
      // There might also be adjacent code block to merge.

      var ret = [],
          re = /^(?: {0,3}\t| {4})(.*)\n?/,
          lines;

      // 4 spaces + content
      if ( !block.match( re ) ) return undefined;

      block_search:
      do {
        // Now pull out the rest of the lines
        var b = this.loop_re_over_block(
                  re, block.valueOf(), function( m ) { ret.push( m[1] ); } );

        if (b.length) {
          // Case alluded to in first comment. push it back on as a new block
          next.unshift( mk_block(b, block.trailing) );
          break block_search;
        }
        else if (next.length) {
          // Check the next block - it might be code too
          if ( !next[0].match( re ) ) break block_search;

          // Pull how how many blanks lines follow - minus two to account for .join
          ret.push ( block.trailing.replace(/[^\n]/g, '').substring(2) );

          block = next.shift();
        }
        else {
          break block_search;
        }
      } while (true);

      return [ [ "code_block", ret.join("\n") ] ];
    },

    horizRule: function horizRule( block, next ) {
      // this needs to find any hr in the block to handle abutting blocks
      var m = block.match( /^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/ );

      if ( !m ) {
        return undefined;
      }

      var jsonml = [ [ "hr" ] ];

      // if there's a leading abutting block, process it
      if ( m[ 1 ] ) {
        jsonml.unshift.apply( jsonml, this.processBlock( m[ 1 ], [] ) );
      }

      // if there's a trailing abutting block, stick it into next
      if ( m[ 3 ] ) {
        next.unshift( mk_block( m[ 3 ] ) );
      }

      return jsonml;
    },

    // There are two types of lists. Tight and loose. Tight lists have no whitespace
    // between the items (and result in text just in the <li>) and loose lists,
    // which have an empty line between list items, resulting in (one or more)
    // paragraphs inside the <li>.
    //
    // There are all sorts weird edge cases about the original markdown.pl's
    // handling of lists:
    //
    // * Nested lists are supposed to be indented by four chars per level. But
    //   if they aren't, you can get a nested list by indenting by less than
    //   four so long as the indent doesn't match an indent of an existing list
    //   item in the 'nest stack'.
    //
    // * The type of the list (bullet or number) is controlled just by the
    //    first item at the indent. Subsequent changes are ignored unless they
    //    are for nested lists
    //
    lists: (function( ) {
      // Use a closure to hide a few variables.
      var any_list = "[*+-]|\\d+\\.",
          bullet_list = /[*+-]/,
          number_list = /\d+\./,
          // Capture leading indent as it matters for determining nested lists.
          is_list_re = new RegExp( "^( {0,3})(" + any_list + ")[ \t]+" ),
          indent_re = "(?: {0,3}\\t| {4})";

      // TODO: Cache this regexp for certain depths.
      // Create a regexp suitable for matching an li for a given stack depth
      function regex_for_depth( depth ) {

        return new RegExp(
          // m[1] = indent, m[2] = list_type
          "(?:^(" + indent_re + "{0," + depth + "} {0,3})(" + any_list + ")\\s+)|" +
          // m[3] = cont
          "(^" + indent_re + "{0," + (depth-1) + "}[ ]{0,4})"
        );
      }
      function expand_tab( input ) {
        return input.replace( / {0,3}\t/g, "    " );
      }

      // Add inline content `inline` to `li`. inline comes from processInline
      // so is an array of content
      function add(li, loose, inline, nl) {
        if (loose) {
          li.push( [ "para" ].concat(inline) );
          return;
        }
        // Hmmm, should this be any block level element or just paras?
        var add_to = li[li.length -1] instanceof Array && li[li.length - 1][0] == "para"
                   ? li[li.length -1]
                   : li;

        // If there is already some content in this list, add the new line in
        if (nl && li.length > 1) inline.unshift(nl);

        for (var i=0; i < inline.length; i++) {
          var what = inline[i],
              is_str = typeof what == "string";
          if (is_str && add_to.length > 1 && typeof add_to[add_to.length-1] == "string" ) {
            add_to[ add_to.length-1 ] += what;
          }
          else {
            add_to.push( what );
          }
        }
      }

      // contained means have an indent greater than the current one. On
      // *every* line in the block
      function get_contained_blocks( depth, blocks ) {

        var re = new RegExp( "^(" + indent_re + "{" + depth + "}.*?\\n?)*$" ),
            replace = new RegExp("^" + indent_re + "{" + depth + "}", "gm"),
            ret = [];

        while ( blocks.length > 0 ) {
          if ( re.exec( blocks[0] ) ) {
            var b = blocks.shift(),
                // Now remove that indent
                x = b.replace( replace, "");

            ret.push( mk_block( x, b.trailing, b.lineNumber ) );
          }
          break;
        }
        return ret;
      }

      // passed to stack.forEach to turn list items up the stack into paras
      function paragraphify(s, i, stack) {
        var list = s.list;
        var last_li = list[list.length-1];

        if (last_li[1] instanceof Array && last_li[1][0] == "para") {
          return;
        }
        if (i+1 == stack.length) {
          // Last stack frame
          // Keep the same array, but replace the contents
          last_li.push( ["para"].concat( last_li.splice(1) ) );
        }
        else {
          var sublist = last_li.pop();
          last_li.push( ["para"].concat( last_li.splice(1) ), sublist );
        }
      }

      // The matcher function
      return function( block, next ) {
        var m = block.match( is_list_re );
        if ( !m ) return undefined;

        function make_list( m ) {
          var list = bullet_list.exec( m[2] )
                   ? ["bulletlist"]
                   : ["numberlist"];

          stack.push( { list: list, indent: m[1] } );
          return list;
        }


        var stack = [], // Stack of lists for nesting.
            list = make_list( m ),
            last_li,
            loose = false,
            ret = [ stack[0].list ],
            i;

        // Loop to search over block looking for inner block elements and loose lists
        loose_search:
        while( true ) {
          // Split into lines preserving new lines at end of line
          var lines = block.split( /(?=\n)/ );

          // We have to grab all lines for a li and call processInline on them
          // once as there are some inline things that can span lines.
          var li_accumulate = "";

          // Loop over the lines in this block looking for tight lists.
          tight_search:
          for (var line_no=0; line_no < lines.length; line_no++) {
            var nl = "",
                l = lines[line_no].replace(/^\n/, function(n) { nl = n; return ""; });

            // TODO: really should cache this
            var line_re = regex_for_depth( stack.length );

            m = l.match( line_re );
            //print( "line:", uneval(l), "\nline match:", uneval(m) );

            // We have a list item
            if ( m[1] !== undefined ) {
              // Process the previous list item, if any
              if ( li_accumulate.length ) {
                add( last_li, loose, this.processInline( li_accumulate ), nl );
                // Loose mode will have been dealt with. Reset it
                loose = false;
                li_accumulate = "";
              }

              m[1] = expand_tab( m[1] );
              var wanted_depth = Math.floor(m[1].length/4)+1;
              //print( "want:", wanted_depth, "stack:", stack.length);
              if ( wanted_depth > stack.length ) {
                // Deep enough for a nested list outright
                //print ( "new nested list" );
                list = make_list( m );
                last_li.push( list );
                last_li = list[1] = [ "listitem" ];
              }
              else {
                // We aren't deep enough to be strictly a new level. This is
                // where Md.pl goes nuts. If the indent matches a level in the
                // stack, put it there, else put it one deeper then the
                // wanted_depth deserves.
                var found = false;
                for (i = 0; i < stack.length; i++) {
                  if ( stack[ i ].indent != m[1] ) continue;
                  list = stack[ i ].list;
                  stack.splice( i+1 );
                  found = true;
                  break;
                }

                if (!found) {
                  //print("not found. l:", uneval(l));
                  wanted_depth++;
                  if (wanted_depth <= stack.length) {
                    stack.splice(wanted_depth);
                    //print("Desired depth now", wanted_depth, "stack:", stack.length);
                    list = stack[wanted_depth-1].list;
                    //print("list:", uneval(list) );
                  }
                  else {
                    //print ("made new stack for messy indent");
                    list = make_list(m);
                    last_li.push(list);
                  }
                }

                //print( uneval(list), "last", list === stack[stack.length-1].list );
                last_li = [ "listitem" ];
                list.push(last_li);
              } // end depth of shenegains
              nl = "";
            }

            // Add content
            if (l.length > m[0].length) {
              li_accumulate += nl + l.substr( m[0].length );
            }
          } // tight_search

          if ( li_accumulate.length ) {
            add( last_li, loose, this.processInline( li_accumulate ), nl );
            // Loose mode will have been dealt with. Reset it
            loose = false;
            li_accumulate = "";
          }

          // Look at the next block - we might have a loose list. Or an extra
          // paragraph for the current li
          var contained = get_contained_blocks( stack.length, next );

          // Deal with code blocks or properly nested lists
          if (contained.length > 0) {
            // Make sure all listitems up the stack are paragraphs
            forEach( stack, paragraphify, this);

            last_li.push.apply( last_li, this.toTree( contained, [] ) );
          }

          var next_block = next[0] && next[0].valueOf() || "";

          if ( next_block.match(is_list_re) || next_block.match( /^ / ) ) {
            block = next.shift();

            // Check for an HR following a list: features/lists/hr_abutting
            var hr = this.dialect.block.horizRule( block, next );

            if (hr) {
              ret.push.apply(ret, hr);
              break;
            }

            // Make sure all listitems up the stack are paragraphs
            forEach( stack, paragraphify, this);

            loose = true;
            continue loose_search;
          }
          break;
        } // loose_search

        return ret;
      };
    })(),

    blockquote: function blockquote( block, next ) {
      if ( !block.match( /^>/m ) )
        return undefined;

      var jsonml = [];

      // separate out the leading abutting block, if any
      if ( block[ 0 ] != ">" ) {
        var lines = block.split( /\n/ ),
            prev = [];

        // keep shifting lines until you find a crotchet
        while ( lines.length && lines[ 0 ][ 0 ] != ">" ) {
            prev.push( lines.shift() );
        }

        // reassemble!
        block = lines.join( "\n" );
        jsonml.push.apply( jsonml, this.processBlock( prev.join( "\n" ), [] ) );
      }

      // if the next block is also a blockquote merge it in
      while ( next.length && next[ 0 ][ 0 ] == ">" ) {
        var b = next.shift();
        block = new String(block + block.trailing + b);
        block.trailing = b.trailing;
      }

      // Strip off the leading "> " and re-process as a block.
      var input = block.replace( /^> ?/gm, '' ),
          old_tree = this.tree;
      jsonml.push( this.toTree( input, [ "blockquote" ] ) );

      return jsonml;
    },

    referenceDefn: function referenceDefn( block, next) {
      var re = /^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;
      // interesting matches are [ , ref_id, url, , title, title ]

      if ( !block.match(re) )
        return undefined;

      // make an attribute node if it doesn't exist
      if ( !extract_attr( this.tree ) ) {
        this.tree.splice( 1, 0, {} );
      }

      var attrs = extract_attr( this.tree );

      // make a references hash if it doesn't exist
      if ( attrs.references === undefined ) {
        attrs.references = {};
      }

      var b = this.loop_re_over_block(re, block, function( m ) {

        if ( m[2] && m[2][0] == '<' && m[2][m[2].length-1] == '>' )
          m[2] = m[2].substring( 1, m[2].length - 1 );

        var ref = attrs.references[ m[1].toLowerCase() ] = {
          href: m[2]
        };

        if (m[4] !== undefined)
          ref.title = m[4];
        else if (m[5] !== undefined)
          ref.title = m[5];

      } );

      if (b.length)
        next.unshift( mk_block( b, block.trailing ) );

      return [];
    },

    para: function para( block, next ) {
      // everything's a para!
      return [ ["para"].concat( this.processInline( block ) ) ];
    }
  }
};

Markdown.dialects.Gruber.inline = {

    __oneElement__: function oneElement( text, patterns_or_re, previous_nodes ) {
      var m,
          res,
          lastIndex = 0;

      patterns_or_re = patterns_or_re || this.dialect.inline.__patterns__;
      var re = new RegExp( "([\\s\\S]*?)(" + (patterns_or_re.source || patterns_or_re) + ")" );

      m = re.exec( text );
      if (!m) {
        // Just boring text
        return [ text.length, text ];
      }
      else if ( m[1] ) {
        // Some un-interesting text matched. Return that first
        return [ m[1].length, m[1] ];
      }

      var res;
      if ( m[2] in this.dialect.inline ) {
        res = this.dialect.inline[ m[2] ].call(
                  this,
                  text.substr( m.index ), m, previous_nodes || [] );
      }
      // Default for now to make dev easier. just slurp special and output it.
      res = res || [ m[2].length, m[2] ];
      return res;
    },

    __call__: function inline( text, patterns ) {

      var out = [],
          res;

      function add(x) {
        //D:self.debug("  adding output", uneval(x));
        if (typeof x == "string" && typeof out[out.length-1] == "string")
          out[ out.length-1 ] += x;
        else
          out.push(x);
      }

      while ( text.length > 0 ) {
        res = this.dialect.inline.__oneElement__.call(this, text, patterns, out );
        text = text.substr( res.shift() );
        forEach(res, add )
      }

      return out;
    },

    // These characters are intersting elsewhere, so have rules for them so that
    // chunks of plain text blocks don't include them
    "]": function () {},
    "}": function () {},

    "\\": function escaped( text ) {
      // [ length of input processed, node/children to add... ]
      // Only esacape: \ ` * _ { } [ ] ( ) # * + - . !
      if ( text.match( /^\\[\\`\*_{}\[\]()#\+.!\-]/ ) )
        return [ 2, text[1] ];
      else
        // Not an esacpe
        return [ 1, "\\" ];
    },

    "![": function image( text ) {

      // Unlike images, alt text is plain text only. no other elements are
      // allowed in there

      // ![Alt text](/path/to/img.jpg "Optional title")
      //      1          2            3       4         <--- captures
      var m = text.match( /^!\[(.*?)\][ \t]*\([ \t]*(\S*)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/ );

      if ( m ) {
        if ( m[2] && m[2][0] == '<' && m[2][m[2].length-1] == '>' )
          m[2] = m[2].substring( 1, m[2].length - 1 );

        m[2] = this.dialect.inline.__call__.call( this, m[2], /\\/ )[0];

        var attrs = { alt: m[1], href: m[2] || "" };
        if ( m[4] !== undefined)
          attrs.title = m[4];

        return [ m[0].length, [ "img", attrs ] ];
      }

      // ![Alt text][id]
      m = text.match( /^!\[(.*?)\][ \t]*\[(.*?)\]/ );

      if ( m ) {
        // We can't check if the reference is known here as it likely wont be
        // found till after. Check it in md tree->hmtl tree conversion
        return [ m[0].length, [ "img_ref", { alt: m[1], ref: m[2].toLowerCase(), original: m[0] } ] ];
      }

      // Just consume the '!['
      return [ 2, "![" ];
    },

    "[": function link( text ) {

      var orig = String(text);
      // Inline content is possible inside `link text`
      var res = Markdown.DialectHelpers.inline_until_char.call( this, text.substr(1), ']' );

      // No closing ']' found. Just consume the [
      if ( !res ) return [ 1, '[' ];

      var consumed = 1 + res[ 0 ],
          children = res[ 1 ],
          link,
          attrs;

      // At this point the first [...] has been parsed. See what follows to find
      // out which kind of link we are (reference or direct url)
      text = text.substr( consumed );

      // [link text](/path/to/img.jpg "Optional title")
      //                 1            2       3         <--- captures
      // This will capture up to the last paren in the block. We then pull
      // back based on if there a matching ones in the url
      //    ([here](/url/(test))
      // The parens have to be balanced
      var m = text.match( /^\s*\([ \t]*(\S+)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/ );
      if ( m ) {
        var url = m[1];
        consumed += m[0].length;

        if ( url && url[0] == '<' && url[url.length-1] == '>' )
          url = url.substring( 1, url.length - 1 );

        // If there is a title we don't have to worry about parens in the url
        if ( !m[3] ) {
          var open_parens = 1; // One open that isn't in the capture
          for (var len = 0; len < url.length; len++) {
            switch ( url[len] ) {
            case '(':
              open_parens++;
              break;
            case ')':
              if ( --open_parens == 0) {
                consumed -= url.length - len;
                url = url.substring(0, len);
              }
              break;
            }
          }
        }

        // Process escapes only
        url = this.dialect.inline.__call__.call( this, url, /\\/ )[0];

        attrs = { href: url || "" };
        if ( m[3] !== undefined)
          attrs.title = m[3];

        link = [ "link", attrs ].concat( children );
        return [ consumed, link ];
      }

      // [Alt text][id]
      // [Alt text] [id]
      m = text.match( /^\s*\[(.*?)\]/ );

      if ( m ) {

        consumed += m[ 0 ].length;

        // [links][] uses links as its reference
        attrs = { ref: ( m[ 1 ] || String(children) ).toLowerCase(),  original: orig.substr( 0, consumed ) };

        link = [ "link_ref", attrs ].concat( children );

        // We can't check if the reference is known here as it likely wont be
        // found till after. Check it in md tree->hmtl tree conversion.
        // Store the original so that conversion can revert if the ref isn't found.
        return [ consumed, link ];
      }

      // [id]
      // Only if id is plain (no formatting.)
      if ( children.length == 1 && typeof children[0] == "string" ) {

        attrs = { ref: children[0].toLowerCase(),  original: orig.substr( 0, consumed ) };
        link = [ "link_ref", attrs, children[0] ];
        return [ consumed, link ];
      }

      // Just consume the '['
      return [ 1, "[" ];
    },


    "<": function autoLink( text ) {
      var m;

      if ( ( m = text.match( /^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/ ) ) != null ) {
        if ( m[3] ) {
          return [ m[0].length, [ "link", { href: "mailto:" + m[3] }, m[3] ] ];

        }
        else if ( m[2] == "mailto" ) {
          return [ m[0].length, [ "link", { href: m[1] }, m[1].substr("mailto:".length ) ] ];
        }
        else
          return [ m[0].length, [ "link", { href: m[1] }, m[1] ] ];
      }

      return [ 1, "<" ];
    },

    "`": function inlineCode( text ) {
      // Inline code block. as many backticks as you like to start it
      // Always skip over the opening ticks.
      var m = text.match( /(`+)(([\s\S]*?)\1)/ );

      if ( m && m[2] )
        return [ m[1].length + m[2].length, [ "inlinecode", m[3] ] ];
      else {
        // TODO: No matching end code found - warn!
        return [ 1, "`" ];
      }
    },

    "  \n": function lineBreak( text ) {
      return [ 3, [ "linebreak" ] ];
    }

};

// Meta Helper/generator method for em and strong handling
function strong_em( tag, md ) {

  var state_slot = tag + "_state",
      other_slot = tag == "strong" ? "em_state" : "strong_state";

  function CloseTag(len) {
    this.len_after = len;
    this.name = "close_" + md;
  }

  return function ( text, orig_match ) {

    if (this[state_slot][0] == md) {
      // Most recent em is of this type
      //D:this.debug("closing", md);
      this[state_slot].shift();

      // "Consume" everything to go back to the recrusion in the else-block below
      return[ text.length, new CloseTag(text.length-md.length) ];
    }
    else {
      // Store a clone of the em/strong states
      var other = this[other_slot].slice(),
          state = this[state_slot].slice();

      this[state_slot].unshift(md);

      //D:this.debug_indent += "  ";

      // Recurse
      var res = this.processInline( text.substr( md.length ) );
      //D:this.debug_indent = this.debug_indent.substr(2);

      var last = res[res.length - 1];

      //D:this.debug("processInline from", tag + ": ", uneval( res ) );

      var check = this[state_slot].shift();
      if (last instanceof CloseTag) {
        res.pop();
        // We matched! Huzzah.
        var consumed = text.length - last.len_after;
        return [ consumed, [ tag ].concat(res) ];
      }
      else {
        // Restore the state of the other kind. We might have mistakenly closed it.
        this[other_slot] = other;
        this[state_slot] = state;

        // We can't reuse the processed result as it could have wrong parsing contexts in it.
        return [ md.length, md ];
      }
    }
  }; // End returned function
}

Markdown.dialects.Gruber.inline["**"] = strong_em("strong", "**");
Markdown.dialects.Gruber.inline["__"] = strong_em("strong", "__");
Markdown.dialects.Gruber.inline["*"]  = strong_em("em", "*");
Markdown.dialects.Gruber.inline["_"]  = strong_em("em", "_");


// Build default order from insertion order.
Markdown.buildBlockOrder = function(d) {
  var ord = [];
  for ( var i in d ) {
    if ( i == "__order__" || i == "__call__" ) continue;
    ord.push( i );
  }
  d.__order__ = ord;
};

// Build patterns for inline matcher
Markdown.buildInlinePatterns = function(d) {
  var patterns = [];

  for ( var i in d ) {
    // __foo__ is reserved and not a pattern
    if ( i.match( /^__.*__$/) ) continue;
    var l = i.replace( /([\\.*+?|()\[\]{}])/g, "\\$1" )
             .replace( /\n/, "\\n" );
    patterns.push( i.length == 1 ? l : "(?:" + l + ")" );
  }

  patterns = patterns.join("|");
  d.__patterns__ = patterns;
  //print("patterns:", uneval( patterns ) );

  var fn = d.__call__;
  d.__call__ = function(text, pattern) {
    if (pattern != undefined) {
      return fn.call(this, text, pattern);
    }
    else
    {
      return fn.call(this, text, patterns);
    }
  };
};

Markdown.DialectHelpers = {};
Markdown.DialectHelpers.inline_until_char = function( text, want ) {
  var consumed = 0,
      nodes = [];

  while ( true ) {
    if ( text[ consumed ] == want ) {
      // Found the character we were looking for
      consumed++;
      return [ consumed, nodes ];
    }

    if ( consumed >= text.length ) {
      // No closing char found. Abort.
      return null;
    }

    var res = this.dialect.inline.__oneElement__.call(this, text.substr( consumed ) );
    consumed += res[ 0 ];
    // Add any returned nodes.
    nodes.push.apply( nodes, res.slice( 1 ) );
  }
}

// Helper function to make sub-classing a dialect easier
Markdown.subclassDialect = function( d ) {
  function Block() {}
  Block.prototype = d.block;
  function Inline() {}
  Inline.prototype = d.inline;

  return { block: new Block(), inline: new Inline() };
};

Markdown.buildBlockOrder ( Markdown.dialects.Gruber.block );
Markdown.buildInlinePatterns( Markdown.dialects.Gruber.inline );

Markdown.dialects.Maruku = Markdown.subclassDialect( Markdown.dialects.Gruber );

Markdown.dialects.Maruku.processMetaHash = function processMetaHash( meta_string ) {
  var meta = split_meta_hash( meta_string ),
      attr = {};

  for ( var i = 0; i < meta.length; ++i ) {
    // id: #foo
    if ( /^#/.test( meta[ i ] ) ) {
      attr.id = meta[ i ].substring( 1 );
    }
    // class: .foo
    else if ( /^\./.test( meta[ i ] ) ) {
      // if class already exists, append the new one
      if ( attr['class'] ) {
        attr['class'] = attr['class'] + meta[ i ].replace( /./, " " );
      }
      else {
        attr['class'] = meta[ i ].substring( 1 );
      }
    }
    // attribute: foo=bar
    else if ( /\=/.test( meta[ i ] ) ) {
      var s = meta[ i ].split( /\=/ );
      attr[ s[ 0 ] ] = s[ 1 ];
    }
  }

  return attr;
}

function split_meta_hash( meta_string ) {
  var meta = meta_string.split( "" ),
      parts = [ "" ],
      in_quotes = false;

  while ( meta.length ) {
    var letter = meta.shift();
    switch ( letter ) {
      case " " :
        // if we're in a quoted section, keep it
        if ( in_quotes ) {
          parts[ parts.length - 1 ] += letter;
        }
        // otherwise make a new part
        else {
          parts.push( "" );
        }
        break;
      case "'" :
      case '"' :
        // reverse the quotes and move straight on
        in_quotes = !in_quotes;
        break;
      case "\\" :
        // shift off the next letter to be used straight away.
        // it was escaped so we'll keep it whatever it is
        letter = meta.shift();
      default :
        parts[ parts.length - 1 ] += letter;
        break;
    }
  }

  return parts;
}

Markdown.dialects.Maruku.block.document_meta = function document_meta( block, next ) {
  // we're only interested in the first block
  if ( block.lineNumber > 1 ) return undefined;

  // document_meta blocks consist of one or more lines of `Key: Value\n`
  if ( ! block.match( /^(?:\w+:.*\n)*\w+:.*$/ ) ) return undefined;

  // make an attribute node if it doesn't exist
  if ( !extract_attr( this.tree ) ) {
    this.tree.splice( 1, 0, {} );
  }

  var pairs = block.split( /\n/ );
  for ( p in pairs ) {
    var m = pairs[ p ].match( /(\w+):\s*(.*)$/ ),
        key = m[ 1 ].toLowerCase(),
        value = m[ 2 ];

    this.tree[ 1 ][ key ] = value;
  }

  // document_meta produces no content!
  return [];
};

Markdown.dialects.Maruku.block.block_meta = function block_meta( block, next ) {
  // check if the last line of the block is an meta hash
  var m = block.match( /(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/ );
  if ( !m ) return undefined;

  // process the meta hash
  var attr = this.dialect.processMetaHash( m[ 2 ] );

  var hash;

  // if we matched ^ then we need to apply meta to the previous block
  if ( m[ 1 ] === "" ) {
    var node = this.tree[ this.tree.length - 1 ];
    hash = extract_attr( node );

    // if the node is a string (rather than JsonML), bail
    if ( typeof node === "string" ) return undefined;

    // create the attribute hash if it doesn't exist
    if ( !hash ) {
      hash = {};
      node.splice( 1, 0, hash );
    }

    // add the attributes in
    for ( a in attr ) {
      hash[ a ] = attr[ a ];
    }

    // return nothing so the meta hash is removed
    return [];
  }

  // pull the meta hash off the block and process what's left
  var b = block.replace( /\n.*$/, "" ),
      result = this.processBlock( b, [] );

  // get or make the attributes hash
  hash = extract_attr( result[ 0 ] );
  if ( !hash ) {
    hash = {};
    result[ 0 ].splice( 1, 0, hash );
  }

  // attach the attributes to the block
  for ( a in attr ) {
    hash[ a ] = attr[ a ];
  }

  return result;
};

Markdown.dialects.Maruku.block.definition_list = function definition_list( block, next ) {
  // one or more terms followed by one or more definitions, in a single block
  var tight = /^((?:[^\s:].*\n)+):\s+([\s\S]+)$/,
      list = [ "dl" ],
      i;

  // see if we're dealing with a tight or loose block
  if ( ( m = block.match( tight ) ) ) {
    // pull subsequent tight DL blocks out of `next`
    var blocks = [ block ];
    while ( next.length && tight.exec( next[ 0 ] ) ) {
      blocks.push( next.shift() );
    }

    for ( var b = 0; b < blocks.length; ++b ) {
      var m = blocks[ b ].match( tight ),
          terms = m[ 1 ].replace( /\n$/, "" ).split( /\n/ ),
          defns = m[ 2 ].split( /\n:\s+/ );

      // print( uneval( m ) );

      for ( i = 0; i < terms.length; ++i ) {
        list.push( [ "dt", terms[ i ] ] );
      }

      for ( i = 0; i < defns.length; ++i ) {
        // run inline processing over the definition
        list.push( [ "dd" ].concat( this.processInline( defns[ i ].replace( /(\n)\s+/, "$1" ) ) ) );
      }
    }
  }
  else {
    return undefined;
  }

  return [ list ];
};

Markdown.dialects.Maruku.inline[ "{:" ] = function inline_meta( text, matches, out ) {
  if ( !out.length ) {
    return [ 2, "{:" ];
  }

  // get the preceeding element
  var before = out[ out.length - 1 ];

  if ( typeof before === "string" ) {
    return [ 2, "{:" ];
  }

  // match a meta hash
  var m = text.match( /^\{:\s*((?:\\\}|[^\}])*)\s*\}/ );

  // no match, false alarm
  if ( !m ) {
    return [ 2, "{:" ];
  }

  // attach the attributes to the preceeding element
  var meta = this.dialect.processMetaHash( m[ 1 ] ),
      attr = extract_attr( before );

  if ( !attr ) {
    attr = {};
    before.splice( 1, 0, attr );
  }

  for ( var k in meta ) {
    attr[ k ] = meta[ k ];
  }

  // cut out the string and replace it with nothing
  return [ m[ 0 ].length, "" ];
};

Markdown.buildBlockOrder ( Markdown.dialects.Maruku.block );
Markdown.buildInlinePatterns( Markdown.dialects.Maruku.inline );

var isArray = Array.isArray || function(obj) {
  return Object.prototype.toString.call(obj) == '[object Array]';
};

var forEach;
// Don't mess with Array.prototype. Its not friendly
if ( Array.prototype.forEach ) {
  forEach = function( arr, cb, thisp ) {
    return arr.forEach( cb, thisp );
  };
}
else {
  forEach = function(arr, cb, thisp) {
    for (var i = 0; i < arr.length; i++) {
      cb.call(thisp || arr, arr[i], i, arr);
    }
  }
}

function extract_attr( jsonml ) {
  return isArray(jsonml)
      && jsonml.length > 1
      && typeof jsonml[ 1 ] === "object"
      && !( isArray(jsonml[ 1 ]) )
      ? jsonml[ 1 ]
      : undefined;
}



/**
 *  renderJsonML( jsonml[, options] ) -> String
 *  - jsonml (Array): JsonML array to render to XML
 *  - options (Object): options
 *
 *  Converts the given JsonML into well-formed XML.
 *
 *  The options currently understood are:
 *
 *  - root (Boolean): wether or not the root node should be included in the
 *    output, or just its children. The default `false` is to not include the
 *    root itself.
 */
expose.renderJsonML = function( jsonml, options ) {
  options = options || {};
  // include the root element in the rendered output?
  options.root = options.root || false;

  var content = [];

  if ( options.root ) {
    content.push( render_tree( jsonml ) );
  }
  else {
    jsonml.shift(); // get rid of the tag
    if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) ) {
      jsonml.shift(); // get rid of the attributes
    }

    while ( jsonml.length ) {
      content.push( render_tree( jsonml.shift() ) );
    }
  }

  return content.join( "\n\n" );
};

function escapeHTML( text ) {
  return text.replace( /&/g, "&amp;" )
             .replace( /</g, "&lt;" )
             .replace( />/g, "&gt;" )
             .replace( /"/g, "&quot;" )
             .replace( /'/g, "&#39;" );
}

function render_tree( jsonml ) {
  // basic case
  if ( typeof jsonml === "string" ) {
    return escapeHTML( jsonml );
  }

  var tag = jsonml.shift(),
      attributes = {},
      content = [];

  if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) ) {
    attributes = jsonml.shift();
  }

  while ( jsonml.length ) {
    content.push( arguments.callee( jsonml.shift() ) );
  }

  var tag_attrs = "";
  for ( var a in attributes ) {
    tag_attrs += " " + a + '="' + escapeHTML( attributes[ a ] ) + '"';
  }

  // be careful about adding whitespace here for inline elements
  if ( tag == "img" || tag == "br" || tag == "hr" ) {
    return "<"+ tag + tag_attrs + "/>";
  }
  else {
    return "<"+ tag + tag_attrs + ">" + content.join( "" ) + "</" + tag + ">";
  }
}

function convert_tree_to_html( tree, references, options ) {
  var i;
  options = options || {};

  // shallow clone
  var jsonml = tree.slice( 0 );

  if (typeof options.preprocessTreeNode === "function") {
      jsonml = options.preprocessTreeNode(jsonml, references);
  }

  // Clone attributes if they exist
  var attrs = extract_attr( jsonml );
  if ( attrs ) {
    jsonml[ 1 ] = {};
    for ( i in attrs ) {
      jsonml[ 1 ][ i ] = attrs[ i ];
    }
    attrs = jsonml[ 1 ];
  }

  // basic case
  if ( typeof jsonml === "string" ) {
    return jsonml;
  }

  // convert this node
  switch ( jsonml[ 0 ] ) {
    case "header":
      jsonml[ 0 ] = "h" + jsonml[ 1 ].level;
      delete jsonml[ 1 ].level;
      break;
    case "bulletlist":
      jsonml[ 0 ] = "ul";
      break;
    case "numberlist":
      jsonml[ 0 ] = "ol";
      break;
    case "listitem":
      jsonml[ 0 ] = "li";
      break;
    case "para":
      jsonml[ 0 ] = "p";
      break;
    case "markdown":
      jsonml[ 0 ] = "html";
      if ( attrs ) delete attrs.references;
      break;
    case "code_block":
      jsonml[ 0 ] = "pre";
      i = attrs ? 2 : 1;
      var code = [ "code" ];
      code.push.apply( code, jsonml.splice( i ) );
      jsonml[ i ] = code;
      break;
    case "inlinecode":
      jsonml[ 0 ] = "code";
      break;
    case "img":
      jsonml[ 1 ].src = jsonml[ 1 ].href;
      delete jsonml[ 1 ].href;
      break;
    case "linebreak":
      jsonml[ 0 ] = "br";
    break;
    case "link":
      jsonml[ 0 ] = "a";
      break;
    case "link_ref":
      jsonml[ 0 ] = "a";

      // grab this ref and clean up the attribute node
      var ref = references[ attrs.ref ];

      // if the reference exists, make the link
      if ( ref ) {
        delete attrs.ref;

        // add in the href and title, if present
        attrs.href = ref.href;
        if ( ref.title ) {
          attrs.title = ref.title;
        }

        // get rid of the unneeded original text
        delete attrs.original;
      }
      // the reference doesn't exist, so revert to plain text
      else {
        return attrs.original;
      }
      break;
    case "img_ref":
      jsonml[ 0 ] = "img";

      // grab this ref and clean up the attribute node
      var ref = references[ attrs.ref ];

      // if the reference exists, make the link
      if ( ref ) {
        delete attrs.ref;

        // add in the href and title, if present
        attrs.src = ref.href;
        if ( ref.title ) {
          attrs.title = ref.title;
        }

        // get rid of the unneeded original text
        delete attrs.original;
      }
      // the reference doesn't exist, so revert to plain text
      else {
        return attrs.original;
      }
      break;
  }

  // convert all the children
  i = 1;

  // deal with the attribute node, if it exists
  if ( attrs ) {
    // if there are keys, skip over it
    for ( var key in jsonml[ 1 ] ) {
      i = 2;
    }
    // if there aren't, remove it
    if ( i === 1 ) {
      jsonml.splice( i, 1 );
    }
  }

  for ( ; i < jsonml.length; ++i ) {
    jsonml[ i ] = arguments.callee( jsonml[ i ], references, options );
  }

  return jsonml;
}


// merges adjacent text nodes into a single node
function merge_text_nodes( jsonml ) {
  // skip the tag name and attribute hash
  var i = extract_attr( jsonml ) ? 2 : 1;

  while ( i < jsonml.length ) {
    // if it's a string check the next item too
    if ( typeof jsonml[ i ] === "string" ) {
      if ( i + 1 < jsonml.length && typeof jsonml[ i + 1 ] === "string" ) {
        // merge the second string into the first and remove it
        jsonml[ i ] += jsonml.splice( i + 1, 1 )[ 0 ];
      }
      else {
        ++i;
      }
    }
    // if it's not a string recurse
    else {
      arguments.callee( jsonml[ i ] );
      ++i;
    }
  }
}

} )( (function() {
  if ( typeof exports === "undefined" ) {
    window.markdown = {};
    return window.markdown;
  }
  else {
    return exports;
  }
} )() );
/*
 * to-markdown - an HTML to Markdown converter
 *
 * Copyright 2011, Dom Christie
 * Licenced under the MIT licence
 *
 */

var toMarkdown = function(string) {

  var ELEMENTS = [
    {
      patterns: 'p',
      replacement: function(str, attrs, innerHTML) {
        return innerHTML ? '\n\n' + innerHTML + '\n' : '';
      }
    },
    {
      patterns: 'br',
      type: 'void',
      replacement: '\n'
    },
    {
      patterns: 'h([1-6])',
      replacement: function(str, hLevel, attrs, innerHTML) {
        var hPrefix = '';
        for(var i = 0; i < hLevel; i++) {
          hPrefix += '#';
        }
        return '\n\n' + hPrefix + ' ' + innerHTML + '\n';
      }
    },
    {
      patterns: 'hr',
      type: 'void',
      replacement: '\n\n* * *\n'
    },
    {
      patterns: 'a',
      replacement: function(str, attrs, innerHTML) {
        var href = attrs.match(attrRegExp('href')),
            title = attrs.match(attrRegExp('title'));
        return href ? '[' + innerHTML + ']' + '(' + href[1] + (title && title[1] ? ' "' + title[1] + '"' : '') + ')' : str;
      }
    },
    {
      patterns: ['b', 'strong'],
      replacement: function(str, attrs, innerHTML) {
        return innerHTML ? '**' + innerHTML + '**' : '';
      }
    },
    {
      patterns: ['i', 'em'],
      replacement: function(str, attrs, innerHTML) {
        return innerHTML ? '_' + innerHTML + '_' : '';
      }
    },
    {
      patterns: 'code',
      replacement: function(str, attrs, innerHTML) {
        return innerHTML ? '`' + innerHTML + '`' : '';
      }
    },
    {
      patterns: 'img',
      type: 'void',
      replacement: function(str, attrs, innerHTML) {
        var src = attrs.match(attrRegExp('src')),
            alt = attrs.match(attrRegExp('alt')),
            title = attrs.match(attrRegExp('title'));
        return '![' + (alt && alt[1] ? alt[1] : '') + ']' + '(' + src[1] + (title && title[1] ? ' "' + title[1] + '"' : '') + ')';
      }
    }
  ];

  for(var i = 0, len = ELEMENTS.length; i < len; i++) {
    if(typeof ELEMENTS[i].patterns === 'string') {
      string = replaceEls(string, { tag: ELEMENTS[i].patterns, replacement: ELEMENTS[i].replacement, type:  ELEMENTS[i].type });
    }
    else {
      for(var j = 0, pLen = ELEMENTS[i].patterns.length; j < pLen; j++) {
        string = replaceEls(string, { tag: ELEMENTS[i].patterns[j], replacement: ELEMENTS[i].replacement, type:  ELEMENTS[i].type });
      }
    }
  }

  function replaceEls(html, elProperties) {
    var pattern = elProperties.type === 'void' ? '<' + elProperties.tag + '\\b([^>]*)\\/?>' : '<' + elProperties.tag + '\\b([^>]*)>([\\s\\S]*?)<\\/' + elProperties.tag + '>',
        regex = new RegExp(pattern, 'gi'),
        markdown = '';
    if(typeof elProperties.replacement === 'string') {
      markdown = html.replace(regex, elProperties.replacement);
    }
    else {
      markdown = html.replace(regex, function(str, p1, p2, p3) {
        return elProperties.replacement.call(this, str, p1, p2, p3);
      });
    }
    return markdown;
  }

  function attrRegExp(attr) {
    return new RegExp(attr + '\\s*=\\s*["\']?([^"\']*)["\']?', 'i');
  }

  // Pre code blocks

  string = string.replace(/<pre\b[^>]*>`([\s\S]*)`<\/pre>/gi, function(str, innerHTML) {
    innerHTML = innerHTML.replace(/^\t+/g, '  '); // convert tabs to spaces (you know it makes sense)
    innerHTML = innerHTML.replace(/\n/g, '\n    ');
    return '\n\n    ' + innerHTML + '\n';
  });

  // Lists

  // Escape numbers that could trigger an ol
  // If there are more than three spaces before the code, it would be in a pre tag
  // Make sure we are escaping the period not matching any character
  string = string.replace(/^(\s{0,3}\d+)\. /g, '$1\\. ');

  // Converts lists that have no child lists (of same type) first, then works it's way up
  var noChildrenRegex = /<(ul|ol)\b[^>]*>(?:(?!<ul|<ol)[\s\S])*?<\/\1>/gi;
  while(string.match(noChildrenRegex)) {
    string = string.replace(noChildrenRegex, function(str) {
      return replaceLists(str);
    });
  }

  function replaceLists(html) {

    html = html.replace(/<(ul|ol)\b[^>]*>([\s\S]*?)<\/\1>/gi, function(str, listType, innerHTML) {
      var lis = innerHTML.split('</li>');
      lis.splice(lis.length - 1, 1);

      for(i = 0, len = lis.length; i < len; i++) {
        if(lis[i]) {
          var prefix = (listType === 'ol') ? (i + 1) + ".  " : "*   ";
          lis[i] = lis[i].replace(/\s*<li[^>]*>([\s\S]*)/i, function(str, innerHTML) {

            innerHTML = innerHTML.replace(/^\s+/, '');
            innerHTML = innerHTML.replace(/\n\n/g, '\n\n    ');
            // indent nested lists
            innerHTML = innerHTML.replace(/\n([ ]*)+(\*|\d+\.) /g, '\n$1    $2 ');
            return prefix + innerHTML;
          });
        }
      }
      return lis.join('\n');
    });
    return '\n\n' + html.replace(/[ \t]+\n|\s+$/g, '');
  }

  // Blockquotes
  var deepest = /<blockquote\b[^>]*>((?:(?!<blockquote)[\s\S])*?)<\/blockquote>/gi;
  while(string.match(deepest)) {
    string = string.replace(deepest, function(str) {
      return replaceBlockquotes(str);
    });
  }

  function replaceBlockquotes(html) {
    html = html.replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, function(str, inner) {
      inner = inner.replace(/^\s+|\s+$/g, '');
      inner = cleanUp(inner);
      inner = inner.replace(/^/gm, '> ');
      inner = inner.replace(/^(>([ \t]{2,}>)+)/gm, '> >');
      return inner;
    });
    return html;
  }

  function cleanUp(string) {
    string = string.replace(/^[\t\r\n]+|[\t\r\n]+$/g, ''); // trim leading/trailing whitespace
    string = string.replace(/\n\s+\n/g, '\n\n');
    string = string.replace(/\n{3,}/g, '\n\n'); // limit consecutive linebreaks to 2
    return string;
  }

  return cleanUp(string);
};

if (typeof exports === 'object') {
  exports.toMarkdown = toMarkdown;
}
/* ===================================================
 * bootstrap-markdown.js v2.10.0
 * http://github.com/toopay/bootstrap-markdown
 * ===================================================
 * Copyright 2013-2016 Taufan Aditya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

(function(factory){
    if (typeof define === "function" && define.amd) {
        //RequireJS
        define(["jquery"], factory);
    } else if (typeof exports === 'object') {
        //Backbone.js
        factory(require('jquery'));
    } else {
        //Jquery plugin
        factory(jQuery);
    }
}(function($){
  "use strict"; // jshint ;_;

  /* MARKDOWN CLASS DEFINITION
   * ========================== */

  var Markdown = function (element, options) {
    // @TODO : remove this BC on next major release
    // @see : https://github.com/toopay/bootstrap-markdown/issues/109
    var opts = ['autofocus', 'savable', 'hideable', 'width',
      'height', 'resize', 'iconlibrary', 'language',
      'footer', 'fullscreen', 'hiddenButtons', 'disabledButtons'];
    $.each(opts,function(_, opt){
      if (typeof $(element).data(opt) !== 'undefined') {
        options = typeof options == 'object' ? options : {}
        options[opt] = $(element).data(opt)
      }
    });
    // End BC

    // Class Properties
    this.$ns           = 'bootstrap-markdown';
    this.$element      = $(element);
    this.$editable     = {el:null, type:null,attrKeys:[], attrValues:[], content:null};
    this.$options      = $.extend(true, {}, $.fn.markdown.defaults, options, this.$element.data('options'));
    this.$oldContent   = null;
    this.$isPreview    = false;
    this.$isFullscreen = false;
    this.$editor       = null;
    this.$textarea     = null;
    this.$handler      = [];
    this.$callback     = [];
    this.$nextTab      = [];

    this.showEditor();
  };

  Markdown.prototype = {

    constructor: Markdown

  , __alterButtons: function(name,alter) {
      var handler = this.$handler, isAll = (name == 'all'),that = this;

      $.each(handler,function(k,v) {
        var halt = true;
        if (isAll) {
          halt = false;
        } else {
          halt = v.indexOf(name) < 0;
        }

        if (halt === false) {
          alter(that.$editor.find('button[data-handler="'+v+'"]'));
        }
      });
    }

  , __buildButtons: function(buttonsArray, container) {
      var i,
          ns = this.$ns,
          handler = this.$handler,
          callback = this.$callback;

      for (i=0;i<buttonsArray.length;i++) {
        // Build each group container
        var y, btnGroups = buttonsArray[i];
        for (y=0;y<btnGroups.length;y++) {
          // Build each button group
          var z,
              buttons = btnGroups[y].data,
              btnGroupContainer = $('<div/>', {
                                    'class': 'btn-group'
                                  });

          for (z=0;z<buttons.length;z++) {
            var button = buttons[z],
                buttonContainer, buttonIconContainer,
                buttonHandler = ns+'-'+button.name,
                buttonIcon = this.__getIcon(button.icon),
                btnText = button.btnText ? button.btnText : '',
                btnClass = button.btnClass ? button.btnClass : 'btn',
                tabIndex = button.tabIndex ? button.tabIndex : '-1',
                hotkey = typeof button.hotkey !== 'undefined' ? button.hotkey : '',
                hotkeyCaption = typeof jQuery.hotkeys !== 'undefined' && hotkey !== '' ? ' ('+hotkey+')' : '';

            // Construct the button object
            buttonContainer = $('<button></button>');
            buttonContainer.text(' ' + this.__localize(btnText)).addClass('btn-default btn-sm').addClass(btnClass);
            if(btnClass.match(/btn\-(primary|success|info|warning|danger|link)/)){
                buttonContainer.removeClass('btn-default');
            }
            buttonContainer.attr({
                'type': 'button',
                'title': this.__localize(button.title) + hotkeyCaption,
                'tabindex': tabIndex,
                'data-provider': ns,
                'data-handler': buttonHandler,
                'data-hotkey': hotkey
            });
            if (button.toggle === true){
              buttonContainer.attr('data-toggle', 'button');
            }
            buttonIconContainer = $('<span/>');
            buttonIconContainer.addClass(buttonIcon);
            buttonIconContainer.prependTo(buttonContainer);

            // Attach the button object
            btnGroupContainer.append(buttonContainer);

            // Register handler and callback
            handler.push(buttonHandler);
            callback.push(button.callback);
          }

          // Attach the button group into container dom
          container.append(btnGroupContainer);
        }
      }

      return container;
    }
  , __setListener: function() {
      // Set size and resizable Properties
      var hasRows = typeof this.$textarea.attr('rows') !== 'undefined',
          maxRows = this.$textarea.val().split("\n").length > 5 ? this.$textarea.val().split("\n").length : '5',
          rowsVal = hasRows ? this.$textarea.attr('rows') : maxRows;

      this.$textarea.attr('rows',rowsVal);
      if (this.$options.resize) {
        this.$textarea.css('resize',this.$options.resize);
      }

      this.$textarea.on({
          'focus' : $.proxy(this.focus, this),
          'keyup' : $.proxy(this.keyup, this),
          'change' : $.proxy(this.change, this),
          'select' : $.proxy(this.select, this)
      });

      if (this.eventSupported('keydown')) {
        this.$textarea.on('keydown', $.proxy(this.keydown, this));
      }

      if (this.eventSupported('keypress')) {
        this.$textarea.on('keypress', $.proxy(this.keypress, this))
      }

      // Re-attach markdown data
      this.$textarea.data('markdown',this);
    }

  , __handle: function(e) {
      var target = $(e.currentTarget),
          handler = this.$handler,
          callback = this.$callback,
          handlerName = target.attr('data-handler'),
          callbackIndex = handler.indexOf(handlerName),
          callbackHandler = callback[callbackIndex];

      // Trigger the focusin
      $(e.currentTarget).focus();

      callbackHandler(this);

      // Trigger onChange for each button handle
      this.change(this);

      // Unless it was the save handler,
      // focusin the textarea
      if (handlerName.indexOf('cmdSave') < 0) {
        this.$textarea.focus();
      }

      e.preventDefault();
    }

  , __localize: function(string) {
      var messages = $.fn.markdown.messages,
          language = this.$options.language;
      if (
        typeof messages !== 'undefined' &&
        typeof messages[language] !== 'undefined' &&
        typeof messages[language][string] !== 'undefined'
      ) {
        return messages[language][string];
      }
      return string;
    }

  , __getIcon: function(src) {
    return typeof src == 'object' ? src[this.$options.iconlibrary] : src;
  }

  , setFullscreen: function(mode) {
    var $editor = this.$editor,
        $textarea = this.$textarea;

    if (mode === true) {
      $editor.addClass('md-fullscreen-mode');
      $('body').addClass('md-nooverflow');
      this.$options.onFullscreen(this);
    } else {
      $editor.removeClass('md-fullscreen-mode');
      $('body').removeClass('md-nooverflow');
      this.$options.onFullscreenExit(this);

      if (this.$isPreview == true) this.hidePreview().showPreview()
    }

    this.$isFullscreen = mode;
    $textarea.focus();
  }

  , showEditor: function() {
      var instance = this,
          textarea,
          ns = this.$ns,
          container = this.$element,
          originalHeigth = container.css('height'),
          originalWidth = container.css('width'),
          editable = this.$editable,
          handler = this.$handler,
          callback = this.$callback,
          options = this.$options,
          editor = $( '<div/>', {
                      'class': 'md-editor',
                      click: function() {
                        instance.focus();
                      }
                    });

      // Prepare the editor
      if (this.$editor === null) {
        // Create the panel
        var editorHeader = $('<div/>', {
                            'class': 'md-header btn-toolbar'
                            });

        // Merge the main & additional button groups together
        var allBtnGroups = [];
        if (options.buttons.length > 0) allBtnGroups = allBtnGroups.concat(options.buttons[0]);
        if (options.additionalButtons.length > 0) {
          // iterate the additional button groups
          $.each(options.additionalButtons[0], function(idx, buttonGroup){

            // see if the group name of the addional group matches an existing group
            var matchingGroups = $.grep(allBtnGroups, function(allButtonGroup, allIdx){
              return allButtonGroup.name === buttonGroup.name;
            });

            // if it matches add the addional buttons to that group, if not just add it to the all buttons group
            if(matchingGroups.length > 0) {
              matchingGroups[0].data = matchingGroups[0].data.concat(buttonGroup.data);
            } else {
              allBtnGroups.push(options.additionalButtons[0][idx]);
            }

          });
        }

        // Reduce and/or reorder the button groups
        if (options.reorderButtonGroups.length > 0) {
          allBtnGroups = allBtnGroups
              .filter(function(btnGroup) {
                return options.reorderButtonGroups.indexOf(btnGroup.name) > -1;
              })
              .sort(function(a, b) {
                if (options.reorderButtonGroups.indexOf(a.name) < options.reorderButtonGroups.indexOf(b.name)) return -1;
                if (options.reorderButtonGroups.indexOf(a.name) > options.reorderButtonGroups.indexOf(b.name)) return 1;
                return 0;
              });
        }

        // Build the buttons
        if (allBtnGroups.length > 0) {
          editorHeader = this.__buildButtons([allBtnGroups], editorHeader);
        }

        if (options.fullscreen.enable) {
          editorHeader.append('<div class="md-controls"><a class="md-control md-control-fullscreen" href="#"><span class="'+this.__getIcon(options.fullscreen.icons.fullscreenOn)+'"></span></a></div>').on('click', '.md-control-fullscreen', function(e) {
              e.preventDefault();
              instance.setFullscreen(true);
          });
        }

        editor.append(editorHeader);

        // Wrap the textarea
        if (container.is('textarea')) {
          container.before(editor);
          textarea = container;
          textarea.addClass('md-input');
          editor.append(textarea);
        } else {
          var rawContent = (typeof toMarkdown == 'function') ? toMarkdown(container.html()) : container.html(),
              currentContent = $.trim(rawContent);

          // This is some arbitrary content that could be edited
          textarea = $('<textarea/>', {
                       'class': 'md-input',
                       'val' : currentContent
                      });

          editor.append(textarea);

          // Save the editable
          editable.el = container;
          editable.type = container.prop('tagName').toLowerCase();
          editable.content = container.html();

          $(container[0].attributes).each(function(){
            editable.attrKeys.push(this.nodeName);
            editable.attrValues.push(this.nodeValue);
          });

          // Set editor to blocked the original container
          container.replaceWith(editor);
        }

        var editorFooter = $('<div/>', {
                           'class': 'md-footer'
                         }),
            createFooter = false,
            footer = '';
        // Create the footer if savable
        if (options.savable) {
          createFooter = true;
          var saveHandler = 'cmdSave';

          // Register handler and callback
          handler.push(saveHandler);
          callback.push(options.onSave);

          editorFooter.append('<button class="btn btn-success" data-provider="'
                              + ns
                              + '" data-handler="'
                              + saveHandler
                              + '"><i class="icon icon-white icon-ok"></i> '
                              + this.__localize('Save')
                              + '</button>');


        }

        footer = typeof options.footer === 'function' ? options.footer(this) : options.footer;

        if ($.trim(footer) !== '') {
          createFooter = true;
          editorFooter.append(footer);
        }

        if (createFooter) editor.append(editorFooter);

        // Set width
        if (options.width && options.width !== 'inherit') {
          if (jQuery.isNumeric(options.width)) {
            editor.css('display', 'table');
            textarea.css('width', options.width + 'px');
          } else {
            editor.addClass(options.width);
          }
        }

        // Set height
        if (options.height && options.height !== 'inherit') {
          if (jQuery.isNumeric(options.height)) {
            var height = options.height;
            if (editorHeader) height = Math.max(0, height - editorHeader.outerHeight());
            if (editorFooter) height = Math.max(0, height - editorFooter.outerHeight());
            textarea.css('height', height + 'px');
          } else {
            editor.addClass(options.height);
          }
        }

        // Reference
        this.$editor     = editor;
        this.$textarea   = textarea;
        this.$editable   = editable;
        this.$oldContent = this.getContent();

        this.__setListener();

        // Set editor attributes, data short-hand API and listener
        this.$editor.attr('id',(new Date()).getTime());
        this.$editor.on('click', '[data-provider="bootstrap-markdown"]', $.proxy(this.__handle, this));

        if (this.$element.is(':disabled') || this.$element.is('[readonly]')) {
          this.$editor.addClass('md-editor-disabled');
          this.disableButtons('all');
        }

        if (this.eventSupported('keydown') && typeof jQuery.hotkeys === 'object') {
          editorHeader.find('[data-provider="bootstrap-markdown"]').each(function() {
            var $button = $(this),
                hotkey = $button.attr('data-hotkey');
            if (hotkey.toLowerCase() !== '') {
              textarea.bind('keydown', hotkey, function() {
                $button.trigger('click');
                return false;
              });
            }
          });
        }

        if (options.initialstate === 'preview') {
          this.showPreview();
        } else if (options.initialstate === 'fullscreen' && options.fullscreen.enable) {
          this.setFullscreen(true);
        }

      } else {
        this.$editor.show();
      }

      if (options.autofocus) {
        this.$textarea.focus();
        this.$editor.addClass('active');
      }

      if (options.fullscreen.enable && options.fullscreen !== false) {
        this.$editor.append('<div class="md-fullscreen-controls">'
                        + '<a href="#" class="exit-fullscreen" title="Exit fullscreen"><span class="' + this.__getIcon(options.fullscreen.icons.fullscreenOff) + '">'
                        + '</span></a>'
                        + '</div>');
        this.$editor.on('click', '.exit-fullscreen', function(e) {
          e.preventDefault();
          instance.setFullscreen(false);
        });
      }

      // hide hidden buttons from options
      this.hideButtons(options.hiddenButtons);

      // disable disabled buttons from options
      this.disableButtons(options.disabledButtons);

      // enable dropZone if available and configured
      if (options.dropZoneOptions) {
        if (this.$editor.dropzone) {
          options.dropZoneOptions.init = function() {
            var caretPos = 0;
            this.on('drop', function(e) {
              caretPos = textarea.prop('selectionStart');
            });
            this.on('success', function(file, path) {
              var text = textarea.val();
              textarea.val(text.substring(0, caretPos) + '\n![description](' + path + ')\n' + text.substring(caretPos) );
            });
            this.on('error', function(file, error, xhr) {
              console.log('Error:', error);
            });
          }
          this.$textarea.addClass('dropzone');
          this.$editor.dropzone(options.dropZoneOptions);
        } else {
          console.log('dropZoneOptions was configured, but DropZone was not detected.');
        }
      }

      // Trigger the onShow hook
      options.onShow(this);

      return this;
    }

  , parseContent: function(val) {
      var content;

      // parse with supported markdown parser
      var val = val || this.$textarea.val();

      if (this.$options.parser) {
        content = this.$options.parser(val);
      } else if (typeof markdown == 'object') {
        content = markdown.toHTML(val);
      } else if (typeof marked == 'function') {
        content = marked(val);
      } else {
        content = val;
      }

      return content;
    }

  , showPreview: function() {
      var options = this.$options,
          container = this.$textarea,
          afterContainer = container.next(),
          replacementContainer = $('<div/>',{'class':'md-preview','data-provider':'markdown-preview'}),
          content,
          callbackContent;

      if (this.$isPreview == true) {
        // Avoid sequenced element creation on missused scenario
        // @see https://github.com/toopay/bootstrap-markdown/issues/170
        return this;
      }

      // Give flag that tell the editor enter preview mode
      this.$isPreview = true;
      // Disable all buttons
      this.disableButtons('all').enableButtons('cmdPreview');

      // Try to get the content from callback
      callbackContent = options.onPreview(this);
      // Set the content based from the callback content if string otherwise parse value from textarea
      content = typeof callbackContent == 'string' ? callbackContent : this.parseContent();

      // Build preview element
      replacementContainer.html(content);

      if (afterContainer && afterContainer.attr('class') == 'md-footer') {
        // If there is footer element, insert the preview container before it
        replacementContainer.insertBefore(afterContainer);
      } else {
        // Otherwise, just append it after textarea
        container.parent().append(replacementContainer);
      }

      // Set the preview element dimensions
      replacementContainer.css({
        width: container.outerWidth() + 'px',
        height: container.outerHeight() + 'px'
      });

      if (this.$options.resize) {
        replacementContainer.css('resize',this.$options.resize);
      }

      // Hide the last-active textarea
      container.hide();

      // Attach the editor instances
      replacementContainer.data('markdown',this);

      if (this.$element.is(':disabled') || this.$element.is('[readonly]')) {
        this.$editor.addClass('md-editor-disabled');
        this.disableButtons('all');
      }

      return this;
    }

  , hidePreview: function() {
      // Give flag that tell the editor quit preview mode
      this.$isPreview = false;

      // Obtain the preview container
      var container = this.$editor.find('div[data-provider="markdown-preview"]');

      // Remove the preview container
      container.remove();

      // Enable all buttons
      this.enableButtons('all');
      // Disable configured disabled buttons
      this.disableButtons(this.$options.disabledButtons);

      // Back to the editor
      this.$textarea.show();
      this.__setListener();

      return this;
    }

  , isDirty: function() {
      return this.$oldContent != this.getContent();
    }

  , getContent: function() {
      return this.$textarea.val();
    }

  , setContent: function(content) {
      this.$textarea.val(content);

      return this;
    }

  , findSelection: function(chunk) {
    var content = this.getContent(), startChunkPosition;

    if (startChunkPosition = content.indexOf(chunk), startChunkPosition >= 0 && chunk.length > 0) {
      var oldSelection = this.getSelection(), selection;

      this.setSelection(startChunkPosition,startChunkPosition+chunk.length);
      selection = this.getSelection();

      this.setSelection(oldSelection.start,oldSelection.end);

      return selection;
    } else {
      return null;
    }
  }

  , getSelection: function() {

      var e = this.$textarea[0];

      return (

          ('selectionStart' in e && function() {
              var l = e.selectionEnd - e.selectionStart;
              return { start: e.selectionStart, end: e.selectionEnd, length: l, text: e.value.substr(e.selectionStart, l) };
          }) ||

          /* browser not supported */
          function() {
            return null;
          }

      )();

    }

  , setSelection: function(start,end) {

      var e = this.$textarea[0];

      return (

          ('selectionStart' in e && function() {
              e.selectionStart = start;
              e.selectionEnd = end;
              return;
          }) ||

          /* browser not supported */
          function() {
            return null;
          }

      )();

    }

  , replaceSelection: function(text) {

      var e = this.$textarea[0];

      return (

          ('selectionStart' in e && function() {
              e.value = e.value.substr(0, e.selectionStart) + text + e.value.substr(e.selectionEnd, e.value.length);
              // Set cursor to the last replacement end
              e.selectionStart = e.value.length;
              return this;
          }) ||

          /* browser not supported */
          function() {
              e.value += text;
              return jQuery(e);
          }

      )();
    }

  , getNextTab: function() {
      // Shift the nextTab
      if (this.$nextTab.length === 0) {
        return null;
      } else {
        var nextTab, tab = this.$nextTab.shift();

        if (typeof tab == 'function') {
          nextTab = tab();
        } else if (typeof tab == 'object' && tab.length > 0) {
          nextTab = tab;
        }

        return nextTab;
      }
    }

  , setNextTab: function(start,end) {
      // Push new selection into nextTab collections
      if (typeof start == 'string') {
        var that = this;
        this.$nextTab.push(function(){
          return that.findSelection(start);
        });
      } else if (typeof start == 'number' && typeof end == 'number') {
        var oldSelection = this.getSelection();

        this.setSelection(start,end);
        this.$nextTab.push(this.getSelection());

        this.setSelection(oldSelection.start,oldSelection.end);
      }

      return;
    }

  , __parseButtonNameParam: function (names) {
      return typeof names == 'string' ?
                      names.split(' ') :
                      names;

    }

  , enableButtons: function(name) {
      var buttons = this.__parseButtonNameParam(name),
        that = this;

      $.each(buttons, function(i, v) {
        that.__alterButtons(buttons[i], function (el) {
          el.removeAttr('disabled');
        });
      });

      return this;
    }

  , disableButtons: function(name) {
      var buttons = this.__parseButtonNameParam(name),
        that = this;

      $.each(buttons, function(i, v) {
        that.__alterButtons(buttons[i], function (el) {
          el.attr('disabled','disabled');
        });
      });

      return this;
    }

  , hideButtons: function(name) {
      var buttons = this.__parseButtonNameParam(name),
        that = this;

      $.each(buttons, function(i, v) {
        that.__alterButtons(buttons[i], function (el) {
          el.addClass('hidden');
        });
      });

      return this;
    }

  , showButtons: function(name) {
      var buttons = this.__parseButtonNameParam(name),
        that = this;

      $.each(buttons, function(i, v) {
        that.__alterButtons(buttons[i], function (el) {
          el.removeClass('hidden');
        });
      });

      return this;
    }

  , eventSupported: function(eventName) {
      var isSupported = eventName in this.$element;
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;');
        isSupported = typeof this.$element[eventName] === 'function';
      }
      return isSupported;
    }

  , keyup: function (e) {
      var blocked = false;
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break;

        case 9: // tab
          var nextTab;
          if (nextTab = this.getNextTab(),nextTab !== null) {
            // Get the nextTab if exists
            var that = this;
            setTimeout(function(){
              that.setSelection(nextTab.start,nextTab.end);
            },500);

            blocked = true;
          } else {
            // The next tab memory contains nothing...
            // check the cursor position to determine tab action
            var cursor = this.getSelection();

            if (cursor.start == cursor.end && cursor.end == this.getContent().length) {
              // The cursor already reach the end of the content
              blocked = false;
            } else {
              // Put the cursor to the end
              this.setSelection(this.getContent().length,this.getContent().length);

              blocked = true;
            }
          }

          break;

        case 13: // enter
          blocked = false;
          break;
        case 27: // escape
          if (this.$isFullscreen) this.setFullscreen(false);
          blocked = false;
          break;

        default:
          blocked = false;
      }

      if (blocked) {
        e.stopPropagation();
        e.preventDefault();
      }

      this.$options.onChange(this);
    }

  , change: function(e) {
      this.$options.onChange(this);
      return this;
    }
  , select: function (e) {
      this.$options.onSelect(this);
      return this;
    }
  , focus: function (e) {
      var options = this.$options,
          isHideable = options.hideable,
          editor = this.$editor;

      editor.addClass('active');

      // Blur other markdown(s)
      $(document).find('.md-editor').each(function(){
        if ($(this).attr('id') !== editor.attr('id')) {
          var attachedMarkdown;

          if (attachedMarkdown = $(this).find('textarea').data('markdown'),
              attachedMarkdown === null) {
              attachedMarkdown = $(this).find('div[data-provider="markdown-preview"]').data('markdown');
          }

          if (attachedMarkdown) {
            attachedMarkdown.blur();
          }
        }
      });

      // Trigger the onFocus hook
      options.onFocus(this);

      return this;
    }

  , blur: function (e) {
      var options = this.$options,
          isHideable = options.hideable,
          editor = this.$editor,
          editable = this.$editable;

      if (editor.hasClass('active') || this.$element.parent().length === 0) {
        editor.removeClass('active');

        if (isHideable) {
          // Check for editable elements
          if (editable.el !== null) {
            // Build the original element
            var oldElement = $('<'+editable.type+'/>'),
                content = this.getContent(),
                currentContent = this.parseContent(content);

            $(editable.attrKeys).each(function(k,v) {
              oldElement.attr(editable.attrKeys[k],editable.attrValues[k]);
            });

            // Get the editor content
            oldElement.html(currentContent);

            editor.replaceWith(oldElement);
          } else {
            editor.hide();
          }
        }

        // Trigger the onBlur hook
        options.onBlur(this);
      }

      return this;
    }

  };

 /* MARKDOWN PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.markdown;

  $.fn.markdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('markdown')
        , options = typeof option == 'object' && option;
      if (!data) $this.data('markdown', (data = new Markdown(this, options)))
    })
  };

  $.fn.markdown.messages = {};

  $.fn.markdown.defaults = {
    /* Editor Properties */
    autofocus: false,
    hideable: false,
    savable: false,
    width: 'inherit',
    height: 'inherit',
    resize: 'none',
    iconlibrary: 'glyph',
    language: 'en',
    initialstate: 'editor',
    parser: null,
    dropZoneOptions: null,

    /* Buttons Properties */
    buttons: [
      [{
        name: 'groupFont',
        data: [{
          name: 'cmdBold',
          hotkey: 'Ctrl+B',
          title: 'Bold',
          icon: { glyph: 'glyphicon glyphicon-bold', fa: 'fa fa-bold', 'fa-3': 'icon-bold', octicons: 'octicon octicon-bold' },
          callback: function(e){
            // Give/remove ** surround the selection
            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('strong text');
            } else {
              chunk = selected.text;
            }

            // transform selection and set the cursor into chunked text
            if (content.substr(selected.start-2,2) === '**'
                && content.substr(selected.end,2) === '**' ) {
              e.setSelection(selected.start-2,selected.end+2);
              e.replaceSelection(chunk);
              cursor = selected.start-2;
            } else {
              e.replaceSelection('**'+chunk+'**');
              cursor = selected.start+2;
            }

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        },{
          name: 'cmdItalic',
          title: 'Italic',
          hotkey: 'Ctrl+I',
          icon: { glyph: 'glyphicon glyphicon-italic', fa: 'fa fa-italic', 'fa-3': 'icon-italic', octicons: 'octicon octicon-italic' },
          callback: function(e){
            // Give/remove * surround the selection
            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('emphasized text');
            } else {
              chunk = selected.text;
            }

            // transform selection and set the cursor into chunked text
            if (content.substr(selected.start-1,1) === '_'
                && content.substr(selected.end,1) === '_' ) {
              e.setSelection(selected.start-1,selected.end+1);
              e.replaceSelection(chunk);
              cursor = selected.start-1;
            } else {
              e.replaceSelection('_'+chunk+'_');
              cursor = selected.start+1;
            }

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        },{
          name: 'cmdHeading',
          title: 'Heading',
          hotkey: 'Ctrl+H',
          icon: { glyph: 'glyphicon glyphicon-header', fa: 'fa fa-header', 'fa-3': 'icon-font', octicons: 'octicon octicon-text-size' },
          callback: function(e){
            // Append/remove ### surround the selection
            var chunk, cursor, selected = e.getSelection(), content = e.getContent(), pointer, prevChar;

            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('heading text');
            } else {
              chunk = selected.text + '\n';
            }

            // transform selection and set the cursor into chunked text
            if ((pointer = 4, content.substr(selected.start-pointer,pointer) === '### ')
                || (pointer = 3, content.substr(selected.start-pointer,pointer) === '###')) {
              e.setSelection(selected.start-pointer,selected.end);
              e.replaceSelection(chunk);
              cursor = selected.start-pointer;
            } else if (selected.start > 0 && (prevChar = content.substr(selected.start-1,1), !!prevChar && prevChar != '\n')) {
              e.replaceSelection('\n\n### '+chunk);
              cursor = selected.start+6;
            } else {
              // Empty string before element
              e.replaceSelection('### '+chunk);
              cursor = selected.start+4;
            }

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        }]
      },{
        name: 'groupLink',
        data: [{
          name: 'cmdUrl',
          title: 'URL/Link',
          hotkey: 'Ctrl+L',
          icon: { glyph: 'glyphicon glyphicon-link', fa: 'fa fa-link', 'fa-3': 'icon-link', octicons: 'octicon octicon-link' },
          callback: function(e){
            // Give [] surround the selection and prepend the link
            var chunk, cursor, selected = e.getSelection(), content = e.getContent(), link;

            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('enter link description here');
            } else {
              chunk = selected.text;
            }

            link = prompt(e.__localize('Insert Hyperlink'),'http://');

            var urlRegex = new RegExp('^((http|https)://|(mailto:)|(//))[a-z0-9]', 'i');
            if (link !== null && link !== '' && link !== 'http://' && urlRegex.test(link)) {
              var sanitizedLink = $('<div>'+link+'</div>').text();

              // transform selection and set the cursor into chunked text
              e.replaceSelection('['+chunk+']('+sanitizedLink+')');
              cursor = selected.start+1;

              // Set the cursor
              e.setSelection(cursor,cursor+chunk.length);
            }
          }
        },{
          name: 'cmdImage',
          title: 'Image',
          hotkey: 'Ctrl+G',
          icon: { glyph: 'glyphicon glyphicon-picture', fa: 'fa fa-picture-o', 'fa-3': 'icon-picture', octicons: 'octicon octicon-file-media' },
          callback: function(e){
            // Give ![] surround the selection and prepend the image link
            var chunk, cursor, selected = e.getSelection(), content = e.getContent(), link;

            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('enter image description here');
            } else {
              chunk = selected.text;
            }

            link = prompt(e.__localize('Insert Image Hyperlink'),'http://');

            var urlRegex = new RegExp('^((http|https)://|(//))[a-z0-9]', 'i');
            if (link !== null && link !== '' && link !== 'http://' && urlRegex.test(link)) {
              var sanitizedLink = $('<div>'+link+'</div>').text();

              // transform selection and set the cursor into chunked text
              e.replaceSelection('!['+chunk+']('+sanitizedLink+' "'+e.__localize('enter image title here')+'")');
              cursor = selected.start+2;

              // Set the next tab
              e.setNextTab(e.__localize('enter image title here'));

              // Set the cursor
              e.setSelection(cursor,cursor+chunk.length);
            }
          }
        }]
      },{
        name: 'groupMisc',
        data: [{
          name: 'cmdList',
          hotkey: 'Ctrl+U',
          title: 'Unordered List',
          icon: { glyph: 'glyphicon glyphicon-list', fa: 'fa fa-list', 'fa-3': 'icon-list-ul', octicons: 'octicon octicon-list-unordered' },
          callback: function(e){
            // Prepend/Give - surround the selection
            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

            // transform selection and set the cursor into chunked text
            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('list text here');

              e.replaceSelection('- '+chunk);
              // Set the cursor
              cursor = selected.start+2;
            } else {
              if (selected.text.indexOf('\n') < 0) {
                chunk = selected.text;

                e.replaceSelection('- '+chunk);

                // Set the cursor
                cursor = selected.start+2;
              } else {
                var list = [];

                list = selected.text.split('\n');
                chunk = list[0];

                $.each(list,function(k,v) {
                  list[k] = '- '+v;
                });

                e.replaceSelection('\n\n'+list.join('\n'));

                // Set the cursor
                cursor = selected.start+4;
              }
            }

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        },
        {
          name: 'cmdListO',
          hotkey: 'Ctrl+O',
          title: 'Ordered List',
          icon: { glyph: 'glyphicon glyphicon-th-list', fa: 'fa fa-list-ol', 'fa-3': 'icon-list-ol', octicons: 'octicon octicon-list-ordered' },
          callback: function(e) {

            // Prepend/Give - surround the selection
            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

            // transform selection and set the cursor into chunked text
            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('list text here');
              e.replaceSelection('1. '+chunk);
              // Set the cursor
              cursor = selected.start+3;
            } else {
              if (selected.text.indexOf('\n') < 0) {
                chunk = selected.text;

                e.replaceSelection('1. '+chunk);

                // Set the cursor
                cursor = selected.start+3;
              } else {
                var list = [];

                list = selected.text.split('\n');
                chunk = list[0];

                $.each(list,function(k,v) {
                  list[k] = '1. '+v;
                });

                e.replaceSelection('\n\n'+list.join('\n'));

                // Set the cursor
                cursor = selected.start+5;
              }
            }

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        },
        {
          name: 'cmdCode',
          hotkey: 'Ctrl+K',
          title: 'Code',
          icon: { glyph: 'glyphicon glyphicon-asterisk', fa: 'fa fa-code', 'fa-3': 'icon-code', octicons: 'octicon octicon-code' },
          callback: function(e) {
            // Give/remove ** surround the selection
            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('code text here');
            } else {
              chunk = selected.text;
            }

            // transform selection and set the cursor into chunked text
            if (content.substr(selected.start-4,4) === '```\n'
                && content.substr(selected.end,4) === '\n```') {
              e.setSelection(selected.start-4, selected.end+4);
              e.replaceSelection(chunk);
              cursor = selected.start-4;
            } else if (content.substr(selected.start-1,1) === '`'
                && content.substr(selected.end,1) === '`') {
              e.setSelection(selected.start-1,selected.end+1);
              e.replaceSelection(chunk);
              cursor = selected.start-1;
            } else if (content.indexOf('\n') > -1) {
              e.replaceSelection('```\n'+chunk+'\n```');
              cursor = selected.start+4;
            } else {
              e.replaceSelection('`'+chunk+'`');
              cursor = selected.start+1;
            }

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        },
        {
          name: 'cmdQuote',
          hotkey: 'Ctrl+Q',
          title: 'Quote',
          icon: { glyph: 'glyphicon glyphicon-comment', fa: 'fa fa-quote-left', 'fa-3': 'icon-quote-left', octicons: 'octicon octicon-quote' },
          callback: function(e) {
            // Prepend/Give - surround the selection
            var chunk, cursor, selected = e.getSelection(), content = e.getContent();

            // transform selection and set the cursor into chunked text
            if (selected.length === 0) {
              // Give extra word
              chunk = e.__localize('quote here');

              e.replaceSelection('> '+chunk);

              // Set the cursor
              cursor = selected.start+2;
            } else {
              if (selected.text.indexOf('\n') < 0) {
                chunk = selected.text;

                e.replaceSelection('> '+chunk);

                // Set the cursor
                cursor = selected.start+2;
              } else {
                var list = [];

                list = selected.text.split('\n');
                chunk = list[0];

                $.each(list,function(k,v) {
                  list[k] = '> '+v;
                });

                e.replaceSelection('\n\n'+list.join('\n'));

                // Set the cursor
                cursor = selected.start+4;
              }
            }

            // Set the cursor
            e.setSelection(cursor,cursor+chunk.length);
          }
        }]
      },{
        name: 'groupUtil',
        data: [{
          name: 'cmdPreview',
          toggle: true,
          hotkey: 'Ctrl+P',
          title: 'Preview',
          btnText: 'Preview',
          btnClass: 'btn btn-primary btn-sm',
          icon: { glyph: 'glyphicon glyphicon-search', fa: 'fa fa-search', 'fa-3': 'icon-search', octicons: 'octicon octicon-search' },
          callback: function(e){
            // Check the preview mode and toggle based on this flag
            var isPreview = e.$isPreview,content;

            if (isPreview === false) {
              // Give flag that tell the editor enter preview mode
              e.showPreview();
            } else {
              e.hidePreview();
            }
          }
        }]
      }]
    ],
    additionalButtons:[], // Place to hook more buttons by code
    reorderButtonGroups:[],
    hiddenButtons:[], // Default hidden buttons
    disabledButtons:[], // Default disabled buttons
    footer: '',
    fullscreen: {
      enable: true,
      icons: {
        fullscreenOn: {
          fa: 'fa fa-expand',
          glyph: 'glyphicon glyphicon-fullscreen',
          'fa-3': 'icon-resize-full',
          octicons: 'octicon octicon-link-external'
        },
        fullscreenOff: {
          fa: 'fa fa-compress',
          glyph: 'glyphicon glyphicon-fullscreen',
          'fa-3': 'icon-resize-small',
          octicons: 'octicon octicon-browser'
        }
      }
    },

    /* Events hook */
    onShow: function (e) {},
    onPreview: function (e) {},
    onSave: function (e) {},
    onBlur: function (e) {},
    onFocus: function (e) {},
    onChange: function(e) {},
    onFullscreen: function(e) {},
    onFullscreenExit: function(e) {},
    onSelect: function (e) {}
  };

  $.fn.markdown.Constructor = Markdown;


 /* MARKDOWN NO CONFLICT
  * ==================== */

  $.fn.markdown.noConflict = function () {
    $.fn.markdown = old;
    return this;
  };

  /* MARKDOWN GLOBAL FUNCTION & DATA-API
  * ==================================== */
  var initMarkdown = function(el) {
    var $this = el;

    if ($this.data('markdown')) {
      $this.data('markdown').showEditor();
      return;
    }

    $this.markdown()
  };

  var blurNonFocused = function(e) {
    var $activeElement = $(document.activeElement);

    // Blur event
    $(document).find('.md-editor').each(function(){
      var $this            = $(this),
          focused          = $activeElement.closest('.md-editor')[0] === this,
          attachedMarkdown = $this.find('textarea').data('markdown') ||
                             $this.find('div[data-provider="markdown-preview"]').data('markdown');

      if (attachedMarkdown && !focused) {
        attachedMarkdown.blur();
      }
    })
  };

  $(document)
    .on('click.markdown.data-api', '[data-provide="markdown-editable"]', function (e) {
      initMarkdown($(this));
      e.preventDefault();
    })
    .on('click focusin', function (e) {
      blurNonFocused(e);
    })
    .ready(function(){
      $('textarea[data-provide="markdown"]').each(function(){
        initMarkdown($(this));
      })
    });

}));

/**
 * @author Omar Zabaneh <zabano@gmail.com>
 */

var jsonapi = jsonapi || {}

jsonapi.Resource = function (type, id, attributes) {

    this.data = {type: type, attributes: {}, relationships: {}};

    if (id) this.data.id = id;
    for (key in attributes) {
        if (attributes[key]) {
            this.data.attributes[key] = attributes[key];
        }
    }

    this.relationship = function (key, data) {
        this.data.relationships[key] = {data: data};
    }

    this.jsonify = function () {
        return JSON.stringify({data: this.data});
    }
}

jsonapi.make_resource = function (api_type, id, attributes, relationships) {
    var resource_object = {type: api_type};
    if (id != undefined) {
        resource_object.id = id;
    }
    if (attributes != undefined) {
        resource_object.attributes = attributes;
    }
    if (relationships != undefined) {
        resource_object.relationships = relationships;
    }
    return {data: resource_object};
}


jsonapi.parse_resource_object = function (row, included) {

    var obj = {
        id: row.id,
        type: row.type,
    };

    $.extend(obj, row.attributes);

    $.each(row.relationships, function (key, relationship) {
        var related = relationship.data;
        if (related) {
            if ($.isArray(related)) {
                obj[key] = [];
                if (included) {
                    $.each(related, function (i, rel) {
                        obj[key].push(included[rel.type][rel.id]);
                    });
                }
            } else {
                obj[key] = (included) ? included[related.type][related.id] : null;
            }

        } else {
            obj[key] = relationship.data;
        }
    });

    return obj;
}

jsonapi.parse_response = function (json, number_of_passes) {

    var included = {};
    var data = null;

    /**
     * parse included resources
     **/

    // parse included resources
    if (json.included) {
        for (var pass = 1; pass <= number_of_passes; pass++) {
            $.each(json.included, function (i, row) {
                if (included[row.type] == undefined) {
                    included[row.type] = {};
                }
                included[row.type][row.id] = jsonapi.parse_resource_object(row, (pass > 1) ? included : undefined);
            });
        }
    }

    /**
     * parse response data
     */

    if ($.isArray(json.data)) {  // collection
        data = [];
        $.each(json.data, function (i, row) {
            data.push(jsonapi.parse_resource_object(row, included))
        })
    } else {  // single resource
        data = jsonapi.parse_resource_object(json.data, included)
    }

    return data;
};

jsonapi.comments = function (container_id, params) {

    var BASE_URL = '/api/' + params.commentResourceType + '/';

    function reformat_comment_object(comment) {
        return {
            id: comment.id,
            created: comment['created-on'],
            modified: comment['modified-on'],
            content: comment.body,
            fullname: comment.author.name.first + ' ' + comment.author.name.last,
            profile_url: '/users/' + comment.author.id,
            profile_picture_url: '/users/' + comment.author.id + '/avatar',
            parent: (comment.parent) ? comment.parent.id : undefined,
            created_by_current_user: comment.author.id == params.userID,
        }
    };

    $(container_id).comments({

        profilePictureURL: '/users/' + params.userID + '/avatar',
        enableUpvoting: false,
        youText: params.userName,
        postCommentOnEnter: true,
        spinnerIconURL: '',
        noCommentsIconURL: '',

        timeFormatter: function (time) {
            return moment(time).fromNow();
        },

        getComments: function (success, error) {
            var url = URI(BASE_URL);
            url.addQuery('include',
                'author,author.name,parent,replies,replies.author,replies.author.name,replies.parent');
            url.addQuery('fields[users]', 'name');
            url.addQuery('fields[user-names]', 'first,last');
            url.addQuery('filter[' + params.relName + '_id.eq]', params.resourceID);

            $.ajax(url.readable(), {
                success: function (json) {
                    var comments = jsonapi.parse_response(json, 3);

                    console.log(comments)

                    var reformatted = [];
                    $.each(comments, function (i, comment) {
                        reformatted.push(reformat_comment_object(comment));
                        $.each(comment.replies, function (i, reply) {
                            reformatted.push(reformat_comment_object(reply));
                        });
                    });
                    success(reformatted);
                },
                error: error,
            });
        },

        postComment: function (comment, success, error) {
            var resource = jsonapi.make_resource(params.commentResourceType, null, {body: comment.content}, {
                author: {
                    data: {
                        id: params.userID,
                        type: 'users'
                    }
                }
            });
            if (comment.parent) {
                var parent_id = $('li.comment[data-id=' + comment.parent + ']').parents('li.comment').attr('data-id');
                if (parent_id == undefined) parent_id = comment.parent;
                resource['data']['relationships']['parent'] = {
                    data: {
                        type: params.commentResourceType,
                        id: parent_id
                    }
                }
            } else {
                resource['data']['relationships'][params.relName.replace('_', '-')] = {
                    data: {
                        type: params.resourceType,
                        id: params.resourceID,
                    }
                }
            }

            var url = URI(BASE_URL)
            url.addQuery('include', 'author,author.name,parent');
            url.addQuery('fields[users]=name');
            url.addQuery('fields[user-names]=first,last');
            $.ajax(url.readable(), {
                type: 'post',
                data: JSON.stringify(resource),
                contentType: "application/json",
                success: function (json) {
                    console.log(json)
                    var comment = jsonapi.parse_response(json, 3);
                    success(reformat_comment_object(comment));
                },
                error: error,
            });
        },

        putComment: function (comment, success, error) {

            var resource = jsonapi.make_resource(params.commentResourceType, comment.id, {body: comment.content});
            var url = URI(BASE_URL + comment.id);
            url.addQuery('include', 'author,author.name,parent');
            url.addQuery('fields[users]=name');
            url.addQuery('fields[user-names]=first,last');
            $.ajax(url.readable(), {
                type: 'patch',
                data: JSON.stringify(resource),
                contentType: "application/json",
                success: function (json) {
                    var comment = jsonapi.parse_response(json, 2);
                    success(reformat_comment_object(comment));
                },
                error: error,
            });
        },

        deleteComment: function (comment, success, error) {

            var url = URI(BASE_URL + comment.id);
            $.ajax({
                type: 'delete',
                url: url.readable(),
                success: success,
                error: error
            });
        }

    });
}
// Javascript to enable link to tab
var url = document.location.toString();
if (url.match('#')) {
    $('.nav-tabs a[href="#' + url.split('#')[1] + '"]').tab('show');
    $('.nav-pills a[href="#' + url.split('#')[1] + '"]').tab('show');
}

can = {}

can.dom = {}

can.dom.html = function (obj) {
    var tmp = $('<div/>').html(obj);
    return tmp.html();
}

can.dom.create_link = function (href, label, title) {

    var a = $('<a/>').attr('href', href).text(label);

    if (href.substr(0, 4) == 'http') {
        a.attr('target', '_blank')
    }

    if (title !== undefined) {
        a.attr('title', title).attr('data-toggle', 'tooltip')
    }

    return a;
}

can.dom.link = function (href, label, title) {
    return can.dom.html(can.dom.create_link(href, label, title));
}

can.dom.create_label = function (content, title, type, pad) {

    if (type === undefined) {
        type = 'default';
    }

    return $('<span/>').addClass('label label-' + type)
        .attr('title', title).text(content)
        .attr('data-toggle', 'tooltip');
}

can.dom.label = function (content, title, type) {
    return can.dom.html(can.dom.create_label(content, title, type));
}

can.dom.create_span = function (content, title) {
    return $('<span/>').attr('title', title).text(content)
        .attr('data-toggle', 'tooltip');
}

can.dom.span = function (content, title) {
    return can.dom.html(can.dom.create_span(content, title).tooltip());
}

can.dom.user_status = function (user) {
    var category = 'success';
    if (user.status.id == 0) {
        category = 'warning';
    } else if (user.status.id == 2) {
        category = 'danger';
    }
    return can.dom.label(user.status.name, undefined, category);
}

can.dom.datetime = function (data) {
    if (data) {
        var date = moment(data);
        return can.dom.html($('<time/>').attr('title', date.format('MMMM D YYYY h:mm A')).text(date.fromNow()))
    }
}

can.dom.create_progress = function (num, den) {
    var percent = parseInt(num / den * 100) + '%';
    return $('<div/>').addClass('progress').append(
        $('<div/>').addClass('progress-bar progress-bar-success')
            .css('min-width', '2em').css('width', percent)
            .text(percent)
            .attr('title', num + ' of ' + den)
    )
}

can.dom.progress = function (num, den) {
    return can.dom.html(can.dom.create_progress(num, den))
}

can.dom.create_yesno_bar = function (yes, no, total) {
    var $progress = $('<div/>').addClass('progress');
    if (yes > 0) {
        var percent = parseInt(yes / total * 100) + '%';
        $progress.append($('<div/>').addClass('progress-bar progress-bar-success')
            .css('min-width', '2em').css('width', percent)
            .text(percent + " Yes")
            .attr('title', yes + ' of ' + total));
    }
    if (no > 0) {
        var percent = parseInt(no / total * 100) + '%';
        $progress.append($('<div/>').addClass('progress-bar progress-bar-danger')
            .css('min-width', '2em').css('width', percent)
            .text(percent + " No")
            .attr('title', no + ' of ' + total));
    }
    return $progress;
}

can.dom.yesno_bar = function (yes, no, total) {
    return can.dom.html(can.dom.create_yesno_bar(yes, no, total))
}

$(document).ready(function () {

    // enable links to tab
    var hash = document.location.hash;
    if (hash) {
        $('.nav-tabs a[href=' + hash + '-pane]').tab('show');
    }

    // enable form validator inside tabs
    $('a[data-toggle="tab"]').one('shown.bs.tab', function (e) {
        $($(e.target).attr('href')).find('form').validator();
    });

    // enable data-moment
    $('time[data-moment]').each(function (i, time) {
        var data = moment($(time).attr('data-moment'));
        $(time).html(data.fromNow()).attr('title', data.format('MMMM D YYYY h:mm A')).addClass('tip-auto').tooltip();
    });

    // enable fancy tooltips
    $('[data-toggle="tooltip"]').addClass('tip-auto').tooltip();

    // enable ajax csrf token
    $.ajaxSetup({
        headers: {'X-CSRFToken': $('meta[name=csrf-token]').attr('content')}
    });

    /************************
     * ajax processing indicator *
     ************************/

    $('#processing-indicator').popup({
        transition: 'all 0.5s',
        blur: false,
        escape: false
    }).removeClass('invisible');

    $.ajaxSetup({
        global: true,
        xhr: function () {
            var xhr = new window.XMLHttpRequest();
            xhr.addEventListener("progress", function (e) {
                if (e.lengthComputable) {
                    var pct = Math.ceil((e.loaded || e.position) / e.total * 100);
                    $('.progress-bar').css('width', pct + '%')
                        .text(pct + '%')
                        .attr('aria-valuenow', pct);
                }
            }, false);
            return xhr;
        }
    });

    $(document).ajaxSend(function () {
        $('#processing-indicator div.progress-bar').css('width', 0).text('0%').attr('aria-valuenow', 0);
        $('#processing-indicator').popup('show');
    });

    $(document).ajaxStop(function () {
        $('#processing-indicator').delay(100).animate({opacity: 0}, {
            duration: 100, complete: function () {
                $('#processing-indicator').popup('hide');
            }
        });
    });

});

/***********************************************************************************************************************
 * GEoPD JavaScript Library
 **********************************************************************************************************************/

geopd = {}

geopd.dom = {}


/***********************************************************************************************************************
 * Document Initialization
 **********************************************************************************************************************/

$(document).ready(function () {

    $.extend(true, $.fn.dataTable.defaults, {
        drawCallback: function () {
            $('[data-toggle="tooltip"]').addClass('tip-auto').tooltip();
        },
        columnDefs: [{
            targets: '_all',
            defaultContent: can.dom.label('NA', 'Not Available', 'warning'),
        }],
        processing: true,
    });

    $.extend(true, $.fn.editable.defaults, {
        name: 'value',
        id: 'name',
        cancel: '<button class="btn btn-sm btn-default" type="cancel" >' +
        '<span class="glyphicon glyphicon-remove"></span></button>',
        submit: '<button class="btn btn-sm btn-primary" type="submit" >' +
        '<span class="glyphicon glyphicon-ok"></span></button>',
        indicator: 'Saving ...',
    });

    $('.collapse')
        .on('shown.bs.collapse', function () {
            $(this)
                .parent()
                .find(".glyphicon-chevron-down")
                .removeClass("glyphicon-chevron-down")
                .addClass("glyphicon-chevron-up");
        })
        .on('hidden.bs.collapse', function () {
            $(this)
                .parent()
                .find(".glyphicon-chevron-up")
                .removeClass("glyphicon-chevron-up")
                .addClass("glyphicon-chevron-down");
        });
});
