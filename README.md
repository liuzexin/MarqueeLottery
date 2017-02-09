# Marquee Lottery #

## Instruction ##

Marquee Lottery jQuery plugin for more convenient create lottery activity.You only need to care about the `CSS` or `HTML` code.

## Installation ##
**Composer**
```
composer require bower-asset/marquee-lottery
```
**Bower**
```
bower install marquee-lottery
```
**NPM**
```
npm install marquee-lottery
```

## Example ##

```javascript
$(function(){
   $('.btn').marquee({
       activeClass:'active-img',
       finishCallback:function(){
           alert(1);
       },
       ele:[
           '.first-img',
           '.second-img',
           '.third-img',
           '.4th-img',
           '.5th-img',
           '.6th-img',
           '.7th-img',
           '.8th-img'
       ],
       desIndex:3
   });
    $('.btn').click(function(){
        $('.btn').marquee('start');
    });
});
```
![marquee-lottery.gif](https://github.com/liuzexin/Image/blob/master/marquee-lottery.gif?raw=true)

Before using the `marquee-lottery`, you should layout the page first.

## Usage ##

First of all,you should know that speed mode only support  one, which `ease-in-ease-out` mode.

### Configuration ###

`ele`:The jQuery selector of gift image，its order according to you need order.If you want let second image at the begin of running, you should put it in first index of ele.

`maxTime`:The max time of the gift image switch.

`minTime`:The min time of the gift image switch.

`desIndex`:This param should resolve from server, the gift image stop at `desIndex` position.

`roundTotal`:Number of circles for running.In fact, circles is `roundTotal + 1`.The last of circle will select the `desIndex`.

`finishCallback`:This callback is called at the end of running.

`delay`:Delay the given time to call the `finishCallback`. 

`activeClass`:When pass the every gift image add the `activeClass` class. 

`reduceTimeStep`:The time reduce in the speed up.

`addTimeStep`:The time add in the slow down.

`$('#id').marquee('start');` Start marquee right now.

**0.1.5 New**

You can use the following code to listen the `start-marquee-animation` or `finish-marquee-animation` event.
`$('#id').on('start-marquee-animation')` or `$('#id').on('start-marquee-animation')`

[CoderLiu](http://blog.liuzexin.top)


