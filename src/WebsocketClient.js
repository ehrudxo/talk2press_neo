/**
** src is from https://github.com/maxnachlinger/reactjs-websocket-example
** changed to ES6
**/
'use strict';
export default class SocketService{
	constructor(){
		var service = {};
		var pendingCallbacks = {};
		var currentMessageId = 0;
		var ws;
		var preConnectionRequests = [];
		var connected = false;
		var handlers=[];

		ws = new WebSocket("ws://" + window.location.hostname + (location.port ? ':' + location.port : ''));

		ws.onopen = function () {
			connected = true;
			if (preConnectionRequests.length === 0) return;

			console.log('Sending (%d) requests', preConnectionRequests.length);
			for (var i = 0, c = preConnectionRequests.length; i < c; i++) {
				ws.send(JSON.stringify(preConnectionRequests[i]));
			}
			preConnectionRequests = [];
		};
		ws.onclose = function() {
			connected = false;
		};
		ws.onmessage = function (message) {
			var msg = JSON.parse(message.data)
			listener( msg );
			var len = handlers.length;
			for(var i=0;i<len;i++){
				handlers[i](msg)
			}
		};
	}

	sendRequest(request, cb ) {
		if(ws && ~[2,3].indexOf(ws.readyState)) {
			connected = false;
			init();
		}

		request.$id = generateMessageId();
		pendingCallbacks[request.$id] = cb;
		if (!connected) {
			preConnectionRequests.push(request);
		} else {
			ws.send(JSON.stringify(request));
		}
		return request.$id;
	}

	listener(message,broadcast_callback) {
		if (pendingCallbacks.hasOwnProperty(message.$id))
			pendingCallbacks[message.$id](message);
	}

	requestComplete(id) {
		delete pendingCallbacks[id];
	}

	stopRequest(id) {
		ws.close();
		init();
	}

	generateMessageId() {
		if (currentMessageId > 10000)
			currentMessageId = 0;
		return new Date().getTime().toString() + '~' + (++currentMessageId).toString();
	}
	addHandler(handler){
		handlers.push(handler);
	}
	getHandlers(){
		return handlers;
	}
}
