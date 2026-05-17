// public class OrderProcessor : IOrderService
    // Validation
    // Discount calculation
    // Saving to DB
    // Sending email
    // Logging
    // Report generation
    // CSV exporting



// Validation Class
public class OrderValidator
{
    public bool Validate(Order order)
    {
        if (order.Items.Count == 0)
            return false;

        if (string.IsNullOrWhiteSpace(order.CustomerEmail))
            return false;

        return true;
    }
}


// Enumerable? => iterate

// Email Sender
public class OrderEmailSender
{
    public void Send(Order order)
    {
        Console.WriteLine($"Email sent to {order.CustomerEmail}");
    }
}


// Report Service
public class OrderReportService
{
    public string GenerateReport(IEnumerable<Order> orders)
    {
        return $"Orders: {orders.Count()}";
    }

    public string ExportToCsv(IEnumerable<Order> orders)
    {
        return string.Join("\n",
            orders.Select(o => $"{o.Id},{o.CustomerEmail}"));
    }
}


// Storage
public class OrderStorage
{
    public void Save(Order order)
    {
        Console.WriteLine("Saved to database");
    }
}





public class OrderProcessor
{
    private readonly OrderValidator _validator;
    private readonly OrderStorage _storage;
    private readonly OrderEmailSender _emailSender;

    public OrderProcessor(
        OrderValidator validator,
        OrderStorage storage,
        OrderEmailSender emailSender)
    {
        _validator = validator;
        _storage = storage;
        _emailSender = emailSender;
    }

    public void ProcessOrder(Order order)
    {
        if (!_validator.Validate(order))
            return;

        _storage.Save(order);

        _emailSender.Send(order);
    }
}