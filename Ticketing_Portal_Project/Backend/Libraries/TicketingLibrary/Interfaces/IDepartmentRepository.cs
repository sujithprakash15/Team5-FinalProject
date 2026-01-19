using System;
using TicketingLibrary.Models;

namespace TicketingLibrary.Interfaces;

public interface IDepartmentRepository
{
    Task AddDepartmentAsync(Department department);
    Task<List<Department>> GetAllDepartmentsAsync();
    Task<Department> GetDepartmentByIdAsync(string departmentId);   
    Task UpdateDepartmentAsync(string departmentId, Department department);
    Task DeleteDepartmentAsync(string departmentId);
}
