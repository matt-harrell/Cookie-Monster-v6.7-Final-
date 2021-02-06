if (!chrome.runtime) {
    // Chrome 20-21
    chrome.runtime = chrome.extension;
} else if(!chrome.runtime.onMessage) {
    // Chrome 22-25
    chrome.runtime.onMessage = chrome.extension.onMessage;
    chrome.runtime.sendMessage = chrome.extension.sendMessage;
    chrome.runtime.onConnect = chrome.extension.onConnect;
    chrome.runtime.connect = chrome.extension.connect;
}



var UriParser;
UriParser = (function() {
        UriParser.name = 'UriParser';
        UriParser.prototype._regExp = /^((\w+):\/\/\/?)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#;\|]+)?([;\|])?([^\?#]+)?\??([^#]+)?#?(\w*)/;
        UriParser.prototype.username = '';
        UriParser.prototype.password = '';
        UriParser.prototype.port = '';
        UriParser.prototype.protocol = '';
        UriParser.prototype.host = '';
        UriParser.prototype.pathname = '';
        UriParser.prototype.url = '';
        UriParser.prototype.urlparamseparator = '';
        UriParser.prototype.urlparam = '';
        UriParser.prototype.querystring = {};
        UriParser.prototype.fragment = '';
        UriParser.prototype.results = null;
        function UriParser(uri) {
        if (uri != null) this.parse(uri);
        }
        UriParser.prototype._getVal = function(r, i) {
        if ((r != null ? r[i] : void 0) != null) return r[i];
        };
        UriParser.prototype.parse = function(uri) {
            if (uri == null) return null;
            this.results = this._regExp.exec(uri);
            this.url = this._getVal(this.results, 0);
            this.protocol = this._getVal(this.results, 2);
            this.username = this._getVal(this.results, 4);
            this.password = this._getVal(this.results, 5);
            this.host = this._getVal(this.results, 6);
            this.port = this._getVal(this.results, 7);
            this.pathname = this._getVal(this.results, 8);
            this.urlparamseparator = this._getVal(this.results, 9);
            this.urlparam = this._getVal(this.results, 10);
            this.querystring = this._getVal(this.results, 11);
            this.fragment = this._getVal(this.results, 12);
            return this.results;
        };
        return UriParser;
})();

// https://github.com/somilagarwal/cookie-remover



function eatCookies() {
    alert("Cookies have been eaten.");

        var domain;
        chrome.tabs.getSelected(null,function(tab) {
             parsed = new UriParser(tab.url);
             console.log(tab.url);
             domain = parsed.host;
             console.log(domain);
        });
        chrome.cookies.getAll({domain: domain}, function(cookies) {
            for(var i=0; i<cookies.length;i++) {
                chrome.cookies.remove({url: "http://"+ domain + cookies[i].path, name: cookies[i].name});
            }
        });




       }


// https://github.com/somilagarwal/cookie-remover

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.greeting == "hello")
            eatCookies();

  }
);
// https://gist.github.com/SathyaBhat/894012
