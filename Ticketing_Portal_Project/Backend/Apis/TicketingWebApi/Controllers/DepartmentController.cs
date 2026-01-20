using Microsoft.AspNetCore.Mvc;
using TicketingLibrary.Interfaces;
using TicketingLibrary.Models;
using TicketingLibrary.Repositories;

namespace TicketingWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        IDepartmentRepository departmentRepository;

        public DepartmentController(IDepartmentRepository departmentRepository)
        {
            this.departmentRepository = departmentRepository;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await departmentRepository.GetAllDepartmentsAsync());
        }

        [HttpGet("{deptId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetOne(string deptId)
        {
            try
            {
                return Ok(await departmentRepository.GetDepartmentByIdAsync(deptId));
            }
            catch (TicketException ex)
            {
                return NotFound(ex.Message);
            }
        }


        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Create(Department department)
        {
            try
            {
                await departmentRepository.AddDepartmentAsync(department);
                return Created(
                    $"api/Department/{department.DeptId}",
                    department);
            }
            catch (TicketException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{deptId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Edit(string deptId, Department department)
        {
            try
            {
                await departmentRepository.UpdateDepartmentAsync(deptId, department);
                return Ok(department);
            }
            catch (TicketException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{deptId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Delete(string deptId)
        {
            try
            {
                await departmentRepository.DeleteDepartmentAsync(deptId);
                return Ok("Department deleted successfully");
            }
            catch (TicketException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
