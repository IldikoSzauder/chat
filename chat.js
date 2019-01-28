window.onload = function () { 

	class Chat {
		constructor() { 
			document.getElementById('btn-send').addEventListener('click', () => this.sendMessage()); 
			document.getElementById('txt-user').addEventListener('click', () => this.errorRemove('txt-user')); 
			document.getElementById('txt-message').addEventListener('click', () => this.errorRemove('txt-message')); 
		}
	 
		//------------------------------------------------------------------------------
		// getMessage from Server
		//------------------------------------------------------------------------------
		
		getMessage(message) {
			this.addToChat(message.user + ': ' + message.message, 'align-left');
		}
		
		//------------------------------------------------------------------------------
		// Send messages
		//------------------------------------------------------------------------------		
		
		sendMessage() {
			let txtUser = document.getElementById('txt-user').value.trim();
			let txtMessage = document.getElementById('txt-message').value.trim();
			let ok = true;
			
			if (!txtUser) ok = this.error('txt-user');
			if (!txtMessage) ok = this.error('txt-message');
			
			if (ok) {
				this.addToChat(txtMessage, 'align-right');
				
				let newMessage = {
					user: txtUser,
					message: txtMessage
				}
				
				socket.emit('chat', newMessage);
				this.clearInput();
			}	
		}

		//------------------------------------------------------------------------------
		// Add items to chat window
		//------------------------------------------------------------------------------
		
		addToChat(message, css) {
			let newMessage = document.createElement('div');
			let node = document.createTextNode(message);
			newMessage.appendChild(node);
			let element = document.getElementById("chat");
			element.appendChild(newMessage);	
			newMessage.classList.add(css);	
			element.scrollTop = element.scrollHeight; // always show the last line in chat window			
		}
		
		//------------------------------------------------------------------------------
		// Error - missing user name or message
		//------------------------------------------------------------------------------
		
		error(id) {
			document.getElementById(id).classList.add('error');
			return false;
		}
		
		//------------------------------------------------------------------------------
		// Error remove - clicking in the inputs
		//------------------------------------------------------------------------------
		
		errorRemove(id) {
			document.getElementById(id).classList.remove('error');
			return false;
		}
		
		//------------------------------------------------------------------------------
		// Clear inputs after sending message
		//------------------------------------------------------------------------------
		
		clearInput() {
			document.getElementById('txt-message').value = '';
		}
		
	}

	let socket = io.connect('http://185.13.90.140:8081');

	let ch = new Chat();

	socket.on('message', function(message) {
		ch.getMessage(message);
	})
}
