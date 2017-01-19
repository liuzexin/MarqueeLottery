/**
 * Created by CoderLiu on 2017/1/18.
 */

(function( $ ) {
    var methods = {
        init : function( options ) {
            var $this = $(this);
            var  roundTotal= 4,totalTime=1500,minTime=100,reduceStepTime=200,addTimeStep=50,desIndex= 0;

            var defaultSettings = {
                ele:null,
                desIndex:desIndex,
                roundTotal:roundTotal,
                totalTime:totalTime,
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
            }else if(settings.minTime > settings.totalTime || settings.minTime == 0){
                $.error('Marquee \'minTime\' error : more than \'totalTime\' or equal 0.');
                return $this;
            }else if(settings.addTimeStep <= 0 || settings.addTimeStep > settings.totalTime){
                $.error('Marquee \'addTimeStep\' error : less than 0 or equal 0.');
                return $this;
            }else if(settings.reduceTimeStep <= 0 || settings.reduceTimeStep > settings.totalTime){
                $.error('Marquee \'reduceTimeStep\' error : less than 0 or equal 0.');
                return $this;
            }else if(settings.roundTotal <= 0){
                $.error('Marquee \'roundTotal\' error : less than 0 or equal 0.');
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
                totalTime=settings.totalTime,currentTime=totalTime;
            function callback() {
                if (currentIndex > sArrCount - 1) {
                    currentIndex = 0;
                }
                $(sArr[currentIndex]).addClass(settings.activeClass);
                var beforeIndex = currentIndex - 1 < 0 ? sArrCount - 1 : currentIndex - 1;
                $(sArr[beforeIndex]).removeClass(settings.activeClass);
                currentIndex++;

                if (currentIndex == sArrCount) {
                    currentRound++;
                }
                if (currentRound == roundTotal + 1) {
                    if (currentIndex - 1 == desIndex) {
                        clearTimeout(timer);
                        setTimeout(function () {
                            settings.finishCallback();
                        }, delayTime);
                        return $this;
                    }
                }

                if (currentRound > roundTotal - 1) {
                    currentTime = currentTime + addTimeStep > totalTime ? totalTime : currentTime + addTimeStep;
                } else {
                    currentTime = currentTime - reduceStepTime < minTime ? minTime : currentTime - reduceStepTime;
                }
                timer = setTimeout(callback, currentTime);
            }
            setTimeout(callback, currentTime);
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
