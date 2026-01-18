namespace TicketingLibrary
{
    public class CustomException : Exception
    {
        public int ErrorNumber { get; set; }

        public CustomException(string message, int errorNumber) : base(message)
        {
            ErrorNumber = errorNumber;
        }
    }
}
