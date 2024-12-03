class Person {
	constructor(name, network,location, credits = 0) {
		this.name = name
		this.messages = []
		this.network  = network
		this.location = location
		this.credits = credits

		network.subscribe(this)
	}

	shout(message) {
		this.network.broadcast(message, this)
	}

	hear(message) {
		this.messages.push(message)
	}

	messagesHeard() {
		return this.messages
	}
}

class Network {
	constructor(range) {
		this._listeners = []
		this._range = range
	}

	set range(newRange) {
		this._range = newRange
	}

	subscribe(person) {
		this._listeners.push(person)
	}

	broadcast(message, shouter) {
		const shortEnough = message.length <= 180
		this._deductCredits(shortEnough, message, shouter)
		this._listeners.forEach(listener => {
			const withinRange = 
				Math.abs(listener.location - shouter.location) <= this._range
			if( withinRange ) {
				if (shortEnough || shouter.credits >= 0) {
					listener.hear(message)
				}
			}
		})
	}

	_deductCredits(shortEnough, message, shouter) {
		if (!shortEnough) shouter.credits -= 2
		shouter.credits -=(message.match(/buy/gi) || []).length * 5
	}
}

module.exports = { 
	Person: Person,
	Network: Network
}
