
var wallTypes = [];

wallTypes["63"] = 'w_south';
wallTypes["504"] = 'w_north';
wallTypes["505"] = 'w_north';
wallTypes["508"] = 'w_north';
wallTypes["509"] = 'w_north';
wallTypes["248"] = 'w_north';

wallTypes["219"] = 'w_east';
wallTypes["475"] = 'w_east';
wallTypes["223"] = 'w_east';

wallTypes["502"] = 'w_west';
wallTypes["438"] = 'w_west';
wallTypes["439"] = 'w_west';
wallTypes["503"] = 'w_west';

// wallTypes["446"] = 'w_west';


wallTypes["319"] = 'w_south';
wallTypes["127"] = 'w_south';

wallTypes["510"] = 'w_northwest';
wallTypes["507"] = 'w_northeast';
wallTypes["27"] = 'w_northwest_i';


wallTypes["55"] = 'w_northeast_i';

// wallTypes["59"] = 'slim_ne';

wallTypes["312"] = 'slim';
wallTypes["57"] = 'slim';

// ?
wallTypes["248"] = 'w_southeast';
wallTypes["444"] = 'w_southwest';


// To Change
wallTypes["50"] = 'center';
wallTypes["18"] = 'center';
wallTypes["22"] = 'center';
wallTypes["54"] = 'w_northeast_i';


wallTypes["447"] = 'w_southwest';

wallTypes["216"] = 'w_southwest_i';
wallTypes["432"] = 'w_southeast_i';
wallTypes["496"] = 'w_southeast_i';


wallTypes["448"] = 'empty';
wallTypes["258"] = 'empty';
wallTypes["452"] = 'empty';
wallTypes["449"] = 'empty';
wallTypes["8"] = 'empty';
wallTypes["71"] = 'empty';
wallTypes["73"] = 'empty';
wallTypes["79"] = 'empty';
wallTypes["292"] = 'empty';
wallTypes["295"] = 'empty';
wallTypes["484"] = 'empty';
wallTypes["457"] = 'empty';
wallTypes["455"] = 'empty';
wallTypes["40"] = 'empty';
wallTypes["75"] = 'empty';
wallTypes["77"] = 'empty';
wallTypes["132"] = 'empty';
wallTypes["257"] = 'empty';
wallTypes["66"] = 'empty';
wallTypes["5"] = 'empty';
wallTypes["6"] = 'empty';
wallTypes["128"] = 'empty';
wallTypes["224"] = 'empty';
wallTypes["260"] = 'empty';
wallTypes["392"] = 'empty';
wallTypes["162"] = 'empty';
wallTypes["266"] = 'empty';
wallTypes["263"] = 'empty';
wallTypes["3"] = 'empty';
wallTypes["33"] = 'empty';
wallTypes["129"] = 'empty';
wallTypes["10"] = 'empty';
wallTypes["135"] = 'empty';
wallTypes["450"] = 'empty';
wallTypes["34"] = 'empty';
wallTypes["68"] = 'empty';
wallTypes["7"] = 'empty';
wallTypes["480"] = 'empty';
wallTypes["32"] = 'empty';
wallTypes["256"] = 'empty';
wallTypes["136"] = 'empty';
wallTypes["1"] = 'empty';
wallTypes["4"] = 'empty';
wallTypes["64"] = 'empty';
wallTypes["0"] = 'empty';
wallTypes["161"] = 'empty';
wallTypes["264"] = 'empty';
wallTypes["420"] = 'empty';
wallTypes["294"] = 'empty';
wallTypes["293"] = 'empty';
wallTypes["302"] = 'empty';
wallTypes["487"] = 'empty';
wallTypes["492"] = 'empty';
wallTypes["356"] = 'empty';
wallTypes["456"] = 'empty';
wallTypes["201"] = 'empty';
wallTypes["107"] = 'empty';
wallTypes["105"] = 'empty';
wallTypes["329"] = 'empty';
wallTypes["2"] = 'empty';
wallTypes["300"] = 'empty';
wallTypes["195"] = 'empty';
wallTypes["390"] = 'empty';
wallTypes["288"] = 'empty';
wallTypes["36"] = 'empty';
wallTypes["65"] = 'empty';
wallTypes["72"] = 'empty';
wallTypes["9"] = 'empty';
wallTypes["391"] = 'empty';
wallTypes["199"] = 'empty';
wallTypes["192"] = 'empty';
wallTypes["384"] = 'empty';
wallTypes["493"] = 'empty';
wallTypes["365"] = 'empty';
wallTypes["364"] = 'empty';
wallTypes["359"] = 'empty';
wallTypes["335"] = 'empty';
wallTypes["361"] = 'empty';
wallTypes["485"] = 'empty';
wallTypes["454"] = 'empty';
wallTypes["109"] = 'empty';
wallTypes["461"] = 'empty';
wallTypes["451"] = 'empty';
wallTypes["301"] = 'empty';
wallTypes["130"] = 'empty';
wallTypes["321"] = 'empty';
wallTypes["70"] = 'empty';
wallTypes["96"] = 'empty';
wallTypes["12"] = 'empty';
wallTypes["100"] = 'empty';
wallTypes["388"] = 'empty';
wallTypes["140"] = 'empty';
wallTypes["458"] = 'empty';
wallTypes["226"] = 'empty';
wallTypes["489"] = 'empty';
wallTypes["133"] = 'empty';
wallTypes["164"] = 'empty';
wallTypes["352"] = 'empty';
wallTypes["45"] = 'empty';
// wallTypes[""] = 'empty';

wallTypes["511"] = 'solid';



wallTypes["89"] = 'arrow_left';

wallTypes["308"] = 'arrow_right';
wallTypes["372"] = 'arrow_right';
wallTypes["48"] = 'arrow_right';

wallTypes["446"] = 'pipe_right';
wallTypes["251"] = 'pipe_left';


wallTypes["506"] = 'solid';

wallTypes["273"] = 'center';
wallTypes["120"] = 'center';
wallTypes["316"] = 'center';
wallTypes["16"] = 'center';
wallTypes["17"] = 'center';
wallTypes["81"] = 'center';
wallTypes["84"] = 'center';
wallTypes["320"] = 'center';
wallTypes["345"] = 'center';
wallTypes["28"] = 'center';
wallTypes["20"] = 'center';
wallTypes["213"] = 'center';
wallTypes["272"] = 'center';
wallTypes["464"] = 'center';
wallTypes["49"] = 'center';

// wallTypes["56"] = 'w_south';




var wall = {
    determineFrom : function(view) {
	return this.typeFrom(this.toBits(view));
    },

    typeFrom : function(matrix) {
	var x = 0;
	for (var i = 0; i < matrix.length; i++) {
	    for (var j = 0; j < matrix[0].length; j++) {
		x += matrix[i][j];
	    }
	}
	
	return (wallTypes[x] === undefined) ? x : wallTypes[x];
    },

    toBits : function(view) {
	var bits = [[0, 0, 0],
		    [0, 0, 0],
		    [0, 0, 0]];

	var n = 0;
	for (var i = view[0].length - 1; i >= 0; i--) {
	    for (var j = view.length - 1; j >= 0; j--) {
		if (view[i][j] == 'w') {
		    bits[i][j] = Math.pow(2, n); 
		}
		n++;
	    }
	}
	return bits;
    },
}

module.exports = wall;