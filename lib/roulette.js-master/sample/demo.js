$(function(){

	$('.roulette').find('img').hover(function(){
		console.log($(this).height());
	});
	var appendLogMsg = function(msg) {
		$('#msg')
	.append('<p class="muted">' + msg + '</p>')
	.scrollTop(100000000);

	}
	var p = {
		startCallback : function() {
			appendLogMsg('start');
			$('#speed, #duration').slider('disable');
			$('#stopImageNumber').spinner('disable');
			$('.start').attr('disabled', 'true');
			$('.stop').removeAttr('disabled');
		},
		slowDownCallback : function() {
			appendLogMsg('slowdown');
			$('.stop').attr('disabled', 'true');
		},
		stopCallback : function($stopElm) {
			appendLogMsg('stop');
			$('#speed, #duration').slider('enable');
			$('#stopImageNumber').spinner('enable');
			$('.start').removeAttr('disabled');
			$('.stop').attr('disabled', 'true');
		}

	}
	var rouletter = $('div.roulette');
	rouletter.roulette(p);	
	$('.stop').click(function(){
		var stopImageNumber = $('.stopImageNumber').val();
		if(stopImageNumber == "") {
			stopImageNumber = null;
		}
		rouletter.roulette('stop');	
	});
	$('.stop').attr('disabled', 'true');
	$('.start').click(function(){
		rouletter.roulette('start');	
	});
	
	var choices = [
		  [1, 0],
		  [5, 1],
		  [15, 2],
		  [30, 3],
		  [100, 4],
	],
	rand, min, max, i, i2, choice;

	function between(x, min, max) {
	  return x >= min && x <= max;
	}

	function pickChoice() {

		rand = Math.floor(Math.random() * 100);
		choice = -1;
		
		for (i = 0; i < choices.length; i++) {
		
			// set up min
			if (i === 0) {
				min = 0;
			} else {
				min = 0;
				// add up all the values so far
				for (i2 = 0; i2 < i; i2++) {
				  min += choices[i2][0];
				}
				// one higher
				min++;
			}
			
			// set up max
			if (i === 0) {
				max = choices[i][0];
			} else {
				max = 0;
				// add up all the values so far
				for (i2 = 0; i2 < i + 1; i2++) {
					max += choices[i2][0];
				}
			}
			
			if (rand >= min && rand <= max) {
				choice = i;
				break;
			}
		
		}
		
		// If the choice is still -1 here, something went wrong...
	};

	
	var updateParamater = function(){
		/*p['speed'] = Number($('.speed_param').eq(0).text());
		p['duration'] = Number($('.duration_param').eq(0).text());
		p['stopImageNumber'] = Number($('.stop_image_number_param').eq(0).text());*/
		p['speed'] = 10;
		p['duration'] = 5;
		pickChoice();
		p['stopImageNumber'] = choices[choice][1];
		p['stopImageNumber'] = 3;
		rouletter.roulette('option', p);	
	}
	
	var updateSpeed = function(speed){
		$('.speed_param').text(speed);
	}
	$('#speed').slider({
		min: 1,
		max: 30,
		value : 10,
		slide: function( event, ui ) {
			updateSpeed(ui.value);
			updateParamater();
		}
	});
	updateSpeed($('#speed').slider('value'));

	var updateDuration = function(duration){
		$('.duration_param').text(duration);
	}
	$('#duration').slider({
		min: 2,
		max: 10,
		value : 3,
		slide: function( event, ui ) {
			updateDuration(ui.value);
			updateParamater();
		}
	});
	updateDuration($('#duration').slider('value'));

	var updateStopImageNumber = function(stopImageNumber) {
		$('.image_sample').children().css('opacity' , 0.2);
		$('.image_sample').children().filter('[data-value="' + stopImageNumber + '"]').css('opacity' , 1);
		$('.stop_image_number_param').text(stopImageNumber);
		updateParamater();
	}
	
	$('#stopImageNumber').spinner({
		spin: function( event, ui ) {
			var imageNumber = ui.value;
			if ( ui.value > 4 ) {
				$( this ).spinner( "value", -1 );
				imageNumber = 0;	
				updateStopImageNumber(-1);		
				return false;
			} else if ( ui.value < -1 ) {
				$( this ).spinner( "value", 4 );
				imageNumber = 4;	
				updateStopImageNumber(4);		
				return false;
			}
			updateStopImageNumber(imageNumber);		
		}
	});
	$('#stopImageNumber').spinner('value', 0);
	updateStopImageNumber($('#stopImageNumber').spinner('value'));		

	$('.image_sample').children().click(function(){
		var stopImageNumber = $(this).attr('data-value');
		$('#stopImageNumber').spinner('value', stopImageNumber);
		updateStopImageNumber(stopImageNumber);
	});
});

