/* little mini hashbang history guy */
var hashBang = {
	history: [""] ,
	callbacks: [] ,
	
	set: function( loc ){
		if( hashBang.last() !== loc ){
			hashBang.history.push( loc );
		}
		document.location.hash = "!/" + loc;
		return hashBang;
	} , 
	
	onchange: function( callback ){
		if( typeof callback === 'function' ){
			hashBang.callbacks.push( callback );
		}
		return hashBang;
	},
	
	get: function(){
		var loc = document.location.hash.substr( 3 );
		if( loc !== hashBang.last() ){
			hashBang.history.push( loc );
		}
		return loc;
	},
	
	last: function(){
		return hashBang.history[hashBang.history.length-1];
	},
	
	check: function(){
		var last = hashBang.last(),
			current = hashBang.get();
			
		if( last !== current ){
			for( var x = 0, xlen = hashBang.callbacks.length; x< xlen; x++ ){
				hashBang.callbacks[x].call( this, current , last , hashBang.history );
			}
		}
		
		return hashBang;
	},
	
	
	start: function(){
		hashBang.interval = setInterval( hashBang.check , 250 );
		hashBang.check();
		return hashBang;
	},
	
	stop: function(){
		hashBang.interval = null;
		return hashBang;
	}
};
