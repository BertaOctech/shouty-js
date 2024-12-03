const { Given, When, Then, Before } = require('@cucumber/cucumber')
const { assertThat, is, equalTo} = require('hamjest')

const { Network, Person } = require('../../src/shouty')


Given("the range is {int}", function (range) {
	this.network.range = range
})

Given('people are located at', function (dataTable) {
	dataTable.transpose().hashes().map((person) => {
	newPerson = new Person(person.name, this.network, person.location)
	this.people[person.name] = newPerson
})
})
Given('a person named {word}', function (name) {
	newPerson = new Person(name, this.network, 0)
	this.people[name] = newPerson
});

Given('{person} has bought {int} credits', function (person, credits) {
	person.credits = credits
});

Then('{person} should not hear a shout', function (listener) {
	assertThat(listener.messagesHeard().length, is(0))
})

Then('{person} should hear a shout', function (listener) {
	assertThat(listener.messagesHeard().length, is(1))
})

Then('{person} hears the following messages:',
	function (listener, expectedMessages) {
		let actualMessages = listener.messagesHeard().map((message) => [message])
		assertThat(actualMessages, equalTo(expectedMessages.raw()))
	}
)
Then('{person} hears all {person}\'s messages', function (listener, shouter) {
	assertThat(
		listener.messagesHeard(),
		equalTo(this.messagesShoutedBy[shouter.name])
	)
})

Then('{person} should hear {person}\'s message', function (listener, shouter) {
	assertThat(
		listener.messagesHeard()[0],
		equalTo(this.messagesShoutedBy[shouter.name][0])
	)
})

Then('{person} should have {int} credits', function (person,credits) {
	assertThat(this.people[person.name].credits, is(credits))
});
