using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TicketingLibrary;
using TicketingLibrary.Interfaces;
using TicketingLibrary.Models;
using TicketingLibrary.Repositories;

namespace TicketingWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        IEmployeeRepository employeeRepository;
        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            this.employeeRepository = employeeRepository;
        }
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                List<Employee> employees = await employeeRepository.GetAllEmployeesAsync();
                return Ok(employees);
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 505)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }
        [HttpGet("{empId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> GetOne(string empId)
        {
            try
            {
                Employee employee = await employeeRepository.GetEmployeeByIdAsync(empId);
                return Ok(employee);
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 502)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult> Add(Employee employee)
        {
            try
            {
                await employeeRepository.AddEmployeeAsync(employee);
                return Created($"api/employee/{employee.EmpId}", employee);
            }
            catch (TicketException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{empId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> Delete(string empId)
        {
            try
            {
                await employeeRepository.DeleteEmployeeAsync(empId);
                return Ok();
            }
            catch (TicketException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("{empId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> Update(string empId, Employee employee)
        {
            try
            {
                await employeeRepository.UpdateEmployeeAsync(empId, employee);
                return Ok(employee);
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 503)
                    return BadRequest(ex.Message);
                else
                    return NotFound(ex.Message);
            }
        }
        [HttpPost("login")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)] 
        public async Task<ActionResult> Login(string empId, string password)
        {
            try
            {
                Employee employee = await employeeRepository.LoginAsync(empId, password);
                 return Ok(employee);
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 505)
                    return Unauthorized(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }
    }
}
    

