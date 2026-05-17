// Clients should NOT be forced to depend on methods they do not use


// Original Code                      => problem: A reporting class would be forced to implement email methods.  -  An email service would be forced to implement reporting methods.
public interface IOrderService
{
    void ProcessOrder(Order order);

    void SendConfirmationEmail(Order order);

    string GenerateReport(IEnumerable<Order> orders);

    string ExportToCsv(IEnumerable<Order> orders);
}



// ========= Refactored Code ========
// Processing Interface
public interface IOrderProcessor
{
    void ProcessOrder(Order order);
}

// Notification Interface
public interface IOrderNotifier
{
    void SendConfirmationEmail(Order order);
}

// Reporting Interface
public interface IOrderReporter
{
    string GenerateReport(IEnumerable<Order> orders);

    string ExportToCsv(IEnumerable<Order> orders);
}


// Email Service
public class OrderEmailSender : IOrderNotifier
{
    public void SendConfirmationEmail(Order order)
    {
        Console.WriteLine("Email sent");
    }
}


// Report Service
public class OrderReportService : IOrderReporter
{
    public string GenerateReport(IEnumerable<Order> orders)
    {
        return "Report";
    }

    public string ExportToCsv(IEnumerable<Order> orders)
    {
        return "CSV";
    }
}


