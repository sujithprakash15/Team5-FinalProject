namespace TicketingLibrary
{
    public class TicketException : Exception
    {
        public int ErrorNumber { get; set; }

        public TicketException(string message, int errorNumber) : base(message)
        {
            ErrorNumber = errorNumber;
        }
    }
}
