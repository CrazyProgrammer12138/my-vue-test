webpackJsonp([2],{"5zde":function(e,t,o){o("zQR9"),o("qyJz"),e.exports=o("FeBl").Array.from},Gu7T:function(e,t,o){"use strict";t.__esModule=!0;var r,n=o("c/Tr"),a=(r=n)&&r.__esModule?r:{default:r};t.default=function(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return(0,a.default)(e)}},"c/Tr":function(e,t,o){e.exports={default:o("5zde"),__esModule:!0}},erFZ:function(e,t){},fBQ2:function(e,t,o){"use strict";var r=o("evD5"),n=o("X8DO");e.exports=function(e,t,o){t in e?r.f(e,t,n(0,o)):e[t]=o}},qyJz:function(e,t,o){"use strict";var r=o("+ZMJ"),n=o("kM2E"),a=o("sB3e"),s=o("msXi"),i=o("Mhyx"),c=o("QRG4"),u=o("fBQ2"),f=o("3fs2");n(n.S+n.F*!o("dY0y")(function(e){Array.from(e)}),"Array",{from:function(e){var t,o,n,l,v=a(e),d="function"==typeof this?this:Array,h=arguments.length,m=h>1?arguments[1]:void 0,_=void 0!==m,b=0,k=f(v);if(_&&(m=r(m,h>2?arguments[2]:void 0,2)),void 0==k||d==Array&&i(k))for(o=new d(t=c(v.length));t>b;b++)u(o,b,_?m(v[b],b):v[b]);else for(l=k.call(v),o=new d;!(n=l.next()).done;b++)u(o,b,_?s(l,m,[n.value,b],!0):n.value);return o.length=b,o}})},tcnj:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o("Gu7T"),n=o.n(r),a=o("Xxa5"),s=o.n(a),i=o("exGp"),c=o.n(i),u=o("UeVD"),f=o("gyMJ"),l={name:"List",created:function(){this.getData()},data:function(){return{books:[],hasMore:!0,offset:0,isLoading:!1}},methods:{loadMore:function(){var e=this;clearTimeout(this.timer),this.timer=setTimeout(function(){var t=e.$refs.scroll,o=t.scrollTop,r=t.clientHeight,n=t.scrollHeight;console.log(1e3),o+r+10>n&&e.getData()},50)},more:function(){this.getData()},remove:function(e){var t=this;return c()(s.a.mark(function o(){return s.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Object(f.e)(e);case 2:t.books=t.books.filter(function(t){return t.bookId!==e});case 3:case"end":return o.stop()}},o,t)}))()},getData:function(){var e=this;return c()(s.a.mark(function t(){var o,r,a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.hasMore||e.isLoading){t.next=11;break}return e.isLoading=!0,t.next=4,Object(f.d)(e.offset);case 4:o=t.sent,r=o.hasMore,a=o.books,e.books=[].concat(n()(e.books),n()(a)),e.hasMore=r,e.offset=e.books.length,e.isLoading=!1;case 11:case"end":return t.stop()}},t,e)}))()}},components:{MHeader:u.a}},v={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("MHeader",[e._v("列表页")]),e._v(" "),o("div",{ref:"scroll",staticClass:"content",on:{scroll:function(t){return e.loadMore()}}},[o("ul",e._l(e.books,function(t,r){return o("router-link",{key:r,attrs:{to:{name:"detail",params:{bid:t.bookId}},tag:"li"}},[o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.bookCover,expression:"item.bookCover"}],attrs:{alt:""}}),e._v(" "),o("div",[o("h4",[e._v(e._s(t.bookName))]),e._v(" "),o("p",[e._v(e._s(t.bookInfo))]),e._v(" "),o("b",[e._v(e._s(t.bookPrice))]),e._v(" "),o("button",{on:{click:function(o){return o.stopPropagation(),e.remove(t.bookId)}}},[e._v("删除")])])])}),1),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.hasMore,expression:"hasMore"}],staticClass:"more",on:{click:function(t){return e.more()}}},[e._v("加载更多")])])],1)},staticRenderFns:[]};var d=o("VU/8")(l,v,!1,function(e){o("erFZ")},"data-v-8b5ee948",null);t.default=d.exports}});
//# sourceMappingURL=2.270a0409e7423d4d29cf.js.map