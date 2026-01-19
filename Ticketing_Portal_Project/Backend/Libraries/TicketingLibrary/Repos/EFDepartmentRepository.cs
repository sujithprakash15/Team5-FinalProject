using System;
using TicketingLibrary.Interfaces;
using TicketingLibrary.Models;

namespace TicketingLibrary.Repos;

public class EFDepartmentRepository : IDepartmentRepository
{
    public Task AddDepartmentAsync(Department department)
    {
        throw new NotImplementedException();
    }

    public Task DeleteDepartmentAsync(int departmentId)
    {
        throw new NotImplementedException();
    }

    public Task<List<Department>> GetAllDepartmentsAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Department> GetDepartmentByIdAsync(int departmentId)
    {
        throw new NotImplementedException();
    }

    public Task UpdateDepartmentAsync(int departmentId, Department department)
    {
        throw new NotImplementedException();
    }
}
