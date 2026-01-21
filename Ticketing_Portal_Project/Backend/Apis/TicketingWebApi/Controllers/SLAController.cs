using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TicketingLibrary;
using TicketingLibrary.Interfaces;
using TicketingLibrary.Models;

namespace TicketingWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize]
    public class SLAController : ControllerBase
    {
        ISLARepository slaRepo;

        public SLAController(ISLARepository slaRepository)
        {
            slaRepo = slaRepository;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                List<SLA> slas = await slaRepo.GetAllSLAsAsync();
                return Ok(slas);
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 505)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }

        [HttpGet("{slaId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> GetOne(string slaId)
        {
            try
            {
                SLA sla = await slaRepo.GetSLAAsync(slaId);
                return Ok(sla);
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
        public async Task<ActionResult> Add(SLA sla)
        {
            try
            {
                await slaRepo.AddSLAAsync(sla);
                return Created($"api/sla/{sla.SLAId}", sla);
            }
            catch (TicketException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{slaId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> Update(string slaId, SLA sla)
        {
            try
            {
                await slaRepo.UpdateSLAAsync(slaId, sla);
                return Ok(sla);
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 503)
                    return BadRequest(ex.Message);
                else
                    return NotFound(ex.Message);
            }
        }

        [HttpDelete("{slaId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> Delete(string slaId)
        {
            try
            {
                await slaRepo.DeleteSLAAsync(slaId);
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
    }
}
