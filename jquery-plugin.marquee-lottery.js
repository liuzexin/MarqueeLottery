/**
 * Created by CoderLiu on 2017/1/18.
 */

(function( $ ) {
    var methods = {
        init : function( options ) {
            var $this = $(this);
            var  roundTotal= 4,maxTime=1500,minTime=100,reduceStepTime=200,addTimeStep=50,desIndex= 0;

            var defaultSettings = {
                ele:null,
                desIndex:desIndex,
                roundTotal:roundTotal,
                maxTime:maxTime,
                minTime:minTime,
                addTimeStep:addTimeStep,
                reduceTimeStep:reduceStepTime,
                activeClass:null,
                finishCallback:null,
                delayTime:1000,
                //touchUp:null
            };

            var settings = $.extend(defaultSettings, options);
            if (settings.desIndex > settings.ele.length -1){
                $.error('Marquee \'desIndex \' error : more than \'ele\' length.');
                return $this;
            }else if(settings.minTime > settings.maxTime || settings.minTime == 0){
                $.error('Marquee \'minTime\' error : more than \'maxTime\' or equal 0.');
                return $this;
            }else if(settings.addTimeStep <= 0 || settings.addTimeStep > settings.maxTime){
                $.error('Marquee \'addTimeStep\' error : less than 0 or equal 0 more than \`maxTime\`.');
                return $this;
            }else if(settings.reduceTimeStep <= 0 || settings.reduceTimeStep > settings.maxTime){
                $.error('Marquee \'reduceTimeStep\' error : less than 0 or equal 0 or more than \`maxTime\`.');
                return $this;
            }else if(settings.roundTotal <= 0){
                $.error('Marquee \'roundTotal\' error : less than 0 or equal 0.');
                return $this;
            } else if(settings.ele.length <= 1){
                $.error('Marquee \'ele.length\' error : less than 1.');
                return $this;
            }
            $this.data('marquee', settings);
            return $this;
        },
        start : function( ) {
            var $this = $(this);
            var settings = $this.data('marquee');
            var currentRound=0,currentIndex= 1, sArr= settings.ele, sArrCount = settings.ele.length, timer=null, desIndex=settings.desIndex,
                roundTotal=settings.roundTotal,delayTime=settings.delayTime,
                minTime=settings.minTime,reduceStepTime=settings.reduceTimeStep,addTimeStep=settings.addTimeStep,
                maxTime=settings.maxTime,currentTime=maxTime;
            //Fix the bug of the secondary of start, the `desIndex` is the active class.
            $(sArr[desIndex]).removeClass(settings.activeClass);
            //At the begin of start, should add class for the first element of `sArr`.
            $(sArr[0]).addClass(settings.activeClass);
            function callback() {
                if (currentIndex > sArrCount - 1) {
                    currentIndex = 0;
                }
                $(sArr[currentIndex]).toggleClass(settings.activeClass);
                var beforeIndex = currentIndex - 1 < 0 ? sArrCount - 1 : currentIndex - 1;
                $(sArr[beforeIndex]).toggleClass(settings.activeClass);
                currentIndex++;

                if (currentIndex == sArrCount) {
                    currentRound++;
                }
                if (currentRound == roundTotal + 1) {
                    if (currentIndex - 1 == desIndex) {
                        clearTimeout(timer);
                        setTimeout(function () {
                            settings.finishCallback();
                            $this.trigger('finish-marquee-animation');
                        }, delayTime);
                    }
                }

                if (currentRound > roundTotal - 1) {
                    currentTime = currentTime + addTimeStep > maxTime ? maxTime : currentTime + addTimeStep;
                } else {
                    currentTime = currentTime - reduceStepTime < minTime ? minTime : currentTime - reduceStepTime;
                }
                timer = setTimeout(callback, currentTime);
            }
            setTimeout(callback, currentTime);
            $this.trigger('start-marquee-animation');
            return $this;
        }
    };
    $.fn.marquee = function() {
        var method = arguments[0];

        if(methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if( typeof(method) == 'object' || !method ) {
            method = methods.init;
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.pluginName' );
            return this;
        }
        return method.apply(this, arguments);
    }
})( jQuery );
