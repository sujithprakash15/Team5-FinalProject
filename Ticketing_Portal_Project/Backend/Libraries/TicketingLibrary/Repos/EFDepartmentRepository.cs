using System;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using TicketingLibrary.Interfaces;
using TicketingLibrary.Models;

namespace TicketingLibrary.Repositories
{
       public class EFDepartmentRepository : IDepartmentRepository
    {
        EYTicketPortalContext context = new EYTicketPortalContext();
        public async Task<List<Department>> GetAllDepartmentsAsync()
        {
            List<Department> departments = await context.Departments.ToListAsync();

            if (departments.Count == 0)
            {
                throw new TicketException("The Department list is currently empty.", 505);
            }
            return departments;
        }

        public async Task<Department> GetDepartmentByIdAsync(string deptId)
        {
            try
            {
                Department department = await context.Departments
                    .FirstAsync(d => d.DeptId == deptId);
                return department;
            }
            catch
            {
                throw new TicketException("No such Department ID", 502);
            }
        }
        public async Task AddDepartmentAsync(Department department)
        {
            try
            {
                await context.Departments.AddAsync(department);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                SqlException sqlException = ex.InnerException as SqlException;
                int errorNumber = sqlException.Number;
                switch (errorNumber)
                {
                    case 2627:
                        throw new TicketException("Department ID already exists", 501);
                    default:
                        throw new TicketException(sqlException.Message, 599);
                }
            }
        }
        public async Task UpdateDepartmentAsync(string deptId, Department department)
        {
            Department deptToEdit = await GetDepartmentByIdAsync(deptId);
            try
            {
                deptToEdit.DeptName = department.DeptName;
                deptToEdit.Description = department.Description;

                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new TicketException(ex.Message, 503);
            }
        }
        public async Task DeleteDepartmentAsync(string deptId)
        {
            Department deptToDelete = await context.Departments
                .Include("Employees")
                .Include("TicketTypes")
                .FirstOrDefaultAsync(d => d.DeptId == deptId);
            if (deptToDelete == null)
            {
                throw new TicketException("No such Department ID", 502);
            }
            if (deptToDelete.Employees.Count == 0 &&
                deptToDelete.TicketTypes.Count == 0)
            {
                context.Departments.Remove(deptToDelete);
                await context.SaveChangesAsync();
            }
            else
            {
                throw new TicketException(
                    "Cannot delete department because it has employees", 504);
            }
        }
    }
}
