using System;
using TicketingLibrary.Models;

namespace TicketingLibrary.Interfaces;

public interface IEmployeeRepository
{
    Task AddEmployeeAsync(Employee employee);
    Task<List<Employee>> GetAllEmployeesAsync();
    Task<Employee> GetEmployeeByIdAsync(int empId);   
    Task UpdateEmployeeAsync(int empId, Employee employee);
    Task DeleteEmployeeAsync(int empId);
}

