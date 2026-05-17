// high-level modules should depend on Abstractions, not concrete classes


// Original Code                                    => problem: OrderProcessor is tightly coupled
private readonly SqlOrderStorage _storage =
    new SqlOrderStorage();

private readonly SmtpEmailSender _emailer =
    new SmtpEmailSender();

private readonly FileOrderLogger _logger =
    new FileOrderLogger();





// =============== Create Abstractions ===============
// Storage
public interface IOrderStorage
{
    void Save(Order order);
}

// Email
public interface IOrderEmailSender
{
    void Send(string to, string subject, string body);
}
// Logger
public interface IOrderLogger
{
    void Log(string message);
}



// ===== Implement Interfaces ======
// SQL Storage
public class SqlOrderStorage : IOrderStorage
{
    public void Save(Order order)
    {
        Console.WriteLine("Saved to SQL");
    }
}
// SMTP Email Sender
public class SmtpEmailSender : IOrderEmailSender
{
    public void Send(string to, string subject, string body)
    {
        Console.WriteLine("Email sent");
    }
}
// Console Logger
public class ConsoleOrderLogger : IOrderLogger
{
    public void Log(string message)
    {
        Console.WriteLine(message);
    }
}



// Constructor Injection
public class OrderProcessor
{
    private readonly IOrderStorage _storage;
    private readonly IOrderEmailSender _emailSender;
    private readonly IOrderLogger _logger;

    public OrderProcessor(
        IOrderStorage storage,
        IOrderEmailSender emailSender,
        IOrderLogger logger)
    {
        _storage = storage;
        _emailSender = emailSender;
        _logger = logger;
    }
}



// Manual Wiring (IoC Simulation)
public static class Setup
{
    public static OrderProcessor Create()
    {
        IOrderStorage storage =
            new SqlOrderStorage();

        IOrderEmailSender emailSender =
            new SmtpEmailSender();

        IOrderLogger logger =
            new ConsoleOrderLogger();

        return new OrderProcessor(
            storage,
            emailSender,
            logger);
    }
}


// We can replace SQL with memory storage:
public class InMemoryStorage : IOrderStorage
{
    public void Save(Order order)
    {
        // Save in list
    }
}