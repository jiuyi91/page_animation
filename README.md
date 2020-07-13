# 多屏分页动画（page_animation）
---
## 实例请见dist目标的test.html文件

## 使用说明

``` javascript
var return_obj = yi_public.page_animation(page_json);
//page_json  页面的分页信信息   《page_json说明》请向下看
//return_obj 运行后的返回值，   《return_obj说明》请向下看
```
## page_json说明
``` javascript
var page_json = {
        page: {
            0/*此数是页面的号，在配时要依次写下来*/: {
                page_class: "page_mun0",        //对此页自定义的样式，可以不传
                bg_img: "img//page1_bg.jpg",    //此页的景图（必须）
                bg_color: "#ebebeb",            //此页的景色
                html:   '<div class="d_bg1" data-begin="qk1 qk2 qk3" data-end="css1"><img src=""/></div>' +,  //data-begin 元素的动作，data-end 为动作结束的样式
                goin_fn: function(){
                    console.log('进入0', arguments); //进入此页的运行此函数 arguments 里是此页最外层的dome元素
                },
                out_fn: function(){
                    console.log('退出0', arguments); //离开此页的运行此函数 arguments 里是此页最外层的dome元素
                }
            },
            ...
            0-~无穷页
            ...
        },
        dome_id: '#domeid',                         // 'JQ选择器的方试传入', 不传此项时会向页面自己动生存一个元素

        mp3: "audio/temp.mp3",                      //配音乐地址，不配时音乐图标就不出现;
        mp3_play: true,                             //音乐默认是不播放的,与mp3: ""; 一起用

        page_num: true,                             //页号是否出现，不配时就不出现页码
        right_slide: true,                          //滑动方向，不配时默认是上下滑

        slide_page: false,                          //设为false时为给滑动关闭，默认为打开。
        pointer: false,                             //设为"false"时不打开引导箭头,默认为出箭头
        all_fn: function(){
            console.log('页面写入完成',arguments);  //页面运行加载完成时执行
        }
    };
```

## return_obj说明
``` javascript

return_obj.go_page(Number)  //跳到那一页 Number为数字，可以在页面中有点击时用
return_obj.page_index       //Number此值是数字，是当前所在页码
return_obj.page_list        //Array里面值是每一个页的列表

```

