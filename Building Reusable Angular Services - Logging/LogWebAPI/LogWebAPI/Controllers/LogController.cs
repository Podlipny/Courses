using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using LogWebAPI.Models;
using System.Web.Http.Cors;

namespace LogWebAPI.Controllers
{
  [EnableCors(origins: "*", headers:"*", methods: "*")]
  public class LogController : ApiController
  {
    [HttpPost]
    public IHttpActionResult Post([FromBody]LogEntry value)
    {
      IHttpActionResult ret;

      // TODO: Write some code to store logging data to a table


      ret = Ok(true);

      return ret;
    }
  }
}