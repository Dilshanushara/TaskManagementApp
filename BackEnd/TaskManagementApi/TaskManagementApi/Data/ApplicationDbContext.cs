using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using TaskManagementApi.Models;

namespace TaskManagementApi.Data
{
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<TaskItem> Tasks { get; set; }
}

}
