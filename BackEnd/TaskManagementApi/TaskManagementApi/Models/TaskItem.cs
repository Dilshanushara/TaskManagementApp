using System.ComponentModel.DataAnnotations;

namespace TaskManagementApi.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        [StringLength(100)]
        public string Title { get; set; } = string.Empty;

        [StringLength(500)]
        public string Description { get; set; } = string.Empty;
        public string Status { get; set; } = "To do"; // default value
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
