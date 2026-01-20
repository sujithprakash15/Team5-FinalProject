using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TicketingLibrary;
using TicketingLibrary.Interfaces;
using TicketingLibrary.Models;

namespace TicketingWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketTypeController : ControllerBase
    {
        ITicketTypeRepository ticketTypeRepo;

        public TicketTypeController(ITicketTypeRepository ticketTypeRepository)
        {
            ticketTypeRepo = ticketTypeRepository;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                List<TicketType> ticketTypes = await ticketTypeRepo.GetAllTicketTypesAsync();
                return Ok(ticketTypes);
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 506)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }

        [HttpGet("{ticketTypeId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> GetOne(string ticketTypeId)
        {
            try
            {
                TicketType ticketType = await ticketTypeRepo.GetTicketTypeAsync(ticketTypeId);
                return Ok(ticketType);
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 502)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }

        [HttpGet("ByDepartment/{deptId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> GetByDepartment(string deptId)
        {
            try
            {
                List<TicketType> ticketTypes = await ticketTypeRepo.GetByDepartmentIdAsync(deptId);
                return Ok(ticketTypes);
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 505)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }

        [HttpGet("BySla/{slaId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> GetBySla(string slaId)
        {
            try
            {
                List<TicketType> ticketTypes = await ticketTypeRepo.GetBySlaIdAsync(slaId);
                return Ok(ticketTypes);
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 506)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult> Add(TicketType ticketType)
        {
            try
            {
                await ticketTypeRepo.AddTicketTypeAsync(ticketType);
                return Created($"api/tickettype/{ticketType.TicketTypeId}",ticketType);
            }
            catch (TicketException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{ticketTypeId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> Delete(string ticketTypeId)
        {
            try
            {
                await ticketTypeRepo.DeleteTicketTypeAsync(ticketTypeId);
                return Ok();
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 502 || ex.ErrorNumber == 504)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }

        [HttpPut("{ticketTypeId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> Update(string ticketTypeId,TicketType ticketType)
        {
            try
            {
                await ticketTypeRepo.UpdateTicketTypeAsync(ticketTypeId, ticketType);
                return Ok(ticketType);
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 503)
                    return BadRequest(ex.Message);
                else
                    return NotFound(ex.Message);
            }
        }
    }
}
