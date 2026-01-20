using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using TicketingLibrary.Interfaces;
using TicketingLibrary.Models;

namespace TicketingLibrary.Repositories
{
    public class EFEmployeeRepository : IEmployeeRepository
    {
        EYTicketPortalContext context = new EYTicketPortalContext();
        public async Task<List<Employee>> GetAllEmployeesAsync()
        {
            List<Employee> employees = await context.Employees.ToListAsync();
            if (employees.Count == 0)
            {
                throw new TicketException("No employees found", 505);
            }
            return employees;
        }
        public async Task<Employee> GetEmployeeByIdAsync(string empId)
        {
            try
            {
                Employee employee = await context.Employees
                    .FirstAsync(e => e.EmpId == empId);
                return employee;
            }
            catch
            {
                throw new TicketException("No such Employee ID", 502);
            }
        }
        public async Task AddEmployeeAsync(Employee employee)
        {
            try
            {
                await context.Employees.AddAsync(employee);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                SqlException sqlException = ex.InnerException as SqlException;
                if (sqlException != null)
                {
                    switch (sqlException.Number)
                    {
                        case 2627: // PK / Unique constraint
                            throw new TicketException("Employee ID already exists", 501);
                        default:
                            throw new TicketException(sqlException.Message, 599);
                    }
                }
                throw;
            }
        }
        public async Task UpdateEmployeeAsync(string empId, Employee employee)
        {
            try
            {
                Employee empToEdit = await GetEmployeeByIdAsync(empId);
                empToEdit.EmpId = employee.EmpId;
                empToEdit.EmpName = employee.EmpName;
                empToEdit.Role = employee.Role;
                empToEdit.Password = employee.Password;
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new TicketException(ex.Message, 503);
            }
        }
        public async Task DeleteEmployeeAsync(string empId)
        {
             Employee empToDelete = await context.Employees
                .Include(e => e.CreatedTickets)
                .Include(e => e.AssignedTickets)
                .Include(e => e.CreatorReplies)
                .Include(e => e.AssignedReplies)
                .FirstOrDefaultAsync(e => e.EmpId == empId);

            if (empToDelete == null)
                throw new TicketException("Employee not found", 511);

            if (empToDelete.CreatedTickets.Count > 0 ||
                empToDelete.AssignedTickets.Count > 0 ||
                empToDelete.CreatorReplies.Count > 0 ||
                empToDelete.AssignedReplies.Count > 0)
            {
                throw new TicketException(
                    "Cannot delete employee because related records exists", 510);
            }

            try
            {
                context.Employees.Remove(empToDelete);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                SqlException sqlException = ex.InnerException as SqlException;
                int errorNumber = sqlException.Number;

                switch (errorNumber)
                {
                    default:
                        throw new TicketException(sqlException.Message, 599);
                }
            }
        }
        public async Task<Employee> LoginAsync(string empId, string password)
        {
            try
            {
                Employee employee = await context.Employees.FirstOrDefaultAsync(e => e.EmpId == empId && e.Password == password);
                if (employee == null)
                {
                    throw new TicketException("Invalid Employee ID or Password", 505);
                }
                return employee;
            }
            catch (Exception ex)
            {
                throw new TicketException(ex.Message, 599);
            }
        }
    }
}
