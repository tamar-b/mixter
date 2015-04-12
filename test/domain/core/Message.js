var Message = require('../../../src/domain/core/Message');
var UserId = require('../../../src/domain/UserId').UserId;
var expect = require('chai').expect;

describe('Message Aggregate', function() {
    var author = new UserId('author@mix-it.fr');
    var messageContent = 'Hello';

    var eventsRaised = [];
    var publishEvent = function publishEvent(evt) {
        eventsRaised.push(evt);
    };

    beforeEach(function () {
        eventsRaised = [];
    });

    it('When create MessageId Then toString return id', function() {
        var messageId = new Message.MessageId('M1');

        expect(messageId.toString()).to.equal(('Message:M1'));
    });

    it('When publish message Then raise UserMessagePublished', function () {
        Message.publish(publishEvent, author, messageContent);

        expect(eventsRaised).to.have.length(1);
        var event = eventsRaised[0];
        expect(event).to.be.an.instanceof(Message.MessagePublished);
        expect(event.author).to.equal(author);
        expect(event.content).to.equal(messageContent);
        expect(event.messageId).not.to.be.empty;
    });

    it('When publish several messages Then messageId is not same', function () {
        Message.publish(publishEvent, author, messageContent);
        Message.publish(publishEvent, author, messageContent);

        expect(eventsRaised[0].messageId).not.to.equal(eventsRaised[1].messageId);
    });

    it('When create MessagePublished Then getAggregateId return messageId', function() {
        var event = new Message.MessagePublished(new Message.MessageId('M1'), author, messageContent);

        expect(event.getAggregateId()).to.equal(event.messageId);
    });
});