using System;
using TicketingLibrary.Models;

namespace TicketingLibrary.Interfaces;

public interface IDepartmentRepository
{
    Task AddDepartmentAsync(Department department);
    Task<List<Department>> GetAllDepartmentsAsync();
    Task<Department> GetDepartmentByIdAsync(int departmentId);   
    Task UpdateDepartmentAsync(int departmentId, Department department);
    Task DeleteDepartmentAsync(int departmentId);
}

