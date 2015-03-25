namespace Mixter.Domain
{
    public struct MessageDeleted : IDomainEvent
    {
        public MessageId MessageId { get; private set; }

        public MessageDeleted(MessageId messageId) : this()
        {
            MessageId = messageId;
        }
    }
}