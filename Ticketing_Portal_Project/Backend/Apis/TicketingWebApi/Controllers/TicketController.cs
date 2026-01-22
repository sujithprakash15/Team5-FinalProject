using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TicketingLibrary;
using TicketingLibrary.Interfaces;
using TicketingLibrary.Models;

namespace TicketingWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TicketController : ControllerBase
    {
        ITicketRepository ticketRepo;

        public TicketController(ITicketRepository ticketRepository)
        {
            ticketRepo = ticketRepository;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                List<Ticket> tickets = await ticketRepo.GetAllTicketsAsync();
                return Ok(tickets);
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 505)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }

        [HttpGet("{ticketId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> GetOne(string ticketId)
        {
            try
            {
                Ticket ticket = await ticketRepo.GetTicketByIdAsync(ticketId);
                return Ok(ticket);
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 502)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }

        [HttpGet("ByEmployee/{empId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> GetByEmployee(string empId)
        {
            try
            {
                List<Ticket> tickets =
                    await ticketRepo.GetTicketsByEmployeeAsync(empId);

                return Ok(tickets);
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 506)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }

        [HttpGet("ByAssignedEmployee/{empId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> GetByAssignedEmployee(string empId)
        {
            try
            {
                List<Ticket> tickets =
                    await ticketRepo.GetTicketsByAssignedEmployeeAsync(empId);

                return Ok(tickets);
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 507)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }

        [HttpGet("ByTicketType/{ticketTypeId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> GetByTicketType(string ticketTypeId)
        {
            try
            {
                List<Ticket> tickets =
                    await ticketRepo.GetTicketsByTicketTypeAsync(ticketTypeId);

                return Ok(tickets);
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 508)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult> Add(Ticket ticket)
        {
            try
            {
                await ticketRepo.AddTicketAsync(ticket);
                return Created(
                    $"api/ticket/{ticket.TicketId}",
                    ticket);
            }
            catch (TicketException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{ticketId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> Update(string ticketId, Ticket ticket)
        {
            try
            {
                await ticketRepo.UpdateTicketAsync(ticketId, ticket);
                return Ok(ticket);
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 503)
                    return BadRequest(ex.Message);
                else
                    return NotFound(ex.Message);
            }
        }

        [HttpDelete("{ticketId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> Delete(string ticketId)
        {
            try
            {
                await ticketRepo.DeleteTicketAsync(ticketId);
                return Ok("Ticket deleted successfully");
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 504 || ex.ErrorNumber == 502)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }
    }
}
