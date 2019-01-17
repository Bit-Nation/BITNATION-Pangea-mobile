exports.reply = function (r) {
	if (this.bot == null) {
		this.bot = new LucyBot(false);
	} 
	return this.bot.transform(r);
}

exports.start = function () {
	if (this.bot == null) {
		this.bot = new LucyBot(false);
	}
	return this.bot.getInitial();
}

exports.bye = function () {
	if (this.bot == null) {
		this.bot = new LucyBot(false);
	}
	return this.bot.getFinal();
}

function LucyBot(noRandomFlag) {

	this.lucyInitials = [
		"Welcome, world citizen, to Bitnation.",
		"Hello there world citizen, how can I be of assistance today?",
		"I'm here to help if you need anything.",
		"Hello there! My name is Lucy... How can I be of assistance?",
		"Citizen, hello, I'm Lucy and I'm here if you need anything.",
		"Hi, I'm Lucy, are any of the following topics on your mind?",
		"Hi there, do you requre any help world citizen?",
		"Lucy here, how can I help you?",
		"Let me introduce myself: I am Lucy, Bitnation's friendly chatterbot. What can I do for you today?",
		"How can I help today?",
		"What can I do for you today?",
		"Do you need help, traveller?",
		"Stay a while and question.",
		"Welcome, world citizen.",
		"World Citizen, hello, I am Lucy. How can I be of assistance today?",
		"What can I do for you?",
		"What can I do for you today?",
		"Hi.",
		"Hi!",
		"Hello. I am Lucy.",
		"I am Lucy. What can I do for you?",
		"Lucy here. What can I do for you citizen?",
		"Wonderful, yes, hi. Whay can I do for you?",
		"Nice to see you again world citizen.",
		"Welcome!",
		"What's up? How can I help?",
		"Hello there world citizen. What brings you here today?"
	];

	this.lucyKeywords = [

	/*
	["Template", 0, [
	["*", [
	"Template?",
	"Who uses templates?",	
	  ]]
	]],
	*/

		["xnone", 0, [
		 ["*", [
		     "I'm not sure I understand you fully.",
		     "Can you please repeat with a clear keyword ?",
		     "That doesn't work.",
		     "Try to narrow it down with a keyword.",
		     "This program responds well to the following keywords: notary, blockchain, ethereum, xpat, chat, and a range of other simple terms in order to help you. The number of useful inputs are limited so try not to write as if you were talking to another person,
		     "I still don't understand. "
		  ]]
		]],
		["angry", 5, [
		["*", [
		"Listen, I'm not here to make you angry. I'm sorry if you are angry, please e-mail info@bitnation.co",
		"Making you angry is the least of our intentions. Please e-mail us info@bitnation.co at if you need assistance.",
		"We appreciate that you are angry and apologize. If you need to contact us directly please e-mail us at info@bitnation.co."
		"This program has four pre-set responses to tell-tale signs of anger. It isn't sophisticated enough to help relieve you of your anger. But if you need to talk to one of us please e-mail us at info@bitnation.co."	
		  ]]
		]],
		["sorry", 2, [
		 ["*", [
		     "No worries friend, Bitnaton is a free nation of nations.",
		     "Honestly, it's fine, we're all free here.",
		     "I get it.",
		     "Sorry? No one needs to be sorry here.",
		     "It's alright.",
		     "There is nothing to be sorry about."
		  ]]
		]],
		["apologize", 3, [
		 ["*", [
		     "It's not my intention to cause a problem - I'm here to help. If you've got a problem please contact info@bitnation.co"
		  ]]
		]],
		["blockchain", 2, [
		 ["*", [
		     "Although we aim to be blockchain agnostic, our blockchain supports our Xpat ERC20 token.",
		     "Blockchain technology is the foundation for Bitcoin. An advanced version of this technology established Ethereum, the so-called "Blockchain 2.0." We seek to be part of the "blockchain 3.0" revolution which comes next, providing governance software solutions through blockchain technology.",
		     "Learn more about blockchain technology here: https://www.coursera.org/learn/blockchain-basics",
		     "The “blockchain revolution” – most popularized by Bitcoin – took the world by storm.  A blockchain can either be “permissioned” – some user picks which nodes posses the blockchain – or otherwise, permissionless. Permissionless blockchains usually allow any number of users to join the network. The network itself is an association of all these programs checking each-other for consensus about the details about the program."
		  ]],
		 ["* what is blockchain*", [
		     "Learn more about blockchain technology here: https://www.coursera.org/learn/blockchain-basics",
		     "Blockchain technology is the foundation for Bitcoin. An advanced version of this technology established Ethereum, the so-called "Blockchain 2.0." We seek to be part of the "blockchain 3.0" revolution which comes next, providing governance software solutions through blockchain technology.",
		     "Read more about blockchain here: https://cryptobriefing.com/explain-blockchain-parents/",
		     "  A block chain is a computer program which relies on a chain of equations one-after-another in as discreet “blocks” in which some functions might be added. When distributed between numerous computers, often to mine the blocks, each version of the program talks back and forth to one-another and confirms the authenticity of the other. When “fake” nodes try to connect to the network the errors in their ledger will force them to be treated as an edited “fork” of the main network. As such it is useful for the instantiation and verification of coins, tokens, smart contracts and all sorts of decentralized applications."
		  ]],
		]],
		["ethereum", 3, [
		 ["*", [
		"Ethereum is an innovation on blockchain technology which allows for people to deploy programs on the blockchain. The program is executed and varified on every node in the blockchain meaning that executing such a blockchain can be expensive depending on the size of the program. These programs are called smart contracts.",
		"Ethereum is a powerful software protocol but we seek to be blockchain agnostic. We eventually want to integrate any efficient blockchains into our wallet system.",
		"Learn more about Ethereum here: https://blockgeeks.com/guides/ethereum/"
		  ]]
		 ["* bitcoin and ethereum *", [
		     "Bitcoin was the first cryptocurrency. It established the basis for blockchain technology. Ethereum is an innovation upon those technologies. Bitcoin is a basic version of this software but Ethereum is allows people to perform computation on the network. This allows for decentralized networks of people to manage large software operations without central owners."
		  ]],
		]],
		["bitnation", 4, [
		 ["*", [
		      "A Bitnation is a nation running on the Bitnation architecture. Anyone can launch their own Bitnation with its own political principles, laws and raison d'être. Joining a Bitnation will be as simple as clicking “join” and leaving a nation as easy as clicking “leave.”,
		     "Bitnation is an application which allows people to found "Bitnations" without regulation on our part and for their own purposes.",
		     "Bitnation is a voluntary nation without laws or regulation which allows people to found and regulate their own nations for their own reasons.",
		     "We are the world's first and original decentralized borderless virtual nation.",
		     "We want to provide open-source governance solutions such as notary and birth certifications.",
		     "We believe an open market-place for government mixed with the positive re-enforcement of good behaviour and reputations technology – provided without mining for or selling your data – will help keep public services honest. It’s not for us to decide which political system, which economic system, which legal system, etc… is best. It is up to everyone. So why should anyone be forced only to choose to be a member of their local nation?",
		     "We all have friends online who may have more in common with us than in our local community. By providing new ways for people to create, join, finance and manage nations we open the world itself to determining which systems are best by your unobstructed decisions to use those systems."
		  ]]
		]],
		["constitution", 1, [
		 ["*", [
		"Please check out the Bitnation Constitution here: https://github.com/Bit-Nation/BITNATION-Constitution",
		"We are BITNATION."
		"We are the Birth of a New Virtual Nation."
		"We are a Future for Our World and Humanity."
		"We are Sentinels, Universal and Inalienable."
		"We are Creativity and Visionary."
		"We are Rights and Freedoms."
		"We are Tolerant and Accepting."
		"We are Polity and Entity."
		"We are Privacy and Security."
		"We are Openness and Transparency."
		"We are a Dream and a Reality."
		"We are BITNATION."
		  ]]
		]],
		["cryptocurrency", 0, [
		 ["*", [
		     "Cryptocurrencies are produced within certian blockchains when peoples' computers perform mining tasks on the equations forming the blocks in the chain.",
		     "Cryptocurrencies range from Bitcoin, Ethereum, Monero, and thousands of others including our Xpat.",	
		     "  When a block is mined, it is possible for a “proof of work” token to be instantiated. Since the details of the block, its mining and the token itself are each possessed by every member of the 		network it is possible for there to be an accurate ledger for these units of currency and the history of their trading and possession.",
		     "In fact, every time a cryptocurrency is traded that transaction history can be tracked. Unfortunately, every time something is changed in the network it comes with a tiny “gas” cost, the equivalent of 		the electricity expended by the system. The proof of work itself is eventually derived from something such as a proof-of-computation of a block and the electrical cost of the computations performed 		by the computer. This kind of work is referred to as “mining."
		  ]]
		]],
		["notary", 0, [
		 ["*", [
		     "You can access our notary service by swiping from the left side of the screen.",
		     "You can use our notary service to permenantly upload your docucments to the blockchain.",
		     "When you click Notary you will be able to select what file you'd like to upload, name it, describe it and then upload it. You will have to pay the gas cost for using the network and viola - you have 		notarized your document!"
		     "Now you can swipe from the left to access our notary. Tap the notary button and tap the plus icon in the bottom right corner. Select the kind of file you want to upload. Give the file a name, scroll 			down and tap submit. The file is not on the blockchain yet! Now select your file in your Notary list and click “Submit Document.” Pay the fee for using the Ethereum network and click “confirm.”
		  ]]
		]],
		["lucy", 0, [
		 ["*", [
		     "Bitnation aspires to have an AI agent named Lucy which monitors the network in order to sercurely and blindly compile the reputation profiles of our users. This application does not exist but I am 			the help chatterbot who bears that symbol of our future software!",
		     "I am a helpful chatterbot here to help guide you to general knowledge to help you understand and use this application.",
		     "I am the face of Bitnation, Lucy and I'm here to help."
		  ]]
		["DBVN", 0, [
		["*", [
		"A "DBVN" is a "decentralized borderless virtual nation. Anyone can start one but it’s up to you to create a nation people want to join."
		  ]]
		]],
		["features", 0, [
		["*", [
		"The current set of features are: notarizing documents on the blockchain, creating nations, chatting, the ability to add decentralized applications to the network and the use of Ethereum and Xpat 			wallets. ?",
		"At the moment you can create a new account, trade Xpat and ETH from your Bitnation wallet, notarize documents using our notary service, chat and launch some limited decentralized application. In 			the future there will be numerous decentralized applications, you will be able to create and join nations, you will be able to manage your reputation settings and depending on those settings you will 			receive Xpat as a re-enforcer for good behavior."
		  ]]
		]],
		["chat", 0, [
		["*", [
		" Swipe out from the left to open the side menu and tap chat. Click the plus sign in the bottom right corner. Enter the address of the person you want to chat with in the “to” section or click “New 			Contact from Clipboard” and add that person to your chat list and click done."
		  ]]
		]],
		["wallet", 0, [
		["*", [
		"Bitnation hosts an Xpat and ETH wallet for all users. In the future we hope to have many cryptocurrencies available through our wallet!",
		  ]]
		]],
		["first time", 0, [
		["*", [
		"No problem! This application is our working beta so it doesn’t have all the functionality we intend for it to eventually have. Bitnation aspires to use blockchain technology to allow people to join or 		instantiate their own nations free from external regulation – even from us. This only reflects a fraction of our over-all vision Bitnation will track reputation, incentivize good behavior and hardwire the 			right of a user to join or leave a nation. As for myself, I respond to the following keywords well: features, notary, chat, blockchain, bitnation, constitution, ethereum."
		  ]]
		]],

	];

	this.lucyPostTransforms = [
		/ old old/g, " old",
		/\bthey were( not)? me\b/g, "it was$1 me",
		/\bthey are( not)? me\b/g, "it is$1 me",
		/Are they( always)? me\b/, "it is$1 me",
		/\bthat your( own)? (\w+)( now)? \?/, "that you have your$1 $2 ?",
		/\bI to have (\w+)/, "I have $1",
		/Earlier you said your( own)? (\w+)( now)?\./, "Earlier you talked about your $2."
	];

	this.lucyFinals = [
		"Bye for now world citizen.",
		// additions (not original)
		"Yes, good bye, have a great day!",
		"I hope I was able to be of assistance!",
		"Please have a great day, this was Lucy the Chatterbot.",
		"Have a good day, world citizen."
		"Please do not forget to check out our notary service! You can find it by swiping the left-hand side of the screen."
	];

	this.lucyQuits = [
		"bye",
		"goodbye",
		"done",
		"exit",
		"quit"
		"leave"
		"will go"
		"I'm going now."
	];

	this.lucyPres = [
		"dont", "don't",
		"cant", "can't",
		"wont", "won't",
		"recollect", "remember",
		"recall", "remember",
		"dreamt", "dreamed",
		"dreams", "dream",
		"maybe", "perhaps",
		"certainly", "yes",
		"machine", "computer",
		"machines", "computer",
		"computers", "computer",
		"were", "was",
		"you're", "you are",
		"i'm", "i am",
		"same", "alike",
		"identical", "alike",
		"equivalent", "alike"
	];

	this.lucyPosts = [
		"am", "are",
		"your", "my",
		"me", "you",
		"myself", "yourself",
		"yourself", "myself",
		"i", "you",
		"you", "I",
		"my", "your",
		"i'm", "you're"
		"i am", "you are"
	];

	this.lucySynons = {
		"blockchain": ["blockchian", "block chain", "block-chain", "bolckchain"],
		"ethereum": ["etheruem", "eth", "ethrum"],
		"bitnation": ["bitnatoin", "bitnaton", "bitnaiton"],
		"cryptocurrency": ["crypto", "token", "coin", "coins"],
		"lucy":["lucybot", "chatterbot", "AI"]
		"bitcoin and ethereum": ["ethereum and bitcoin", "ethereum or bitcoin", "bitcoin or ethereum", "bitcoin and ethereum"],
		"Notary": ["notry", "noatry"],
		"chat": ["messages", "messaging", "chatting", "address"],
		"wallet": ["walet", "wallt", "wllet", "tokenwallet, "ethwallet", "xpatwallet"],
		"smart contracts": ["smartcontracts", "SCs", "contracts on ethereum"],
		"constitution": ["creed", "core rules", "what defines you", "principles"],
		"uninterested": ["don't care", "dont care", "w/e", "nvm", "not interested"],
		"everyone": ["everybody", "nobody", "noone"],
		"first time": ["never used this before", "don't know what this is", "what is this?", "i don't know what's going on.", "what do I do?"],
		"I need help": ["confused", "dont understand", "don't understand", "don't get it", "makes no sense", "i need help", "dont get it", "have a question", "still learning", "why doesn't this work?", "doesn't work", 		"help", "help me", "please help", "wut"],
		"sad": ["unhappy", "depressed", "not happy", "upset","frustrated","discouraging", "discouraged", "don't like", "don't want to", "wtf"],
		"angry": ["pissed","can't stand this", "fucking","fuk u", "fuk", "fukkin", "fuckin","sucks", "this sucks", "pissed off","this shit", "fucking shit", "god fucking", "damnit", "go fuck yourself", "hate", "irritated", 		"not happy", "don't like this", "unhappy"],
	};

	this.noRandom= (noRandomFlag)? true:false;
	this.capitalizeFirstLetter=true;
	this.debug=false;
	this.memSize=20;
	this.version="1.1 (original)";

	this._dataParsed = false;
	if (!this._dataParsed) {
		this._init();
		this._dataParsed = true;
	}
	this.reset();
}

LucyBot.prototype.reset = function() {
	this.quit=false;
	this.mem=[];
	this.lastchoice=[];

	for (var k=0; k<this.lucyKeywords.length; k++) {
		this.lastchoice[k]=[];
		var rules=this.lucyKeywords[k][2];
		for (var i=0; i<rules.length; i++) this.lastchoice[k][i]=-1;
	}
}

LucyBot.prototype._init = function() {
	// install ref to global object
	var global=this;
	// parse data and convert it from canonical form to internal use
	// prodoce synonym list
	var synPatterns={};

	if ((this.lucySynons) && (typeof this.lucySynons == 'object')) {
		for (var i in this.lucySynons) synPatterns[i]='('+i+'|'+this.lucySynons[i].join('|')+')';
	}
	// check for keywords or install empty structure to prevent any errors
	if ((!this.lucyKeywords) || (typeof this.lucyKeywords.length == 'undefined')) {
		this.lucyKeywords=[['###',0,[['###',[]]]]];
	}
	// 1st convert rules to regexps
	// expand synonyms and insert asterisk expressions for backtracking
	var sre=/@(\S+)/;
	var are=/(\S)\s*\*\s*(\S)/;
	var are1=/^\s*\*\s*(\S)/;
	var are2=/(\S)\s*\*\s*$/;
	var are3=/^\s*\*\s*$/;
	var wsre=/\s+/g;
	for (var k=0; k<this.lucyKeywords.length; k++) {
		var rules=this.lucyKeywords[k][2];
		this.lucyKeywords[k][3]=k; // save original index for sorting
		for (var i=0; i<rules.length; i++) {
			var r=rules[i];
			// check mem flag and store it as decomp's element 2
			if (r[0].charAt(0)=='$') {
				var ofs=1;
				while (r[0].charAt[ofs]==' ') ofs++;
				r[0]=r[0].substring(ofs);
				r[2]=true;
			}
			else {
				r[2]=false;
			}
			// expand synonyms (v.1.1: work around lambda function)
			var m=sre.exec(r[0]);
			while (m) {
				var sp=(synPatterns[m[1]])? synPatterns[m[1]]:m[1];
				r[0]=r[0].substring(0,m.index)+sp+r[0].substring(m.index+m[0].length);
				m=sre.exec(r[0]);
			}
			// expand asterisk expressions (v.1.1: work around lambda function)
			if (are3.test(r[0])) {
				r[0]='\\s*(.*)\\s*';
			}
			else {
				m=are.exec(r[0]);
				if (m) {
					var lp='';
					var rp=r[0];
					while (m) {
						lp+=rp.substring(0,m.index+1);
						if (m[1]!=')') lp+='\\b';
						lp+='\\s*(.*)\\s*';
						if ((m[2]!='(') && (m[2]!='\\')) lp+='\\b';
						lp+=m[2];
						rp=rp.substring(m.index+m[0].length);
						m=are.exec(rp);
					}
					r[0]=lp+rp;
				}
				m=are1.exec(r[0]);
				if (m) {
					var lp='\\s*(.*)\\s*';
					if ((m[1]!=')') && (m[1]!='\\')) lp+='\\b';
					r[0]=lp+r[0].substring(m.index-1+m[0].length);
				}
				m=are2.exec(r[0]);
				if (m) {
					var lp=r[0].substring(0,m.index+1);
					if (m[1]!='(') lp+='\\b';
					r[0]=lp+'\\s*(.*)\\s*';
				}
			}
			// expand white space
			r[0]=r[0].replace(wsre, '\\s+');
			wsre.lastIndex=0;
		}
	}
	// now sort keywords by rank (highest first)
	this.lucyKeywords.sort(this._sortKeywords);
	// and compose regexps and refs for pres and posts
	LucyBot.prototype.pres={};
	LucyBot.prototype.posts={};

	if ((this.lucyPres) && (this.lucyPres.length)) {
		var a=new Array();
		for (var i=0; i<this.lucyPres.length; i+=2) {
			a.push(this.lucyPres[i]);
			LucyBot.prototype.pres[this.lucyPres[i]]=this.lucyPres[i+1];
		}
		LucyBot.prototype.preExp = new RegExp('\\b('+a.join('|')+')\\b');
	}
	else {
		// default (should not match)
		LucyBot.prototype.preExp = /####/;
		LucyBot.prototype.pres['####']='####';
	}

	if ((this.lucyPosts) && (this.lucyPosts.length)) {
		var a=new Array();
		for (var i=0; i<this.lucyPosts.length; i+=2) {
			a.push(this.lucyPosts[i]);
			LucyBot.prototype.posts[this.lucyPosts[i]]=this.lucyPosts[i+1];
		}
		LucyBot.prototype.postExp = new RegExp('\\b('+a.join('|')+')\\b');
	}
	else {
		// default (should not match)
		LucyBot.prototype.postExp = /####/;
		LucyBot.prototype.posts['####']='####';
	}
	// check for lucyQuits and install default if missing
	if ((!this.lucyQuits) || (typeof this.lucyQuits.length == 'undefined')) {
		this.lucyQuits=[];
	}
	// done
	LucyBot.prototype._dataParsed=true;
}

LucyBot.prototype._sortKeywords = function(a,b) {
	// sort by rank
	if (a[1]>b[1]) return -1
	else if (a[1]<b[1]) return 1
	// or original index
	else if (a[3]>b[3]) return 1
	else if (a[3]<b[3]) return -1
	else return 0;
}

LucyBot.prototype.transform = function(text) {
	var rpl='';
	this.quit=false;
	// unify text string
	text=text.toLowerCase();
	text=text.replace(/@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t/g, ' ');
	text=text.replace(/\s+-+\s+/g, '.');
	text=text.replace(/\s*[,\.\?!;]+\s*/g, '.');
	text=text.replace(/\s*\bbut\b\s*/g, '.');
	text=text.replace(/\s{2,}/g, ' ');
	// split text in part sentences and loop through them
	var parts=text.split('.');
	for (var i=0; i<parts.length; i++) {
		var part=parts[i];
		if (part!='') {
			// check for quit expression
			for (var q=0; q<this.lucyQuits.length; q++) {
				if (this.lucyQuits[q]==part) {
					this.quit=true;
					return this.getFinal();
				}
			}
			// preprocess (v.1.1: work around lambda function)
			var m=this.preExp.exec(part);
			if (m) {
				var lp='';
				var rp=part;
				while (m) {
					lp+=rp.substring(0,m.index)+this.pres[m[1]];
					rp=rp.substring(m.index+m[0].length);
					m=this.preExp.exec(rp);
				}
				part=lp+rp;
			}
			this.sentence=part;
			// loop trough keywords
			for (var k=0; k<this.lucyKeywords.length; k++) {
				if (part.search(new RegExp('\\b'+this.lucyKeywords[k][0]+'\\b', 'i'))>=0) {
					rpl = this._execRule(k);
				}
				if (rpl!='') return rpl;
			}
		}
	}
	// nothing matched try mem
	rpl=this._memGet();
	// if nothing in mem, so try xnone
	if (rpl=='') {
		this.sentence=' ';
		var k=this._getRuleIndexByKey('xnone');
		if (k>=0) rpl=this._execRule(k);
	}
	// return reply or default string
	return (rpl!='')? rpl : 'I am at a loss for words.';
}

LucyBot.prototype._execRule = function(k) {
	var rule=this.lucyKeywords[k];
	var decomps=rule[2];
	var paramre=/\(([0-9]+)\)/;
	for (var i=0; i<decomps.length; i++) {
		var m=this.sentence.match(decomps[i][0]);
		if (m!=null) {
			var reasmbs=decomps[i][1];
			var memflag=decomps[i][2];
			var ri= (this.noRandom)? 0 : Math.floor(Math.random()*reasmbs.length);
			if (((this.noRandom) && (this.lastchoice[k][i]>ri)) || (this.lastchoice[k][i]==ri)) {
				ri= ++this.lastchoice[k][i];
				if (ri>=reasmbs.length) {
					ri=0;
					this.lastchoice[k][i]=-1;
				}
			}
			else {
				this.lastchoice[k][i]=ri;
			}
			var rpl=reasmbs[ri];
			if (this.debug) alert('match:\nkey: '+this.lucyKeywords[k][0]+
				'\nrank: '+this.lucyKeywords[k][1]+
				'\ndecomp: '+decomps[i][0]+
				'\nreasmb: '+rpl+
				'\nmemflag: '+memflag);
			if (rpl.search('^goto ', 'i')==0) {
				ki=this._getRuleIndexByKey(rpl.substring(5));
				if (ki>=0) return this._execRule(ki);
			}
			// substitute positional params (v.1.1: work around lambda function)
			var m1=paramre.exec(rpl);
			if (m1) {
				var lp='';
				var rp=rpl;
				while (m1) {
					var param = m[parseInt(m1[1])];
					// postprocess param
					var m2=this.postExp.exec(param);
					if (m2) {
						var lp2='';
						var rp2=param;
						while (m2) {
							lp2+=rp2.substring(0,m2.index)+this.posts[m2[1]];
							rp2=rp2.substring(m2.index+m2[0].length);
							m2=this.postExp.exec(rp2);
						}
						param=lp2+rp2;
					}
					lp+=rp.substring(0,m1.index)+param;
					rp=rp.substring(m1.index+m1[0].length);
					m1=paramre.exec(rp);
				}
				rpl=lp+rp;
			}
			rpl=this._postTransform(rpl);
			if (memflag) this._memSave(rpl)
			else return rpl;
		}
	}
	return '';
}

LucyBot.prototype._postTransform = function(s) {
	// final cleanings
	s=s.replace(/\s{2,}/g, ' ');
	s=s.replace(/\s+\./g, '.');
	if ((this.lucyPostTransforms) && (this.lucyPostTransforms.length)) {
		for (var i=0; i<this.lucyPostTransforms.length; i+=2) {
			s=s.replace(this.lucyPostTransforms[i], this.lucyPostTransforms[i+1]);
			this.lucyPostTransforms[i].lastIndex=0;
		}
	}
	// capitalize first char (v.1.1: work around lambda function)
	if (this.capitalizeFirstLetter) {
		var re=/^([a-z])/;
		var m=re.exec(s);
		if (m) s=m[0].toUpperCase()+s.substring(1);
	}
	return s;
}

LucyBot.prototype._getRuleIndexByKey = function(key) {
	for (var k=0; k<this.lucyKeywords.length; k++) {
		if (this.lucyKeywords[k][0]==key) return k;
	}
	return -1;
}

LucyBot.prototype._memSave = function(t) {
	this.mem.push(t);
	if (this.mem.length>this.memSize) this.mem.shift();
}

LucyBot.prototype._memGet = function() {
	if (this.mem.length) {
		if (this.noRandom) return this.mem.shift();
		else {
			var n=Math.floor(Math.random()*this.mem.length);
			var rpl=this.mem[n];
			for (var i=n+1; i<this.mem.length; i++) this.mem[i-1]=this.mem[i];
			this.mem.length--;
			return rpl;
		}
	}
	else return '';
}

LucyBot.prototype.getFinal = function() {

	if (!this.lucyFinals) return '';
	return this.lucyFinals[Math.floor(Math.random()*this.lucyFinals.length)];
}

LucyBot.prototype.getInitial = function() {
	if (!this.lucyInitials) return '';
	return this.lucyInitials[Math.floor(Math.random()*this.lucyInitials.length)];
}

var lucyFinals = [
"Bye for now world citizen.",
"Yes, good bye, have a great day!",
"I hope I was able to be of assistance!",
"Please have a great day, this was Lucy the Chatterbot.",
"Have a good day, world citizen."
"Please do not forget to check out our notary service! You can find it by swiping the left-hand side of the screen."
];


// fix array.prototype methods (push, shift) if not implemented (MSIE fix)
if (typeof Array.prototype.push == 'undefined') {
	Array.prototype.push=function(v) { return this[this.length]=v; };
}
if (typeof Array.prototype.shift == 'undefined') {
	Array.prototype.shift=function() {
		if (this.length==0) return null;
		var e0=this[0];
		for (var i=1; i<this.length; i++) this[i-1]=this[i];
		this.length--;
		return e0;
	};
}

// eof
