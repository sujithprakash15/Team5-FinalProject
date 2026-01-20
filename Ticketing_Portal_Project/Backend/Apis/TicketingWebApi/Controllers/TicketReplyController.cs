using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TicketingLibrary;
using TicketingLibrary.Interfaces;
using TicketingLibrary.Models;

namespace TicketingWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketReplyController : ControllerBase
    {
        ITicketReplyRepository ticketreplyrepo;

        public TicketReplyController(ITicketReplyRepository ticketReplyRepository)
        {
            ticketreplyrepo = ticketReplyRepository;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            try{
            List<TicketReply> replies = await ticketreplyrepo.GetAllRepliesAsync();
            return Ok(replies);
            }
            catch(TicketException ex)
            {
                if (ex.ErrorNumber == 505)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }

        [HttpGet("{replyId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]

        public async Task<ActionResult> GetOne(string replyId)
        {
            try
            {
                TicketReply reply = await ticketreplyrepo.GetReplyAsync(replyId);
                return Ok(reply);
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
        [ProducesResponseType(404)]

        public async Task<ActionResult> Add(TicketReply reply)
        {
            try
            {
                await ticketreplyrepo.AddReplyAsync(reply);
                return Created($"api/reply/{reply.ReplyId}", reply);
            }
            catch (TicketException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{replyId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]

        public async Task<ActionResult> Delete(string replyId)
        {
            try
            {
                await ticketreplyrepo.DeleteReplyAsync(replyId);
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

        [HttpPut("{replyId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]

        public async Task<ActionResult> Update(string replyId, TicketReply reply)
        {
            try
            {
                await ticketreplyrepo.UpdateReplyAsync(replyId, reply);
                return Ok(reply);
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 503)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }

        [HttpGet("ticket/{ticketId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]

        public async Task<ActionResult> GetByTicketId(string ticketId)
        {
            try
            {
                List<TicketReply> replies = await ticketreplyrepo.GetRepliesByTicketId(ticketId);
                return Ok();
            }
            catch (TicketException ex)
            {
                 if (ex.ErrorNumber == 508)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }

        [HttpGet("assigned/{assignedempId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]

        public async Task<ActionResult> GetByAssignedEmpId(string assignedempId)
        {
            try
            {
                List<TicketReply> replies = await ticketreplyrepo.GetRepliesByAssingedEmpId(assignedempId);
                return Ok();
            }

            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 506)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }

        [HttpGet("emp/{empId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]

        public async Task<ActionResult> GetByEmpId(string empId)
        {
            try
            {
                List<TicketReply> replies = await ticketreplyrepo.GetRepliesByEmpId(empId);
                return Ok();
            }
            catch (TicketException ex)
            {
                if (ex.ErrorNumber == 507)
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }

    }
}
