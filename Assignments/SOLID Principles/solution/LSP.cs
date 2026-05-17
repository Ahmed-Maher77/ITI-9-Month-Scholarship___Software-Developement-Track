// Original Code             => problem: Save() is supported -> Child says: NO, it crashes -> So child is NOT substitutable
public class ArchiveOrderStorage : SqlOrderStorage
{
    public override void Save(Order order)
        => throw new NotSupportedException();
}


// Refactored Code
public class ArchiveOrderStorage : SqlOrderStorage
{
    public override void Save(Order order)
    {
        Console.WriteLine(
            $"Saving order isn't supported.");
    }
}



// upstream
// downstream