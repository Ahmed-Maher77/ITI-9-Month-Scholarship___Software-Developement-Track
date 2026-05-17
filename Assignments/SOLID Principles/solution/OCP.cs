// Original code           => problem: VIP - Student - BlackFriday => We must EDIT the method again => that violates OCP
private decimal GetDiscount(Order order)
{
    if (order.OrderType == "Standard")
        return 0;

    else if (order.OrderType == "Premium")
        return 0.10m;

    else if (order.OrderType == "Bulk")
        return 0.20m;

    return 0;
}



// Discount Strategy Interface
public interface IDiscountStrategy
{
    decimal GetDiscount(Order order);
}


// ===== Concrete Discount Strategies ======
// Standard 
public class StandardDiscountStrategy : IDiscountStrategy
{
    public decimal GetDiscount(Order order)
    {
        return 0.00m;
    }
}

// Premium
public class PremiumDiscountStrategy : IDiscountStrategy
{
    public decimal GetDiscount(Order order)
    {
        return 0.10m;
    }
}


// Bulk
public class BulkDiscountStrategy : IDiscountStrategy
{
    public decimal GetDiscount(Order order)
    {
        return 0.20m;
    }
}


// Use Strategy in Processor
public class OrderProcessor
{
    private readonly IDiscountStrategy _discountStrategy;

    public OrderProcessor(IDiscountStrategy discountStrategy)
    {
        _discountStrategy = discountStrategy;
    }

    public void Process(Order order)
    {
        decimal discount = _discountStrategy.GetDiscount(order);

        decimal finalAmount =
            order.TotalAmount -
            (order.TotalAmount * discount);
    }
}