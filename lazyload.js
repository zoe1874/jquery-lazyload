/**
 * @description:
 * @author: Zhen.li
 * @Date: 2015-09-14 下午6:00
 */

(function ($, win) {

    var lazyload = function (opt) {
        var defaultOpt = {
            container:$('body'), //container下的所有图片有data-src的都进行延迟加载
            item:'j-item',//特定的元素进行延迟加载
            type:'img', //还有ajax表示延迟请求
            event:'scroll',//表示滚动即加载,还有一种click
            callback:null

        };
        this.opt = $.extend({},defaultOpt,opt);
        this.init();
    };

    lazyload.prototype = {
        init:function(){
            var w = this;
            w.initEvent();
        },

        initEvent:function(){
            var w = this;

            if(w.opt.event == 'scroll'){
                $(win).scroll(function () {
                    w.load();
                })
            }
            if(w.opt.event == 'click'){
                w.opt.container.find('img').bind('click', function (e) {
                    e.preventDefault();
                    w.clickLoad($(e.target));
                })
            }

        },

        clickLoad:function(dom){
            var w = this;
            w.loadImg(dom);
        },

        load:function(){
            var w = this;
            var ajaxFlag = false;

            if(w.opt.type == 'img'){
                w.opt.container.find('img').each(function (i, item) {
                    if( w.isInner($(item)) ){
                        w.loadImg($(item));
                    }
                })
            }

            /**
             * @TODO:延迟请求 好像用处不大,暂时不做了
             * 丁当铺里有用到
             */
            if(w.opt.type == 'ajax'){
                if(!ajaxFlag){
                    ajaxFlag = true;
                    //w.opt.fn();
                }
            }
        },

        loadImg:function(dom){
            var w = this;
            if(dom.attr('data-src')){
                dom.attr('src') != dom.attr('data-src') && dom.attr('src', function () {
                    return dom.attr('data-src');
                })
            }

        },

        /**
         *
         * @param dom 在不在可视区域中
         * @returns {boolean}
         */
        isInner:function(dom){
            var w = this;
            var h = $(win).height(),
                st = $(document).scrollTop();
            var flag = dom.offset().top > st && dom.offset().top < h + st;

            return flag;
        }
    };

    win.global = win.global || {};
    win.global.lazyload = lazyload;

})(jQuery, window);