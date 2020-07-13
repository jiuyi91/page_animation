/**
 * yizq 2020/06/29. 整理以前的代码些项目做了大概30个类大型活动，在此上做二次开发,此项目第一次用是2016年2月
 *
 */
;(function definelayer(global, factory) {
    var page_animation = factory(global);
    //给类注入到window上，方便业务二次调用
    if (typeof exports === 'object' &&  exports && typeof exports.nodeName !== 'string') {
        // CommonJS
        module.exports = page_animation;        
    } else if (typeof define === 'function' && define.amd) {
        //AMD
        define(['exports'], page_animation);    
    }
    
    global.page_animation = page_animation;

})(this, function (global, undefined) {
    'use strict';
    //多次调用时的共有方法
    let _win = window,
        _doc = document;

    let _page_animation_index = 0;

    //写入默认公有样式
    {
        let _style = _doc.createElement('style');
        //_style.type="text/css" 
        _style.innerHTML = `
        .page_animation_20160612{position: absolute; width: 100%;height:100%; background: rgba(0,0,0,.5); -webkit-transition:all 400ms ease;}
        .page_animation_20160612 .a_page_info{ width:100%; height:100%; position:absolute; left:0; overflow:hidden; background-size:cover; background-position: center;-webkit-transition:all 400ms ease;}
        .page_animation_20160612 .a_page_info .inner_box{ height:100%; position:absolute;}
        @-webkit-keyframes page_animation_20160612start{0%,30%{opacity:0;-webkit-transform:translate(0,10px)}60%{opacity:1;-webkit-transform:translate(0,0)}100%{opacity:0;-webkit-transform:translate(0,-8px)}}
        .page_animation_20160612 .page_pointer{ position:absolute;}
        .page_animation_20160612 .page_pointer_bottom{ bottom:10px; left:50%; margin-left:-14px; width:28px; height:19px; -webkit-animation:page_animation_20160612start 1.5s infinite ease-in-out;}
        .page_animation_20160612 .page_pointer_bottom em,
        .page_animation_20160612 .page_pointer_bottom span{ width:14px; height:19px; position:absolute; overflow:hidden;}
        .page_animation_20160612 .page_pointer_bottom em:after,
        .page_animation_20160612 .page_pointer_bottom span:after{ content:""; width:6px; height:18px; background:#fff; position:absolute; top:0; box-shadow:0 0 2px rgba(0,0,0,0.65);}
        .page_animation_20160612 .page_pointer_bottom em{ right:0;}
        .page_animation_20160612 .page_pointer_bottom em:after{-webkit-transform:rotate(135deg); left:0px;}
        .page_animation_20160612 .page_pointer_bottom span:after{-webkit-transform:rotate(-135deg); right:0;}
        .page_animation_20160612 .page_pointer_right{ top:50%; margin-top:-54px; right:0.8%; height:28px; width:19px;}
        .page_animation_20160612 .page_pointer_right:before{ content:"请向右滑"; position:absolute; top:30px; font-size:14px; width:18px; color:#FFFFFF; text-shadow:0 0 2px rgba(0,0,0,0.65); opacity:0.7;}
        .page_animation_20160612 .page_pointer_right em,
        .page_animation_20160612 .page_pointer_right span{ width:19px; height:14px; position:absolute; overflow:hidden;}
        .page_animation_20160612 .page_pointer_right em:after,
        .page_animation_20160612 .page_pointer_right span:after{ content:""; width:18px; height:3px; background:#fff; position:absolute; box-shadow:0 0 2px rgba(0,0,0,0.65);}
        .page_animation_20160612 .page_pointer_right em{ bottom:0;}
        .page_animation_20160612 .page_pointer_right em:after{-webkit-transform:rotate(-45deg); top:1px;}
        .page_animation_20160612 .page_pointer_right span:after{-webkit-transform:rotate(45deg); top:10px;}
        
        .page_animation_20160612 .loading_box{ width:100%; height:100%; background:#3c3c3c; position:absolute; top:0; left:0;}
        .page_animation_20160612 .loading{ position:absolute; width:2rem; left:calc(50% - 1rem); top:25%;}
        .page_animation_20160612 .loading img{ width:100%; left:0; top:0; position:relative;}
        @-webkit-keyframes page_animation_20160612startloading_rotate{from {-webkit-transform:rotate(0deg); opacity:0.2;}to {-webkit-transform:rotate(360deg); opacity:1;}}
        .page_animation_20160612 .loading img.bg{ position:absolute; top:0; left:0;-webkit-animation-name: page_animation_20160612startloading_rotate; -webkit-animation:page_animation_20160612startloading_rotate 3s infinite linear alternate;}
        
        .page_animation_20160612 .mp3_box{ position:absolute; right:10px; top:15px;}
        @-webkit-keyframes page_animation_20160612startloading_rotatemp3_but_on { from {-webkit-transform:rotate(0deg);}to {-webkit-transform:rotate(360deg);}}
        .page_animation_20160612 .mp3_box .mp3_but{ width:40px; height:40px; border-radius:50%; overflow:hidden; background:url(img/audio.png) no-repeat bottom; background-size:100% auto;}
        .page_animation_20160612 .mp3_box .mp3_but_on{ background-position:top left;-webkit-animation: page_animation_20160612startloading_rotatemp3_but_on 2s infinite linear;}
        
        .page_animation_20160612 .loading .num{ width:150%; background:rgba(0, 0, 0, .2); margin-left: -25%; border-radius: .14rem; display:block; text-align:center; margin-top:30%; color:rgba(255,198,0,0.80); font-size:.28rem; left:0;}
        .page_animation_20160612 .loading .num p{background:rgba(0, 0, 0, .4); border-radius: .14rem; color: rgba(255, 255, 255, .8); min-width: 1.5rem;}
        
        .page_animation_20160612 .page_mun_box{ position:absolute; bottom:0; right:0; min-width:40px; height:24px; line-height:24px; text-align:center; background:rgba(0,0,0,0.3); border-radius:10px 0 0 0; padding-left:5px; font-size:12px; color:rgba(255,255,255,0.5)}
        .page_animation_20160612 .page_mun_box b{ font-size:16px; color:rgba(255,255,255,0.8)}
        `; 
        //_win.addEventListener("load", function(){
            _doc.head.appendChild(_style);
        //}, false);
    }


    //每一次调用的私有方法
    let page_animation = function (obj){

        //写入放滑屏的组件的父标签
        let box_dom;
        if(obj.dome_id){
            if(obj.dome_id.tagName){
                box_dom = obj.dome_id;
            }else{
                box_dom = _doc.querySelector(obj.dome_id);
            }
            if(!box_dom){
                console.error('请检查您传入的dome_id参数是否有问题，按类选择器的方式传入如 .abcd 、#abcd、div(元素标签名)');
            }
        }else{
            box_dom = _doc.createElement('div');
            _doc.body.appendChild(box_dom);
        }

        //写入公有样式，和外部扩展的私有样式,方便外部调用
        box_dom.classList.add('page_animation_20160612');

        //放入的元素尺寸检查

        //用来标实每一个私有的应用，可以通过此ID找到唯一的应用
        box_dom.classList.add('p_a_20160612_' + _page_animation_index++);
        
        //为了给数写成同步
        let box_dome_info = {
            _h: 0,
            _w: 0
        }

        let page_len = 0;
        //向页面写入dome元素
        let page_list = [];

        let return_obj = {
            page_list: page_list,
            page_index: 0,
            go_page: () => {}
        }
        
        let pointer;
        let num_box;
        function now_page_animation(now_page) {
            let _now_page = page_list[now_page];
            let _dom_list = _now_page.querySelectorAll('*');
            for (let i = 0; i < _dom_list.length; i++) {
                let _a_dom = _dom_list[i];
                let _begin_css = _a_dom.dataset.begin;
                if(_begin_css){
                    let _css_index = 0;
                    _a_dom.__animation__ = undefined;
                    function animation(){
                        //如果此屏退出时不再处理后期的动画
                        if(_a_dom.__animation__){
                            return;
                        }
                        _css_index++;
                        if(_css_list[_css_index]){
                            for(let i = 0; i < _css_list.length; i++){
                                _a_dom.classList.remove(_css_list[i]);
                            }
                            _a_dom.classList.add(_css_list[_css_index]);
                        } else {
                            //这里可以写入结束时的样试
                        }
                    }
                    _a_dom.addEventListener('webkitAnimationEnd', animation, false)
                    _a_dom.addEventListener('transitionend', animation, false)
                    _a_dom.style.opacity = '';
                    let _css_list = _begin_css.trim().replace(/\s+/ig," ").split(" ")
                    for(let i = 0; i < _css_list.length; i++){
                        _a_dom.classList.remove(_css_list[i]);
                    }
                    _a_dom.classList.add(_css_list[_css_index]);
                }
            }
            if(num_box){
                num_box.innerHTML = ++now_page;
            }
            let _goin_fn = obj.page[now_page].goin_fn || (() => {});
            _goin_fn(_now_page);
        }
        function write_page() {
            let _frag = _doc.createDocumentFragment();
            
            for(let i in obj.page){
                page_len++;
            }
            //横竖板检测，一屏的比例，此处事要扩展不同的屏幕比例，用来做不同设备的展示；

            _win.addEventListener("load",() => {
                box_dome_info._h = box_dom.offsetHeight;
                box_dome_info._w = box_dom.offsetWidth;
                if(box_dome_info._h > box_dome_info._w){
                    box_dom.classList.add('page_animation_horizontal');
                }
            },false); 

            for (let i = 0; i < page_len; i++) {
                let __new_dom = _doc.createElement("div");
                __new_dom.style.zIndex = page_len - i;

                let __a_page = obj.page[i];

                //写入当前页的背设的背景图
                if (__a_page.bg_img) { 
                    __new_dom.style.backgroundImage = "url(" + __a_page.bg_img + ")";
                }
                //写入当前页的背设的背色
                if (__a_page.bg_color) { 
                    __new_dom.style.backgroundColor = __a_page.bg_color
                }

                //写入默认样式
                __new_dom.classList.add('a_page_info');
                //写入每一页的不同样式，用来处理面页内部元素类名相同的处理路径
                __new_dom.classList.add('a_page_info_' + i);
                //处理页面外传进来的自定义样式，外部也可以通过上一条来找到页面的不同样试，传入可以处理两个页样式一样的问题
                if(__a_page.page_class){
                    __new_dom.classList.add(__a_page.page_class);
                }
                //用来处理横竖屏的检测问题，此处的样式通过下一条里内置的DIV来适配屏幕,检测屏幕是否比例是1.5倍
                _win.addEventListener("load",() => {
                    if(box_dome_info._h/box_dome_info._w < 1.5 && box_dome_info._h/box_dome_info._w > 1){
                        __new_dom.classList.add('a_page_info_min');
                    }
                },false); 

                //向页面写入数据配置内容
                if(__a_page.html){
                    let _html_box = _doc.createElement('div');
                    //此定义的样式可以能过上面的屏幕不同的展示来区会展示效果
                    _html_box.className = '_a_page_html';
                    //__a_page.html 这里对输入的无素进行判断，如果是HTML元素可以直接用appendChild方法
                    _html_box.innerHTML = __a_page.html;
                    __new_dom.appendChild(_html_box);
                }
                
                page_list.push(__new_dom);
                _frag.appendChild(__new_dom);
            }

            //对页面加输入的HTML元素进行始始化
            {
                let _all_dom = _frag.querySelectorAll('*');
                for(let i = 0; i < _all_dom.length; i++){
                    let __a_dom = _all_dom[i];
                    if(__a_dom.dataset.begin){
                        let __end = __a_dom.dataset.end;
                        if(__end){
                            __a_dom.classList.add(__end);
                        }else{
                            __a_dom.style.opacity = '0';
                        }
                    }
                }
            }
            //是否出现引导的指针，默认为出现；
            if (!(typeof obj.pointer === 'boolean' && !obj.pointer) && !(typeof obj.slide_page === 'boolean' && !obj.slide_page)) {
                pointer = _doc.createElement("div");
                pointer.classList.add("page_pointer");
                if (obj.right_slide) {
                    pointer.classList.add("page_pointer_right");
                } else {
                    pointer.classList.add("page_pointer_bottom");
                }
                pointer.style.zIndex = page_len + 10;
                pointer.innerHTML = "<span></span><em></em>";
                _frag.appendChild(pointer);
            }

            box_dom.appendChild(_frag);
            let _all_fn = obj.all_fn || (() => {});
            _all_fn(box_dom);
        }

        function slide(){
            let start_y = 0,
                start_x = 0;
            //当前屏幕所在的页数
            let page_index = 0;

            //滑动方向识别
            let _x_y = 'y',
                _dir = 'top';

            if (obj.right_slide) {
                _x_y = "x"
                _dir = "left";
            }

            function move_fn(_data) {
                
                //让处部元素跟据手指动的方法
                let _data_x_y = _data[_x_y];
                let _num = box_dome_info._h;
                if (obj.right_slide) {
                    _num = box_dome_info._w;
                }
                function _box_move(){
                    //box_dom.style.WebkitTransitionProperty = [_dir];
                    box_dom.style.WebkitTransitionDuration = '0ms';
                    box_dom.style[_dir] = _data_x_y + "px";
                }
                
                //向下滑, 默认向下滑, 30这个值可以调敏感度
                if( (_data_x_y > 0 && _data_x_y < 30) || (_data_x_y < 0 && _data_x_y > -30)){
                    return;
                }

                if ((page_index === 0 && _data_x_y >= 30) || (page_index === page_len - 1 && _data_x_y <= -30)) {
                    //console.log(1);
                    _box_move();
                }else {
                    //console.log(2);
                    page_list[page_index].style[_dir] = _data_x_y + "px";
                    page_list[page_index].style.WebkitTransitionDuration = '0ms';
                    
                    if (_data_x_y < 0 && page_list[page_index + 1]) {
                        page_list[page_index + 1].style.zIndex = page_len + 1;
                        page_list[page_index + 1].style[_dir] = _num + _data_x_y + "px";
                        page_list[page_index + 1].style.WebkitTransitionDuration = '0ms';
                    } else if(page_list[page_index - 1]){
                        page_list[page_index - 1].style.zIndex = page_len + 1;
                        page_list[page_index - 1].style[_dir] = _data_x_y - _num + "px";
                        page_list[page_index - 1].style.WebkitTransitionDuration = '0ms';
                    }
                }

            }

            function go_page(_data){
                if(pointer){
                    if(_data.now_page === page_len - 1){
                        pointer.style.display = 'none';
                    }else{
                        pointer.style.display = '';
                    }
                }
                setTimeout(function(){
                     //传新页地址
                    now_page_animation(_data.now_page);
                    //处理旧地址里的内容
                    ;(function(old_page) {
                        let _old_page = page_list[old_page];
                        let _dom_list = _old_page.querySelectorAll('*');
                        //console.log(page_list[old_page]);
                        for (let i = 0; i < _dom_list.length; i++) {
                            let _a_dom = _dom_list[i];
                            let _begin_css = _a_dom.dataset.begin;
                            if(_begin_css){
                                _a_dom.__animation__ = true;
                                _a_dom.style.opacity = '0';
                                let _css_list = _begin_css.trim().replace(/\s+/ig," ").split(" ")
                                for(let i = 0; i < _css_list.length; i++){
                                    _a_dom.classList.remove(_css_list[i]);
                                }
                            }
                        }
                        let _out_fn = obj.page[old_page].out_fn || (() => {});
                        _out_fn(_old_page);
                    })(_data.old_page);
                }, _data.no_time || 400);
                
            }

            return_obj.go_page = (page_num) => {
                if(return_obj.page_index === page_num || !page_list[page_num]){
                    return;
                }
                let _num = box_dome_info._h;
                if (obj.right_slide) {
                    _num = box_dome_info._w;
                }
                if(_num === 0){
                    //用来处理页面快速加载的问题
                    clearTimeout(return_obj.go_page.timer);
                    return_obj.go_page.timer = setTimeout(()=>{
                        return_obj.go_page(page_num)
                    },200);
                    return;
                }
                for (let i = 0; i < page_list.length; i++) {
                    page_list[i].style.WebkitTransitionDuration = '0ms';
                    i < page_num && (page_list[i].style[_dir] = -_num + "px");
                    i > page_num && (page_list[i].style[_dir] = _num + "px");
                    page_list[page_num].style[_dir] = 0;
                }
                go_page({
                    old_page: return_obj.page_index,
                    now_page: page_num,
                    no_time: 10
                });
                return_obj.page_index = page_index = page_num;
                
            };

            function page_tab(_data) { //换页
                let _old_page_index = page_index;
                let _num = box_dome_info._h;
                if (obj.right_slide) {
                    _num = box_dome_info._w;
                }
                if (page_index === 0 || page_index === (page_len - 1)) {
                    //box_dom.style.WebkitTransitionProperty = [_dir];
                    box_dom.style.WebkitTransitionDuration = '';
                    box_dom.style[_dir] = 0;
                }

                let _data_x_y = _data[_x_y];

                if (_data_x_y > _num / 6 && page_index != 0) {
                    page_index--;
                }
                if (_data_x_y < -_num / 6 && page_index != page_len - 1) {
                    page_index++;
                }

                return_obj.page_index = page_index;

                page_list[page_index].style.WebkitTransitionDuration = '';

                if (page_list[page_index + 1]) {
                    page_list[page_index + 1].style[_dir] = _num + "px";
                    page_list[page_index + 1].style.WebkitTransitionDuration = '';
                }
                if (page_list[page_index - 1]) {
                    page_list[page_index - 1].style[_dir] = -_num + "px";
                    page_list[page_index - 1].style.WebkitTransitionDuration = '';
                }
        
                page_list[page_index].style[_dir] = 0;

                //obj.new_page = page_index;

                if (_old_page_index !== page_index) {
                    go_page({
                        old_page: _old_page_index,
                        now_page: page_index
                    });
                }
            }

            function touchstart(ev) {
                let touchs = ev.changedTouches[0];
                start_y = touchs.pageY;
                start_x = touchs.pageX;
                //console.log('手指接触时：', start_y, start_x);
            }
            function touchmove(ev) {
                ev.preventDefault();
                let touchs = ev.changedTouches[0];
                let move_y = touchs.pageY - start_y,
                    move_x = touchs.pageX - start_x;
                //console.log('手指滑动时：', move_y,move_x);
                //此处可以做性台优化，加阻尼用来减少move_fn的运算次数，也就是减少页面重排的次数
                move_fn({
                    x: move_x,
                    y: move_y
                });
            }
            function touchend(ev) {
                let touchs = ev.changedTouches[0];

                let hend_y = touchs.pageY - start_y,
                    hend_x = touchs.pageX - start_x;

                //console.log('手指抬起时：', hend_y,hend_x);
                page_tab({
                    x: hend_x,
                    y: hend_y
                });
            }

            console.log(obj.slide_page);
            if (!(typeof obj.slide_page === 'boolean' && !obj.slide_page)) {
                //此处事要扩展到PC端
                box_dom.addEventListener("touchstart", touchstart, false);
                box_dom.addEventListener("touchmove", touchmove, false);
                box_dom.addEventListener("touchend", touchend, false);
            }

        }

        let mp3_play = () => {};
        let loading_box = (() => {
            let loading_box = _doc.createElement("div");
            loading_box.className = "loading_box";
            loading_box.style.zIndex = 1000;
            loading_box.innerHTML = `
                    <div class="loading">
                        <img class="lo" src="img/loding_logo_t.png">
                        <img class="bg" src="img/loding_t.png">
                        <div class="num">
                            <p>
                                <span></span>
                            </p>
                        </div>
                    </div>
                `;
            let _p = loading_box.querySelector('.num p');
            let _span = _p.querySelector('span');
            box_dom.appendChild(loading_box);
            return (_data) => {
                _span.innerHTML = _data.NUM;
                _p.style.width =  _data.NUM;
                if(_data.REV){
                    setTimeout(() => {
                        box_dom.removeChild(loading_box);
                        now_page_animation(0);
                        if (obj.mp3_play) {
                            setTimeout(() => {
                                mp3_play();
                            },400);
                        }
                    },400);
                }
            };
        })();

        write_page();
        if(obj.page_num){
            let page_num_box = _doc.createElement("div");
            page_num_box.className = "page_mun_box";
            page_num_box.style.zIndex = page_len + 10;
            page_num_box.innerHTML = "<b></b> / " + page_len;
            num_box = page_num_box.querySelector("b");
            box_dom.appendChild(page_num_box);
        }
        slide();

        function mp3_init(){
            let mp3_but = _doc.createElement("div"),
                mp3_audio = _doc.createElement("audio");

            let new_dom = _doc.createElement("div");
            new_dom.className = "mp3_box";
            new_dom.style.zIndex = page_len + 10;

            mp3_but.className = "mp3_but";
            mp3_audio.className = "mp3_audio";

            mp3_play = function() {
                if (mp3_audio.paused) {
                    mp3_but.classList.add("mp3_but_on");
                    mp3_audio.play();
                } else {
                    mp3_but.classList.remove("mp3_but_on");
                    mp3_audio.pause();
                }
            };

            mp3_but.addEventListener("touchend", function(ev) {
                ev.preventDefault();
                mp3_play();
            }, false);
            mp3_audio.src = obj.mp3;
            mp3_audio.addEventListener("canplaythrough", function(){
                new_dom.appendChild(mp3_but);
                new_dom.appendChild(mp3_audio);
                box_dom.appendChild(new_dom);
            },false);
        }

        mp3_init()

        {
            let loding_img_list = [];
            let _dom_all = box_dom.querySelectorAll('*');
            for (let i = 0; i < _dom_all.length; i++) {
                //计算img标签
                if(_dom_all[i].tagName.toLowerCase() === 'img'){
                    loding_img_list.push(_dom_all[i].src);
                }
                //得到计算后样式
                let _background_image = _win.getComputedStyle(_dom_all[i]).getPropertyValue("background-image");
                if(_background_image !== 'none'){
                    loding_img_list.push(_background_image.slice(5, -2));
                }
            }
            let loding_img_index = 0;
            let loding_img_len = loding_img_list.length;
            function loload_fn() {
                loding_img_index++;
                if (loding_img_index !== loding_img_len) {
                    loading_box({
                        REV: false,
                        NUM: parseInt(loding_img_index / loding_img_len * 100) + '%'
                    });
                }else{
                    loading_box({
                        REV: true,
                        NUM: '100%'
                    });
                }
            }
            for (let i = 0; i < loding_img_len; i++) {
                let _new_img = new Image();
                _new_img.src =  loding_img_list[i];
                _new_img.onload = _new_img.onerror = loload_fn;
            }
            console.log(loding_img_list);
        }

        //console.log(box_dom.querySelectorAll('img'));
        //console.log(box_dom.querySelectorAll('*'));
        return return_obj;
    }
    _win.yi_public = _win.yi_public || {};
    _win.yi_public.page_animation = page_animation;

    return page_animation;
});