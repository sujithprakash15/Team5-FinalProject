using System;
using TicketingLibrary.Models;

namespace TicketingLibrary.Interfaces;

public interface IEmployeeRepository
{
    Task AddEmployeeAsync(Employee employee);
    Task<List<Employee>> GetAllEmployeesAsync();
    Task<Employee> GetEmployeeByIdAsync(string empId);   
    Task UpdateEmployeeAsync(string empId, Employee employee);
    Task DeleteEmployeeAsync(string empId);
    Task<Employee> LoginAsync(string empId, string Password);
    
}

