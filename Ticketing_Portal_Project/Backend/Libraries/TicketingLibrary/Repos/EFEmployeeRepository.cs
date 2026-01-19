using System;
using TicketingLibrary.Interfaces;
using TicketingLibrary.Models;

namespace TicketingLibrary.Repos;

public class EFEmployeeRepository : IEmployeeRepository
{
    public Task AddEmployeeAsync(Employee employee)
    {
        throw new NotImplementedException();
    }

    public Task DeleteEmployeeAsync(int empId)
    {
        throw new NotImplementedException();
    }

    public Task<List<Employee>> GetAllEmployeesAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Employee> GetEmployeeByIdAsync(int empId)
    {
        throw new NotImplementedException();
    }

    public Task UpdateEmployeeAsync(int empId, Employee employee)
    {
        throw new NotImplementedException();
    }
}
