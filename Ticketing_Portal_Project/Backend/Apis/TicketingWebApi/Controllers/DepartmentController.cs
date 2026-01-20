using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TicketingLibrary;
using TicketingLibrary.Interfaces;
using TicketingLibrary.Models;

namespace TicketingWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        IDepartmentRepository departmentRepo;
        public DepartmentController(IDepartmentRepository departmentRepository)
        {
            departmentRepo = departmentRepository;
        }
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            try
            {
            List<Department> departments = await departmentRepo.GetAllDepartmentsAsync();
            return Ok(departments);
            }
            catch (TicketException ex)
            {
                if(ex.ErrorNumber == 505)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);              
            }
        }
        [HttpGet("{deptId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> GetOne(string deptId)
        {
            try
            {
                Department department = await departmentRepo.GetDepartmentByIdAsync(deptId);
                return Ok(department);
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
        public async Task<ActionResult> Add(Department department)
        {
            try
            {
                await departmentRepo.AddDepartmentAsync(department);
                return Created($"api/department/{department.DeptId}", department);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("{deptId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> Update(string deptId, Department department)
        {
            try
            {
                await departmentRepo.UpdateDepartmentAsync(deptId, department);
                return Ok(department);
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 503)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{deptId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> Delete(string deptId)
        {
            try
            { 
                await departmentRepo.DeleteDepartmentAsync(deptId);
                return Ok();
            } 
            catch(TicketException ex)
            {
                if (ex.ErrorNumber == 502 || ex.ErrorNumber == 504)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }
    } 
}
